"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function Booking() {
  const [status, setStatus] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Submitting…");

    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus(result.error || "Something went wrong");
        return;
      }

      setStatus(`Request received — ${result.bookingNumber}`);
      form.reset();
    } catch {
      setStatus("Unable to submit your request. Please try again.");
    }
  }

  const fields = [
    "name",
    "phone",
    "email",
    "service",
    "style",
    "placement",
    "size",
    "preferredDate",
    "preferredTime",
  ];

  return (
    <main>
      <nav className="nav">
        <Link className="logo" href="/">ONYX</Link>
        <Link className="navcta" href="/">HOME</Link>
      </nav>

      <section style={{ paddingTop: 160 }}>
        <div className="section-label">BOOK A SESSION</div>
        <p className="statement">YOUR SESSION <em>STARTS</em> HERE.</p>

        <form
          onSubmit={submit}
          style={{ maxWidth: 760, display: "grid", gap: 16, marginTop: 45 }}
        >
          {fields.map((name) => (
            <input
              key={name}
              name={name}
              required={["name", "phone", "service"].includes(name)}
              placeholder={name.replace(/([A-Z])/g, " $1")}
              type={
                name === "preferredDate"
                  ? "date"
                  : name === "email"
                    ? "email"
                    : "text"
              }
              style={{
                background: "#111",
                border: "1px solid #333",
                padding: 16,
                color: "#eee",
              }}
            />
          ))}

          <textarea
            name="description"
            required
            placeholder="Tell us about your tattoo idea, meaning, references and anything else we should know."
            rows={7}
            style={{
              background: "#111",
              border: "1px solid #333",
              padding: 16,
              color: "#eee",
            }}
          />

          <button className="btn primary" type="submit">
            SUBMIT REQUEST
          </button>

          <p className="muted">{status}</p>
        </form>
      </section>
    </main>
  );
}
