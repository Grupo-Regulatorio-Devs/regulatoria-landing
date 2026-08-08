/* Close the mobile menu when a section is chosen. */
document.querySelectorAll('.nav-links a').forEach(function(a){
  a.addEventListener('click', function(){ document.querySelector('.nav-links').classList.remove('open'); });
});


/* Safety net: if GSAP fails to load (CDN blocked/offline), reveal all content
   so the page never gets stuck showing only the hero. */
setTimeout(function(){
  if (typeof window.gsap === 'undefined') {
    document.querySelectorAll('.reveal').forEach(function(el){ el.style.opacity='1'; el.style.transform='none'; });
  }
}, 2500);


if (typeof gsap === 'undefined') {
  /* GSAP not available — nothing else to do; the safety net above handles visibility. */
} else {
gsap.registerPlugin(ScrollTrigger);

/* ── Dashboard demo: switch panel when an agent is chosen ── */
(function(){
  var navItems = document.querySelectorAll('.dash-nav-item[data-panel]');
  var panels = document.querySelectorAll('.dash-panel');
  navItems.forEach(function(item){
    item.addEventListener('click', function(){
      var target = item.getAttribute('data-panel');
      navItems.forEach(function(n){ n.classList.toggle('active', n === item); });
      panels.forEach(function(p){ p.classList.toggle('active', p.getAttribute('data-panel') === target); });
    });
  });
})();

/* ── Videos: load the player only on click (lighter load + privacy) ── */
document.querySelectorAll('.video-thumb').forEach(function(thumb){
  thumb.addEventListener('click', function(){
    if (thumb.querySelector('iframe')) return;
    var id = thumb.getAttribute('data-video');
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    f.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('title', thumb.getAttribute('data-title') || 'Video Regulator.IA');
    thumb.innerHTML = '';
    thumb.appendChild(f);
  });
});

/* ── Hero mockup: auto-cycle the agents until the first interaction ── */
(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var seq = ['predict','genesis','scout','binder','guard','compass'];
  var idx = 0, timer = null, stopped = false;
  function step(){
    if (stopped) return;
    var it = document.querySelector('.dash-nav-item[data-panel="' + seq[idx % seq.length] + '"]');
    if (it) it.click();
    idx++;
  }
  function start(){ if (timer || stopped) return; timer = setInterval(step, 2600); }
  function stop(){
    stopped = true;
    if (timer) { clearInterval(timer); timer = null; }
    var h = document.querySelector('.mockup-hint'); if (h) h.classList.add('done');
  }
  document.querySelectorAll('.dash-nav-item[data-panel]').forEach(function(n){
    n.addEventListener('pointerdown', stop);
  });
  var mk = document.querySelector('.browser-mockup');
  if (mk && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) start(); });
    }, { threshold: 0.4 });
    io.observe(mk);
  } else { start(); }
})();


/* ── FAQ: open one item at a time ── */
(function(){
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function(d){
    d.addEventListener('toggle', function(){
      if (!d.open) return;
      items.forEach(function(o){ if (o !== d) o.open = false; });
    });
  });
})();


/* ── Hero agent orbit ──
   Hovering an agent pauses the spin, dims the others and opens the panel with
   its card. All the state lives in custom properties, so the browser only
   repaints. Card data comes from window.__ORBIT_CARDS (kept inline in the HTML
   so the i18n build can translate it). */
(function(){
  var hero = document.querySelector('.hero');
  var orbit = hero && hero.querySelector('[data-orbit]');
  var panel = hero && hero.querySelector('[data-hp="panel"]');
  if (!hero || !orbit || !panel) return;

  var cards = window.__ORBIT_CARDS;
  var fields = {};
  ['phase','name','role','desc','metric'].forEach(function(k){
    fields[k] = panel.querySelector('[data-hp="' + k + '"]');
  });
  var dots = {
    pre: panel.querySelector('[data-hp="dot-pre"]'),
    reg: panel.querySelector('[data-hp="dot-reg"]'),
    post: panel.querySelector('[data-hp="dot-post"]')
  };
  var nodes = [].slice.call(hero.querySelectorAll('[data-agent]'));

  function openCard(node){
    var data = cards[node.dataset.agent];
    if (!data) return;
    fields.phase.textContent  = data.fase;
    fields.name.textContent   = node.dataset.agent;
    fields.role.textContent   = data.rol;
    fields.desc.textContent   = data.desc;
    fields.metric.textContent = data.dato;
    for (var k in dots) if (dots[k]) dots[k].hidden = (k !== data.f);
    panel.hidden = false;
    /* Freeze the spin and dim the others. */
    hero.style.setProperty('--gr-play', 'paused');
    orbit.style.setProperty('--gr-dim', '.32');
    node.style.setProperty('--gr-dim', '1');
    node.style.setProperty('--nh', '1.18');
    node.style.setProperty('--nr', '1');
    node.style.zIndex = '6';
  }
  function closeCard(node){
    panel.hidden = true;
    hero.style.setProperty('--gr-play', 'running');
    orbit.style.removeProperty('--gr-dim');
    node.style.removeProperty('--gr-dim');
    node.style.removeProperty('--nh');
    node.style.removeProperty('--nr');
    node.style.zIndex = '';
  }

  nodes.forEach(function(n){
    n.addEventListener('pointerenter', function(){ openCard(n); });
    n.addEventListener('pointerleave', function(){ closeCard(n); });
    /* Keyboard accessible: same behavior on focus. */
    n.setAttribute('tabindex', '0');
    n.addEventListener('focus', function(){ openCard(n); });
    n.addEventListener('blur',  function(){ closeCard(n); });
  });
})();

