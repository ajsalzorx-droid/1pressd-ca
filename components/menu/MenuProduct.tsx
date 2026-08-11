import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import type { MenuItem } from "./menuData";

export function MenuProduct({ item, index, onView, onAdd }: { item:MenuItem; index:number; onView:()=>void; onAdd:()=>void }) {
  const number=String(index+1).padStart(2,"0");
  return <motion.article className={`editorialProduct ${index%2?"is-reversed":""}`} initial={{opacity:0,y:55}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.82,ease:[.16,1,.3,1]}}>
    <div className="editorialProductInfo">
      <motion.span className="editorialNumber" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.08}}>{number} / {item.category}</motion.span>
      <div className="editorialTitleMask"><motion.h3 initial={{y:"105%"}} whileInView={{y:0}} viewport={{once:true}} transition={{duration:.82,ease:[.16,1,.3,1]}}>{item.name}</motion.h3></div>
      <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.14,duration:.65}}>{item.description.replaceAll(","," ·")}</motion.p>
      <motion.div className="editorialNutrition" initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.22,duration:.6}}><span><b>{item.protein}G</b> Protein</span><span><b>{item.calories}</b> Kcal</span></motion.div>
      <motion.strong className="editorialPrice" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:.3}}>AED {item.price}</motion.strong>
      <div className="editorialActions"><button onClick={onAdd}><Plus size={15}/> Add to order</button><button onClick={onView}>View details <ArrowUpRight size={15}/></button></div>
    </div>
    <motion.button className="editorialFood" onClick={onView} aria-label={`View ${item.name}`} whileHover={{scale:1.025,rotate:index%2?1:-1}} transition={{duration:.55,ease:[.16,1,.3,1]}}>
      <Image src={item.image} fill sizes="(max-width:768px) 86vw, 55vw" alt={item.name}/><span>View</span>
    </motion.button>
  </motion.article>;
}
