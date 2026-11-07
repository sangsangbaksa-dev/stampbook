const test = require('node:test'), assert = require('node:assert'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const root = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(root, f), 'utf8');
execFileSync('node', [path.join(root, 'scripts/build.js')]);
test('every language has a static page with canonical, hreflang for all 5 + x-default, OG and JSON-LD', () => {
  for (const [l, f] of [['en', 'index.html'], ['ko', 'ko/index.html'], ['ja', 'ja/index.html'], ['zh', 'zh/index.html'], ['es', 'es/index.html']]) {
    const h = read(f); assert.ok(h.includes(`<html lang="${l}">`), l);
    assert.equal((h.match(/hreflang="/g) || []).length, 6, l); assert.ok(h.includes('rel="canonical"') && h.includes('og:image') && h.includes('application/ld+json'), l);
    assert.ok(!/\{\{|undefined/.test(h), 'unfilled placeholder in ' + l);
    JSON.parse(h.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  }
});
test('checkout url and support email come from config.js only', () => {
  const cfg = read('config.js'), url = cfg.match(/checkoutUrl: '([^']+)'/)[1], mail = cfg.match(/supportEmail: '([^']+)'/)[1];
  for (const f of ['index.html', 'ko/index.html', 'terms.html', 'privacy.html']) assert.ok(read(f).includes(mail), f);
  assert.ok(read('index.html').includes(url));
  for (const f of ['app/app.js', 'landing.js']) assert.ok(!read(f).includes('example.com'), f + ' hardcodes a placeholder');
});
test('sitemap lists all pages; robots hides the app and points to the sitemap', () => {
  const sm = read('sitemap.xml'); for (const p of ['/ko/', '/ja/', '/zh/', '/es/', '/privacy', '/terms']) assert.ok(sm.includes(p), p);
  const rb = read('robots.txt'); assert.ok(rb.includes('Disallow: /app/') && rb.includes('Sitemap: https://'));
});
test('terms state a refund window and the contact', () => { const t = read('terms.html'); assert.ok(t.includes('14 days') && t.includes('14일') && t.includes('Refunds')); });
test('public copy does not claim a free tier, no server, or an unconditional refund', () => {
  const banned = ['no sign-up', 'No sign-up', '가입 없음', 'no questions asked', '이유를 묻지 않고', '会員登録なし', '无需注册', 'Sin registro', 'sin preguntas', 'Your data stays on your device', '데이터는 내 기기에만', 'No account, no server', 'Free: 3', 'activation limit'];
  for (const f of ['index.html', 'ko/index.html', 'ja/index.html', 'zh/index.html', 'es/index.html', 'privacy.html', 'terms.html']) {
    const t = read(f);
    for (const b of banned) assert.ok(!t.includes(b), f + ' contains ' + b);
  }
  for (const f of ['privacy.html', 'terms.html']) {
    const t = read(f);
    for (const lang of ['en', 'ko', 'ja', 'zh', 'es']) assert.ok(t.includes(`lang="${lang}"`), f + ' ' + lang);
  }
  assert.ok(read('privacy.html').includes('Supabase') && read('privacy.html').includes('Lemon Squeezy'));
  assert.ok(read('terms.html').includes('Stampbook Pro') && read('terms.html').includes('live card charges'));
  assert.ok(read('index.html').includes('https://quickbillapp.lemonsqueezy.com/checkout/buy/bb6de2a5-9e61-41f6-b5f6-00296a9302b6'));
  assert.ok(!read('config.js').includes('productId') && read('config.js').includes('bb6de2a5-9e61-41f6-b5f6-00296a9302b6'));
});
test('landing copy has no empty strings and all five languages share the same keys', () => {
  const D = require('../scripts/landing-i18n.js'), keys = Object.keys(D.en);
  for (const l of Object.keys(D)) { assert.deepEqual(Object.keys(D[l]).sort(), keys.slice().sort(), l); for (const k of keys) assert.ok(D[l][k].trim(), `${l}.${k}`); }
});
