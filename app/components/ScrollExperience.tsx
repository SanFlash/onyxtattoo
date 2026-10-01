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

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const tick = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-visual", { scale: 1.16, yPercent: 8 }, {
        scale: 1, yPercent: -4, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });

      gsap.from(".hero-title .word", {
        yPercent: 115, rotate: 4, opacity: 0, duration: 1.2,
        stagger: 0.12, ease: "power4.out"
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 70, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", once: true }
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: -14, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
        });
      });

      gsap.to(".horizontal-track", {
        x: () => {
          const track = document.querySelector(".horizontal-track") as HTMLElement | null;
          return track ? -(track.scrollWidth - window.innerWidth) : 0;
        },
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-section",
          start: "top top",
          end: () => "+=" + window.innerWidth * 2.6,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      gsap.to(".ink-orbit", { rotation: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(".hero-grain", { opacity: 0.18, duration: 1.7, repeat: -1, yoyo: true, ease: "sine.inOut" });

      const progress = document.querySelector(".scroll-progress");
      if (progress) {
        gsap.to(progress, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "max", scrub: true }
        });
      }
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
