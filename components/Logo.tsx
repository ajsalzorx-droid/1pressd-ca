export function Logo({ light = false }: { light?: boolean }) {
  return <a href="#home" className={`logo ${light ? "logo--light" : ""}`} aria-label="PRESS’D home">
    <span>PRESS’</span><span className="logo-d">D<i /></span><small>WELLNESS CAFÉ</small>
  </a>;
}
