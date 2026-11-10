/* Missing product image → peg-doll placeholder */
document.addEventListener('error',function(e){
  const t=e.target;
  if(t&&t.tagName==='IMG'&&!t.dataset.fallback&&!/placeholder-doll/.test(t.src)){
    t.dataset.fallback='1';t.classList.add('is-placeholder');t.src='uploads/placeholder-doll.jpg';
  }
},true);
addEventListener('load',function(){
  document.querySelectorAll('img').forEach(function(i){
    if(i.complete&&i.naturalWidth===0&&!i.dataset.fallback&&!/placeholder-doll/.test(i.src)){
      i.dataset.fallback='1';i.classList.add('is-placeholder');i.src='uploads/placeholder-doll.jpg';
    }
  });
});

/* ══ SVARCI HANDICRAFTS — site scripts ══ */

/* Nav: scroll state, hamburger, active link */
(function(){
  const nav=document.querySelector('.site-nav'),
        burger=document.querySelector('.nav-hamburger'),
        menu=document.querySelector('.mobile-menu');
  if(nav) addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>8),{passive:true});
  if(burger&&menu){
    burger.addEventListener('click',()=>{
      const open=burger.classList.toggle('open');
      menu.classList.toggle('open',open);
      document.body.style.overflow=open?'hidden':'';
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      burger.classList.remove('open');menu.classList.remove('open');document.body.style.overflow='';
    }));
  }
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-link').forEach(l=>{
    if((l.getAttribute('href')||'')===page) l.classList.add('active');
  });
})();

/* Scroll-in fades */
(function(){
  const els=document.querySelectorAll('.fade-up');
  if(!els.length) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}
  }),{threshold:.1,rootMargin:'0px 0px -30px 0px'});
  els.forEach(el=>io.observe(el));
  document.querySelectorAll('.stagger').forEach(p=>[...p.children].forEach((c,i)=>c.style.setProperty('--i',i)));
})();

/* Hero carousel */
(function(){
  const root=document.querySelector('.hero-carousel');
  if(!root) return;
  const slides=[...root.querySelectorAll('.hero-slide')],
        dots=[...root.querySelectorAll('.hero-dot')],
        counter=root.querySelector('.hero-count');
  let i=0,timer;
  const total=slides.length;
  function show(n){
    i=(n+total)%total;
    slides.forEach((s,k)=>s.classList.toggle('active',k===i));
    dots.forEach((d,k)=>d.classList.toggle('active',k===i));
    if(counter) counter.textContent=String(i+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
  }
  function play(){clearInterval(timer);timer=setInterval(()=>show(i+1),6500);}
  root.querySelector('.hero-nav.next')?.addEventListener('click',()=>{show(i+1);play();});
  root.querySelector('.hero-nav.prev')?.addEventListener('click',()=>{show(i-1);play();});
  dots.forEach((d,k)=>d.addEventListener('click',()=>{show(k);play();}));
  root.addEventListener('mouseenter',()=>clearInterval(timer));
  root.addEventListener('mouseleave',play);
  /* swipe */
  let x0=null;
  root.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
  root.addEventListener('touchend',e=>{
    if(x0===null) return;
    const dx=e.changedTouches[0].clientX-x0;
    if(Math.abs(dx)>45){show(dx<0?i+1:i-1);play();}
    x0=null;
  },{passive:true});
  show(0);play();
})();

/* Category rail arrows */
(function(){
  const rail=document.querySelector('.selection-rail');
  if(!rail) return;
  const step=()=>Math.max(260,rail.querySelector('.selection-card')?.offsetWidth+24||300);
  document.querySelector('.rail-btn.next')?.addEventListener('click',()=>rail.scrollBy({left:step(),behavior:'smooth'}));
  document.querySelector('.rail-btn.prev')?.addEventListener('click',()=>rail.scrollBy({left:-step(),behavior:'smooth'}));
})();

/* Gallery filters (+ ?cat= deep link) */
(function(){
  const pills=[...document.querySelectorAll('.filter-pill')],
        cards=[...document.querySelectorAll('.gallery-card')];
  if(!pills.length) return;
  const grid=document.getElementById('galleryGrid');
  function apply(f){
    grid&&grid.classList.add('filtered');
    pills.forEach(p=>p.classList.toggle('active',p.dataset.filter===f));
    cards.forEach(c=>{
      const hide=f!=='all'&&!(c.dataset.category||'').split(' ').includes(f);
      c.classList.toggle('gallery-hidden',hide);
      if(!hide) c.classList.add('visible');
    });
  }
  pills.forEach(p=>p.addEventListener('click',()=>apply(p.dataset.filter)));
  const cat=new URLSearchParams(location.search).get('cat');
  if(cat&&pills.some(p=>p.dataset.filter===cat)) apply(cat);
})();

/* Contact form */
(function(){
  const form=document.querySelector('.contact-form');
  if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=form.querySelector('[type="submit"]'),label=btn.textContent;
    btn.textContent='Message sent';btn.disabled=true;
    setTimeout(()=>{btn.textContent=label;btn.disabled=false;form.reset();},4000);
  });
})();
