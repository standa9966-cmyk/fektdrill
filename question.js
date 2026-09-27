const L=['A','B','C','D','E','F'];

if (typeof RAW !== 'undefined') {
  const QS=RAW.map(q=>({...q,answer_count:q.answer_count||q.answers.length})).filter(q=>q.question&&Array.isArray(q.answers)&&q.answers.length);
  let mode='browse',filt='all',dq=[],di=0,dok=0,dko=0,answered=false;
  function isMobile(){return window.innerWidth<=640;}
  function imgHtml(q){
    if(!q.image_name)return '';
    var src='images/'+q.image_name;
    return '<div class="q-img"><img src="'+src+'" alt="Obrazek k otazce" loading="lazy" onerror="this.style.display=&quot;none&quot;;this.nextSibling.style.display=&quot;block&quot;"><div class="q-img-ph" style="display:none"><div class="ph-icon">&#128444;</div>Obrazek nenalezen<code>'+src+'</code></div></div>';
  }
  function explanationHtml(q){
    if(!q.explanation)return '';
    return '<div class="explanation"><strong>&#128218; Vysvetleni</strong>'+esc(q.explanation)+'</div>';
  }
  setMode('browse');
  document.querySelectorAll('.fbtn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.fbtn').forEach(x=>x.classList.remove('on'));b.classList.add('on');filt=b.dataset.f;renderBrowse();}));
  document.getElementById('sbox').addEventListener('input',renderBrowse);
  document.getElementById('mBrowse').addEventListener('click',()=>setMode('browse'));
  document.getElementById('mDrill').addEventListener('click',()=>setMode('drill'));
  document.getElementById('themeBtn').addEventListener('click',toggleTheme);
  function setMode(m){
    mode=m;
    document.getElementById('mBrowse').className='mbtn'+(m==='browse'?' on':'');
    document.getElementById('mDrill').className='mbtn'+(m==='drill'?' on':'');
    document.getElementById('fbar').style.display=m==='browse'?'flex':'none';
    document.getElementById('browseArea').style.display=m==='browse'?'block':'none';
    document.getElementById('drillArea').style.display=m==='drill'?'block':'none';
    if(m==='browse')renderBrowse();else startDrill();
  }
  function filtered(){
    const s=document.getElementById('sbox').value.toLowerCase();
    return QS.filter(q=>(filt==='all'||String(q.answer_count)===filt)&&(!s||q.question.toLowerCase().includes(s)||q.answers.some(a=>a.toLowerCase().includes(s))));
  }
  function renderBrowse(){
    const list=filtered();setProgress(list.length,QS.length);
    const el=document.getElementById('browseArea');
    if(!list.length){el.innerHTML='<div class="empty"><div class="ei">🔍</div><p>Žádné výsledky.</p></div>';return;}
    el.innerHTML='<div class="donate-inline">  <img src="images/qr_support.png" alt="QR podpora" class="donate-inline-qr">  <div class="donate-inline-text">    <div class="donate-inline-title">☕ Podpora projektu</div>    <div class="donate-inline-sub">Líbí se ti TechQuizz? Naskenuj QR a podpoř provoz — 50 CZK.</div>  </div></div>'+list.map(q=>{
      const gi=QS.indexOf(q)+1;
      const ans=q.answers.map((a,ai)=>'<div class="aitem'+(ai===q.correct?' ok':'')+'"><div class="akey">'+(L[ai]||ai)+'</div><div>'+esc(a)+'</div>'+(ai===q.correct?'<div class="abadge">✓ správně</div>':'')+' </div>').join('');
      return '<div class="qcard"><div class="qhead"><div class="qnum">#'+gi+'</div><div class="qtxt">'+esc(q.question)+'</div></div>'+imgHtml(q)+'<div class="agrid">'+ans+'</div>'+explanationHtml(q)+'</div>';
    }).join('');
  }
  function startDrill(){dq=shuffle([...QS]);di=0;dok=0;dko=0;answered=false;document.getElementById('dcard').style.display='block';document.getElementById('resBox').style.display='none';setProgress(0,dq.length);renderQ();}
  function renderQ(){
    if(di>=dq.length){showRes();return;}
    answered=false;const q=dq[di];
    document.getElementById('dctr').textContent='Otázka '+(di+1)+' / '+dq.length;
    document.getElementById('sok').textContent=dok; document.getElementById('sko').textContent=dko;
    document.getElementById('dq').textContent=q.question; document.getElementById('dimg').innerHTML=imgHtml(q);
    document.getElementById('dexpl').className='drill-explanation';
    document.getElementById('dexpl').innerHTML=q.explanation?'<strong>&#128218; Vysvetleni</strong>'+esc(q.explanation||''):'';
    document.getElementById('fb').className='fb'; document.getElementById('bnext').className='bnext'; setProgress(di,dq.length);
    const opts=document.getElementById('dopts');
    opts.innerHTML=q.answers.map((a,ai)=>'<button class="dopt" data-i="'+ai+'"><div class="okey">'+(L[ai]||ai)+'</div><span>'+esc(a)+'</span></button>').join('');
    opts.querySelectorAll('.dopt').forEach(b=>b.addEventListener('click',()=>pick(parseInt(b.dataset.i))));
    if(isMobile())document.getElementById('dcard').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function pick(chosen){
    if(answered)return; answered=true; const q=dq[di],ok=chosen===q.correct; if(ok)dok++;else dko++;
    document.querySelectorAll('.dopt').forEach(b=>b.disabled=true); const btns=document.querySelectorAll('.dopt');
    btns[chosen].classList.add(ok?'sc':'sw'); if(!ok)btns[q.correct].classList.add('rc');
    document.getElementById('sok').textContent=dok; document.getElementById('sko').textContent=dko;
    document.getElementById('fbtxt').textContent=ok?'✓ Správně!':'✗ Špatně! Správná: '+L[q.correct];
    document.getElementById('fb').className='fb show '+(ok?'ok':'ko'); document.getElementById('bnext').className='bnext show';
    if(q.explanation)document.getElementById('dexpl').className='drill-explanation show';
  }
  function nextQ(){di++;renderQ();}
  function showRes(){
    document.getElementById('dcard').style.display='none'; const total=dq.length,pct=total?Math.round(dok/total*100):0;
    document.getElementById('rok').textContent=dok; document.getElementById('rko').textContent=dko; document.getElementById('rpct').textContent=pct+'%';
    document.getElementById('rei').textContent=pct>=80?'🎉':pct>=50?'💪':'📚'; document.getElementById('ret').textContent=pct>=80?'Skvělé!':pct>=50?'Dobrá práce!':'Procvičuj dál!';
    document.getElementById('resub').textContent=dok+' správně z '+total+' — '+pct+'% úspěšnost'; document.getElementById('resBox').style.display='block';
  }
  function setProgress(cur,tot){document.getElementById('progBar').style.width=tot?(cur/tot*100)+'%':'0%';document.getElementById('progLbl').textContent=cur+' / '+tot;}
  function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
}

if (typeof MVE_TESTS !== 'undefined') {
  for (const id in MVE_TESTS) {
    const desc=document.getElementById(id+'Desc');
    if(desc)desc.textContent=MVE_TESTS[id].questions.length+' otázek';
  }
  window.startTest=function(id){
    const data=MVE_TESTS[id];
    if(!data)return;
    sessionStorage.setItem('ql-data',JSON.stringify({subject:data.subject,questions:data.questions}));
    window.location.href='quiz.html';
  };
}
