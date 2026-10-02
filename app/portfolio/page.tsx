import Link from "next/link";

const works=[
  ["01","THE PORTRAIT","BLACK / GREY","https://images.pexels.com/photos/13346118/pexels-photo-13346118.jpeg?auto=compress&cs=tinysrgb&w=1800"],
  ["02","QUIET LINES","FINE LINE","https://images.pexels.com/photos/11364054/pexels-photo-11364054.jpeg?auto=compress&cs=tinysrgb&w=1800"],
  ["03","DARK FORM","BLACKWORK","https://images.pexels.com/photos/20267349/pexels-photo-20267349.jpeg?auto=compress&cs=tinysrgb&w=1800"],
  ["04","BODY / STORY","CUSTOM","https://images.pexels.com/photos/14242280/pexels-photo-14242280.jpeg?auto=compress&cs=tinysrgb&w=1800"],
];
export default function Portfolio(){
 return <main className="inner-page">
  <nav className="inner-nav"><Link href="/">ONYX</Link><Link className="navcta" href="/booking">BOOK A SESSION ↗</Link></nav>
  <section className="inner-hero"><span className="eyebrow">WORK / 001</span><h1>THE<br/><em>ARCHIVE.</em></h1><p>Selected ONYX work and visual studies. Demonstration content is clearly presented as such until real studio content is supplied.</p></section>
  <section className="inner-grid">{works.map(([no,title,style,image])=><Link href={`/portfolio/${no}`} className="inner-card" key={no}><div><img src={image} alt={title} loading="lazy"/><span>{no} / VIEW ↗</span></div><strong>{title}</strong><small>{style}</small></Link>)}</section>
 </main>
}