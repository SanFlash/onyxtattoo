import Link from "next/link";
import ScrollExperience from "./components/ScrollExperience";

const gallery = [
  { no: "01", title: "BLACK / GREY", tag: "REALISM", image: "https://images.unsplash.com/photo-1753259789341-808371092e19?auto=format&fit=crop&fm=jpg&q=88&w=1800" },
  { no: "02", title: "THE LINE", tag: "FINE LINE", image: "https://images.unsplash.com/photo-1679621550970-32d6587b62c4?auto=format&fit=crop&fm=jpg&q=88&w=1800" },
  { no: "03", title: "DARK FLORAL", tag: "BLACKWORK", image: "https://images.unsplash.com/photo-1775135332562-9ff99e65a616?auto=format&fit=crop&fm=jpg&q=88&w=1800" },
];

const styles = ["REALISM", "BLACK & GREY", "FINE LINE", "BLACKWORK", "NEO TRADITIONAL", "GEOMETRIC"];

export default function Home() {
  return (
    <main className="onyx-shell">
      <ScrollExperience />

      <div className="scroll-progress"><span /></div>

      <nav className="nav nav-editorial">
        <Link className="logo-lockup" href="/" aria-label="ONYX Tattoo Studio">
          <img src="/brand/onyx-logo.png" alt="ONYX Tattoo Studio" />
        </Link>
        <div className="navlinks"><Link href="#gallery">WORK</Link><Link href="#process">PROCESS</Link><Link href="#styles">STYLES</Link><Link href="#studio">STUDIO</Link></div>
        <Link className="navcta" href="/booking">BOOK <span>↗</span></Link>
      </nav>

      <section className="hero hero-gallery">
        <div className="hero-brand-art" aria-hidden="true" />
        <div className="hero-photo"><div className="hero-photo-inner" /></div>
        <div className="hero-vignette" />
        <div className="hero-copy">
          <div className="eyebrow">INDORE · INDIA / APPOINTMENT ONLY</div>
          <div className="hero-title-stack">
            <div className="hero-line mask-line"><span>INK.</span></div>
            <div className="hero-line mask-line serif-line"><span>ART.</span></div>
            <div className="hero-line mask-line"><span>IDENTITY.</span></div>
          </div>
          <div className="hero-meta">
            <p>A PRIVATE TATTOO STUDIO WHERE PERSONAL STORIES BECOME PERMANENT VISUAL LANGUAGE.</p>
            <a href="#gallery" className="hero-scroll">ENTER THE GALLERY <b>↓</b></a>
          </div>
        </div>
        <div className="hero-index">001 <span>/</span> 007</div>
      </section>

      <section className="intro-panel">
        <div className="section-number">01</div>
        <div className="intro-copy reveal-up">
          <span className="eyebrow">THE ONYX APPROACH</span>
          <h2>NOT JUST A<br /><em>TATTOO.</em></h2>
          <p>Every piece begins with conversation. We study the idea, the placement, the anatomy and the visual weight before a needle touches skin.</p>
          <Link href="/booking" className="text-link">START A CONSULTATION <span>↗</span></Link>
        </div>
        <div className="intro-symbol" aria-hidden="true">✦</div>
      </section>

      <section id="gallery" className="gallery-wall">
        <div className="wall-header">
          <div><span className="eyebrow">02 / SELECTED WORK</span><h2>THE <em>INK</em> WALL</h2></div>
          <p>SCROLL / DRAG / EXPLORE</p>
        </div>
        <div className="gallery-stack">
          {gallery.map((item, i) => (
            <article className={"gallery-card gallery-card-" + (i + 1)} key={item.no}>
              <div className="gallery-image">
                <img src={item.image} alt={item.title} loading={i ? "lazy" : "eager"} />
                <div className="image-shade" />
                <span className="gallery-no">{item.no}</span>
                <span className="gallery-tag">{item.tag}</span>
              </div>
              <div className="gallery-caption"><h3>{item.title}</h3><span>ONYX / 2026</span></div>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="process-stage">
        <div className="process-sticky">
          <div className="process-intro">
            <span className="eyebrow">03 / THE PROCESS</span>
            <h2>THE<br /><em>RITUAL</em><br />OF INK.</h2>
            <div className="process-meter"><span /></div>
          </div>
          <div className="process-scenes">
            {[
              ["01", "CONVERSATION", "Find the story before finding the shape."],
              ["02", "COMPOSITION", "Build a design around your body, not a template."],
              ["03", "THE SESSION", "Controlled craft. Clean process. Total focus."],
              ["04", "AFTERCARE", "Protect the work so the artwork ages beautifully."]
            ].map(([no, title, copy]) => (
              <article className="process-scene" key={no}>
                <div className="scene-number">{no}</div>
                <div className="scene-copy"><span>{title}</span><h3>{copy}</h3></div>
                <div className="scene-circle">ONYX</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="styles" className="style-index">
        <div className="style-index-head"><span className="eyebrow">04 / SIGNATURE LANGUAGE</span><p>CHOOSE THE FEELING. WE BUILD THE PIECE.</p></div>
        <div className="style-list">
          {styles.map((style, i) => <Link href="/booking" className="style-item" key={style}><span>0{i + 1}</span><h3>{style}</h3><i>↗</i></Link>)}
        </div>
      </section>

      <section id="studio" className="studio-editorial">
        <div className="studio-art"><div className="studio-photo" /><div className="studio-art-label">INDORE / MP / 452018</div></div>
        <div className="studio-copy">
          <span className="eyebrow">05 / THE STUDIO</span>
          <h2>QUIET<br /><em>SPACE.</em><br />LOUD<br />ART.</h2>
          <p>Near Mr. DIY, Shreenagar Extension, Khajrana Road, Jhad Colony, Indore — 452018.</p>
          <div className="studio-tags"><span>HYGIENE FIRST</span><span>PRIVATE SESSIONS</span><span>CONSULTATION LED</span></div>
        </div>
      </section>

      <section className="final-mark">
        <div className="final-ring" />
        <span className="eyebrow">06 / YOUR TURN</span>
        <h2>MAKE YOUR<br /><em>MARK.</em></h2>
        <Link href="/booking" className="book-button">BOOK A SESSION <span>↗</span></Link>
        <p>INK. ART. IDENTITY.</p>
      </section>

      <footer className="footer footer-editorial">
        <div className="logo">ONYX<span>®</span></div>
        <div>INDORE · MADHYA PRADESH · INDIA</div>
        <div>© 2026 ONYX TATTOO STUDIO</div>
      </footer>
    </main>
  );
}
