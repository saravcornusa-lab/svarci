/* ══ Collection detail page — renders from SVARCI_CATALOG ══ */
(function(){
  const root=document.getElementById('collectionRoot');
  if(!root||typeof SVARCI_CATALOG==='undefined') return;
  const slug=new URLSearchParams(location.search).get('cat')||SVARCI_CATALOG[0].slug;
  const idx=Math.max(0,SVARCI_CATALOG.findIndex(c=>c.slug===slug));
  const c=SVARCI_CATALOG[idx];
  const prev=SVARCI_CATALOG[(idx-1+SVARCI_CATALOG.length)%SVARCI_CATALOG.length];
  const next=SVARCI_CATALOG[(idx+1)%SVARCI_CATALOG.length];
  document.title=c.name+' — Svarci Handicrafts';

  const fig=(label,src,ratio)=>`<figure class="coll-figure" data-label="${label}" data-src="${src}"><button class="coll-open" aria-label="Enlarge ${label}"><div class="frame" style="aspect-ratio:${ratio}"><img class="fill-img" src="${src}" alt="${label}" loading="lazy" onerror="svarciFallback(this)"/></div></button><figcaption>${label}<span>${c.name}</span></figcaption></figure>`;

  const pattern=[1,2,2,1,2];
  let i=0,rows='';
  for(let p=0;i<c.items.length;p++){
    const n=pattern[p%pattern.length];
    const group=c.items.slice(i,i+n).map((t,k)=>fig(svarciItemName(t),svarciItemImg(c,i+k),n===1?'16/10':'4/5'));
    i+=n;
    rows+=`<div class="coll-row ${n===1?'one':'two'} fade-up">${group.join('')}</div>`;
  }

  root.innerHTML=`
<div class="page-hero coll-hero" style="background-color:#FBF9F6">
<a href="gallery.html" class="text-overline coll-back">← All collections</a>
<h1 class="display-lg">${c.name}</h1>
<p>${c.blurb}</p>
<p class="text-overline coll-count">${c.items.length} pieces</p>
</div>
<section class="section-sm woven-bg coll-texture"><div class="container"><div class="coll-stack">${rows}</div>
<div class="coll-cta fade-up">
<h2 class="display-md">Something like this, made for you</h2>
<p class="text-body">Every piece in this collection can be adapted — colours, size, names and dates. Tell me what the occasion is.</p>
<a href="contact.html" class="btn btn-primary">Get in Touch</a>
</div></div></section>
<nav class="coll-pager">
<a href="collection.html?cat=${prev.slug}"><span class="text-overline">Previous</span><span class="coll-pager-name">${prev.name}</span></a>
<a href="collection.html?cat=${next.slug}" class="next"><span class="text-overline">Next</span><span class="coll-pager-name">${next.name}</span></a>
</nav>`;

  /* lightbox */
  const box=document.createElement('div');
  box.className='lightbox';
  box.innerHTML='<button class="lb-close" aria-label="Close">✕</button><button class="lb-nav prev" aria-label="Previous">‹</button><figure class="lb-figure"><img class="fill-img" alt="" onerror="svarciFallback(this)"/><figcaption></figcaption></figure><button class="lb-nav next" aria-label="Next">›</button>';
  document.body.appendChild(box);
  const shots=[...root.querySelectorAll('.coll-figure')].map(f=>({label:f.dataset.label,src:f.dataset.src}));
  let li=0;
  const img=box.querySelector('.fill-img');
  const paint=()=>{img.classList.remove('is-placeholder');delete img.dataset.fallback;img.src=shots[li].src;img.alt=shots[li].label;box.querySelector('figcaption').textContent=shots[li].label+' · '+c.name;};
  const open=n=>{li=(n+shots.length)%shots.length;paint();box.classList.add('open');document.body.style.overflow='hidden';};
  const close=()=>{box.classList.remove('open');document.body.style.overflow='';};
  root.querySelectorAll('.coll-open').forEach((b,n)=>b.addEventListener('click',()=>open(n)));
  box.querySelector('.lb-close').addEventListener('click',close);
  box.querySelector('.lb-nav.next').addEventListener('click',()=>open(li+1));
  box.querySelector('.lb-nav.prev').addEventListener('click',()=>open(li-1));
  box.addEventListener('click',e=>{if(e.target===box) close();});
  addEventListener('keydown',e=>{
    if(!box.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowRight') open(li+1);
    if(e.key==='ArrowLeft') open(li-1);
  });

  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.06});
  root.querySelectorAll('.fade-up').forEach(el=>io.observe(el));
})();
