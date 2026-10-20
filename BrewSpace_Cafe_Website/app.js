const DEFAULT_PRODUCTS = [
 {id:"p1",name:"Flat White",category:"Hot Coffee",price:180,description:"Velvety microfoam over a double espresso.",image:"https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=80",popular:true},
 {id:"p2",name:"Caramel Latte",category:"Hot Coffee",price:210,description:"Espresso, silky milk and a caramel swirl.",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",popular:true},
 {id:"p3",name:"Iced Spanish Latte",category:"Cold Coffee",price:230,description:"Bold espresso with chilled sweet milk.",image:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",popular:true},
 {id:"p4",name:"Cold Brew",category:"Cold Coffee",price:190,description:"Slow-steeped, smooth and refreshingly bright.",image:"https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80",popular:false},
 {id:"p5",name:"Matcha Latte",category:"Tea",price:220,description:"Earthy ceremonial-style matcha with milk.",image:"https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=700&q=80",popular:false},
 {id:"p6",name:"Masala Chai",category:"Tea",price:100,description:"Black tea simmered with warming spices.",image:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=700&q=80",popular:false},
 {id:"p7",name:"Butter Croissant",category:"Bakes & Bites",price:140,description:"Flaky, golden layers baked fresh each morning.",image:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80",popular:true},
 {id:"p8",name:"Chocolate Brownie",category:"Bakes & Bites",price:160,description:"Rich chocolate centre with a delicate crust.",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",popular:false}
];
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
const money = n => "₹"+Number(n).toLocaleString("en-IN");
const read = (key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}};
let products = read("brewspace_products",DEFAULT_PRODUCTS);
let cart = read("brewspace_cart",[]);
let activeCategory = "All";
let searchTerm = "";
let toastTimer;

const saveProducts=()=>localStorage.setItem("brewspace_products",JSON.stringify(products));
const saveCart=()=>localStorage.setItem("brewspace_cart",JSON.stringify(cart));
const safe=(value)=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const imageFallback="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=80";
function notify(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2300)}
function renderCategories(){const categories=["All","Hot Coffee","Cold Coffee","Tea","Bakes & Bites"];$("#categoryTabs").innerHTML=categories.map(c=>`<button class="category-tab ${activeCategory===c?"active":""}" data-category="${safe(c)}">${safe(c)}</button>`).join("");}
function renderMenu(){
 const filtered=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(`${p.name} ${p.description} ${p.category}`).toLowerCase().includes(searchTerm.toLowerCase()));
 $("#menuGrid").innerHTML=filtered.length?filtered.map(p=>`<article class="product-card"><div class="product-image-wrap"><img class="product-image" src="${safe(p.image||imageFallback)}" alt="${safe(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${imageFallback}'">${p.popular?'<span class="product-badge">Bestseller</span>':""}<button class="add-button" data-add="${safe(p.id)}" aria-label="Add ${safe(p.name)} to bag">+</button></div><div class="product-meta"><h3>${safe(p.name)}</h3><span class="price">${money(p.price)}</span></div><p class="product-description">${safe(p.description)}</p></article>`).join(""):`<div class="empty-state">No menu items found. Try another search.</div>`;
}
function cartCount(){return cart.reduce((sum,item)=>sum+item.qty,0)}
function cartTotal(){return cart.reduce((sum,item)=>{const p=products.find(x=>x.id===item.id);return sum+(p?p.price*item.qty:0)},0)}
function renderCart(){
 $("#cartCount").textContent=cartCount();
 const valid=cart.filter(i=>products.some(p=>p.id===i.id));
 if(valid.length!==cart.length){cart=valid;saveCart()}
 $("#cartItems").innerHTML=valid.length?valid.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="cart-line"><img src="${safe(p.image||imageFallback)}" alt=""><div><h3>${safe(p.name)}</h3><p>${money(p.price)} each</p><div class="quantity"><button data-qty="${safe(p.id)}" data-delta="-1" aria-label="Decrease ${safe(p.name)}">−</button><span>${i.qty}</span><button data-qty="${safe(p.id)}" data-delta="1" aria-label="Increase ${safe(p.name)}">+</button></div></div><span class="cart-line-price">${money(p.price*i.qty)}</span></div>`}).join(""):`<div class="empty-state"><p>Your bag is taking a little coffee break.</p><button class="button button-outline" id="emptyBrowse">Explore the menu</button></div>`;
 $("#cartBottom").innerHTML=valid.length?`<div class="subtotal-row"><span>Subtotal</span><span>${money(cartTotal())}</span></div><button class="button button-dark button-full" id="checkoutOpen">Continue to checkout <span>↗</span></button><p class="fine-print">Taxes and payment are not included in this demo.</p>`:"";
}
function addToCart(id){if(!products.some(p=>p.id===id))return;const found=cart.find(i=>i.id===id);if(found)found.qty++;else cart.push({id,qty:1});saveCart();renderCart();notify("Added to your bag.");}
function changeQty(id,delta){const item=cart.find(i=>i.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(i=>i.id!==id);saveCart();renderCart()}
function openLayer(id){closeLayers();$("#overlay").classList.add("open");const el=$("#"+id);el.classList.add("open");el.setAttribute("aria-hidden","false");if(id==="cartDrawer")renderCart()}
function closeLayers(){["cartDrawer","checkoutModal","adminModal"].forEach(id=>{const el=$("#"+id);el.classList.remove("open");el.setAttribute("aria-hidden","true")});$("#overlay").classList.remove("open")}
function renderAdmin(){const list=$("#adminList");$("#adminProductCount").textContent=`${products.length} items`;list.innerHTML=products.map(p=>`<div class="admin-row"><img src="${safe(p.image||imageFallback)}" alt=""><div class="admin-row-info"><strong>${safe(p.name)} · ${money(p.price)}</strong><small>${safe(p.category)}${p.popular?" · Bestseller":""}</small></div><button data-edit="${safe(p.id)}">Edit</button><button data-delete="${safe(p.id)}">Delete</button></div>`).join("")}
function clearProductForm(){$("#productForm").reset();$('#productForm [name="id"]').value="";$("#saveProduct").textContent="Add product"}
function editProduct(id){const p=products.find(x=>x.id===id);if(!p)return;const f=$("#productForm");f.elements.id.value=p.id;f.elements.name.value=p.name;f.elements.price.value=p.price;f.elements.category.value=p.category;f.elements.description.value=p.description;f.elements.image.value=p.image||"";f.elements.popular.checked=!!p.popular;$("#saveProduct").textContent="Save changes";f.scrollIntoView({behavior:"smooth",block:"start"})}
function orderId(){return "BS-"+Math.random().toString(36).slice(2,7).toUpperCase()}
function init(){
 $("#year").textContent=new Date().getFullYear();renderCategories();renderMenu();renderCart();renderAdmin();
 $("#categoryTabs").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;renderCategories();renderMenu()});
 $("#menuSearch").addEventListener("input",e=>{searchTerm=e.target.value;renderMenu()});
 $("#menuGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(b.dataset.add)});
 $("#cartOpen").addEventListener("click",()=>openLayer("cartDrawer"));
 $("#adminOpen").addEventListener("click",()=>{renderAdmin();openLayer("adminModal")});
 $("#visitMenu").addEventListener("click",()=>$("#menu").scrollIntoView({behavior:"smooth"}));
 $("#mobileMenu").addEventListener("click",()=>$(".desktop-nav").classList.toggle("open"));
 $$(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>$(".desktop-nav").classList.remove("open")));
 $("#overlay").addEventListener("click",closeLayers);
 $$("[data-close]").forEach(b=>b.addEventListener("click",closeLayers));
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeLayers();$("#confirmation").classList.remove("open");$("#confirmation").setAttribute("aria-hidden","true")}});
 $("#cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]");if(q)changeQty(q.dataset.qty,Number(q.dataset.delta));if(e.target.id==="emptyBrowse"){closeLayers();$("#menu").scrollIntoView({behavior:"smooth"})}});
 $("#cartBottom").addEventListener("click",e=>{if(e.target.closest("#checkoutOpen")){if(!cart.length)return;$("#checkoutTotal").textContent=money(cartTotal());openLayer("checkoutModal")}});
 $("#checkoutForm").addEventListener("submit",e=>{
   e.preventDefault();if(!cart.length){notify("Your bag is empty.");return}
   const form=new FormData(e.currentTarget),id=orderId(),items=cart.map(i=>{const p=products.find(x=>x.id===i.id);return {name:p.name,price:p.price,qty:i.qty}}),total=cartTotal();
   const order={id,customer:form.get("customer"),orderType:form.get("orderType"),table:form.get("table"),notes:form.get("notes"),items,total,createdAt:new Date().toISOString()};
   const history=read("brewspace_orders",[]);history.unshift(order);localStorage.setItem("brewspace_orders",JSON.stringify(history.slice(0,30)));
   $("#confirmationText").textContent=`Thanks, ${order.customer}. Your ${order.orderType.toLowerCase()} demo order is ready in the local receipt.`;
   $("#receipt").innerHTML=`<div class="receipt-row"><span>Order number</span><strong>${safe(id)}</strong></div><div class="receipt-row"><span>Order type</span><span>${safe(order.orderType)}${order.table?` · ${safe(order.table)}`:""}</span></div>${items.map(i=>`<div class="receipt-row"><span>${safe(i.name)} × ${i.qty}</span><span>${money(i.price*i.qty)}</span></div>`).join("")}${order.notes?`<p>Note: ${safe(order.notes)}</p>`:""}<div class="receipt-row receipt-total"><span>Total</span><strong>${money(total)}</strong></div>`;
   cart=[];saveCart();renderCart();closeLayers();$("#checkoutForm").reset();$("#confirmation").classList.add("open");$("#confirmation").setAttribute("aria-hidden","false");
 });
 $("#finishOrder").addEventListener("click",()=>{$("#confirmation").classList.remove("open");$("#confirmation").setAttribute("aria-hidden","true");window.scrollTo({top:0,behavior:"smooth"})});
 $("#productForm").addEventListener("submit",e=>{
   e.preventDefault();const f=e.currentTarget,data=new FormData(f),id=data.get("id")||"p"+Date.now();const old=products.find(p=>p.id===id);
   const product={id,name:String(data.get("name")).trim(),price:Number(data.get("price")),category:data.get("category"),description:String(data.get("description")).trim(),image:String(data.get("image")).trim()||imageFallback,popular:data.get("popular")==="on"};
   if(!product.name||!Number.isFinite(product.price)||product.price<1){notify("Enter a valid name and price.");return}
   if(old)products=products.map(p=>p.id===id?product:p);else products.push(product);
   saveProducts();renderMenu();renderAdmin();renderCart();clearProductForm();notify(old?"Product updated.":"Product added.");
 });
 $("#adminList").addEventListener("click",e=>{const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]");if(edit)editProduct(edit.dataset.edit);if(del){const p=products.find(x=>x.id===del.dataset.delete);if(!p)return;if(!confirm(`Delete ${p.name} from the menu?`))return;products=products.filter(x=>x.id!==p.id);cart=cart.filter(i=>i.id!==p.id);saveProducts();saveCart();renderMenu();renderAdmin();renderCart();notify("Product deleted.")}});
 $("#cancelEdit").addEventListener("click",clearProductForm);
 $("#resetMenu").addEventListener("click",()=>{if(!confirm("Reset the menu to the original sample products?"))return;products=structuredClone(DEFAULT_PRODUCTS);saveProducts();renderMenu();renderAdmin();renderCart();clearProductForm();notify("Sample menu restored.")});
}
init();
