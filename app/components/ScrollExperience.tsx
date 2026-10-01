"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExperience() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
    let velocity = 0;

    const tick = (time: number) => {
      lenis.raf(time * 1000);
      velocity = lenis.velocity;
      ScrollTrigger.update();
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 01 — cinematic hero depth
      gsap.fromTo(".hero-visual", { scale: 1.18, yPercent: 10 }, {
        scale: 1, yPercent: -7, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 }
      });

      // 02 — editorial title entrance
      gsap.from(".hero-title .word", {
        yPercent: 125, rotate: 5, opacity: 0, duration: 1.35,
        stagger: 0.13, ease: "power4.out"
      });

      // 03 — reveal text with clipping
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, clipPath: "inset(12% 0 12% 0)" },
          {
            y: 0, opacity: 1, clipPath: "inset(0% 0 0% 0)", duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true }
          }
        );
      });

      // 04 — image depth/parallax
      gsap.utils.toArray<HTMLElement>(".parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: -16, scale: 1.08, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 }
        });
      });

      // 05 — alternating image clip reveals
      gsap.utils.toArray<HTMLElement>(".image-frame").forEach((el, i) => {
        gsap.fromTo(el,
          { clipPath: i % 2 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0 0 0% 0)", duration: 1.35, ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 78%", once: true }
          }
        );
      });

      // 06 — pinned horizontal process gallery
      gsap.to(".horizontal-track", {
        x: () => {
          const track = document.querySelector(".horizontal-track") as HTMLElement | null;
          return track ? -(track.scrollWidth - window.innerWidth) : 0;
        },
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-section",
          start: "top top",
          end: () => "+=" + window.innerWidth * 3,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // 07 — ink stroke drawing
      gsap.utils.toArray<SVGPathElement>(".ink-path").forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: path, start: "top 80%", end: "bottom 45%", scrub: 1 }
        });
      });

      // 08 — oversized typography drift
      gsap.utils.toArray<HTMLElement>(".drift").forEach((el, i) => {
        gsap.to(el, {
          xPercent: i % 2 ? -8 : 8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5 }
        });
      });

      // 09 — subtle horizontal skew from scroll velocity
      gsap.ticker.add(() => {
        const amount = Math.max(-2.2, Math.min(2.2, velocity * 0.045));
        gsap.set(".velocity-skew", { skewX: amount });
      });

      // 10 — rotating seal / tattoo-machine visual language
      gsap.to(".ink-orbit", { rotation: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(".hero-grain", { opacity: 0.18, duration: 1.7, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".floating-mark", {
        y: -22, rotation: 4, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut"
      });

      // 11 — scroll progress
      const progress = document.querySelector(".scroll-progress");
      if (progress) {
        gsap.to(progress, {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "max", scrub: true }
        });
      }

      // 12 — section mood transitions
      gsap.utils.toArray<HTMLElement>(".mood-section").forEach((section) => {
        gsap.fromTo(section, { backgroundColor: "#070707" }, {
          backgroundColor: "#10100f",
          scrollTrigger: { trigger: section, start: "top 75%", end: "bottom 25%", scrub: true }
        });
      });
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
