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
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 801px)", () => {
        // Hero: one continuous depth movement.
        gsap.from(".hero-line span", {
          yPercent: 105,
          opacity: 0,
          duration: 1.25,
          stagger: 0.1,
          ease: "expo.out",
        });

        gsap.to(".hero-photo-inner", {
          scale: 1.12,
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(".hero-brand-art", {
          yPercent: -18,
          rotation: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.8,
          },
        });

        // Intro: slow opposing depth.
        gsap.from(".intro-copy", {
          y: 80,
          opacity: 0,
          scrollTrigger: {
            trigger: ".intro-panel",
            start: "top 78%",
            end: "top 30%",
            scrub: 1,
          },
        });

        gsap.to(".intro-symbol", {
          yPercent: -25,
          rotation: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-panel",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Gallery: cards enter softly and images breathe independently.
        gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((card, index) => {
          const image = card.querySelector("img");

          gsap.fromTo(card,
            { y: 55, opacity: 0, rotate: index === 1 ? 2 : -1 },
            {
              y: index === 1 ? -12 : 0,
              opacity: 1,
              rotate: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                end: "top 48%",
                scrub: 1,
              },
            }
          );

          if (image) {
            gsap.to(image, {
              yPercent: -8,
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          }
        });

        // Process: sticky layout; only opacity/scale/clip change, avoiding competing pinning.
        const scenes = gsap.utils.toArray<HTMLElement>(".process-scene");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".process-stage",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        });

        scenes.forEach((scene, i) => {
          timeline.to(scene, {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0 0 0 0)",
            duration: i === 0 ? 0.15 : 0.75,
            ease: "power2.out",
          });

          timeline.to(".process-meter span", {
            scaleX: (i + 1) / scenes.length,
            duration: 0.55,
            ease: "none",
          }, "<");

          if (i < scenes.length - 1) {
            timeline.to(scene, {
              opacity: 0,
              y: -18,
              scale: 0.97,
              clipPath: "inset(0 0 0 12%)",
              duration: 0.7,
              ease: "power2.inOut",
            });
          }
        });

        // Studio: long, gentle image movement.
        gsap.to(".studio-photo", {
          yPercent: -7,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: ".studio-editorial",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });

        // Final seal rotates only while visible.
        gsap.to(".final-ring", {
          rotation: 180,
          ease: "none",
          scrollTrigger: {
            trigger: ".final-mark",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      mm.add("(max-width: 800px)", () => {
        // Mobile intentionally uses fewer transforms for stable 60fps scrolling.
        gsap.from(".hero-line span", {
          yPercent: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        });

        gsap.utils.toArray<HTMLElement>(".gallery-card, .intro-copy, .studio-copy").forEach((el) => {
          gsap.from(el, {
            y: 45,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        });

        gsap.to(".final-ring", {
          rotation: 90,
          ease: "none",
          scrollTrigger: {
            trigger: ".final-mark",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

      // Global progress — one transform only.
      gsap.to(".scroll-progress span", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: 0.15,
        },
      });

      // Magnetic-ish style interaction without global mousemove listeners.
      gsap.utils.toArray<HTMLElement>(".style-item").forEach((item) => {
        const title = item.querySelector("h3");
        const arrow = item.querySelector("i");
        if (!title || !arrow) return;

        const enter = () => {
          gsap.to(title, { x: 18, duration: 0.35, ease: "power3.out" });
          gsap.to(arrow, { x: -8, rotation: -8, duration: 0.35, ease: "power3.out" });
        };
        const leave = () => {
          gsap.to(title, { x: 0, duration: 0.4, ease: "power3.out" });
          gsap.to(arrow, { x: 0, rotation: 0, duration: 0.4, ease: "power3.out" });
        };

        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);
        return () => {
          item.removeEventListener("mouseenter", enter);
          item.removeEventListener("mouseleave", leave);
        };
      });

      // Refresh after images settle.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      frame = 0;
    };
  }, []);

  return null;
}
