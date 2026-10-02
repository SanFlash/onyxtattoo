"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";

const steps=["SERVICE","STYLE","ARTIST","PLACEMENT","DATE","DETAILS","REVIEW"];
const services=["Custom Tattoo","Consultation","Cover-up / Rework","Flash Tattoo"];
const styles=["Realism","Black & Grey","Fine Line","Blackwork","Geometric","Custom","Cover-up","Ornamental"];

export default function Booking(){
 const [step,setStep]=useState(0);
 const [status,setStatus]=useState("");
 const [form,setForm]=useState<Record<string,string>>({});
 const update=(k:string,v:string)=>setForm(x=>({...x,[k]:v}));
 const canNext=useMemo(()=>{
  if(step===0)return !!form.service;
  if(step===1)return !!form.style;
  if(step===2)return !!form.artist;
  if(step===3)return !!form.placement;
  if(step===4)return !!form.preferredDate;
  if(step===5)return !!form.name&&!!form.phone&&!!form.description;
  return true;
 },[step,form]);
 async function submit(e?:FormEvent){
  e?.preventDefault();setStatus("Submitting your session request…");
  try{const r=await fetch("/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form})});const data=await r.json();if(!r.ok){setStatus(data.error||"Unable to submit");return}setStatus(`SESSION REQUEST RECEIVED · ${data.bookingNumber}`);setStep(6);setForm(x=>x)}
  catch{setStatus("Unable to submit right now. Please try again.")}
 }
 return <main className="booking-page">
  <div className="booking-image"><img src="https://images.pexels.com/photos/6593455/pexels-photo-6593455.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Tattoo session"/></div>
  <div className="booking-shade"/>
  <nav className="booking-nav"><Link href="/">ONYX</Link><span>BOOKING / {String(step+1).padStart(2,"0")}</span><Link href="/">CLOSE ×</Link></nav>
  <section className="booking-shell">
   <div className="booking-head"><span className="eyebrow">ONYX / PRIVATE SESSION</span><h1>START<br/><em>HERE.</em></h1><p>Tell us what you have in mind. The first step is simply a conversation.</p></div>
   <div className="booking-progress">{steps.map((s,i)=><button key={s} className={i===step?"active":i<step?"done":""} onClick={()=>i<=step&&setStep(i)}>{String(i+1).padStart(2,"0")} {s}</button>)}</div>
   <form onSubmit={submit} className="booking-card">
    {step===0&&<Fieldset title="What are we planning?"><div className="choice-grid">{services.map(x=><button type="button" className={form.service===x?"selected":""} onClick={()=>update("service",x)} key={x}>{x}</button>)}</div></Fieldset>}
    {step===1&&<Fieldset title="Choose a visual direction"><div className="choice-grid">{styles.map(x=><button type="button" className={form.style===x?"selected":""} onClick={()=>update("style",x)} key={x}>{x}</button>)}</div></Fieldset>}
    {step===2&&<Fieldset title="Preferred artist"><div className="choice-grid">{["Artist One · Demo","Artist Two · Demo","Artist Three · Demo","No preference"].map(x=><button type="button" className={form.artist===x?"selected":""} onClick={()=>update("artist",x)} key={x}>{x}</button>)}</div><small>Demo profiles are placeholders until real ONYX artist data is added.</small></Fieldset>}
    {step===3&&<Fieldset title="Where will it live?"><div className="choice-grid">{["Forearm","Upper arm","Shoulder","Chest","Back","Leg / Thigh","Calf","Other"].map(x=><button type="button" className={form.placement===x?"selected":""} onClick={()=>update("placement",x)} key={x}>{x}</button>)}</div></Fieldset>}
    {step===4&&<Fieldset title="Preferred timing"><div className="booking-fields"><label>Preferred date<input required type="date" value={form.preferredDate||""} onChange={e=>update("preferredDate",e.target.value)}/></label><label>Preferred time<input type="text" placeholder="e.g. afternoon" value={form.preferredTime||""} onChange={e=>update("preferredTime",e.target.value)}/></label><label>Approx. size<input type="text" placeholder="e.g. 4–6 inches" value={form.size||""} onChange={e=>update("size",e.target.value)}/></label></div></Fieldset>}
    {step===5&&<Fieldset title="Tell us about you"><div className="booking-fields"><label>Name<input required value={form.name||""} onChange={e=>update("name",e.target.value)}/></label><label>Phone<input required value={form.phone||""} onChange={e=>update("phone",e.target.value)}/></label><label>Email<input type="email" value={form.email||""} onChange={e=>update("email",e.target.value)}/></label><label className="full">Tattoo idea / meaning<textarea required rows={7} value={form.description||""} onChange={e=>update("description",e.target.value)} /></label></div></Fieldset>}
    {step===6&&<div className="booking-success"><span>✦</span><h2>{status||"YOUR SESSION REQUEST HAS ENTERED THE STUDIO."}</h2><p>We’ll review the request and follow up with the next step.</p><Link className="re-btn re-btn-fill" href="/">RETURN TO ONYX ↗</Link></div>}
    {step<6&&<div className="booking-actions"><button type="button" className="re-btn re-btn-line" disabled={step===0} onClick={()=>setStep(step-1)}>← BACK</button>{step<5?<button type="button" className="re-btn re-btn-fill" disabled={!canNext} onClick={()=>setStep(step+1)}>CONTINUE ↗</button>:<button className="re-btn re-btn-fill" disabled={!canNext}>SUBMIT REQUEST ↗</button>}</div>}
   </form>
  </section>
 </main>
}

function Fieldset({title,children}:{title:string;children:React.ReactNode}){return <div className="booking-fieldset"><span className="eyebrow">SESSION BUILDER</span><h2>{title}</h2>{children}</div>}
