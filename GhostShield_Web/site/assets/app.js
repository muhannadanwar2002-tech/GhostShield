import {loadInference} from './inference.js';
import {format} from './format.js';
const $=id=>document.getElementById(id);
const labels={normal:'حركة طبيعية',dos:'DoS',fuzzy:'Fuzzy',gear:'Gear Spoofing',rpm:'RPM Spoofing'};
const statLabels={total:'رسائل معالجة',anomalies:'شذوذ مكتشف',tp:'True Positive',tn:'True Negative',fp:'False Positive',fn:'False Negative'};
const isolate=value=>{
  const b=document.createElement('bdi');b.textContent=value;return b;
};
const exactDisplay=(element,value,formatted)=>{
  element.textContent=formatted;element.title=String(value);
};
const mixed=(element,...parts)=>element.replaceChildren(...parts);
const cells=(parent,values)=>{
  const tr=document.createElement('tr');
  for(const value of values){const td=document.createElement('td');td.append(isolate(value));tr.append(td);}
  parent.append(tr);return tr;
};
let predict, samples, threshold, records=[], history=[], counts={}, timer=null, playing=false;
const attackText=a=>a?'Attack':'Normal';
const busy=()=>history.length>=records.length;
const controls=()=>{
  $('start').disabled=!predict||playing||busy(); $('pause').disabled=!playing;
  $('next').disabled=!predict||playing||busy(); $('reset').disabled=!predict;
  $('position').textContent=format.index(history.length)+' / '+format.index(records.length);
};
function pause(){
  playing=false; clearTimeout(timer); timer=null; controls();
}
function reset(){
  pause(); records=samples?.[$('mode').value]?.[$('source').value]||[];
  history=[]; counts=Object.fromEntries(Object.keys(statLabels).map(k=>[k,0]));
  $('rows').replaceChildren(); $('mse').textContent='—'; $('mse').removeAttribute('title'); $('truth').textContent='—';
  $('classification').textContent='بانتظار رسالة'; $('classification').dataset.alarm='false'; $('mismatch').textContent='';
  $('mode-note').textContent=$('mode').value==='replay'?'مقطع متصل بترتيبه الأصلي.':'عينات طبقية من تسجيل واحد، وليست تسلسلًا زمنيًا أو عينة ممثّلة.';
  $('notice').textContent=records.length?'النموذج جاهز · الحساب محلي': 'لا توجد رسائل صالحة لهذا الاختيار.';
  paintCounts();draw();controls();
}
function paintCounts(){
  $('counts').replaceChildren(...Object.entries(statLabels).map(([k,label])=>{
    const card=document.createElement('div');const number=document.createElement('strong');
    number.dataset.metric=k;number.textContent=format.count(counts[k]);card.append(number,isolate(label));return card;
  }));
}
function draw(){
  const c=$('chart'), w=c.clientWidth,h=c.clientHeight;
  if(!w||!h)return;
  const scale=devicePixelRatio||1;c.width=w*scale;c.height=h*scale;
  const ctx=c.getContext('2d');ctx.scale(scale,scale);ctx.direction='ltr';ctx.textAlign='left';
  const margin={top:15,right:15,bottom:31,left:57}, width=w-margin.left-margin.right,height=h-margin.top-margin.bottom;
  if(width<=0)return;
  const top=Math.max(threshold||.01,...history.map(p=>p.mse))*1.15;
  const x=i=>margin.left+i/Math.max(1,records.length-1)*width, y=v=>margin.top+height*(1-v/top);
  ctx.font='11px monospace';ctx.fillStyle='#a8c3cc';ctx.strokeStyle='#294d57';
  for(let i=0;i<=5;i++){
    const yy=y(top*i/5);ctx.beginPath();ctx.moveTo(x(0),yy);ctx.lineTo(x(records.length-1),yy);ctx.stroke();
    ctx.fillText(format.error(top*i/5),4,yy+3);
    if(records.length){const j=Math.round((records.length-1)*i/5);const xx=x(j);
      ctx.beginPath();ctx.moveTo(xx,margin.top);ctx.lineTo(xx,margin.top+height);ctx.stroke();
      ctx.fillText(format.index(j+1),xx-5,h-8);}
  }
  if(threshold){ctx.strokeStyle='#ff9483';ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(x(0),y(threshold));ctx.lineTo(margin.left+width,y(threshold));ctx.stroke();ctx.setLineDash([]);}
  if(history.length){
    ctx.strokeStyle='#49e4ec';ctx.lineWidth=2;ctx.beginPath();
    history.forEach((p,i)=>i?ctx.lineTo(x(i),y(p.mse)):ctx.moveTo(x(i),y(p.mse)));ctx.stroke();
    ctx.fillStyle='#49e4ec';ctx.beginPath();ctx.arc(x(history.length-1),y(history.at(-1).mse),4,0,Math.PI*2);ctx.fill();
  }
}
function step(){
  if(busy()){pause();return;}
  try{
    const r=records[history.length],p=predict(r.x), truth=r.label==='T';
    const wrong=p.attack!==truth;
    history.push(p);counts.total++;counts.anomalies+=Number(p.attack);
    counts[p.attack?(truth?'tp':'fp'):(truth?'fn':'tn')]++;
    mixed($('classification'),isolate(attackText(p.attack)));
    $('classification').dataset.alarm=String(p.attack);
    exactDisplay($('mse'),p.mse,format.error(p.mse));$('truth').textContent=r.label+' · '+attackText(truth);
    if(wrong) mixed($('mismatch'),isolate(truth?'False Negative':'False Positive'),truth?' — رسالة محقونة صُنّفت طبيعية.':' — رسالة طبيعية صُنّفت كهجوم.');
    else mixed($('mismatch'),'النتيجة تطابق ',isolate('Ground Truth'),'.');
    $('mismatch').classList.toggle('warn',wrong);
    const row=cells($('rows'),[format.index(r.row),labels[r.source],r.label+' · '+attackText(truth),attackText(p.attack),format.error(p.mse),wrong?'غير مطابق':'مطابق']);
    row.children[4].title=String(p.mse);row.dataset.wrong=String(wrong);$('rows').prepend(row);
    if($('rows').children.length>8)$('rows').lastChild.remove();
    paintCounts();draw();if(busy())pause();else controls();
  }catch(error){pause();$('notice').textContent='تعذر حساب الرسالة: '+error.message;}
}
function tick(){
  if(!playing)return;
  step();
  if(playing)timer=setTimeout(tick,650/Number($('speed').value));
}
$('start').onclick=()=>{playing=true;controls();tick();};
$('pause').onclick=pause;$('next').onclick=step;$('reset').onclick=reset;
$('source').onchange=reset;$('mode').onchange=reset;
$('speed').onchange=()=>{if(playing){clearTimeout(timer);timer=setTimeout(tick,650/Number($('speed').value));}};
$('infer').onclick=()=>{
  try{
    const fields=$('manual').value.split(',').map(x=>x.trim());
    if(fields.some(x=>!x))throw new Error();
    const result=predict(fields.map(Number));
    const mse=isolate(format.error(result.mse));mse.title=String(result.mse);
    mixed($('manual-result'),isolate(attackText(result.attack)),' · ',isolate('MSE'),' ',mse);
  }catch{$('manual-result').textContent='أدخل 12 قيمة رقمية منتهية، مفصولة بفواصل.';}
};
window.addEventListener('resize',draw);
async function initialize(){
  const read=async path=>{const r=await fetch('../assets/'+path);if(!r.ok)throw new Error(path+' · HTTP '+r.status);return r.json();};
  try{
    const model=await read('model.json');$('load').value=1;
    const infer=loadInference(model);
    samples=await read('samples.json');$('load').value=2;
    for(const group of ['replay','examples']) for(const source of Object.keys(labels)){
      const list=samples[group]?.[source];
      if(!Array.isArray(list)||list.some(r=>r.source!==source||!['R','T'].includes(r.label)||r.x?.length!==12||!r.x.every(Number.isFinite)))throw new Error('Invalid recording');
    }
    const official=await read('metrics.json');$('load').value=3;
    infer(samples.replay.normal[0].x);
    threshold=model.threshold;predict=infer;
    exactDisplay($('threshold'),threshold,format.threshold(threshold));$('features').textContent=model.features.join(', ');
    for(const id of ['mode','source','speed','infer'])$(id).disabled=false;
    for(const [label,m] of [['الأساسي الزمني',official.baseline.pooled],['E09 المحسّن',official.tuned.pooled]]){
      cells($('official'),[label,...['accuracy','precision','recall','f1','fpr'].map(k=>format.percent(m[k])),format.rocAuc(m.roc_auc)]);
    }
    const total=isolate(format.count(official.tuned.pooled.n));total.title=String(official.tuned.pooled.n);
    mixed($('official-summary'),'تقييم سابق على ',total,' رسالة من ',isolate('Test Dataset'),'. النموذج الأساسي حقق ',isolate('F1-Score'),' أعلى و',isolate('False Positive Rate'),' أقل.');
    mixed($('per-attack'),isolate('Recall'),' لنموذج ',isolate('E09'),' حسب الهجوم: ',...['dos','fuzzy','gear','rpm'].flatMap((k,i)=>[i?' · ':'',isolate(labels[k]+' '+format.percent(official.tuned[k].recall))]));
    $('load').hidden=true;reset();
  }catch(error){
    $('load').hidden=true;$('notice').textContent='فشل تحميل النموذج أو البيانات: '+error.message;
  }
}
initialize();
