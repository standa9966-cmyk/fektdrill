/* Společný skript – načítá se v <head> stránek předmětů i stránek O nás / Cookies / Soukromí.
   Stránka předmětu jen definuje dole `const TESTS = { t1: {subject, questions}, ... }`,
   karty volají onclick="startTest('t1')" a popisek karty má id="t1Desc". */

// Reklamy (nenačítají se při otevření ze souboru)
if (window.location.protocol !== 'file:') {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1943080999913414';
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}

// Motiv – nastaví se hned, aby stránka neproblikla
(function(){
  var t = localStorage.getItem('ql-theme') || 'light';
  document.documentElement.setAttribute('data-theme', t);
})();

function updateThemeBtn(){
  var b = document.getElementById('themeBtn');
  if (b) b.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
}

function toggleTheme(){
  var c = document.documentElement.getAttribute('data-theme') || 'light';
  var n = c === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', n);
  localStorage.setItem('ql-theme', n);
  updateThemeBtn();
}

// Data testů ze stránky (podporuje i starý název MVE_TESTS)
function getTests(){
  if (typeof TESTS !== 'undefined') return TESTS;
  if (typeof MVE_TESTS !== 'undefined') return MVE_TESTS;
  return {};
}

function startTest(id){
  var data = getTests()[id];
  if (!data) return;
  sessionStorage.setItem('ql-data', JSON.stringify({subject: data.subject, questions: data.questions}));
  window.location.href = 'quiz.html';
}

document.addEventListener('DOMContentLoaded', function(){
  updateThemeBtn();

  // Doplní počet otázek na začátek popisku karty (id="t1Desc" → "52 otázek — ...")
  var tests = getTests();
  Object.keys(tests).forEach(function(id){
    var el = document.getElementById(id + 'Desc');
    if (el && tests[id].questions) el.textContent = tests[id].questions.length + ' ' + el.textContent.trim();
  });

  if (window.location.protocol === 'file:') {
    document.querySelectorAll('.ad-col').forEach(function(el){ el.style.display = 'none'; });
  }
});

document.addEventListener('contextmenu', function(e){ e.preventDefault(); });
document.addEventListener('keydown', function(e){
  if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) { e.preventDefault(); return false; }
  if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) { e.preventDefault(); return false; }
  if (e.key === 'F12') { e.preventDefault(); return false; }
});