/* ── Particles ── */
var canvas=document.getElementById('particles'),ctx=canvas.getContext('2d'),W,H,particles=[],mouse={x:0,y:0};
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
window.addEventListener('resize',resize);resize();
document.addEventListener('mousemove',function(e){mouse.x=e.clientX;mouse.y=e.clientY});
for(var pi=0;pi<40;pi++)particles.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*2+.5,o:Math.random()*.15+.05});
function drawParticles(){ctx.clearRect(0,0,W,H);particles.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;var dx=mouse.x-p.x,dy=mouse.y-p.y,dist=Math.sqrt(dx*dx+dy*dy);var glow=dist<200?(.1*(1-dist/200)):0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(90,173,45,'+(p.o+glow)+')';ctx.fill();if(dist<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle='rgba(90,173,45,'+(0.03*(1-dist/120))+')';ctx.stroke()}});requestAnimationFrame(drawParticles)}
drawParticles();

/* ── Demo form ── */
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  var btn=document.getElementById('submitBtn');
  var n=document.getElementById('fname').value.trim();
  var em=document.getElementById('email').value.trim();
  var co=document.getElementById('company').value.trim();
  var ro=document.getElementById('role').value.trim();
  var hp=(document.getElementById('website')||{}).value||'';
  if(!n||!em||!co||!ro)return;
  btn.textContent='Enviando...';btn.disabled=true;
  var data=new FormData();
  data.append('nombre',n);data.append('cargo',ro);data.append('empresa',co);data.append('email',em);data.append('website',hp);
  fetch('contacto.php',{method:'POST',body:data})
    .then(function(r){return r.json().catch(function(){return {ok:r.ok};});})
    .then(function(res){
      if(res&&res.ok){
        document.getElementById('formOk').style.display='block';
        document.getElementById('contactForm').reset();
        btn.textContent='✓ Enviado';
        btn.style.background='linear-gradient(135deg,#065F46,#059669)';
      }else{
        btn.textContent='Reintentar';btn.disabled=false;
        alert('No pudimos enviar tu solicitud. Escríbenos directamente a info@gruporegulatorio.cl');
      }
    })
    .catch(function(){
      btn.textContent='Reintentar';btn.disabled=false;
      alert('Error de conexión. Escríbenos directamente a info@gruporegulatorio.cl');
    });
});

/* ══════════════════════════════════════════
   GSAP ANIMATIONS
   ══════════════════════════════════════════ */
var mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", function() {

  /* Fix: .reveal CSS sets opacity:0; reset to visible FIRST so the gsap.from()
     calls below capture opacity:1 as their destination (otherwise they animate 0→0
     and the content never appears). */
  gsap.set(".reveal", { autoAlpha: 1, y: 0 });

  /* 1. Staggered hero entrance.
     Uses fromTo and not from on purpose: this block lives inside a
     gsap.matchMedia context, which can be rebuilt (e.g. on window resize). With
     `from`, GSAP takes the CURRENT position as the destination; if a rebuild
     caught the button mid-flight it stayed stuck at translate(-30px) and stuck
     out past the left margin. With fromTo the destination is explicit and
     clearProps releases the transform. */
  var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .fromTo(".hero-badge", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, clearProps: "transform" })
    .fromTo(".hero h1", { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, clearProps: "transform" }, "-=0.4")
    .fromTo(".hero .lead", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, clearProps: "transform" }, "-=0.5")
    .fromTo(".hero-btns .btn-glow", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, clearProps: "transform" }, "-=0.4")
    .fromTo(".hero-btns .btn-ghost", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.6, clearProps: "transform" }, "-=0.5")
    .fromTo(".hero-trust", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, clearProps: "transform" }, "-=0.3")
    .fromTo(".hero-orbit", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: "power2.out" }, "-=0.9");
  /* No `scale` on purpose: .hero-orbit's transform is driven by --orb-k per
     breakpoint, and GSAP froze it at an inline value. */

  /* 2. Nav slide down */
  gsap.from(".nav", { y: -80, autoAlpha: 0, duration: 0.8, ease: "power2.out", delay: 0.2 });

  /* 3. Stats counter */
  document.querySelectorAll('.stat-num').forEach(function(el) {
    var text = el.textContent.trim();
    var suffix = text.replace(/[\d.]+/, '');
    var num = parseFloat(text);
    if (isNaN(num)) return;
    var obj = { val: 0 };
    gsap.to(obj, {
      val: num, duration: 2, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
      onUpdate: function() { el.textContent = (num % 1 !== 0 ? obj.val.toFixed(0) : Math.round(obj.val)) + suffix; }
    });
  });
  gsap.from(".stats .reveal", {
    y: 40, autoAlpha: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
    scrollTrigger: { trigger: ".stats", start: "top 80%" }
  });

  /* 4. Diagram */
