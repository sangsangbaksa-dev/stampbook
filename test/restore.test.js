/* Reimplemented roster tools. These are not a recovery of commit 5255448. */
const test = require('node:test'), assert = require('node:assert'), fs = require('fs'), path = require('path');
const C = require('../app/core.js');
const I = require('../app/i18n.js');
const root = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

function mk(over) {
  return Object.assign({ id: 'p', student: 'Mina', total: 8, price: 80, currency: 'USD', start: '2026-10-01', expires: '2027-01-01', stamps: [], paid: true }, over);
}
function stamp(p, date) { assert.equal(C.addStamp(p, date), true); }

test('low filter keeps packs with 2 or fewer lessons left', () => {
  const today = '2026-11-05';
  const two = mk({ id: 'two', total: 4 }); stamp(two, '2026-10-02'); stamp(two, '2026-10-03');
  const one = mk({ id: 'one', total: 2 }); stamp(one, '2026-10-02');
  const zero = mk({ id: 'zero', total: 1 }); stamp(zero, '2026-10-02');
  const three = mk({ id: 'three', total: 5 }); stamp(three, '2026-10-02'); stamp(three, '2026-10-03');
  const full = mk({ id: 'full' });
  assert.equal(C.remaining(two), 2);
  assert.equal(C.remaining(zero), 0);
  assert.deepEqual([two, one, zero, three, full].filter(p => C.matchesFilter(p, 'low', today)).map(p => p.id), ['two', 'one', 'zero']);
});

test('group stamp marks only open packs that are not already stamped that day', () => {
  const today = '2026-11-05';
  const open = mk({ id: 'a', student: 'Ann' });
  const again = mk({ id: 'b', student: 'Bo' }); stamp(again, today);
  const done = mk({ id: 'c', student: 'Cy', total: 1 }); stamp(done, '2026-10-02');
  const old = mk({ id: 'd', student: 'Dee', expires: '2026-01-01' });
  const added = C.stampGroup([open, again, done, old, null], today);
  assert.deepEqual(added.map(x => x.packId), ['a']);
  assert.equal(C.remaining(open), 7);
  assert.equal(again.stamps.length, 1);
  assert.equal(C.stampGroup([open], today).length, 0, 'a second stamp the same day is refused');
});

test('undo target is the latest stamp, with a newer pack winning the same date', () => {
  const older = mk({ id: 'old', student: 'Old' }); stamp(older, '2026-10-02');
  const newer = mk({ id: 'new', student: 'New' }); stamp(newer, '2026-10-02'); stamp(newer, '2026-11-01');
  assert.deepEqual(C.lastStamp([newer, older]), { packId: 'new', student: 'New', id: newer.stamps[1].id, date: '2026-11-01' });
  C.removeStamp(newer, newer.stamps[1].id);
  const again = C.lastStamp([newer, older]);
  assert.equal(again.packId, 'new', 'the pack earlier in the list wins the tied date');
  assert.equal(again.date, '2026-10-02');
  assert.equal(C.lastStamp([]), null);
});

test('renewal list skips a pack that already has a successor', () => {
  const today = '2026-11-05';
  const due = mk({ id: 'due', total: 1, expires: '2026-12-01' }); stamp(due, '2026-10-02');
  const followed = mk({ id: 'old', total: 1 }); stamp(followed, '2026-10-01');
  const next = mk({ id: 'next', renewsFrom: 'old' });
  const open = mk({ id: 'open', total: 8 });
  assert.deepEqual(C.renewalDue([due, followed, next, open], today).map(p => p.id), ['due']);
});

test('parent statement joins one student\'s packs for the month', () => {
  const a = mk({ id: 'a', student: 'Mina', price: 80, total: 8 });
  const b = mk({ id: 'b', student: ' mina ', price: 40, total: 4, start: '2026-11-01' });
  stamp(a, '2026-11-02'); stamp(a, '2026-10-02');
  C.addStamp(b, '2026-11-03', 'scales', 'noshow');
  C.addStamp(b, '2026-11-04', '', 'excused');
  const other = mk({ id: 'c', student: 'Bo' }); stamp(other, '2026-11-02');
  const s = C.parentStatement([a, b, other], 'Mina', '2026-11', '2026-11-05');
  assert.equal(s.student, 'Mina');
  assert.deepEqual(s.lines.map(x => x.date), ['2026-11-02', '2026-11-03', '2026-11-04']);
  assert.equal(s.lessons, 2, 'the excused lesson is not counted');
  assert.equal(s.noshow, 1);
  assert.equal(s.excused, 1);
  assert.equal(s.earned, 20, '10 from the first pack and 10 from the no-show');
  assert.equal(s.left, C.remaining(a) + C.remaining(b));
  assert.equal(C.parentStatement([a], 'Nobody', '2026-11', '2026-11-05').lines.length, 0);
});

test('new labels exist in all five languages with the same placeholders', () => {
  const keys = ['filterLow', 'stampGroup', 'stampGroupDone', 'stampGroupNone', 'undoLast', 'undoLastNone', 'undoLastDone', 'renewCopyAll', 'renewCopyNone', 'renewCopyDone', 'statementBtn', 'statementH', 'statementFor', 'statementMonth', 'statementNone', 'statementLesson', 'statementSum', 'statementEarned'];
  const ph = s => (String(s).match(/\{\w+\}/g) || []).slice().sort().join(' ');
  for (const k of keys) {
    assert.ok(I.L.en[k] && I.L.en[k].trim(), k);
    for (const l of I.langs) assert.equal(ph(I.L[l][k]), ph(I.L.en[k]), l + '.' + k);
  }
});

test('service worker caches only ok same-origin responses and skips /api', () => {
  const sw = read('app/sw.js');
  assert.match(sw, /var V='stampbook-v11'/);
  assert.ok(!/var V='stampbook-v7'/.test(sw) && !/var V='stampbook-v10'/.test(sw));
  assert.match(sw, /url\.origin!==self\.location\.origin/);
  assert.match(sw, /pathname==='\/api'\|\|url\.pathname\.indexOf\('\/api\/'\)===0/);
  assert.match(sw, /r&&r\.ok/);
  const fetchBody = sw.slice(sw.indexOf("addEventListener('fetch'"));
  assert.ok(fetchBody.indexOf('r.ok') < fetchBody.indexOf('caches.open(V)'), 'a response is stored only after it is ok');
});

test('the paid lock still returns before the roster and is not bypassed', () => {
  const src = read('app/app.js');
  const renderAt = src.indexOf('function render()');
  const early = src.slice(renderAt, renderAt + 700);
  assert.match(early, /if \(!state\.pro\) return renderLocked\(\)/);
  assert.equal(src.split('state.pro = true').length, 2, 'only grant() turns Pro on');
  assert.ok(!/freemium|freeMax|maxFree|packs\.length >= 3/.test(src));
  const load = src.slice(src.indexOf('function load()'), src.indexOf('function save()'));
  assert.match(load, /pro: false/);
});
