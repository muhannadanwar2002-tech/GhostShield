import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fixtures=JSON.parse(readFileSync(new URL('./reference.json',import.meta.url)));
const expected=JSON.parse(readFileSync(new URL('../site/assets/samples.json',import.meta.url)));
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||undefined,headless:true});
try{
  for(const viewport of [{width:1920,height:1080},{width:1440,height:900},{width:1280,height:800},{width:390,height:844}]){
    const page=await browser.newPage({viewport});const errors=[];const bad=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(!r.ok())bad.push(r.status()+' '+r.url());});
    const base=new URL(process.env.DEMO_BASE);
    await page.route('**/*', route=>new URL(route.request().url()).origin===base.origin ? route.continue() : route.abort());
    await page.goto(base.href);
    await page.getByRole('link',{name:'جرّب النموذج الحقيقي'}).click();
    await page.waitForFunction(()=>!document.querySelector('#next').disabled);
    assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
    assert.equal(await page.locator('#threshold').textContent(),'0.01797');
    assert.equal(await page.locator('#threshold').getAttribute('title'),'0.017968580495137495');
    assert.equal(await page.locator('#official-summary bdi').first().getAttribute('title'),'16569475');
    assert.match(await page.locator('#official-summary').textContent(),/16\.57M/);
    assert.match(await page.locator('#official').textContent(),/35.87%/);
    assert.equal(await page.locator('a[href*="presentation/"]').count(),0);
    const parity=await page.evaluate(async records=>{
      const {loadInference,verifyParity}=await import('../assets/inference.js');
      const model=await (await fetch('../assets/model.json')).json();
      return verifyParity(loadInference(model),records,model.threshold);
    },fixtures);
    assert.equal(parity.n,1326);assert(parity.maxReconstruction<=5e-7&&parity.maxMse<=1e-7);
    assert.equal(parity.disagreements.length,0);
    const count=k=>page.locator('[data-metric='+k+']').textContent().then(Number);
    await page.click('#next');
    assert.equal(await count('total'),1);
    assert.equal(await page.locator('#rows tr td').first().textContent(),String(expected.replay.normal[0].row));
    await page.selectOption('#speed','4');
    await page.click('#start');
    await page.waitForFunction(()=>Number(document.querySelector('[data-metric=total]').textContent)>=3);
    await page.click('#pause'); const paused=await count('total');await page.waitForTimeout(350);
    assert.equal(await count('total'),paused);
    await page.click('#reset');assert.equal(await count('total'),0);
    for(const source of ['dos','fuzzy','gear','rpm']){
      await page.selectOption('#source',source);
      await page.selectOption('#mode','examples');
      const n=expected.examples[source].length;
      const reference=expected.examples[source].map(r=>{
        const f=fixtures.find(f=>f.source===source&&f.row===r.row);assert(f);
        return f.attack?(r.label==='T'?'tp':'fp'):(r.label==='T'?'fn':'tn');
      });
      for(let i=0;i<n;i++)await page.click('#next');
      assert.equal(await count('total'),n);
      for(const k of ['tp','fp','tn','fn'])assert.equal(await count(k),reference.filter(x=>x===k).length);
      await page.selectOption('#mode','replay');
      assert.equal(await count('total'),0);
      await page.click('#next');
      assert.equal(await page.locator('#rows tr td').first().textContent(),String(expected.replay[source][0].row));
    }
    assert(/^[0-9.]+/.test(await page.locator('#mse').textContent()));
    const canvas=await page.locator('#chart').evaluate(c=>Array.from(c.getContext('2d').getImageData(0,0,c.width,c.height).data).some((v,i)=>i%4===3&&v>0));
    assert(canvas);
    await page.locator('details summary').click();
    await page.fill('#manual','1,2,NaN');await page.click('#infer');
    assert.match(await page.locator('#manual-result').textContent(),/12/);
    await page.fill('#manual',fixtures[0].x.join(','));await page.click('#infer');
    assert.match(await page.locator('#manual-result').textContent(),/MSE/);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    if(process.env.SCREENSHOT_DIR){
      await page.locator('details summary').click();
      await page.evaluate(()=>scrollTo(0,0));
      await page.screenshot({path:process.env.SCREENSHOT_DIR+'/'+viewport.width+'.png'});
    }
    await page.click('#return');
    assert.equal(new URL(page.url()).pathname,base.pathname);
    await page.close();
    assert.deepEqual(errors,[]);assert.deepEqual(bad,[]);
    console.log(viewport,JSON.stringify(parity),'controls, counts, chart, manual input and return home passed');
  }
  const failure=await browser.newPage();
  await failure.route('**/assets/model.json', route=>route.fulfill({status:503}));
  await failure.goto(new URL('demo/',process.env.DEMO_BASE).href);
  await failure.waitForFunction(()=>document.querySelector('#notice').textContent.includes('503'));
  assert(await failure.locator('#next').isDisabled());
  console.log('Model-load error is visible and controls stay disabled');
} finally {await browser.close();}
