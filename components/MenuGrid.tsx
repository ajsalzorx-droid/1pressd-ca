"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

const categories = ["All","Breakfast","Salads","Protein","Mains","Smoothies","Coffee","Desserts"];
const items = [
  {name:"Avocado Sunrise",cat:"Breakfast",desc:"Sourdough, avocado, poached eggs, herbs",price:"AED 48",kcal:"490 kcal",protein:"24g protein",tag:"V",img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=84"},
  {name:"Lean Chicken Salad",cat:"Salads",desc:"Herb chicken, feta, leaves, citrus dressing",price:"AED 54",kcal:"470 kcal",protein:"36g protein",tag:"GF",img:"https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1000&q=84"},
  {name:"Power Protein Bowl",cat:"Protein",desc:"Chicken, quinoa, avocado, seasonal greens",price:"AED 59",kcal:"610 kcal",protein:"42g protein",tag:"GF",img:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=84"},
  {name:"Green Energy Bowl",cat:"Mains",desc:"Edamame, grains, greens, sesame tahini",price:"AED 52",kcal:"520 kcal",protein:"21g protein",tag:"VG",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=84"},
  {name:"Berry Protein Blend",cat:"Smoothies",desc:"Berries, banana, almond milk, whey",price:"AED 34",kcal:"310 kcal",protein:"28g protein",tag:"GF",img:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1000&q=84"},
  {name:"Spanish Iced Latte",cat:"Coffee",desc:"Double espresso, milk, subtle sweetness",price:"AED 29",kcal:"180 kcal",protein:"7g protein",tag:"",img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=84"},
  {name:"Cacao Date Slice",cat:"Desserts",desc:"Cacao, dates, almonds, sea salt",price:"AED 32",kcal:"290 kcal",protein:"8g protein",tag:"VG",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=84"},
  {name:"Protein Shakshuka",cat:"Breakfast",desc:"Eggs, tomato, peppers, feta, sourdough",price:"AED 55",kcal:"540 kcal",protein:"31g protein",tag:"V",img:"https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1000&q=84"}
];

export function MenuGrid(){
 const [category,setCategory]=useState("All");
 const [selected,setSelected]=useState<(typeof items)[number]|null>(null);
 const [cart,setCart]=useState<Record<string,number>>({});
 const [cartOpen,setCartOpen]=useState(false);
 const shown=category==="All"?items:items.filter(x=>x.cat===category);
 const cartItems=items.filter(item=>cart[item.name]).map(item=>({...item,qty:cart[item.name]}));
 const cartCount=cartItems.reduce((sum,item)=>sum+item.qty,0);
 const total=cartItems.reduce((sum,item)=>sum+Number(item.price.replace(/\D/g,""))*item.qty,0);
 const changeQty=(name:string,change:number)=>setCart(current=>{const next=Math.max(0,(current[name]||0)+change);const updated={...current};if(next)updated[name]=next;else delete updated[name];return updated});
 const orderText=["Hello PRESS’D! I would like to order:",...cartItems.map(item=>`• ${item.qty} × ${item.name} — AED ${Number(item.price.replace(/\D/g,""))*item.qty}`),``,`Total: AED ${total}`,"Please confirm availability and delivery/pickup details."].join("\n");
 const whatsappUrl=`https://wa.me/971543962660?text=${encodeURIComponent(orderText)}`;

 const browseMenu=()=>{setCartOpen(false);window.setTimeout(()=>document.getElementById("full-menu")?.scrollIntoView({behavior:"smooth",block:"start"}),320)};

 return <section id="full-menu" className="fullMenu" aria-labelledby="full-menu-title">
  <div className="menuTop"><p className="kicker">The full line-up</p><h2 id="full-menu-title">FIND YOUR<br/>FAVOURITE.</h2></div>
  <div className="categoryBar" role="tablist" aria-label="Menu categories">{categories.map(c=><button role="tab" aria-selected={category===c} className={category===c?"active":""} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div>
  <motion.div layout className="menuGrid"><AnimatePresence mode="popLayout">{shown.map(item=><motion.article layout initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.97}} transition={{duration:.45,ease:[.16,1,.3,1]}} key={item.name} onClick={()=>setSelected(item)} tabIndex={0} onKeyDown={e=>{if(e.key==="Enter")setSelected(item)}}><div className="menuPhoto"><Image src={item.img} fill sizes="(max-width:600px) 92vw, (max-width:1000px) 46vw, 31vw" alt={item.name}/>{item.tag&&<b>{item.tag}</b>}</div><div className="menuInfo"><h3>{item.name}</h3><strong>{item.price}</strong><p>{item.desc}</p><small>{item.protein} · {item.kcal}</small><button className="addCart" onClick={e=>{e.stopPropagation();changeQty(item.name,1)}}><Plus size={15}/> Add to cart {cart[item.name]?`(${cart[item.name]})`:""}</button></div></motion.article>)}</AnimatePresence></motion.div>
  <AnimatePresence>{cartCount>0&&<motion.button className="cartBubble" initial={{opacity:0,scale:.86,y:12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.9,y:8}} transition={{duration:.35,ease:[.16,1,.3,1]}} aria-label={`Open cart with ${cartCount} items`} onClick={()=>setCartOpen(true)}><ShoppingBag size={19}/><span>Cart</span><b>{cartCount}</b></motion.button>}</AnimatePresence>
  <AnimatePresence>{selected&&<motion.div className="quickView" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)} role="dialog" aria-modal="true" aria-label={selected.name}><motion.div initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} onClick={e=>e.stopPropagation()}><button aria-label="Close item details" onClick={()=>setSelected(null)}><X/></button><div><Image src={selected.img} fill sizes="600px" alt={selected.name}/></div><section><span>{selected.cat}</span><h2>{selected.name}</h2><p>{selected.desc}</p><strong>{selected.price}</strong><small>{selected.protein} · {selected.kcal} {selected.tag&&`· ${selected.tag}`}</small><button className="modalAdd" onClick={()=>changeQty(selected.name,1)}><ShoppingBag size={16}/> Add to cart</button></section></motion.div></motion.div>}</AnimatePresence>
  <AnimatePresence>{cartOpen&&<motion.div className="cartBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setCartOpen(false)}><motion.aside className="cartDrawer" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:.55,ease:[.16,1,.3,1]}} onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Your order"><header><div><small>Your order</small><h2>Cart <span>{cartCount}</span></h2></div><button aria-label="Close cart" onClick={()=>setCartOpen(false)}><X/></button></header>{cartItems.length?<><div className="cartLines">{cartItems.map(item=><article key={item.name}><Image src={item.img} width={72} height={82} alt=""/><div><h3>{item.name}</h3><p>{item.price}</p><div className="quantity"><button aria-label={`Remove one ${item.name}`} onClick={()=>changeQty(item.name,-1)}><Minus/></button><span>{item.qty}</span><button aria-label={`Add one ${item.name}`} onClick={()=>changeQty(item.name,1)}><Plus/></button></div></div><strong>AED {Number(item.price.replace(/\D/g,""))*item.qty}</strong></article>)}</div><footer><p><span>Total</span><strong>AED {total}</strong></p><a href={whatsappUrl} target="_blank" rel="noreferrer"><Image className="whatsappIcon" src="/whatsapp-icon-transparent.png" width={26} height={26} alt=""/> Order on WhatsApp</a><small>Order opens in WhatsApp for confirmation.</small></footer></>:<div className="emptyCart"><ShoppingBag/><h3>Your cart is empty</h3><p>Add something fresh from the menu.</p><button onClick={browseMenu}>Browse menu</button></div>}</motion.aside></motion.div>}</AnimatePresence>
 </section>
}
