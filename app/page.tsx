import Link from "next/link";
import ScrollExperience from "./components/ScrollExperience";

const gallery = [
  { no:"01", title:"BLACK / GREY", tag:"PORTRAIT", image:"https://images.pexels.com/photos/13346118/pexels-photo-13346118.jpeg?auto=compress&cs=tinysrgb&w=2200" },
  { no:"02", title:"FINE LINE", tag:"PRECISION", image:"https://images.pexels.com/photos/11364054/pexels-photo-11364054.jpeg?auto=compress&cs=tinysrgb&w=2200" },
  { no:"03", title:"BLACKWORK", tag:"FORM", image:"https://images.pexels.com/photos/20267349/pexels-photo-20267349.jpeg?auto=compress&cs=tinysrgb&w=2200" },
  { no:"04", title:"CUSTOM PIECE", tag:"SESSION", image:"https://images.pexels.com/photos/14242280/pexels-photo-14242280.jpeg?auto=compress&cs=tinysrgb&w=2200" },
  { no:"05", title:"THE MACHINE", tag:"CRAFT", image:"https://images.pexels.com/photos/34053888/pexels-photo-34053888.jpeg?auto=compress&cs=tinysrgb&w=2200" },
  { no:"06", title:"INK / DETAIL", tag:"PROCESS", image:"https://images.pexels.com/photos/6593455/pexels-photo-6593455.jpeg?auto=compress&cs=tinysrgb&w=2200" },
  { no:"07", title:"THE ARTIST", tag:"FOCUS", image:"https://images.pexels.com/photos/18875613/pexels-photo-18875613.jpeg?auto=compress&cs=tinysrgb&w=2200" },
];

const styles = ["REALISM","BLACK & GREY","FINE LINE","BLACKWORK","NEO TRADITIONAL","GEOMETRIC"];

