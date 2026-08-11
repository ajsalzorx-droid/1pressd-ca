"use client";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { LoadingIntro } from "./LoadingIntro";
import { MenuGrid } from "./MenuGrid";
import { SectionNavigator } from "./SectionNavigator";
import { ScrollAnimator } from "./ScrollAnimator";

const Instagram = () => <span aria-hidden="true" style={{fontSize: 28, fontWeight: 700}}>@</span>;

const food = [
  ["POWER PROTEIN BOWL","Chicken, quinoa, avocado, greens","42g protein · 610 kcal","https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"],
  ["LEAN CHICKEN SALAD","Herbs, feta, crisp leaves, citrus","36g protein · 470 kcal","https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=85"],
  ["GREEN ENERGY BOWL","Edamame, grains, greens, tahini","Plant-powered · 520 kcal","https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85"],
  ["AVOCADO BREAKFAST","Sourdough, eggs, chilli, herbs","24g protein · 490 kcal","https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85"]
];
const gallery = [
  "photo-1495474472287-4d71bcdd2085", "photo-1554118811-1e0d58224f24", "photo-1552053831-71594a27632d", "photo-1498837167922-ddd27525d352", "photo-1521737711867-e3b97375f902"
].map(x=>`https://images.unsplash.com/${x}?auto=format&fit=crop&w=1000&q=82`);

const Btn=({children="Explore menu",href="#",pale=false}:{children?:React.ReactNode,href?:string,pale?:boolean})=><a className={`btn ${pale?"btn--pale":""}`} href={href}>{children}<ArrowRight size={15}/></a>;

