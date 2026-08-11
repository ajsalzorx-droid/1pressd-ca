import { menuCategories } from "./menuData";

export function MenuCategoryNav({ active, onChange }: { active:string; onChange:(category:string)=>void }) {
  return <div className="editorialCategories" role="tablist" aria-label="Menu categories">
    {menuCategories.map(category => <button key={category} role="tab" aria-selected={active===category} className={active===category?"active":""} onClick={()=>onChange(category)}>{category}</button>)}
  </div>;
}
