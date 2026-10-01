"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExperience() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let tickerScroll: ((event: { velocity?: number }) => void) | null = null;
    let navScroll: ((event: { scroll: number }) => void) | null = null;

    try {
      // One clock for Lenis + GSAP + ScrollTrigger.
      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        anchors: true,
        allowNestedScroll: true,
      });

      const activeLenis = lenis;

      raf = (time: number) => {
        try {
          activeLenis.raf(time * 1000);
        } catch {
          // Keep the page usable if a browser has an unexpected Lenis runtime issue.
        }
      };

      activeLenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Intro choreography.
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .from(".hero-photo-inner", { scale: 1.2, duration: 1.8 })
          .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 }, "-=1.2")
          .from(".hero-line span", { yPercent: 115, opacity: 0, duration: 1.25, stagger: 0.12 }, "-=0.7")
          .from(".hero-meta, .hero-side, .hero-scroll-cue", { y: 20, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.7")
          .from(".hero-orbit", { scale: 0.5, opacity: 0, duration: 1.2, stagger: 0.15 }, "-=1");

        let lastScroll = 0;
        navScroll = (event: { scroll: number }) => {
          const current = event.scroll;
          if (Math.abs(current - lastScroll) < 2) return;
          gsap.to(".nav", {
            y: current > lastScroll && current > 90 ? -90 : 0,
            duration: 0.35,
            overwrite: true,
            ease: "power3.out",
          });
          lastScroll = current;
        };
        activeLenis.on("scroll", navScroll);

        const ticker = document.querySelector<HTMLElement>(".marquee-track");
        if (ticker) {
          const tickerX = gsap.quickTo(ticker, "x", { duration: 0.7, ease: "power3.out" });
          tickerScroll = (event: { velocity?: number }) => {
            const velocity = Math.max(-1, Math.min(1, (event.velocity || 0) / 2));
            tickerX(velocity * -90);
          };
          activeLenis.on("scroll", tickerScroll);
          gsap.to(ticker, { xPercent: -28, duration: 22, repeat: -1, ease: "none" });
        }

        mm.add("(min-width: 801px)", () => {
          gsap.to(".hero-photo-inner", {
            scale: 1.18, yPercent: -8, xPercent: 4, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.6 },
          });
          gsap.to(".hero-copy", {
            yPercent: -16, opacity: 0.35, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
          });
          gsap.to(".hero-orbit.orbit-one", {
            rotation: 120, xPercent: -12, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 2 },
          });
          gsap.to(".hero-orbit.orbit-two", {
            rotation: -160, xPercent: 22, yPercent: -18, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 2.4 },
          });

          gsap.fromTo(".manifesto-image",
            { clipPath: "inset(18% 0 18% 0)", scale: 0.92 },
            { clipPath: "inset(0% 0 0% 0)", scale: 1, ease: "none",
              scrollTrigger: { trigger: ".manifesto", start: "top 80%", end: "top 25%", scrub: 1.1 } }
          );
          gsap.to(".manifesto-image img", {
            yPercent: -11, scale: 1.1, ease: "none",
            scrollTrigger: { trigger: ".manifesto-image", start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
          gsap.from(".manifesto-copy > *", {
            y: 55, opacity: 0, stagger: 0.09, ease: "power3.out",
            scrollTrigger: { trigger: ".manifesto-copy", start: "top 80%", end: "top 42%", scrub: 1 },
          });
          gsap.to(".manifesto-number", {
            yPercent: 60, rotation: -8, ease: "none",
            scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: 1.8 },
          });

          gsap.to(".quote-left", {
            xPercent: 22, yPercent: -20, rotation: -5, ease: "none",
            scrollTrigger: { trigger: ".quote-stage", start: "top bottom", end: "bottom top", scrub: 1.6 },
          });
          gsap.to(".quote-right", {
            xPercent: -18, yPercent: 14, rotation: 5, ease: "none",
            scrollTrigger: { trigger: ".quote-stage", start: "top bottom", end: "bottom top", scrub: 1.9 },
          });
          gsap.from(".quote-center > *", {
            y: 70, opacity: 0, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: ".quote-center", start: "top 80%", end: "top 45%", scrub: 1 },
          });

          // Desktop pinned horizontal archive.
          const track = document.querySelector<HTMLElement>(".horizontal-track");
          if (track) {
            const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.12);
            const horizontalTween = gsap.to(track, {
              x: () => -getDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: ".horizontal-stage",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.05,
                invalidateOnRefresh: true,
              },
            });

            gsap.to(".horizontal-intro", {
              xPercent: -8, opacity: 0.5, ease: "none",
              scrollTrigger: { trigger: ".horizontal-stage", start: "top top", end: "25% top", scrub: 1 },
            });

            gsap.utils.toArray<HTMLElement>(".archive-card").forEach((card, i) => {
              const image = card.querySelector("img");
              gsap.fromTo(card,
                { y: i % 2 ? 80 : -60, rotateY: i % 2 ? 6 : -6, rotateZ: i % 2 ? 2 : -2, opacity: 0.35 },
                { y: 0, rotateY: 0, rotateZ: 0, opacity: 1, ease: "none",
                  scrollTrigger: { trigger: card, containerAnimation: horizontalTween, start: "left 92%", end: "left 42%", scrub: 1 } }
              );
              if (image) {
                gsap.to(image, {
                  xPercent: i % 2 ? -7 : 7, scale: 1.12, ease: "none",
                  scrollTrigger: { trigger: card, containerAnimation: horizontalTween, start: "left 105%", end: "right -5%", scrub: 1.2 },
                });
              }
            });
          }

          // Sticky process scenes.
          const scenes = gsap.utils.toArray<HTMLElement>(".process-scene");
          const processTl = gsap.timeline({
            scrollTrigger: { trigger: ".process-stage", start: "top top", end: "bottom bottom", scrub: 1.05 },
          });
          scenes.forEach((scene, i) => {
            processTl.to(scene, {
              opacity: 1, x: 0, y: 0, scale: 1, clipPath: "inset(0 0 0 0)",
              duration: i === 0 ? 0.25 : 0.8, ease: "power2.out",
            });
            processTl.to(".process-progress span", { scaleX: (i + 1) / scenes.length, duration: 0.5, ease: "none" }, "<");
            if (i < scenes.length - 1) {
              processTl.to(scene, {
                opacity: 0, x: "-5%", y: -20, scale: 0.96, clipPath: "inset(0 16% 0 0)",
                duration: 0.7, ease: "power2.inOut",
              });
              processTl.fromTo(scenes[i + 1],
                { opacity: 0, x: "10%", y: 28, scale: 1.04, clipPath: "inset(0 0 0 18%)" },
                { opacity: 1, x: 0, y: 0, scale: 1, clipPath: "inset(0 0 0 0)", duration: 0.7, ease: "power2.inOut" }, "<"
              );
            }
          });

          // Detail cards.
          gsap.utils.toArray<HTMLElement>(".detail-card").forEach((card, i) => {
            const image = card.querySelector<HTMLElement>(".detail-image");
            gsap.from(card, {
              y: 90 + i * 20, opacity: 0, rotate: i === 1 ? 1 : -1,
              scrollTrigger: { trigger: card, start: "top 90%", end: "top 55%", scrub: 1 },
            });
            if (image) {
              gsap.fromTo(image,
                { clipPath: "inset(16% 0 16% 0)" },
                { clipPath: "inset(0% 0 0% 0)", ease: "none",
                  scrollTrigger: { trigger: card, start: "top 88%", end: "top 45%", scrub: 1 } }
              );
              const imageElement = image.querySelector("img");
              if (imageElement) {
                gsap.to(imageElement, {
                  yPercent: -10, scale: 1.08, ease: "none",
                  scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 },
                });
              }
            }
          });

          gsap.to(".depth-one", { yPercent: -16, rotation: -3, ease: "none", scrollTrigger: { trigger: ".depth-gallery", start: "top bottom", end: "bottom top", scrub: 1.8 } });
          gsap.to(".depth-two", { yPercent: 10, rotation: 3, ease: "none", scrollTrigger: { trigger: ".depth-gallery", start: "top bottom", end: "bottom top", scrub: 1.3 } });
          gsap.to(".depth-three", { yPercent: -22, rotation: -1, ease: "none", scrollTrigger: { trigger: ".depth-gallery", start: "top bottom", end: "bottom top", scrub: 2.2 } });
          gsap.from(".depth-copy > *", {
            x: -55, opacity: 0, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".depth-copy", start: "top 80%", end: "top 45%", scrub: 1 },
          });

          gsap.utils.toArray<HTMLElement>(".style-item").forEach((item) => {
            gsap.from(item, {
              x: -45, opacity: 0,
              scrollTrigger: { trigger: item, start: "top 94%", end: "top 72%", scrub: 1 },
            });
            const title = item.querySelector("h3");
            const arrow = item.querySelector("i");
            const bar = item.querySelector("b");
            if (title && arrow && bar) {
              const enter = () => {
                gsap.to(title, { x: 22, duration: 0.45, ease: "power3.out" });
                gsap.to(arrow, { x: -8, rotation: -8, duration: 0.45, ease: "power3.out" });
                gsap.to(bar, { scaleX: 1, duration: 0.55, ease: "power3.out" });
              };
              const leave = () => {
                gsap.to(title, { x: 0, duration: 0.45, ease: "power3.out" });
                gsap.to(arrow, { x: 0, rotation: 0, duration: 0.45, ease: "power3.out" });
                gsap.to(bar, { scaleX: 0, duration: 0.45, ease: "power3.out" });
              };
              item.addEventListener("mouseenter", enter);
              item.addEventListener("mouseleave", leave);
              mm.add("(min-width: 801px)", () => () => {
                item.removeEventListener("mouseenter", enter);
                item.removeEventListener("mouseleave", leave);
              });
            }
          });

          gsap.to(".studio-frame img", {
            yPercent: -10, scale: 1.1, ease: "none",
            scrollTrigger: { trigger: ".studio-editorial", start: "top bottom", end: "bottom top", scrub: 1.8 },
          });
          gsap.to(".studio-frame strong", {
            yPercent: -40, xPercent: -15, ease: "none",
            scrollTrigger: { trigger: ".studio-editorial", start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
          gsap.from(".studio-copy > *", {
            y: 55, opacity: 0, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: ".studio-copy", start: "top 80%", end: "top 45%", scrub: 1 },
          });

          gsap.to(".final-ring:not(.final-ring-small)", {
            rotation: 180, scale: 1.12, ease: "none",
            scrollTrigger: { trigger: ".final-mark", start: "top bottom", end: "bottom top", scrub: 1.8 },
          });
          gsap.to(".final-ring-small", {
            rotation: -240, scale: 0.88, ease: "none",
            scrollTrigger: { trigger: ".final-mark", start: "top bottom", end: "bottom top", scrub: 2.2 },
          });
          gsap.from(".final-word", {
            y: 90, opacity: 0, scale: 0.9,
            scrollTrigger: { trigger: ".final-mark", start: "top 80%", end: "top 35%", scrub: 1 },
          });
        });

        mm.add("(max-width: 800px)", () => {
          gsap.utils.toArray<HTMLElement>(".manifesto-image, .manifesto-copy, .quote-center, .detail-card, .depth-copy, .studio-copy").forEach((el) => {
            gsap.from(el, {
              y: 45, opacity: 0, duration: 0.8, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          });
          gsap.utils.toArray<HTMLElement>(".archive-card").forEach((card) => {
            gsap.from(card, {
              y: 35, opacity: 0, duration: 0.7,
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            });
          });
          gsap.to(".final-ring", {
            rotation: 90, ease: "none",
            scrollTrigger: { trigger: ".final-mark", start: "top bottom", end: "bottom top", scrub: 2 },
          });
        });

        const magneticNodes = gsap.utils.toArray<HTMLElement>(".magnetic");
        magneticNodes.forEach((node) => {
          const move = (event: MouseEvent) => {
            const rect = node.getBoundingClientRect();
            const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
            const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
            gsap.to(node, { x, y, duration: 0.35, ease: "power3.out" });
          };
          const leave = () => gsap.to(node, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1,0.4)" });
          node.addEventListener("mousemove", move);
          node.addEventListener("mouseleave", leave);
          mm.add("(min-width: 801px)", () => () => {
            node.removeEventListener("mousemove", move);
            node.removeEventListener("mouseleave", leave);
          });
        });

        gsap.to(".scroll-progress span", {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: "top top", end: "max", scrub: 0.1 },
        });

        const refresh = () => {
          try {
            ScrollTrigger.refresh();
            activeLenis.resize();
          } catch {
            // Animation failure must never break the rendered page.
          }
        };

        if (document.readyState === "complete") {
          window.setTimeout(refresh, 50);
        } else {
          window.addEventListener("load", refresh, { once: true });
        }
        document.fonts?.ready.then(refresh).catch(() => undefined);

        return () => {
          window.removeEventListener("load", refresh);
          mm.revert();
        };
      });

      return () => ctx.revert();
    } catch (error) {
      // Deliberately swallow animation initialization failures.
      // The server-rendered/static page remains fully usable without motion.
      console.warn("[ONYX] Motion layer disabled:", error);
    }

    return () => {
      if (lenis) {
        try {
          if (navScroll) lenis.off("scroll", navScroll);
          if (tickerScroll) lenis.off("scroll", tickerScroll);
          lenis.off("scroll", ScrollTrigger.update);
          lenis.destroy();
        } catch {
          // Ignore cleanup errors during route changes.
        }
      }
      if (raf) gsap.ticker.remove(raf);
    };
  }, []);

  return null;
}
