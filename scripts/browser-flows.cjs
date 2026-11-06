const assert = require('node:assert/strict');
module.exports = async (page, base) => {
  await page.addInitScript(() => {
    const pack = (id,student,expires,total) => ({id,student,total,expires,price:500,currency:'USD',start:'2026-10-01',stamps:[],paid:true});
    localStorage.setItem('stampbook.v1',JSON.stringify({v:1,teacher:'',pro:true,lang:'en',packs:[pack('a','한글'.normalize('NFD'),'2026-12-20',10),pack('b','Amy','2026-12-01',3)]}));
  });
  await page.goto(base+'/app/');
  await page.locator('#list-count').waitFor();
  const original = await page.evaluate(()=>localStorage.getItem('stampbook.v1'));
  const search = page.locator('.filters input[type=search]');
  await search.fill('한글');
  assert.match(await page.textContent('#list-count'),/1 of 2/);
  await search.fill('missing student');
  assert.match(await page.textContent('#list-count'),/0 of 2/);
  await page.click('#clear-filters');
  assert.match(await page.textContent('#list-count'),/2 of 2/);
  assert.equal(await page.locator('.filters input[type=search]').inputValue(),'');
  await page.selectOption('.list-tools select','student');
  assert.equal(await page.locator('#list section').first().getAttribute('data-pid'),'b');
  assert.equal(await page.evaluate(()=>localStorage.getItem('stampbook.v1')),original);
  await page.focus('[data-view=packs]');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('[data-view=cal]').getAttribute('aria-selected'),'true');
  assert.equal(await page.locator('[data-view=cal]').evaluate(e=>e===document.activeElement),true);
  await page.keyboard.press('Home');
  assert.equal(await page.locator('[data-view=packs]').getAttribute('aria-selected'),'true');
  await page.addInitScript(() => {
    const data = JSON.parse(localStorage.getItem('stampbook.v1'));
    data.packs = ['__proto__','constructor','toString'].map((student,i) => ({...data.packs[0], id:'special-'+i, student}));
    localStorage.setItem('stampbook.v1', JSON.stringify(data));
  });
  await page.reload();
  await page.getByRole('button', {name:'Group by student', exact:true}).click();
  assert.equal(await page.locator('#list .grp').count(),3,'Special student names render as ordinary groups');
  for (const name of ['__proto__','constructor','toString']) assert.ok((await page.textContent('#list')).includes(name));
  await page.screenshot({path:require('node:path').join(__dirname,'../artifacts/browser/functional-workspace.png'),fullPage:true});
};
