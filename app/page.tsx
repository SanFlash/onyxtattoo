import Link from "next/link";
import ScrollExperience from "./components/ScrollExperience";

const gallery = [
  { no:"01", title:"REALISM / PORTRAIT", tag:"BLACK + GREY", image:"https://images.pexels.com/photos/13346118/pexels-photo-13346118.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { no:"02", title:"PRECISION / LINE", tag:"FINE LINE", image:"https://images.pexels.com/photos/11364054/pexels-photo-11364054.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { no:"03", title:"BLACKWORK / FORM", tag:"BLACKWORK", image:"https://images.pexels.com/photos/20267349/pexels-photo-20267349.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { no:"04", title:"THE SESSION", tag:"CRAFT", image:"https://images.pexels.com/photos/20339300/pexels-photo-20339300.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { no:"05", title:"STUDIO / DETAIL", tag:"ONYX", image:"https://images.pexels.com/photos/34053888/pexels-photo-34053888.jpeg?auto=compress&cs=tinysrgb&w=1800" },
];

const styles = ["REALISM","BLACK & GREY","FINE LINE","BLACKWORK","NEO TRADITIONAL","GEOMETRIC"];

export default function Home() {
  return (
    <main className="onyx-shell">
      <ScrollExperience />
      <div className="scroll-progress"><span /></div>

      <nav className="nav">
        <Link className="logo-lockup" href="/" aria-label="ONYX Tattoo Studio">
          <span className="logo-onyx">ONYX</span><small>TATTOO STUDIO</small>
        </Link>
        <div className="navlinks">
          <Link href="#work">WORK</Link><Link href="#process">PROCESS</Link><Link href="#styles">STYLES</Link><Link href="#studio">STUDIO</Link>
        </div>
        <Link className="navcta" href="/booking">BOOK <span>↗</span></Link>
      </nav>

      <section className="hero">
        <div className="hero-photo"><div className="hero-photo-inner" /></div>
        <div className="hero-vignette" />
        <div className="hero-grid-lines" />
        <div className="hero-copy">
          <div className="eyebrow">INDORE / INDIA — APPOINTMENT ONLY</div>
          <div className="hero-title-stack">
            <div className="hero-line"><span>INK.</span></div>
            <div className="hero-line serif-line"><span>ART.</span></div>
            <div className="hero-line"><span>IDENTITY.</span></div>
          </div>
          <div className="hero-meta">
            <p>PERSONAL STORIES. CUSTOM COMPOSITIONS. PERMANENT VISUAL LANGUAGE.</p>
            <a href="#work" className="hero-scroll">SCROLL TO EXPLORE <b>↓</b></a>
          </div>
        </div>
        <div className="hero-side">ONYX / 001—007</div>
      </section>

      <section className="manifesto">
        <div className="manifesto-number">01</div>
        <div className="manifesto-image reveal-image"><img src="https://images.pexels.com/photos/20267349/pexels-photo-20267349.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Tattoo artist working on a client" /></div>
        <div className="manifesto-copy">
          <span className="eyebrow">THE ONYX METHOD</span>
          <h2>BUILT FOR<br /><em>YOUR</em> BODY.</h2>
          <p>We don't pull a design from a wall and call it finished. Every composition is developed around your anatomy, your story and the way the tattoo should age.</p>
          <Link className="text-link" href="/booking">BEGIN A CONSULTATION ↗</Link>
        </div>
      </section>

      <section id="work" className="horizontal-stage">
        <div className="horizontal-viewport">
          <div className="horizontal-intro">
            <span className="eyebrow">02 / SELECTED WORK</span>
            <h2>THE<br /><em>INK</em><br />ARCHIVE.</h2>
            <span className="archive-count">05 / 05</span>
          </div>
          <div className="horizontal-track">
            {gallery.map((item, i) => (
              <article className="archive-card" key={item.no}>
                <div className="archive-image">
                  <img src={item.image} alt={item.title} loading={i === 0 ? "eager" : "lazy"} />
                  <div className="archive-overlay" />
                  <span className="archive-no">{item.no}</span>
                  <span className="archive-tag">{item.tag}</span>
                </div>
                <div className="archive-caption"><strong>{item.title}</strong><span>ONYX / 2026</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="process-stage">
        <div className="process-sticky">
          <div className="process-copy">
            <span className="eyebrow">03 / THE RITUAL</span>
            <h2>FROM<br /><em>IDEA</em><br />TO INK.</h2>
            <div className="process-progress"><span /></div>
          </div>
          <div className="process-scenes">
            {[
              ["01","CONVERSATION","The story comes first. We listen, reference and define the feeling."],
              ["02","COMPOSITION","We build scale, flow and placement around the body."],
              ["03","THE SESSION","A focused, controlled environment where craft takes over."],
              ["04","AFTERCARE","The work continues after the needle leaves the skin."]
            ].map(([no,title,copy]) => (
              <article className="process-scene" key={no}>
                <span className="scene-no">{no}</span>
                <div><span className="scene-label">{title}</span><h3>{copy}</h3></div>
                <span className="scene-mark">✦</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="depth-gallery">
        <div className="depth-copy">
          <span className="eyebrow">04 / CRAFT IN DETAIL</span>
          <h2>WATCH<br /><em>THE</em><br />DETAIL.</h2>
          <p>Needle, line, shadow and skin. The closer you look, the more the artwork reveals itself.</p>
        </div>
        <div className="depth-stack">
          <div className="depth-photo depth-one"><img src="https://images.pexels.com/photos/11364054/pexels-photo-11364054.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Close-up tattoo work" /></div>
          <div className="depth-photo depth-two"><img src="https://images.pexels.com/photos/13346118/pexels-photo-13346118.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Tattoo artist at work" /></div>
          <div className="depth-photo depth-three"><img src="https://images.pexels.com/photos/34053888/pexels-photo-34053888.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Tattoo session in studio" /></div>
        </div>
      </section>

      <section id="styles" className="style-index">
        <div className="style-index-head"><span className="eyebrow">05 / SIGNATURE LANGUAGE</span><p>ONE STYLE. MANY STORIES.</p></div>
        <div className="style-list">
          {styles.map((style,i)=><Link href="/booking" className="style-item" key={style}><span>0{i+1}</span><h3>{style}</h3><i>↗</i></Link>)}
        </div>
      </section>

      <section id="studio" className="studio-editorial">
        <div className="studio-frame">
          <img src="https://images.pexels.com/photos/20339300/pexels-photo-20339300.jpeg?auto=compress&cs=tinysrgb&w=2000" alt="Tattoo studio session" />
          <span>INDORE / MP / 452018</span>
        </div>
        <div className="studio-copy">
          <span className="eyebrow">06 / THE STUDIO</span>
          <h2>QUIET<br /><em>SPACE.</em><br />LOUD<br />ART.</h2>
          <p>Near Mr. DIY, Shreenagar Extension, Khajrana Road, Jhad Colony, Indore — 452018.</p>
          <div className="studio-tags"><span>HYGIENE FIRST</span><span>PRIVATE SESSIONS</span><span>CONSULTATION LED</span></div>
        </div>
      </section>

      <section className="final-mark">
        <div className="final-ring" />
        <div className="final-word">MAKE YOUR <em>MARK.</em></div>
        <Link href="/booking" className="book-button">BOOK A SESSION <span>↗</span></Link>
        <p>INK. ART. IDENTITY.</p>
      </section>

      <footer className="footer">
        <div className="logo">ONYX<span>®</span></div><div>INDORE · MADHYA PRADESH · INDIA</div><div>© 2026 ONYX TATTOO STUDIO</div>
      </footer>
    </main>
  );
}
