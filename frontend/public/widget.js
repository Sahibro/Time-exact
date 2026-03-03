// Minimal embeddable widget (dev)
(function(){
  const api = (window.TIMEEXACTAPI || 'http://localhost:3000/api/now');
  async function fetchNow(){ try { const r = await fetch(api); return await r.json(); } catch(e){ return null; } }
  function render(el, data){
    if(!data){ el.innerHTML = '<div style="font-family:system-ui,Arial;color:#c00">time unavailable</div>'; return; }
    const t = new Date(data.timestamp);
    el.innerHTML = `<div style="font-family:system-ui,Arial;display:inline-block;padding:8px;border-radius:6px;border:1px solid #eee">
      <div style="font-size:20px;font-weight:600">${t.toLocaleTimeString()}</div>
      <div style="font-size:12px;color:#666">Accuracy ${data.accuracyms}ms • <a href="https://your-domain.example" target="blank" rel="noopener">time-exact</a></div>
    </div>`;
  }
  async function init(){
    document.querySelectorAll('.time-exact').forEach(async el=>{
      const d = await fetchNow();
      render(el, d);
      setInterval(async ()=>{
        const d2 = await fetchNow();
        render(el, d2);
      }, 1000);
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
