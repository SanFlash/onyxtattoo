import Link from "next/link";
import ScrollExperience from "./components/ScrollExperience";

const works = [
  { no:"01", type:"BLACK / GREY", title:"THE PORTRAIT", meta:"CUSTOM / 04H", image:"https://images.pexels.com/photos/13346118/pexels-photo-13346118.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { no:"02", type:"FINE LINE", title:"QUIET LINES", meta:"PRECISION / 02H", image:"https://images.pexels.com/photos/11364054/pexels-photo-11364054.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { no:"03", type:"BLACKWORK", title:"DARK FORM", meta:"COMPOSITION / 05H", image:"https://images.pexels.com/photos/20267349/pexels-photo-20267349.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { no:"04", type:"CUSTOM", title:"BODY / STORY", meta:"SESSION / 03H", image:"https://images.pexels.com/photos/14242280/pexels-photo-14242280.jpeg?auto=compress&cs=tinysrgb&w=1800" },
  { no:"05", type:"CRAFT", title:"THE MACHINE", meta:"DETAIL / 01H", image:"https://images.pexels.com/photos/34053888/pexels-photo-34053888.jpeg?auto=compress&cs=tinysrgb&w=1800" },
];

const styles = [
  ["01","REALISM"],["02","BLACK & GREY"],["03","FINE LINE"],["04","BLACKWORK"],
  ["05","GEOMETRIC"],["06","CUSTOM"],["07","COVER-UP"],["08","ORNAMENTAL"]
];

const process = [
  ["01","CONVERSATION","The story comes first."],
  ["02","COMPOSITION","Scale, flow and placement around the body."],
  ["03","PREPARATION","A clean, controlled environment."],
  ["04","INK","The session becomes craft."],
  ["05","AFTERCARE","The work continues after the needle leaves."]
];

export default function Home() {
  return (
    <main className="onyx-shell redesign">
      <ScrollExperience />

      <div className="noise-layer" aria-hidden="true" />
      <div className="scroll-progress redesign-progress"><span /></div>

      <header className="nav redesign-nav">
        <Link className="brand" href="/" aria-label="ONYX Tattoo Studio">
          <img src="/brand/onxy-logo.png" alt="ONYX Tattoo Studio" />
        </Link>
        <nav className="navlinks" aria-label="Primary">
          <Link href="#work">WORK</Link>
          <Link href="#artists">ARTISTS</Link>
          <Link href="#studio">STUDIO</Link>
          <Link href="#about">ABOUT</Link>
          <Link href="#contact">CONTACT</Link>
        </nav>
        <Link className="navcta" href="/booking">BOOK A SESSION <span>↗</span></Link>
      </header>

      <section className="re-hero">
        <div className="re-hero-media"><div className="re-hero-image" /></div>
        <div className="re-hero-overlay" />
        <div className="re-hero-grid" />
        <div className="re-loader-copy"><span>ONYX</span><small>TATTOO STUDIO / INDORE</small></div>
        <div className="re-hero-topline"><span>INDORE · MADHYA PRADESH · INDIA</span><span>APPOINTMENT ONLY</span></div>
        <div className="re-hero-copy">
          <span className="eyebrow">01 / INK. ART. IDENTITY.</span>
          <h1><span>YOUR SKIN.</span><em>OUR CANVAS.</em></h1>
          <p>Custom tattoo work shaped around your body, your story, and the way you want it to live on.</p>
          <div className="re-hero-actions">
            <Link className="re-btn re-btn-fill magnetic" href="/booking">BOOK YOUR SESSION <span>↗</span></Link>
            <a className="re-btn re-btn-line magnetic" href="#work">EXPLORE THE WORK <span>↓</span></a>
          </div>
        </div>
        <div className="re-hero-index">ONYX / 001</div>
        <div className="re-scroll-note"><span>SCROLL</span><i /></div>
      </section>

      <section className="re-manifesto" id="about">
        <div className="re-manifesto-pin">
          <div className="re-manifesto-word">EVERY MARK<br /><em>TELLS A STORY.</em></div>
          <div className="re-manifesto-image"><img src="https://images.pexels.com/photos/20509829/pexels-photo-20509829.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Tattoo process detail" /></div>
          <div className="re-manifesto-copy"><span className="eyebrow">THE ONYX POINT OF VIEW</span><p>We are not here to fill space. We build visual language for the body — considered, personal, and made to age with intention.</p></div>
        </div>
      </section>

      <section className="re-statement">
        <div className="re-statement-bg">MAKE IT<br /><em>MEAN</em><br />SOMETHING.</div>
        <div className="re-statement-main"><span className="eyebrow">02 / THE IDEA</span><h2>INK IS<br /><em>PERMANENT.</em></h2><p>So the experience should feel anything but ordinary.</p></div>
      </section>

      <section className="re-work" id="work">
        <div className="re-work-head">
          <div><span className="eyebrow">03 / SELECTED WORK</span><h2>THE<br /><em>ARCHIVE</em></h2></div>
          <p>Scroll through the ONYX index.<br />Tap a piece to view the detail.</p>
        </div>
        <div className="re-work-track" data-lenis-prevent>
          {works.map((item) => (
            <Link href={`/portfolio/${item.no}`} className="re-work-card" key={item.no}>
              <div className="re-work-image"><img src={item.image} alt={item.title} loading="lazy" /><span className="re-work-hover">VIEW</span><span className="re-work-no">{item.no}</span></div>
              <div className="re-work-meta"><strong>{item.title}</strong><span>{item.type} · {item.meta}</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="re-styles" id="styles">
        <div className="re-styles-copy"><span className="eyebrow">04 / SIGNATURE LANGUAGE</span><h2>FIND YOUR<br /><em>STYLE.</em></h2><p>From fine-line restraint to heavier blackwork, browse the directions that shape an ONYX session.</p></div>
        <div className="re-style-list">
          {styles.map(([no,name],i) => <Link className="re-style-row magnetic" href={`/styles/${name.toLowerCase().replace(/\s+/g,"-")}`} key={name}><span>{no}</span><h3>{name}</h3><i>↗</i><b style={{transformOrigin:"left center"}} /></Link>)}
        </div>
      </section>

      <section className="re-process" id="process">
        <div className="re-process-sticky">
          <div className="re-process-intro"><span className="eyebrow">05 / THE RITUAL</span><h2>FROM<br /><em>IDEA</em><br />TO INK.</h2><p>Five phases. One considered experience.</p><div className="re-process-line"><span /></div></div>
          <div className="re-process-scenes">
            {process.map(([no,title,copy]) => <article className="re-process-scene" key={no}><span className="scene-no">{no}</span><span className="eyebrow">{title}</span><h3>{copy}</h3><div className="scene-ghost">{title}</div></article>)}
          </div>
        </div>
      </section>

      <section className="re-artists" id="artists">
        <div className="re-section-head"><span className="eyebrow">06 / ARTISTS</span><h2>THE HAND<br /><em>BEHIND THE MARK.</em></h2></div>
        <div className="re-artist-grid">
          {[["01","ARTIST PROFILE","SPECIALTY / CUSTOM WORK","https://images.pexels.com/photos/7147775/pexels-photo-7147775.jpeg?auto=compress&cs=tinysrgb&w=1400"],["02","ARTIST PROFILE","SPECIALTY / FINE LINE","https://images.pexels.com/photos/4798434/pexels-photo-4798434.jpeg?auto=compress&cs=tinysrgb&w=1400"],["03","ARTIST PROFILE","SPECIALTY / BLACKWORK","https://images.pexels.com/photos/35645876/pexels-photo-35645876.jpeg?auto=compress&cs=tinysrgb&w=1400"]].map(([no,name,specialty,image]) => (
            <Link className="re-artist-card magnetic" href={`/artists/${no}`} key={no}><div className="re-artist-image"><img src={image} alt={name} loading="lazy" /><span>OPEN PROFILE ↗</span></div><div className="re-artist-meta"><small>{no}</small><strong>{name}</strong><em>{specialty}</em></div></Link>
          ))}
        </div>
      </section>

      <section className="re-studio" id="studio">
        <div className="re-studio-image"><img src="https://images.pexels.com/photos/20339300/pexels-photo-20339300.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="Tattoo studio atmosphere" loading="lazy" /><div className="re-studio-mark">QUIET SPACE.<br /><em>LOUD ART.</em></div></div>
        <div className="re-studio-copy"><span className="eyebrow">07 / THE STUDIO</span><h2>INDORE.<br /><em>ONYX.</em></h2><p>Near Mr. DIY, Shreenagar Extension, Khajrana Road, Jhad Colony, Indore — 452018.</p><div className="re-facts"><span>HYGIENE FIRST</span><span>PRIVATE SESSIONS</span><span>CONSULTATION LED</span></div><Link className="text-link magnetic" href="/studio">EXPLORE THE STUDIO ↗</Link></div>
      </section>

      <section className="re-trust">
        <div className="re-trust-panel"><span className="eyebrow">08 / THE DETAILS MATTER</span><h2>BUILT IN<br /><em>INK.</em></h2><p>Learn about the consultation process, hygiene protocols, preparation, and aftercare.</p><div className="re-trust-links"><Link href="/hygiene-safety">HYGIENE & SAFETY ↗</Link><Link href="/aftercare">AFTERCARE ↗</Link><Link href="/faq">FAQ ↗</Link></div></div>
        <div className="re-trust-image"><img src="https://images.pexels.com/photos/5088485/pexels-photo-5088485.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Tattoo detail" loading="lazy" /></div>
      </section>

      <section className="re-final" id="contact">
        <div className="re-final-image"><img src="https://images.pexels.com/photos/6593455/pexels-photo-6593455.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="Tattoo session" loading="lazy" /></div>
        <div className="re-final-overlay" />
        <div className="re-final-copy"><span className="eyebrow">09 / READY?</span><h2>MAKE IT<br /><em>PERMANENT.</em></h2><p>Start with a conversation.</p><div className="re-final-actions"><Link className="re-btn re-btn-fill magnetic" href="/booking">BOOK YOUR SESSION ↗</Link><Link className="re-btn re-btn-line magnetic" href="/contact">TALK TO ONYX ↗</Link></div></div>
      </section>

      <footer className="re-footer">
        <div><strong>ONYX</strong><span>TATTOO STUDIO</span></div>
        <div>INDORE · MADHYA PRADESH · INDIA<br />Near Mr. DIY, Shreenagar Extension</div>
        <div><Link href="/booking">BOOK</Link><Link href="/portfolio">WORK</Link><Link href="/contact">CONTACT</Link></div>
        <div>© 2026 ONYX TATTOO STUDIO</div>
      </footer>
    </main>
  );
}
