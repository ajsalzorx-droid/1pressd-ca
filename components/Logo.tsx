export function Logo({ light = false }: { light?: boolean }) {
  return <a href="#home" className={`logo ${light ? "logo--light" : ""}`} aria-label="PRESS’D Wellness Café home">
    <img src="/pressd-logo-transparent.png" alt="PRESS’D Wellness Café" />
  </a>;
}
