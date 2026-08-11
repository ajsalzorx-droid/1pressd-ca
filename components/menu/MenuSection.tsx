"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { MenuCategoryNav } from "./MenuCategoryNav";
import { MenuProduct } from "./MenuProduct";
import { MenuQuickView } from "./MenuQuickView";
import { menuItems, type MenuItem } from "./menuData";

export function MenuSection() {
  const [category,setCategory]=useState("All");
  const [selected,setSelected]=useState<MenuItem|null>(null);
  const [cart,setCart]=useState<Record<string,number>>({});
  const [cartOpen,setCartOpen]=useState(false);
  const shown=category==="All"?menuItems:menuItems.filter(item=>item.category===category);
  const cartItems=menuItems.filter(item=>cart[item.name]).map(item=>({...item,qty:cart[item.name]}));
  const cartCount=cartItems.reduce((sum,item)=>sum+item.qty,0);
  const total=cartItems.reduce((sum,item)=>sum+item.price*item.qty,0);
  const changeQty=(name:string,change:number)=>setCart(current=>{const qty=Math.max(0,(current[name]||0)+change);const next={...current};if(qty)next[name]=qty;else delete next[name];return next});
  const changeCategory=(next:string)=>{setCategory(next);window.setTimeout(()=>document.getElementById("menu-showcase")?.scrollIntoView({behavior:"smooth",block:"start"}),60)};
  const orderText=["Hello PRESS’D! I would like to order:",...cartItems.map(item=>`• ${item.qty} × ${item.name} — AED ${item.price*item.qty}`),"",`Total: AED ${total}`,"Please confirm availability and delivery/pickup details."].join("\n");

  return <section id="full-menu" className="editorialMenu" aria-labelledby="editorial-menu-title">
    <div className="editorialMenuIntro"><p>THE PRESS’D MENU</p><h2 id="editorial-menu-title">GOOD FOOD.<br/>BETTER DAYS.</h2><span>Clean ingredients, bold flavour and food designed<br/>to keep you feeling good all day.</span></div>
    <MenuCategoryNav active={category} onChange={changeCategory}/>
    <div className="editorialMenuStatus"><span>{category}</span><small>{shown.length.toString().padStart(2,"0")} selections</small></div>
    <motion.div id="menu-showcase" className="editorialShowcase" layout>
      <AnimatePresence mode="wait"><motion.div key={category} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-18}} transition={{duration:.42,ease:[.16,1,.3,1]}}>{shown.map((item,index)=><MenuProduct key={item.name} item={item} index={index} onView={()=>setSelected(item)} onAdd={()=>changeQty(item.name,1)}/>)}</motion.div></AnimatePresence>
    </motion.div>
    <AnimatePresence>{selected&&<MenuQuickView item={selected} onClose={()=>setSelected(null)} onAdd={()=>changeQty(selected.name,1)}/>}</AnimatePresence>
    <AnimatePresence>{cartCount>0&&<motion.button className="cartBubble" initial={{opacity:0,scale:.86,y:12}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.9}} aria-label={`Open cart with ${cartCount} items`} onClick={()=>setCartOpen(true)}><ShoppingBag size={19}/><span>Cart</span><b>{cartCount}</b></motion.button>}</AnimatePresence>
    <AnimatePresence>{cartOpen&&<motion.div className="cartBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setCartOpen(false)}><motion.aside className="cartDrawer" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{duration:.55,ease:[.16,1,.3,1]}} onClick={event=>event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Your order"><header><div><small>Your order</small><h2>Cart <span>{cartCount}</span></h2></div><button aria-label="Close cart" onClick={()=>setCartOpen(false)}><X/></button></header><div className="cartLines">{cartItems.map(item=><article key={item.name}><Image src={item.image} width={72} height={82} alt=""/><div><h3>{item.name}</h3><p>AED {item.price}</p><div className="quantity"><button aria-label={`Remove one ${item.name}`} onClick={()=>changeQty(item.name,-1)}><Minus/></button><span>{item.qty}</span><button aria-label={`Add one ${item.name}`} onClick={()=>changeQty(item.name,1)}><Plus/></button></div></div><strong>AED {item.price*item.qty}</strong></article>)}</div><footer><p><span>Total</span><strong>AED {total}</strong></p><a href={`https://wa.me/971543962660?text=${encodeURIComponent(orderText)}`} target="_blank" rel="noreferrer"><Image className="whatsappIcon" src="/whatsapp-icon-transparent.png" width={26} height={26} alt=""/> Order on WhatsApp</a><small>Order opens in WhatsApp for confirmation.</small></footer></motion.aside></motion.div>}</AnimatePresence>
  </section>;
}
