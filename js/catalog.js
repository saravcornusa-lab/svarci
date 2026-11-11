function svarciFallback(img){
  if(!img||/placeholder-doll/.test(img.getAttribute('src')||'')) return;
  if(img.dataset.swapping) return; /* same error event reaching a second handler */
  if(img.dataset.full&&img.getAttribute('src')!==img.dataset.full){
    img.dataset.swapping='1';setTimeout(()=>delete img.dataset.swapping,0);img.src=img.dataset.full;return;}
  img.dataset.fallback='1';img.classList.add('is-placeholder');img.src='uploads/placeholder-doll.jpg';
}
document.addEventListener('error',function(e){
  if(e.target&&e.target.tagName==='IMG'&&!e.target.dataset.fallback) svarciFallback(e.target);
},true);

/* ══ Svarci category catalog — single source of truth ══
   Images resolve to uploads/<folder>/cover.jpg and 01.jpg…08.jpg.
   Missing files fall back to uploads/placeholder-doll.jpg (see js/main.js). */
const SVARCI_PLACEHOLDER='uploads/placeholder-doll.jpg';
const SVARCI_CATALOG=[
  {slug:'miniatures',name:'Miniatures',folder:'Miniatures',group:'craft',
   blurb:"Whole rooms and scenes built at a fraction of scale — furniture, food and fittings, assembled by hand and sealed for display.",
   thumbs:'thumbs',
   sets:[
    {title:"South Indian meals",items:[
     ["Tiffin feast in the palm","img3.jpeg"],["Banana leaf feast","img98.jpeg"],
     ["Banana leaf feast, to scale","img99.jpeg"],["Banana leaf meal","img8.jpeg"],
     ["South Indian breakfast spread","img111.jpeg"],["Masala dosa with chutneys","img18.jpeg"],
     ["Dosa on a leaf plate","img40.jpeg"],["Dosa plate","img104.jpeg"],["Dosa plates","img107.jpeg"],
     ["Dosa plate, to scale","img65.jpeg"],["Mini dosa","Dosa.jpg"],["Idli with chutneys","img13.jpeg"],
     ["Idli, vada and chutneys","img24.jpeg"],["Idiyappam with curry","img33.jpeg"],
     ["Idiyappam plates","img108.jpeg"],["Appam with stew","img109.jpeg"],["Puttu plates","img110.jpeg"],
     ["Poori with curry","img101.jpeg"],["Pani puri plate","panipuri1.jpg"],
     ["Pongal panai set","PongalPanai.jpg"],["Pongal panai, to scale","PongalPanai1.jpg"],
     ["Pongal with sugarcane","pongalKarumbu.jpg"],["Mango pickle making set","MangoPickleMakingSet.jpg"]]},
    {title:"Vegetables & fruit",items:[
     ["Vegetable crates with grocery bags","img28.jpeg"],["Vegetable basket","img5.jpeg"],
     ["Vegetable basket, hand-held","img96.jpeg"],["Mixed vegetable basket","img82.jpeg"],
     ["Basket of carrots","Carrots.jpg"],["Carrots","img17.jpeg"],["Carrots, a handful","img84.jpeg"],
     ["Tomato basket","img74.jpeg"],["Onion and tomato basket","img76.jpeg"],["Onions","img75.jpeg"],
     ["Shallots","img26.jpeg"],["Beetroots","img77.jpeg"],["Beetroot basket","img78.jpeg"],
     ["Brinjals","img23.jpeg"],["Small brinjals","img80.jpeg"],["Brinjals, a handful","img81.jpeg"],
     ["Green beans","img79.jpeg"],["Spring onions","img93.jpeg"],["Cauliflower","img19.jpeg"],
     ["Cauliflowers","img91.jpeg"],["Cabbages","img90.jpeg"],["Capsicums","img87.jpeg"],
     ["Bottle gourds","img92.jpeg"],["Cut pumpkins","img89.jpeg"],["Raw bananas","img86.jpeg"],
     ["Oranges","img88.jpeg"],["Potatoes","img42.jpeg"],["Tender coconuts","img37.jpeg"]]},
    {title:"Cakes & bakes",items:[
     ["Cake display","IMG_0112.jpeg"],["Three-tier wedding cake","img95.jpeg"],
     ["Rose wedding cake","img97.jpeg"],["Black forest cake","img66.jpeg"],
     ["Black forest cake slice","img34.jpeg"],["Rainbow cake","img71.jpeg"],
     ["Chocolate drip cake","img72.jpeg"],["Raspberry cake","img69.jpeg"],["Rose cake","img68.jpeg"],
     ["Lemon cake","img67.jpeg"],["Chocolate swiss roll","img73.jpeg"],["Blueberry pancakes","img115.jpeg"],
     ["Donut tray","img15.jpeg"],["Donut box","img11.jpeg"],["Donut box of six","img113.jpeg"],
     ["Croissant box","img112.jpeg"],["Brownie box","img114.jpeg"],["Biscuit tray","img16.jpeg"],
     ["Frog ice-cream cones","img43.jpeg"],["Teddy on a cupcake","teddyOnCupCake.jpg"],
     ["Cream swirls, before painting","img21.jpeg"]]},
    {title:"Snacks & tea-time trays",items:[
     ["Breakfast tray with coffee","img4.jpeg"],["Bread, eggs and coffee tray","img32.jpeg"],
     ["Toast and coffee tray","img35.jpeg"],["Tea-time tray with teddy mug","img27.jpeg"],
     ["Bundt cake tray with lemons","img100.jpeg"],["Clay tea cups on a tray","img45.jpeg"],
     ["Parle-G biscuit tray","img1.jpeg"],["Parle-G box","img7.jpeg"],["Parle-G biscuits","parleG.jpg"],
     ["Parle-G biscuit set","ParleG1.jpg"],["Maggi noodles plate","img44.jpeg"],
     ["Maggi noodle packs","maggi1.jpg"],["Maggi pack, to scale","maggi.jpg"],
     ["Lay's chip packets","Lays.jpg"],["Mini tumblers","img38.jpeg"],["Tumblers, to scale","img25.jpeg"]]},
    {title:"Festive trays & Halloween",items:[
     ["Seer tray with silk saree","img9.jpeg"],["Seer tray, top view","img10.jpeg"],
     ["Seer tray with coconut","img106.jpeg"],["Diwali sweets with diya","img22.JPG"],
     ["Sweets on a gold tray","img6.jpeg"],["Laddu box","img30.JPG"],["Kaju katli tray","img31.jpeg"],
     ["Murukku board","img14.jpeg"],["Bangle boxes","img47.jpeg"],["Diyas on a gold tray","Diya.jpeg"],
     ["Halloween pumpkins","img16.JPG"],["Halloween donuts","img41.jpeg"],
     ["Halloween donuts, a handful","IMG_1639.jpeg"],["Witch-hat cupcake","IMG_1633.jpeg"],
     ["Pumpkin swirl cupcake","IMG_1635.jpeg"],["Pumpkin cupcake","img48.jpeg"]]},
    {title:"Little things",items:[
     ["Alarm clocks in colours","img22.jpeg"],["Alarm clock","img12.jpeg"],
     ["Alarm clock, to scale","img2.jpeg"],["Pickle jar shelf","img29.jpeg"],["Mini books","book1.jpg"],
     ["Ganesha on a charpai","gana.jpg"],["Mini handbag","Handabag.jpg"],
     ["Handbag at doll scale","Handbag1.jpg"],["Rose box","RoseSquareVase.jpg"],
     ["Rose box with doll","RoseSquareVase1.jpg"],["Heart planter","heartPlanter.jpg"],
     ["Teddy in a bottle","TeddyInMiniBottle.jpg"],["Teddy on a love car","teddyOnCar.jpg"]]},
    {title:"Custom keepsakes & figurines",items:[
     ["Nurse's bookshelf diorama","img60.jpg"],["Housewarming welcome board","img56.jpg"],
     ["Housewarming welcome frame","img55.jpg"],["Housewarming shadow box","img51.jpg"],
     ["Family of five shadow box","img59.jpg"],["Family shadow box with flower curtain","img54.jpg"],
     ["Baby's first year shadow box","img52.jpg"],["Wedding couple shadow box","img50.jpg"],
     ["“New beginning” wedding plate","img49.jpg"],["Kerala wedding couple","img57.jpg"],
     ["Quilled bride and groom","img58.jpg"],["“Just married” couple","img64.jpg"],
     ["Wedding cake topper couple","img63.jpg"],["Couple figurines","img61.jpg"],
     ["Grandparents figurines","img62.jpg"],["Rajasthani peg doll couple","couple-rajasthani-2.jpg"]]}
   ]},
  {slug:'quilling',name:'Quilling',folder:'Quilling',group:'craft',
   blurb:"Narrow strips of paper rolled, pinched and set into flowers, portraits and mandalas, worked directly onto the mount.",
   items:["Flower bouquet","Portrait frame","Mandala art","Peacock wall frame","Monogram letter","Wedding invitation frame","Floral card set","Wall clock"]},
  {slug:'peg-dolls',name:'Peg Dolls',folder:'PegDolls',group:'craft',
   blurb:"Turned wooden pegs painted as people — portrait sets of families, wedding parties and classroom groups.",
   items:["Rajasthani couple","Family set","Custom portrait set","Wedding party","Nursery rhyme set","Festival figures","Teacher gift set","Baby shower set"]},
  {slug:'crochet',name:'Crochet',folder:'Crochet',group:'craft',
   blurb:"Cotton and wool worked stitch by stitch into toys, bags and soft home pieces, finished with a hidden seam.",
   items:["Amigurumi bear","Market bag","Baby booties","Flower bunch","Rattle toy","Coaster set","Keychain charms","Newborn wrap"]},
  {slug:'jewellery',name:'Jewellery',folder:'Jewellery',group:'craft',
   blurb:"Clay and paper jewellery shaped and cured in small batches — light enough for all day, with hypoallergenic fittings.",
   items:["Floral earrings","Charm necklace","Ring set","Statement earrings","Terrazzo studs","Marbled hoops","Pendant on cord","Bridal set"]},
  {slug:'jewellery-boxes',name:'Jewellery Boxes',folder:'JewelleryBoxes',group:'craft',
   blurb:"Lined boxes and organisers built to hold a set, with painted lids and fitted compartments.",
   items:["Painted lid box","Two-tier box","Bangle box","Travel roll","Ring tray box","Mirror-lid box","Gift-set box","Compartment organiser"]},
  {slug:'kolam-manai',name:'Kolam Manai',folder:'KolamManai',group:'craft',
   blurb:"Traditional kolam motifs worked onto boards and manai seats for festivals and ceremonies.",
   items:["Festival manai","Bridal manai","Kolam board","Seemantham manai","Padi kolam panel","Pooja manai","Naming ceremony set","Custom motif manai"]},
  {slug:'coasters',name:'Coasters',folder:'Coasters',group:'craft',
   blurb:"Sets of coasters in clay, resin and crochet, made to match a table rather than a catalogue.",
   items:["Terrazzo set","Marbled set","Kolam motif set","Crochet set","Monogram set","Floral set","Geometric set","Wedding favour set"]},
  {slug:'trays',name:'Trays',folder:'Trays',group:'craft',
   blurb:"Serving and pooja trays finished by hand — painted, lined and sealed for regular use.",
   items:["Pooja tray","Serving tray","Nut tray set","Painted round tray","Nesting tray pair","Wedding tray","Return-gift tray","Custom motif tray"]},
  {slug:'customised-pouches',name:'Customised Pouches',folder:'CustomisedPouches',group:'craft',
   blurb:"Fabric pouches cut, stitched and personalised with names, dates or motifs.",
   items:["Name pouch","Travel pouch set","Jewellery pouch","Makeup pouch","Wedding favour pouch","Kids pouch","Zip pouch set","Motif pouch"]},
  {slug:'fridge-magnets',name:'Fridge Magnets',folder:'FridgeMagnets',group:'craft',
   blurb:"Small handmade magnets in clay, paper and crochet — sold singly or as themed sets.",
   items:["Miniature food set","Kolam magnets","Name magnets","Floral set","Festival set","Alphabet set","Photo magnets","Peg-doll magnets"]},
  {slug:'key-chains',name:'Key Chains',folder:'KeyChains',group:'craft',
   blurb:"Keychains made to last a pocket — clay, resin and crochet on solid fittings.",
   items:["Name keychain","Peg-doll keychain","Crochet charm","Resin keychain","Photo keychain","Couple set","Bulk favour set","Motif keychain"]},
  {slug:'decor',name:'Decor',folder:'decor',group:'craft',
   blurb:"Pieces made for a wall, a table or a shelf, scaled to the room they are going into.",
   items:["Wall art","Candle holder","Table centrepiece","Hanging mobile","Shelf display set","Wreath","Seasonal garland","Framed motif"]},
  {slug:'wedding-gifts',name:'Wedding Gifts',folder:'WeddingGifts',group:'occasion',
   blurb:"Keepsakes and favours for weddings — bride and groom sets, trays and matching bulk orders.",
   items:["Bride & groom set","Wedding tray","Favour set","Couple portrait","Manai set","Welcome sign","Ring holder","Thank-you set"]},
  {slug:'return-gifts',name:'Return Gifts',folder:'ReturnGifts',group:'occasion',
   blurb:"Small handcrafted keepsakes in matching sets for weddings, birthdays and baby showers. Bulk quantities to order.",
   items:["Wedding favour set","Birthday return gift","Baby shower favour","Mini potted keepsake","Favour box set","Guest name tags","Coaster favour","Keychain favour"]},
  {slug:'personalised-gifts',name:'Personalised Gifts',folder:'PersonalisedGifts',group:'occasion',
   blurb:"Names, dates and photographs worked into the piece itself rather than printed on top.",
   items:["Name plaque","Photo frame","Personalised keychain","Anniversary shadow box","Newborn name frame","Desk sign","Memory jar","Engraved set"]},
  {slug:'diwali',name:'Diwali',folder:'Diwali',group:'occasion',
   blurb:"Festival pieces — diyas, kolam panels, hampers and decorations made ahead of the season.",
   items:["Painted diya set","Kolam panel","Hamper set","Torans","Rangoli plate","Gift box set","Candle set","Festival magnets"]},
  {slug:'friend-gifts',name:'Friend Gifts',folder:'FriendGift',group:'occasion',
   blurb:"Gifts for the people you choose — small, personal and made to a name.",
   items:["Friendship keychain set","Name pouch","Photo frame","Coaster pair","Memory jar","Charm necklace","Mini bouquet","Gift hamper"]}
];
/* A category may group its pieces into sets:[{title,items}] instead of a flat items list. */
SVARCI_CATALOG.forEach(c=>{if(c.sets&&!c.items) c.items=c.sets.flatMap(s=>s.items);});
const svarciCover=c=>`uploads/${c.folder}/cover.jpg`;
/* Small preview for grids: uploads/<folder>/<thumbs>/<file>.jpg (e.g. thumbs/img3.jpeg.jpg) when the category has thumbs; falls back to the full image. */
const svarciItemThumb=(c,i)=>{const it=c.items[i];return c.thumbs&&Array.isArray(it)?`uploads/${c.folder}/${c.thumbs}/${it[1]}.jpg`:svarciItemImg(c,i);};
/* An item is either "Name" (image = 01.jpg, 02.jpg… by position) or ["Name","file.jpg"] (image = that file in the folder). */
const svarciItemName=it=>Array.isArray(it)?it[0]:it;
const svarciItemImg=(c,i)=>{const it=c.items[i];return Array.isArray(it)?`uploads/${c.folder}/${it[1]}`:`uploads/${c.folder}/${String(i+1).padStart(2,'0')}.jpg`;};
