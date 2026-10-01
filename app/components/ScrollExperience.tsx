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

    const lenis = new Lenis({
      lerp: 0.065,
      smoothWheel: true,
      syncTouch: true,
    });

    const ctx = gsap.context(() => {
      const tick = (time: number) => {
        lenis.raf(time * 1000);
        ScrollTrigger.update();
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // 01 — masked cinematic hero entrance
      gsap.from(".hero-line span", {
        yPercent: 115,
        rotateX: -45,
        opacity: 0,
        duration: 1.5,
        stagger: 0.14,
        ease: "expo.out",
        delay: 0.15,
      });

      gsap.from(".hero-copy .eyebrow, .hero-meta, .hero-index", {
        y: 25,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.7,
      });

      // 02 — cinematic hero zoom + horizontal drift
      gsap.to(".hero-photo-inner", {
        scale: 1.18,
        xPercent: 5,
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(".hero-brand-art", {
        yPercent: -28,
        rotation: 9,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      // 03 — introduction depth
      gsap.from(".intro-copy", {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: ".intro-panel",
          start: "top 70%",
          end: "top 25%",
          scrub: 1,
        },
      });

      gsap.to(".intro-symbol", {
        yPercent: -35,
        rotation: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".intro-panel",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // 04 — stacked gallery cards behave like physical prints
      gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((card, i) => {
        const image = card.querySelector("img");

        gsap.fromTo(card,
          { y: 100 + i * 35, rotation: i === 1 ? 3 : -2, opacity: 0 },
          {
            y: i === 1 ? -30 : 0,
            rotation: i === 1 ? -1 : 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 38%",
              scrub: 1,
            },
          }
        );

        if (image) {
          gsap.to(image, {
            yPercent: -12,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });

      // 05 — pinned process stage, one scene replaces another
      const processScenes = gsap.utils.toArray<HTMLElement>(".process-scene");
      const processTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".process-stage",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      processScenes.forEach((scene, i) => {
        if (i === 0) {
          processTimeline.to(scene, { opacity: 1, scale: 1, y: 0, clipPath: "inset(0 0 0 0)", duration: 0.15 });
        }
        processTimeline.to(".process-meter span", {
          scaleX: (i + 1) / processScenes.length,
          duration: 0.7,
          ease: "none",
        }, i * 0.8);

        if (i < processScenes.length - 1) {
          processTimeline.to(scene, {
            opacity: 0,
            scale: 0.92,
            y: -12,
            clipPath: "inset(0 0 0 18%)",
            duration: 0.8,
            ease: "power2.inOut",
          });
          processTimeline.fromTo(processScenes[i + 1],
            { opacity: 0, scale: 1.06, y: 12, clipPath: "inset(0 18% 0 0)" },
            { opacity: 1, scale: 1, y: 0, clipPath: "inset(0 0 0 0)", duration: 0.8, ease: "power2.inOut" },
            "<"
          );
        }
      });

      // 06 — styles list magnetic slide
      gsap.utils.toArray<HTMLElement>(".style-item").forEach((item) => {
        const title = item.querySelector("h3");
        if (!title) return;
        item.addEventListener("mouseenter", () => gsap.to(title, { x: 22, duration: 0.45, ease: "power3.out" }));
        item.addEventListener("mouseleave", () => gsap.to(title, { x: 0, duration: 0.45, ease: "power3.out" }));
      });

      // 07 — studio photograph breathes through the viewport
      gsap.to(".studio-photo", {
        yPercent: -10,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".studio-editorial",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      // 08 — final circular mark rotates with the page
      gsap.to(".final-ring", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: ".final-mark",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // 09 — scroll progress
      gsap.to(".scroll-progress span", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "max",
          scrub: true,
        },
      });

      // 10 — navigation breathes away while scrolling down
      let lastY = 0;
      ScrollTrigger.create({
        start: 1,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          if (Math.abs(y - lastY) < 4) return;
          gsap.to(".nav", {
            y: y > lastY ? -88 : 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
          });
          lastY = y;
        },
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return null;
}
