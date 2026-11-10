function svarciFallback(img){
  if(!img||/placeholder-doll/.test(img.getAttribute('src')||'')) return;
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
   items:[
     ["Mango pickle making set","MangoPickleMakingSet.jpg"],
     ["Pongal panai set","PongalPanai.jpg"],["Pongal panai, to scale","PongalPanai1.jpg"],
     ["Pongal with sugarcane","pongalKarumbu.jpg"],["Dosa with chutneys","Dosa.jpg"],
     ["Pani puri plate","panipuri1.jpg"],
     ["Basket of carrots","Carrots.jpg"],["Maggi noodle packs","maggi1.jpg"],
     ["Maggi pack, to scale","maggi.jpg"],["Lay's chip packets","Lays.jpg"],
     ["Parle-G biscuits","parleG.jpg"],
     ["Parle-G biscuit set","ParleG1.jpg"],["Mini books","book1.jpg"],
     ["Ganesha on a charpai","gana.jpg"],["Mini handbag","Handabag.jpg"],
     ["Handbag at doll scale","Handbag1.jpg"],
     ["Rose box","RoseSquareVase.jpg"],["Rose box with doll","RoseSquareVase1.jpg"],
     ["Heart planter","heartPlanter.jpg"],["Teddy in a bottle","TeddyInMiniBottle.jpg"],
     ["Teddy on a love car","teddyOnCar.jpg"],
     ["Teddy on a cupcake","teddyOnCupCake.jpg"]]},
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
const svarciCover=c=>`uploads/${c.folder}/cover.jpg`;
/* An item is either "Name" (image = 01.jpg, 02.jpg… by position) or ["Name","file.jpg"] (image = that file in the folder). */
const svarciItemName=it=>Array.isArray(it)?it[0]:it;
const svarciItemImg=(c,i)=>{const it=c.items[i];return Array.isArray(it)?`uploads/${c.folder}/${it[1]}`:`uploads/${c.folder}/${String(i+1).padStart(2,'0')}.jpg`;};
