import Link from "next/link";
import ScrollExperience from "./components/ScrollExperience";

const imageWork = [
  { title: "THE CRAFT", meta: "Precision / Process / Detail", image: "https://images.unsplash.com/photo-1753259789341-808371092e19?auto=format&fit=crop&fm=jpg&q=85&w=1800" },
  { title: "THE MARK", meta: "Custom / Black & Grey / Identity", image: "https://images.unsplash.com/photo-1775135332562-9ff99e65a616?auto=format&fit=crop&fm=jpg&q=85&w=1800" },
  { title: "THE SESSION", meta: "Consultation / Composition / Skin", image: "https://images.unsplash.com/photo-1679621550970-32d6587b62c4?auto=format&fit=crop&fm=jpg&q=85&w=1800" },
  { title: "THE STUDIO", meta: "Atmosphere / Hygiene / Focus", image: "https://images.unsplash.com/photo-1780901090185-0a22ff65ac58?auto=format&fit=crop&fm=jpg&q=85&w=1800" },
];

const styles = ["REALISM", "BLACK & GREY", "FINE LINE", "TRADITIONAL", "NEO TRADITIONAL", "GEOMETRIC"];

export default function Home() {
  return <main className="onyx-shell">
    <ScrollExperience />
    <nav className="nav">
      <Link className="logo-lockup" href="/" aria-label="ONYX Tattoo Studio"><img src="/brand/onyx-logo.png" alt="ONYX Tattoo Studio" /></Link>
      <div className="navlinks"><Link href="#work">WORK</Link><Link href="#artists">ARTISTS</Link><Link href="#studio">STUDIO</Link><Link href="#services">SERVICES</Link></div>
      <Link className="navcta" href="/booking">BOOK A SESSION <span>↗</span></Link>
    </nav>

    <section className="hero">
      <div className="hero-visual-wrap"><div className="hero-visual" /><div className="hero-overlay" /><div className="hero-grain" /></div>
      <div className="hero-inner">
        <div className="hero-topline"><span>INDORE · MADHYA PRADESH · INDIA</span><span>EST. 2026 / CUSTOM TATTOO STUDIO</span></div>
        <h1 className="hero-title"><span className="word">INK.</span><span className="word serif">ART.</span><span className="word">IDENTITY.</span></h1>
        <div className="hero-bottom"><p>WE CREATE TATTOOS WITH THE WEIGHT OF ART AND THE INTENTION OF SOMETHING MADE TO LAST.</p><a href="#work" className="scroll-cue"><span>SCROLL TO EXPLORE</span><i>↓</i></a></div>
      </div>
    </section>

    <section className="manifesto mood-section velocity-skew">
      <div className="section-label">01 / THE IDEA</div><div className="floating-mark">✦</div>
      <div className="manifesto-grid"><p className="statement reveal">EVERY MARK <em>TELLS</em> A STORY.</p><div className="manifesto-copy reveal"><span className="red-dot" /><p>ONYX is a consultation-led tattoo studio for people who want more than a design. We build a visual language around your story, placement, skin and the way you want the piece to live for years.</p><Link href="/booking">START WITH A CONSULTATION ↗</Link></div></div>
    </section>

    <section id="work" className="work-section mood-section velocity-skew">
      <div className="section-head reveal"><div><div className="section-label">02 / SELECTED WORK</div><h2 className="drift">MADE <em>ON</em> SKIN.</h2></div><span className="work-count">04 / 04</span></div>
      <div className="work-masonry">{imageWork.slice(0, 3).map((item, i) => <article className={["work-card","reveal","work-card-" + (i + 1)].join(" ")} key={item.title}><div className="image-frame"><img src={item.image} alt={item.title} loading={i === 0 ? "eager" : "lazy"} /><span className="image-index">0{i + 1}</span></div><div className="work-meta"><h3>{item.title}</h3><p>{item.meta}</p></div></article>)}</div>
    </section>

    <section className="horizontal-section" aria-label="ONYX process"><svg className="ink-line" viewBox="0 0 1200 180" aria-hidden="true"><path className="ink-path" d="M10 120 C180 10 300 170 470 82 S760 18 920 104 S1080 170 1190 45" /></svg><div className="horizontal-track"><div className="horizontal-intro horizontal-panel"><div className="section-label">03 / THE PROCESS</div><h2>FROM <em>IDEA</em><br />TO INK.</h2><p>Scroll through the ONYX experience.</p></div>{["01 / CONSULT","02 / DESIGN","03 / SESSION","04 / AFTERCARE"].map((step, i) => <article className="process-panel horizontal-panel" key={step}><div className="process-number">{String(i + 1).padStart(2, "0")}</div><div><span>{step}</span><h3>{["UNDERSTAND THE STORY.","BUILD THE COMPOSITION.","MAKE THE MARK.","KEEP IT BEAUTIFUL."][i]}</h3></div><div className="process-line" /></article>)}</div></section>

    <section id="artists" className="artists-section mood-section velocity-skew"><div className="section-label">04 / THE ARTISTS</div><div className="artist-feature"><div className="artist-photo reveal"><img src={imageWork[3].image} alt="Tattoo studio session" loading="lazy" /><div className="artist-stamp ink-orbit">ONYX · ONYX · ONYX · </div></div><div className="artist-copy reveal"><span>THE HAND BEHIND THE INK</span><h2>CRAFT<br /><em>WITH</em><br />INTENT.</h2><p>Artist profiles, specialties, availability and portfolios are designed to connect directly with the booking and CMS system as ONYX grows.</p><Link href="#services" className="btn">EXPLORE SPECIALTIES ↗</Link></div></div></section>

    <section id="services" className="styles-section"><div className="section-label">05 / SIGNATURE STYLES</div><div className="styles-list">{styles.map((style, i) => <div className="style-row reveal" key={style}><span>0{i + 1}</span><h3>{style}</h3><b>↗</b></div>)}</div></section>

    <section id="studio" className="studio-section mood-section velocity-skew"><div className="studio-image reveal"><img className="parallax" src={imageWork[2].image} alt="Tattoo session in a professional studio" loading="lazy" /></div><div className="studio-copy reveal"><div className="section-label">06 / THE STUDIO</div><h2>A SPACE<br />BUILT FOR<br /><em>PERMANENCE.</em></h2><p>Near Mr. DIY, Shreenagar Extension, Khajrana Road, Jhad Colony, Indore — 452018.</p><div className="studio-facts"><span>HYGIENE FIRST</span><span>PRIVATE CONSULTATIONS</span><span>APPOINTMENT LED</span></div></div></section>

    <section className="cta-section mood-section velocity-skew"><div className="cta-orb" /><div className="section-label">07 / MAKE IT PERMANENT</div><h2 className="drift">READY TO <em>MAKE</em><br />YOUR MARK?</h2><Link href="/booking" className="btn primary large">BOOK YOUR SESSION ↗</Link></section>

    <footer className="footer" id="contact"><div><div className="logo">ONYX<span>®</span></div><p>INK. ART. IDENTITY.</p></div><div><p>INDORE, MADHYA PRADESH</p><p>NEAR MR. DIY · KHAJRANA ROAD</p></div><div><p>© 2026 ONYX TATTOO STUDIO</p><p>ALL MARKS RESERVED.</p></div></footer>
  </main>;
}