export default function Home(){
 const [open,setOpen]=useState(false); const [loading,setLoading]=useState(true); const [scrolled,setScrolled]=useState(false); const [active,setActive]=useState("home"); const {scrollYProgress}=useScroll(); const heroY=useTransform(scrollYProgress,[0,.2],[0,90]);
 useEffect(()=>{document.body.style.overflow=loading||open?"hidden":"";return()=>{document.body.style.overflow=""}},[loading,open]);
 useEffect(()=>{const onScroll=()=>setScrolled(scrollY>36);onScroll();addEventListener("scroll",onScroll,{passive:true});const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{rootMargin:"-35% 0px -55%"});document.querySelectorAll("main section[id]").forEach(el=>observer.observe(el));return()=>{removeEventListener("scroll",onScroll);observer.disconnect()}},[]);
 return <><AnimatePresence>{loading&&<LoadingIntro onDone={()=>setLoading(false)}/>}</AnimatePresence><main><ScrollAnimator/>
  <video className="heroVideo" src="/hero-cinematic.mp4" poster="/hero-cafe.png" autoPlay muted loop playsInline preload="metadata" aria-label="PRESS’D café lifestyle" />
  <header className={`nav ${scrolled?"nav--scrolled":""}`}><Logo light/><nav>{["Menu","Pet Friendly","Work at PRESS’D","Wellness","About","Visit"].map(x=>{const id=x.split(" ")[0].toLowerCase();return <a className={active===id?"active":""} aria-current={active===id?"page":undefined} href={`#${id}`} key={x}>{x}</a>})}</nav><Btn href="#visit">Book a table</Btn><button className="menuBtn" onClick={()=>setOpen(!open)} aria-label={open?"Close menu":"Open menu"} aria-expanded={open}><span>{open?"Close":"Menu"}</span>{open?<X/>:<Menu/>}</button></header>
  {open&&<motion.div className="mobileNav" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}}>{["Menu","Pet Friendly","Work at PRESS’D","Wellness","About","Visit"].map(x=><a onClick={()=>setOpen(false)} href={`#${x.split(" ")[0].toLowerCase()}`} key={x}>{x}</a>)}</motion.div>}
  <section id="home" className="hero"><motion.div className="heroImg" style={{y:heroY}}><Image src="/hero-cafe.png" fill priority sizes="100vw" alt="A guest working at PRESS’D with her dog and a healthy lunch"/></motion.div><div className="shade"/><motion.div className="heroCopy" initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.9}}><p className="eyebrow">Dubai · Wellness café</p><h1>Eat well.<br/>Work better.<br/><em>Bring your best friend.</em></h1><p>A wellness café built for good food,<br/>good work and very good company.</p><div className="actions"><Btn href="#menu"/><Btn href="#menu" pale>Explore menu</Btn><Btn href="#visit">Visit PRESS’D</Btn></div></motion.div><a href="#about" className="scroll">Scroll <ArrowDown size={15}/></a>
  </section>
  <SectionNavigator/>
  <section id="about" className="intro"><p className="kicker">The PRESS’D way</p><h2>MORE THAN<br/>A CAFÉ.</h2><p className="lead">Your everyday space to eat clean, get things done, slow down and spend time with your four-legged best friend.</p></section>
  <div className="marquee"><div>PET FRIENDLY • WORK FRIENDLY • WELLNESS FOOD • GOOD COFFEE • GOOD ENERGY • PET FRIENDLY • WORK FRIENDLY • WELLNESS FOOD • GOOD COFFEE • GOOD ENERGY •</div></div>
  <section id="pet" className="feature pet"><div className="featureImg petImage"><Image src="/pet-friendly-pressd.webp" fill sizes="(max-width:900px) 100vw, 55vw" alt="A PRESS’D guest enjoying coffee and a healthy meal with her golden retriever inside the pet-friendly café"/></div><div className="featureCopy"><span className="num">01 / Pet friendly</span><h2>PAWS ARE<br/>WELCOME.</h2><p className="lead">Good coffee tastes even better with your best friend beside you.</p><p>A genuinely pet-friendly café where humans and their four-legged companions can relax, meet and stay awhile.</p><div className="tags"><span>Pet friendly</span><span>Outdoor seating</span><span>Water for pets</span><span>Good vibes</span></div><Btn href="#visit">Discover PRESS’D</Btn></div></section>
  <section id="work" className="feature work"><div className="featureCopy"><span className="num">02 / Work friendly</span><h2>YOUR NEW<br/>WORKSPACE.</h2><p className="lead">Great coffee. Fast Wi-Fi.<br/>Zero office energy.</p><p>From quick emails to full work sessions, PRESS’D gives you space to focus.</p><div className="tags"><span>Fast Wi-Fi</span><span>Power outlets</span><span>Comfortable seats</span><span>Calm atmosphere</span></div><Btn>Work from PRESS’D</Btn></div><div className="featureImg workImage"><Image src="/work-friendly-pressd.webp" fill sizes="(max-width:900px) 100vw, 55vw" alt="A guest working comfortably on a laptop with coffee and a healthy meal inside PRESS’D"/></div></section>
  <section id="menu" className="menu"><div className="sectionHead"><div><p className="kicker">Fuel your day</p><h2>FOOD THAT<br/>WORKS FOR YOU.</h2></div><p className="lead">Fresh ingredients.<br/>Balanced nutrition.<br/>Big flavour.</p></div><div className="foodRail">{food.map((f,i)=><article className="foodCard" key={f[0]}><div><Image src={f[3]} fill sizes="(max-width:600px) 82vw, 38vw" alt={f[0]}/><span>0{i+1}</span></div><h3>{f[0]}</h3><p>{f[1]}</p><small>{f[2]}</small></article>)}</div><div className="center"><Btn>View full menu</Btn></div></section>
  <MenuGrid/>
  <section className="reasons"><p className="kicker">Why PRESS’D</p>{[["01","BRING YOUR PET","A café where your best friend is actually invited."],["02","BRING YOUR LAPTOP","Stay productive without feeling like you’re at work."],["03","BRING YOUR APPETITE","Balanced food made for energy, flavour and everyday wellness."]].map(x=><div className="reason" key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</section>
  <section id="wellness" className="signature"><div className="sigImage"><Image src="https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1800&q=90" fill sizes="100vw" alt="Fresh wellness food"/></div><div className="sigCopy"><p className="kicker">Signature plates</p><h2>COLOURFUL.<br/>CLEAN.<br/>CRAVEABLE.</h2><p>From protein-first lunches to bright breakfasts and smoothies worth slowing down for.</p><div className="sigLinks"><span>Salads</span><span>Protein meals</span><span>Breakfast</span><span>Smoothies</span><span>Specialty coffee</span></div></div></section>
  <section className="lifestyle"><p className="kicker">Life at PRESS’D</p><h2>YOUR EVERYDAY<br/>PLACE.</h2><div className="gridGallery">{gallery.map((g,i)=><div key={g}><Image src={g} fill sizes="40vw" alt={["Specialty coffee","Cafe interior","Dog at the café","Healthy food","Friends together"][i]}/></div>)}</div></section>
  <section className="social"><div><Instagram/><h2>@PRESSDCAFE</h2><p>Coffee. Wellness. Work. Dogs.<br/>Basically everything we love.</p></div><Btn>Follow PRESS’D</Btn></section>
  <section id="visit" className="visit"><div><p className="kicker">See you soon</p><h2>COME<br/>GET PRESS’D.</h2><p className="address">PRESS’D Wellness Café<br/>Dubai, UAE</p><div className="details"><p><small>Opening hours</small>Daily · 7am—10pm</p><p><small>Say hello</small>hello@pressdcafe.ae</p></div><div className="actions"><Btn>Book a table</Btn><Btn pale>Get directions</Btn></div></div><div className="map"><MapPin size={38}/><span>PRESS’D</span><small>Dubai, UAE</small></div></section>
  <footer><Logo light/><div><a href="#menu">Menu</a><a href="#pet">Pet friendly</a><a href="#work">Work with us</a><a href="#about">About</a><a href="#visit">Contact</a></div><p>PRESS’D WELLNESS CAFÉ<br/>GOOD FOOD • GOOD WORK • GOOD COMPANY</p></footer>
  <nav className="mobileDock" aria-label="Quick actions"><a href="#menu">View menu <ArrowRight size={15}/></a><a href="#visit">Book a table</a></nav>
 </main></>
}
