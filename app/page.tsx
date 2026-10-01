import Link from "next/link";

const styles=["REALISM","BLACK & GREY","FINE LINE","TRADITIONAL","NEO TRADITIONAL","GEOMETRIC","MANDALA","LETTERING","COVER-UP"];

export default function Home(){
  return <main className="onyx-shell">
    <nav className="nav"><Link className="logo" href="/">ONYX</Link><div className="navlinks"><Link href="#work">WORK</Link><Link href="#artists">ARTISTS</Link><Link href="#studio">STUDIO</Link><Link href="#services">SERVICES</Link><Link href="#contact">CONTACT</Link></div><Link className="navcta" href="/booking">BOOK A SESSION</Link></nav>
    <section className="hero"><div className="hero-inner"><div className="eyebrow">INDORE · MADHYA PRADESH · INDIA</div><h1 className="hero-title">INK.<br/><em>ART.</em><br/>IDENTITY.</h1><p className="hero-copy">A premium tattoo studio built around intentional design, skilled artistry and work that belongs to the person wearing it.</p><div className="actions"><Link className="btn primary" href="/booking">Book a session</Link><Link className="btn" href="#work">Explore the work</Link></div></div></section>
    <section><div className="section-label">01 / THE IDEA</div><p className="statement">EVERY MARK <em>TELLS</em> A STORY.</p></section>
    <section id="work"><div className="section-label">02 / THE WORK</div><div className="grid" style={{marginTop:40}}>{styles.slice(0,6).map((s,i)=><article className="card" key={s}><div className="muted">0{i+1}</div><h3>{s}</h3><p className="muted">Explore original ONYX tattoo work and custom concepts.</p></article>)}</div></section>
    <section id="artists"><div className="section-label">03 / ARTISTS</div><p className="statement">THE HAND <em>BEHIND</em> THE INK.</p><p className="hero-copy">Artist profiles, specialties and portfolio management are ready to connect to the CMS and booking system.</p></section>
    <section id="studio"><div className="section-label">04 / STUDIO</div><p className="statement">BUILT FOR <em>PERMANENCE.</em></p><p className="hero-copy">Shreenagar Extension · Khajrana Road · Indore 452018.</p></section>
    <section id="services"><div className="section-label">05 / SERVICES</div><div className="grid" style={{marginTop:40}}>{["Custom Tattoos","Cover-ups & Reworks","Fine Line","Black & Grey","Consultation","Aftercare"].map(x=><article className="card" key={x}><h3>{x}</h3><p className="muted">Consultation-led service with transparent next steps.</p></article>)}</div></section>
    <section id="contact"><div className="section-label">06 / MAKE IT PERMANENT</div><p className="statement">READY TO <em>MAKE</em> YOUR MARK?</p><div className="actions"><Link className="btn primary" href="/booking">Book your session</Link></div></section>
    <footer className="footer"><div className="logo">ONYX TATTOO STUDIO</div><p className="muted">INK. ART. IDENTITY.</p><p className="muted">Near Mr. DIY, Shreenagar Extension, Khajrana Road, Indore – 452018</p></footer>
  </main>
}