gsap.from(".phase-card", { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: ".phases-grid", start: "top 80%" } });

  /* 5a. Comparison (fade the container only; rows/badges stay visible) */
  gsap.from(".compare-section .section-header", { y: 50, autoAlpha: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: ".compare-section", start: "top 75%" } });
  gsap.from(".compare-table", { y: 40, autoAlpha: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".compare-table", start: "top 85%" } });
  gsap.from(".cm-card", { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".compare-mobile", start: "top 90%" } });

  /* 5b. Platform preview */
  gsap.from(".platform-section .section-header", { y: 50, autoAlpha: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: ".platform-section", start: "top 75%" } });
  gsap.from(".browser-mockup", { y: 60, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".browser-mockup", start: "top 80%" } });
  gsap.from(".platform-features .pf-item", { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".platform-features", start: "top 85%" } });

  /* 6. HITL steps */
  gsap.from(".hitl-section .section-header", { y: 50, autoAlpha: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: ".hitl-section", start: "top 75%" } });
  gsap.from(".hitl-step", { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: ".hitl-steps", start: "top 80%" } });
  gsap.from(".hitl-guarantee", { y: 40, autoAlpha: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: ".hitl-guarantee", start: "top 85%" } });

  /* 7. Security cards */
  gsap.from(".security-section .section-header", { y: 50, autoAlpha: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: ".security-section", start: "top 75%" } });
  gsap.from(".security-card", { y: 50, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".security-grid", start: "top 80%" } });
  gsap.from(".security-compliance", { y: 30, autoAlpha: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".security-compliance", start: "top 85%" } });

  /* 7b. Coverage */
  gsap.from(".cobertura-section .section-tag, .cobertura-section .section-title, .cobertura-section .section-sub", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".cobertura-section", start: "top 75%" } });
  gsap.from(".cobertura-stats .cob-stat", { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".cobertura-stats", start: "top 85%" } });
  gsap.from(".country-row", { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".countries-grid", start: "top 85%" } });

  /* 8. CTA */
  gsap.set(".video-card", { autoAlpha: 1, y: 0 });
  gsap.from(".video-card", { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: ".video-section", start: "top 80%" } });
  gsap.set(".mstep", { autoAlpha: 1, y: 0 });
  gsap.from(".mstep", { y: 46, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: ".managed-steps", start: "top 82%" } });
  gsap.from(".cta-box", { scale: 0.9, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".cta-section", start: "top 75%" } });
  gsap.from(".contact-form", { y: 30, autoAlpha: 0, duration: 0.8, ease: "power2.out", delay: 0.3, scrollTrigger: { trigger: ".cta-box", start: "top 70%" } });

  /* 10. Footer */
  gsap.from(".footer-inner", { y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".footer", start: "top 90%" } });

  /* Any .reveal without a specific handler above stays visible from the
     gsap.set() at the top of this block — no universal handler needed (it caused
     double-animation conflicts that left some headers stuck at opacity:0). */

  /* 12. Phase card tag hover stagger */
  document.querySelectorAll('.phase-card').forEach(function(card) {
    var tags = card.querySelectorAll('.pc-tag');
    card.addEventListener('mouseenter', function() {
      gsap.fromTo(tags, { scale: 0.95 }, { scale: 1, duration: 0.3, stagger: 0.04, ease: "back.out(2)" });
    });
  });

});

/* Reduced motion fallback */
mm.add("(prefers-reduced-motion: reduce)", function() {
  gsap.set(".reveal, .faq-item, .hero-badge, .hero h1, .hero .lead, .hero-btns, .hero-trust, .hero-orbit, .nav, .stat-num, .phase-card, .hitl-step, .hitl-guarantee, .security-card, .security-compliance, .cta-box, .contact-form, .footer-inner, .browser-mockup, .pf-item, .country-row, .cob-stat", {
    autoAlpha: 1, y: 0, x: 0, scale: 1
  });
});

} /* end GSAP-available guard */
