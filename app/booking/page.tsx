"use client";
import {FormEvent,useState} from "react";
import Link from "next/link";

export default function Booking(){
 const [status,setStatus]=useState("");
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setStatus("Submitting…");const data=Object.fromEntries(new FormData(e.currentTarget));const r=await fetch("/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const j=await r.json();setStatus(r.ok?\`Request received — \${j.bookingNumber}\`:(j.error||"Something went wrong"));if(r.ok)e.currentTarget.reset();}
 return <main><nav className="nav"><Link className="logo" href="/">ONYX</Link><Link className="navcta" href="/">HOME</Link></nav><section style={{paddingTop:160}}><div className="section-label">BOOK A SESSION</div><p className="statement">YOUR SESSION <em>STARTS</em> HERE.</p><form onSubmit={submit} style={{maxWidth:760,display:"grid",gap:16,marginTop:45}}>
 {["name","phone","email","service","style","placement","size","preferredDate","preferredTime"].map(name=><input key={name} name={name} required={["name","phone","service"].includes(name)} placeholder={name.replace(/([A-Z])/g," $1")} type={name==="preferredDate"?"date":name==="email"?"email":"text"} style={{background:"#111",border:"1px solid #333",padding:16,color:"#eee"}}/>)}<textarea name="description" required placeholder="Tell us about your tattoo idea, meaning, references and anything else we should know." rows={7} style={{background:"#111",border:"1px solid #333",padding:16,color:"#eee"}}/><button className="btn primary" type="submit">SUBMIT REQUEST</button><p className="muted">{status}</p></form></section></main>
}