const details = [
  ["01","THE LINE","https://images.pexels.com/photos/20509829/pexels-photo-20509829.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["02","THE NEEDLE","https://images.pexels.com/photos/7147775/pexels-photo-7147775.jpeg?auto=compress&cs=tinysrgb&w=1600"],
  ["03","THE CRAFT","https://images.pexels.com/photos/4798434/pexels-photo-4798434.jpeg?auto=compress&cs=tinysrgb&w=1600"],
];

export default function Home() {
  return (
    <main className="onyx-shell">
      <ScrollExperience />
      <div className="scroll-progress"><span /></div>

      <nav className="nav">
        <Link className="logo-lockup" href="/" aria-label="ONYX Tattoo Studio">
          <span className="brand-symbol" aria-hidden="true">✦</span><span className="logo-onyx">ONYX</span><small>TATTOO STUDIO</small>
        </Link>
        <div className="navlinks">
          <Link href="#work">WORK</Link><Link href="#process">PROCESS</Link><Link href="#styles">STYLES</Link><Link href="#studio">STUDIO</Link>
        </div>
        <Link className="navcta magnetic" href="/booking">BOOK <span>↗</span></Link>
      </nav>

      <section className="hero">
        <div className="hero-photo"><div className="hero-photo-inner" /></div>
        <div className="hero-light" /><div className="hero-vignette" /><div className="hero-grid-lines" />
        <div className="hero-brand" aria-label="ONYX Tattoo Studio"><span>✦</span><strong>ONYX</strong><small>TATTOO STUDIO</small></div>
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">INDORE / INDIA — APPOINTMENT ONLY</div>
          <div className="hero-title-stack">
            <div className="hero-line"><span>INK.</span></div>
            <div className="hero-line serif-line"><span>ART.</span></div>
            <div className="hero-line"><span>IDENTITY.</span></div>
          </div>
          <div className="hero-meta">
            <p>PERSONAL STORIES. CUSTOM COMPOSITIONS. PERMANENT VISUAL LANGUAGE.</p>
            <a href="#work" className="hero-scroll magnetic">SCROLL TO EXPLORE <b>↓</b></a>
          </div>
        </div>
        <div className="hero-side">ONYX / 001—007</div>
        <div className="hero-scroll-cue"><span>SCROLL</span><i /></div>
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      </section>

      <section className="marquee-band" aria-label="Onyx statement">
        <div className="marquee-track"><span>MAKE YOUR MARK</span><b>✦</b><span>INK / ART / IDENTITY</span><b>✦</b><span>MAKE YOUR MARK</span><b>✦</b><span>INK / ART / IDENTITY</span><b>✦</b></div>
      </section>

      <section className="manifesto">
        <div className="manifesto-number">01</div>
        <div className="manifesto-image reveal-image">
          <img src="https://images.pexels.com/photos/20267349/pexels-photo-20267349.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Tattoo artist working on a client" />
          <span className="image-stamp">ONYX / CRAFT / 001</span>
        </div>
        <div className="manifesto-copy">
          <span className="eyebrow">THE ONYX METHOD</span>
          <h2>BUILT FOR<br /><em>YOUR</em> BODY.</h2>
          <p>We don't pull a design from a wall and call it finished. Every composition is developed around your anatomy, your story and the way the tattoo should age.</p>
          <Link className="text-link magnetic" href="/booking">BEGIN A CONSULTATION ↗</Link>
        </div>
      </section>

      <section className="quote-stage">
        <div className="quote-word quote-left">YOUR</div>
        <div className="quote-center"><span className="eyebrow">NOT A TEMPLATE</span><h2>ONE BODY.<br /><em>ONE STORY.</em><br />ONE MARK.</h2></div>
        <div className="quote-word quote-right">STORY</div>
      </section>

      <section id="work" className="horizontal-stage">
        <div className="horizontal-viewport">
          <div className="horizontal-intro">
            <span className="eyebrow">02 / SELECTED WORK</span><h2>THE<br /><em>INK</em><br />ARCHIVE.</h2>
            <p>SCROLL THROUGH<br />THE ONYX INDEX</p><span className="archive-count">07 / 07</span>
          </div>
          <div className="horizontal-track" data-lenis-prevent>
            {gallery.map((item, i) => (
              <article className="archive-card" key={item.no}>
                <div className="archive-image">
                  <img src={item.image} alt={item.title} loading={i < 2 ? "eager" : "lazy"} />
                  <div className="archive-overlay" /><span className="archive-no">{item.no}</span><span className="archive-tag">{item.tag}</span><span className="archive-focus">FOCUS +</span>
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
            <span className="eyebrow">03 / THE RITUAL</span><h2>FROM<br /><em>IDEA</em><br />TO INK.</h2>
            <div className="process-progress"><span /></div><p>KEEP SCROLLING<br />TO MOVE THROUGH THE SESSION</p>
          </div>
          <div className="process-scenes">
            {[
              ["01","CONVERSATION","The story comes first. We listen, reference and define the feeling.","LISTEN"],
              ["02","COMPOSITION","We build scale, flow and placement around the body.","DESIGN"],
              ["03","THE SESSION","A focused, controlled environment where craft takes over.","EXECUTE"],
              ["04","AFTERCARE","The work continues after the needle leaves the skin.","PRESERVE"]
            ].map(([no,title,copy,word]) => (
              <article className="process-scene" key={no}>
                <span className="scene-no">{no}</span><div className="scene-body"><span className="scene-label">{title}</span><h3>{copy}</h3></div>
                <span className="scene-word">{word}</span><span className="scene-mark">✦</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-stage">
        <div className="detail-heading"><span className="eyebrow">04 / CRAFT IN DETAIL</span><h2>SMALL<br /><em>MOVEMENTS.</em><br />BIG IMPACT.</h2></div>
        <div className="detail-grid">
          {details.map(([no,title,image], i) => (
            <figure className={"detail-card detail-card-" + (i+1)} key={no}>
              <div className="detail-image"><img src={image} alt={title} loading="lazy" /></div>
              <figcaption><span>{no}</span><strong>{title}</strong><i>↗</i></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="depth-gallery">
        <div className="depth-copy"><span className="eyebrow">05 / DEPTH & MOVEMENT</span><h2>LOOK<br /><em>CLOSER.</em></h2><p>Needle, line, shadow and skin. The closer you look, the more the artwork reveals itself.</p>
          <div className="depth-stat"><strong>100%</strong><span>CUSTOM<br />COMPOSITIONS</span></div>
        </div>
        <div className="depth-stack">
          <div className="depth-photo depth-one"><img src="https://images.pexels.com/photos/11364054/pexels-photo-11364054.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Close-up tattoo work" /></div>
          <div className="depth-photo depth-two"><img src="https://images.pexels.com/photos/13346106/pexels-photo-13346106.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Tattoo artist at work" /></div>
          <div className="depth-photo depth-three"><img src="https://images.pexels.com/photos/5088485/pexels-photo-5088485.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Tattoo session in studio" /></div>
        </div>
      </section>

      <section id="styles" className="style-index">
        <div className="style-index-head"><span className="eyebrow">06 / SIGNATURE LANGUAGE</span><p>ONE STYLE. MANY STORIES.</p></div>
        <div className="style-list">
          {styles.map((style,i)=><Link href="/booking" className="style-item magnetic" key={style}><span>0{i+1}</span><h3>{style}</h3><i>↗</i><b /></Link>)}
        </div>
      </section>

      <section id="studio" className="studio-editorial">
        <div className="studio-frame">
          <img src="https://images.pexels.com/photos/20339300/pexels-photo-20339300.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="Tattoo studio session" />
          <div className="studio-frame-shade" /><span>INDORE / MP / 452018</span><strong>ONYX</strong>
        </div>
        <div className="studio-copy"><span className="eyebrow">07 / THE STUDIO</span><h2>QUIET<br /><em>SPACE.</em><br />LOUD<br />ART.</h2><p>Near Mr. DIY, Shreenagar Extension, Khajrana Road, Jhad Colony, Indore — 452018.</p>
          <div className="studio-tags"><span>HYGIENE FIRST</span><span>PRIVATE SESSIONS</span><span>CONSULTATION LED</span></div>
          <Link className="studio-link magnetic" href="/booking">VISIT ONYX <span>↗</span></Link>
        </div>
      </section>

      <section className="final-mark">
        <div className="final-noise" /><div className="final-ring" /><div className="final-ring final-ring-small" />
        <div className="final-word"><span>MAKE</span> <em>YOUR</em><br /><span>MARK.</span></div>
        <Link href="/booking" className="book-button magnetic">BOOK A SESSION <span>↗</span></Link><p>INK. ART. IDENTITY.</p>
      </section>

      <footer className="footer"><div className="footer-brand"><span className="footer-mark">✦</span><div className="logo">ONYX<span>®</span></div><small>TATTOO STUDIO</small></div><div>INDORE · MADHYA PRADESH · INDIA</div><div>© 2026 ONYX TATTOO STUDIO</div></footer>
    </main>
  );
}
