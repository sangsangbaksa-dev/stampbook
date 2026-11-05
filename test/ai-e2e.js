/* Playwright check for the AI suggestions card in Insights. The Anthropic API is mocked with page.route, so no request leaves the test.
   Run: NODE_PATH=$(npm root -g) node test/ai-e2e.js [shots-dir] */
const { chromium } = require('playwright'), http = require('http'), fs = require('fs'), path = require('path'), assert = require('assert');
const root = path.join(__dirname, '..'), types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p); if (!f.startsWith(root) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); r.end(fs.readFileSync(f));
}).listen(0);
const KEY = 'test-key-WXYZ';

(async () => {
  const base = `http://localhost:${srv.address().port}`, out = process.argv[2] || '/tmp/shots', errs = [];
  fs.mkdirSync(out, { recursive: true });
  const C = require('../app/core.js'), today = C.todayStr(), ym = today.slice(0, 7);
  const d = (n) => C.addDays(today, -n);
  const pack = (id, student, n, extra) => Object.assign({ id, student, total: 10, price: 500, currency: 'USD', start: ym + '-01', months: 3, expires: C.addMonths(today, 2), paid: true,
    stamps: Array.from({ length: n }, (_, i) => ({ id: id + i, date: d(n - i), note: i === 0 ? 'secret homework note' : '', kind: '' })) }, extra || {});
  const state = { v: 1, teacher: '', pro: true, lang: 'en', packs: [pack('a', 'Mina Park', 4), pack('b', 'Joon Lee', 1)] };
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 390, height: 844 }, locale: 'en-US' });
  await ctx.addInitScript(s => { if (!localStorage['stampbook.v1']) localStorage['stampbook.v1'] = s; }, JSON.stringify(state));
  const pg = await ctx.newPage(); pg.on('pageerror', e => errs.push(e.message));
  pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });

  const calls = [];
  let mode = 'ok';
  await pg.route('https://api.anthropic.com/v1/messages', async route => {
    calls.push({ headers: route.request().headers(), body: route.request().postData() });
    if (mode === 'auth') return route.fulfill({ status: 401, contentType: 'application/json', body: '{"type":"error"}' });
    const text = 'Sure!\n- 5: a free 15-minute bonus | Halfway already, thank you!\n- 10: a completion card | <img src=x onerror="window.__xss=1">\n- none';
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ content: [{ type: 'text', text }] }) });
  });

  await pg.goto(base + '/app/index.html'); await pg.waitForSelector('.tabs');
  await pg.click('.tabs button >> nth=2'); await pg.waitForSelector('.ai');
  const card = pg.locator('.ai');
  const plan = await card.locator('ul.evs').first().textContent();
  assert.ok(plan.includes('Lesson 3') && plan.includes('Lesson 5') && plan.includes('Lesson 8') && plan.includes('Lesson 10'), 'milestone plan shown: ' + plan);
  assert.ok(plan.includes('reached'), 'the reached quarter is marked');
  assert.equal(await card.locator('.pri').isDisabled(), true, 'ask button is off without a key');
  assert.equal(calls.length, 0, 'nothing sent before a click');

  // Save the key: stored under its own name, never inside the saved pack data.
  await card.locator('details.ai-key summary').click();
  await card.locator('details.ai-key input[type=password]').fill(KEY);
  await card.getByRole('button', { name: 'Save key' }).click();
  assert.equal(await pg.evaluate(() => localStorage.getItem('stampbook-ai-key')), KEY, 'key stored under the agreed name');
  assert.equal((await pg.evaluate(() => localStorage.getItem('stampbook.v1'))).includes(KEY), false, 'key is not in the saved state (backup and sync)');
  assert.match(await card.locator('details.ai-key p.note').last().textContent(), /ends with WXYZ/);
  assert.equal(await card.locator('.pri').isDisabled(), false, 'ask button is on with a key');
  assert.equal(calls.length, 0, 'saving a key sends nothing');

  // Ask: one request with the right headers and the Haiku model; no student name or note in the body.
  await card.locator('.pri').click();
  await pg.waitForFunction(() => document.querySelectorAll('.ai ul.ai-list')[0].children.length > 0 && document.querySelector('.ai .pri').disabled === false, null, { timeout: 15000 });
  assert.equal(calls.length, 1, 'exactly one request after the click');
  assert.equal(calls[0].headers['x-api-key'], KEY);
  assert.equal(calls[0].headers['anthropic-dangerous-direct-browser-access'], 'true');
  const body = JSON.parse(calls[0].body);
  assert.equal(body.model, 'claude-haiku-5-5');
  assert.equal(calls[0].body.includes('Mina'), false, 'student name not sent');
  assert.equal(calls[0].body.includes('secret homework note'), false, 'lesson note not sent');
  assert.ok(calls[0].body.includes('lessons in pack: 10'), 'pack numbers are sent');

  // The reply is text only: two suggestions, the injected markup is text and no script ran.
  const items = await card.locator('ul.ai-list li').allTextContents();
  assert.equal(items.length, 2, 'two suggestions shown: ' + JSON.stringify(items));
  assert.ok(items[1].includes('<img src=x'), 'markup shown as text');
  assert.equal(await card.locator('img').count(), 0, 'no element was created from the reply');
  assert.equal(await pg.evaluate(() => window.__xss), undefined, 'no script ran from the reply');

  // A rejected key shows a message.
  mode = 'auth';
  await card.locator('.pri').click();
  await pg.waitForFunction(() => /rejected/.test(document.querySelector('.ai').textContent), null, { timeout: 15000 });
  mode = 'ok';

  // Changing the pack clears the reply for the other pack.
  await card.locator('.pri').click();
  await pg.waitForFunction(() => document.querySelectorAll('.ai ul.ai-list')[0].children.length > 0 && document.querySelector('.ai .pri').disabled === false, null, { timeout: 15000 });
  await pg.selectOption('.ai select', { label: 'Joon Lee · 1/10' });
  assert.equal(await pg.locator('.ai ul.ai-list li').count(), 0, 'reply cleared on pack change');

  // Remove the key: the button turns off and the key is gone.
  await card.locator('details.ai-key summary').click();
  await card.getByRole('button', { name: 'Remove key' }).click();
  assert.equal(await pg.evaluate(() => localStorage.getItem('stampbook-ai-key')), null);
  assert.equal(await card.locator('.pri').isDisabled(), true);

  // Layout and language.
  const overflow = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert.ok(overflow <= 0, 'no horizontal overflow at 390px (' + overflow + ')');
  await pg.screenshot({ path: out + '/ai-card-390.png', fullPage: false });
  await pg.selectOption('header select', 'ko');
  assert.match(await pg.locator('.ai h3').textContent(), /AI 제안/);

  const errsReal = errs.filter(e => !/status of 401 \(Unauthorized\)/.test(e));
  assert.deepEqual(errsReal, [], 'no console or page errors other than the deliberate 401');
  console.log('AI E2E OK');
  await b.close(); srv.close(); process.exit(0);
})().catch(e => { console.error('AI E2E FAIL', e.message); process.exit(1); });
