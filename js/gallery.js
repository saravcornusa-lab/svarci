/* ══ Gallery: category cards from the catalog ══ */
(function(){
  const grid=document.getElementById('galleryGrid');
  if(!grid||typeof SVARCI_CATALOG==='undefined') return;
  grid.innerHTML=SVARCI_CATALOG.map(c=>`<a href="collection.html?cat=${c.slug}" class="gallery-card fade-up" data-category="${c.slug} ${c.group}"><div class="frame"><img class="fill-img" src="${svarciCover(c)}" alt="${c.name}" onerror="svarciFallback(this)"/></div><div class="gallery-card-info"><div class="gallery-card-name">${c.name}</div><div class="gallery-card-cat">${c.items.length} pieces</div></div></a>`).join('');
  const bar=document.getElementById('filterPills');
  if(bar){
    const total=SVARCI_CATALOG.reduce((s,c)=>s+c.items.length,0);
    const sorted=[...SVARCI_CATALOG].sort((a,b)=>a.name.localeCompare(b.name));
    bar.innerHTML=`<button class="filter-pill active" data-filter="all">All <span class="count-badge">${total}</span></button>`+
      sorted.map(c=>`<button class="filter-pill" data-filter="${c.slug}">${c.name}</button>`).join('');
  }
  const n=document.getElementById('galleryCount');
  if(n) n.textContent=SVARCI_CATALOG.length+' collections';
})();

/* ══ Homepage: first eight categories ══ */
(function(){
  const grid=document.getElementById('selectionGrid');
  if(!grid||typeof SVARCI_CATALOG==='undefined') return;
  grid.innerHTML=SVARCI_CATALOG.slice(0,8).map(c=>`<a href="collection.html?cat=${c.slug}" class="selection-card fade-up"><div class="frame"><img class="fill-img" src="${svarciCover(c)}" alt="${c.name}" loading="lazy" onerror="svarciFallback(this)"/></div><div class="selection-meta"><span class="selection-name">${c.name}</span><span class="selection-count">${c.items.length} pieces</span></div><span class="selection-cta">View collection</span></a>`).join('');
})();
