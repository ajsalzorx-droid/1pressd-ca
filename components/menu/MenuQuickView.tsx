import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import type { MenuItem } from "./menuData";

export function MenuQuickView({ item, onClose, onAdd }: { item:MenuItem; onClose:()=>void; onAdd:()=>void }) {
  return <motion.div className="editorialModal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} role="dialog" aria-modal="true" aria-label={item.name}>
    <motion.div initial={{opacity:0,y:28,scale:.98}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.55,ease:[.16,1,.3,1]}} onClick={event=>event.stopPropagation()}>
      <button className="editorialModalClose" onClick={onClose} aria-label="Close product details"><X/></button>
      <div className="editorialModalImage"><Image src={item.image} fill sizes="(max-width:768px) 100vw, 55vw" alt={item.name}/></div>
      <section><span>{item.category}</span><h2>{item.name}</h2><ul>{item.description.split(", ").map(ingredient=><li key={ingredient}>{ingredient}</li>)}</ul><div className="editorialModalNutrition"><p><b>{item.protein}G</b>Protein</p><p><b>{item.calories}</b>Kcal</p></div><div className="editorialTags">{item.tags.map(tag=><small key={tag}>{tag}</small>)}</div><strong>AED {item.price}</strong><button className="editorialModalAdd" onClick={onAdd}><ShoppingBag size={16}/> Add to order</button></section>
    </motion.div>
  </motion.div>;
}
