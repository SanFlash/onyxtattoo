"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const modules=[
  ["Bookings","24","Today + upcoming sessions","/admin/bookings"],
  ["Consultations","08","Awaiting studio response","/admin/bookings?status=PENDING"],
  ["Customers","186","Profiles in the studio CRM","/admin/customers"],
  ["Portfolio","47","Published + draft pieces","/admin/portfolio"],
  ["Artists","03","Demo profiles / edit in CMS","/admin/artists"],
  ["Enquiries","12","New contact conversations","/admin/enquiries"],
];

const pipeline=[["VISIT","100%"],["CTA","31%"],["FORM START","14%"],["SUBMITTED","8%"],["CONFIRMED","5%"]];

export default function Admin(){
 const [command,setCommand]=useState("");
 const filtered=useMemo(()=>modules.filter(([name])=>name.toLowerCase().includes(command.toLowerCase())),[command]);
 return <main className="admin-shell">
  <aside className="admin-side">
   <Link href="/" className="admin-logo">ONYX<small>CONTROL</small></Link>
   <nav>{["Dashboard","Bookings","Calendar","Customers","Artists","Portfolio","Media","Services","Testimonials","Blog","Offers","Enquiries","Analytics","SEO","Settings","Audit Logs"].map((x,i)=><Link className={i===0?"active":""} href={`/admin/${i===0?"":x.toLowerCase().replace(/\s+/g,"-")}`} key={x}>{x}</Link>)}</nav>
  </aside>
  <section className="admin-main">
   <header className="admin-top"><div><span className="eyebrow">ONYX / ADMIN</span><h1>STUDIO<br/><em>CONTROL.</em></h1></div><div className="admin-actions"><button type="button" onClick={()=>document.getElementById("admin-search")?.focus()}>⌘ K</button><Link href="/">LIVE SITE ↗</Link></div></header>
   <div className="admin-search"><input id="admin-search" value={command} onChange={e=>setCommand(e.target.value)} placeholder="Search modules, customers, bookings…"/></div>
   <section className="admin-grid">{filtered.map(([name,value,copy,url])=><Link href={url} className="admin-module" key={name}><div><span className="eyebrow">{name}</span><strong>{value}</strong></div><p>{copy}</p><i>↗</i></Link>)}</section>
   <section className="admin-panels">
    <article><header><span className="eyebrow">BOOKING FLOW</span><strong>CONVERSION</strong></header><div className="pipeline">{pipeline.map(([label,value])=><div key={label}><span>{label}</span><b style={{width:value}}/><strong>{value}</strong></div>)}</div></article>
    <article><header><span className="eyebrow">TODAY</span><strong>OPERATIONS</strong></header><div className="op-list"><div><span>09:30</span><b>Consultation · Demo Customer</b><small>PENDING</small></div><div><span>12:00</span><b>Session · Demo Artist</b><small>CONFIRMED</small></div><div><span>16:30</span><b>Follow-up · Reference review</b><small>TODO</small></div></div></article>
   </section>
   <footer className="admin-foot"><span>Demo management interface. Connect protected RBAC/API modules to operate production data.</span><Link href="/booking">OPEN BOOKING FLOW ↗</Link></footer>
  </section>
 </main>
}