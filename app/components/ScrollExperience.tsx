"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollExperience() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.documentElement.classList.add("onyx-motion-reduced");
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // The redesigned homepage intentionally uses ONE animation engine:
      // native browser scroll -> ScrollTrigger -> GSAP.
      // This removes the old Lenis/legacy-selector layer that was competing
      // with the new page geometry.
      document.documentElement.classList.add("onyx-motion-ready");

      const refresh = () => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      // Initial hero choreography.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".re-loader-copy", { opacity: 0, y: 18, duration: 0.45 })
        .to(".re-loader-copy", { opacity: 0, y: -12, duration: 0.35, delay: 0.25 })
        .from(".re-hero-image", { scale: 1.12, opacity: 0, duration: 1.2 }, "-=0.1")
        .from(".re-hero-copy .eyebrow", { y: 25, opacity: 0, duration: 0.5 }, "-=0.7")
        .from(".re-hero-copy h1 span, .re-hero-copy h1 em", {
          yPercent: 110,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
        }, "-=0.35")
        .from(".re-hero-copy p, .re-hero-actions", {
          y: 22,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
        }, "-=0.35")
        .from(".re-hero-topline, .re-hero-index", { opacity: 0, duration: 0.35 }, "-=0.3");

      // Global progress.
      gsap.to(".redesign-progress span", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Navigation hides on downward movement and returns on upward movement.
      let lastY = 0;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          const down = y > lastY;
          if (Math.abs(y - lastY) > 3) {
            gsap.to(".redesign-nav", {
              y: down && y > 90 ? -100 : 0,
              duration: 0.28,
              overwrite: true,
              ease: "power2.out",
            });
            lastY = y;
          }
        },
      });

      // Hero: image, typography and grid move at different rates.
      gsap.to(".re-hero-image", {
        yPercent: 12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(".re-hero-copy", {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".re-hero-grid", {
        xPercent: 8,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Manifesto: real pinned storytelling, not CSS-only sticky.
      const manifesto = gsap.timeline({
        scrollTrigger: {
          trigger: ".re-manifesto",
          start: "top top",
          end: "+=160%",
          pin: ".re-manifesto-pin",
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      manifesto
        .fromTo(".re-manifesto-word",
          { yPercent: 12, scale: 0.9, opacity: 0.35 },
          { yPercent: -8, scale: 1, opacity: 1, duration: 1, ease: "none" }, 0)
        .fromTo(".re-manifesto-image",
          { xPercent: 20, scale: 0.86, clipPath: "inset(12% 0 12% 18%)" },
          { xPercent: -6, scale: 1.03, clipPath: "inset(0)", duration: 1, ease: "none" }, 0)
        .fromTo(".re-manifesto-copy",
          { yPercent: 35, opacity: 0 },
          { yPercent: -5, opacity: 1, duration: 0.8, ease: "none" }, 0.15);

      // Statement chapter.
      gsap.to(".re-statement-bg", {
        xPercent: -10,
        yPercent: -10,
        scale: 1.08,
        rotation: -3,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-statement",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.from(".re-statement-main > *", {
        y: 70,
        opacity: 0,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-statement",
          start: "top 80%",
          end: "top 35%",
          scrub: true,
        },
      });

      // Desktop portfolio: vertical scroll drives a pinned horizontal track.
      mm.add("(min-width: 801px)", () => {
        const track = document.querySelector<HTMLElement>(".re-work-track");
        const section = document.querySelector<HTMLElement>(".re-work");
        if (!track || !section) return;

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth * 0.92);

        const horizontal = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + Math.max(window.innerHeight * 2.8, distance() * 1.15),
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".re-work-head", {
          opacity: 0.2,
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + Math.max(window.innerHeight * 2.8, distance() * 1.15),
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".re-work-card").forEach((card, i) => {
          gsap.fromTo(card,
            { y: i % 2 ? 60 : -45, rotate: i % 2 ? 1.2 : -1.2, opacity: 0.35 },
            {
              y: 0,
              rotate: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: "left 95%",
                end: "left 48%",
                scrub: true,
              },
            }
          );

          const image = card.querySelector("img");
          if (image) {
            gsap.to(image, {
              xPercent: i % 2 ? -5 : 5,
              scale: 1.06,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: "left 110%",
                end: "right -10%",
                scrub: true,
              },
            });
          }
        });
      });

      // Mobile portfolio: native horizontal swipe; no nested ScrollTrigger.
      mm.add("(max-width: 800px)", () => {
        gsap.utils.toArray<HTMLElement>(".re-work-card").forEach((card, i) => {
          gsap.fromTo(card,
            { y: i % 2 ? 30 : -25, opacity: 0.45 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "left 90%",
                end: "right 55%",
                horizontal: true,
                scroller: ".re-work-track",
                scrub: true,
              },
            }
          );
        });
      });

      // Style index: each row enters with a deliberate counter movement.
      gsap.utils.toArray<HTMLElement>(".re-style-row").forEach((row, i) => {
        gsap.fromTo(row,
          { xPercent: i % 2 ? 5 : -5, opacity: 0.25 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
        gsap.to(row.querySelector("h3"), {
          xPercent: i % 2 ? -2 : 2,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Process: one pinned timeline, five scenes, deterministic progress.
      const scenes = gsap.utils.toArray<HTMLElement>(".re-process-scene");
      if (scenes.length) {
        gsap.set(scenes, {
          autoAlpha: 0,
          y: 45,
          scale: 0.96,
          rotateX: 4,
          transformOrigin: "center center",
        });
        gsap.set(scenes[0], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
        });

        const processTimeline = gsap.timeline({ defaults: { ease: "none" } });

        scenes.forEach((scene, i) => {
          if (i > 0) {
            processTimeline.fromTo(scene,
              { autoAlpha: 0, y: 45, scale: 0.96, rotateX: 4 },
              { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 0.55, ease: "power2.out" },
              `scene-${i}-in`
            );
          }

          if (i < scenes.length - 1) {
            processTimeline.to(scene, {
              autoAlpha: 0,
              y: -35,
              scale: 0.97,
              rotateX: -4,
              duration: 0.45,
              ease: "power2.in",
            }, `scene-${i}-out`);
            processTimeline.to(".re-process-line span", {
              scaleY: (i + 1) / scenes.length,
              duration: 0.15,
              ease: "none",
            }, `scene-${i}-out`);
          }
        });

        ScrollTrigger.create({
          animation: processTimeline,
          trigger: ".re-process",
          start: "top top",
          end: () => "+=" + (window.innerHeight * Math.max(4, scenes.length * 1.25)),
          pin: ".re-process-sticky",
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }

      // Artists: alternating vertical drift and image depth.
      gsap.utils.toArray<HTMLElement>(".re-artist-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: i === 1 ? 90 : 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 48%",
              scrub: true,
            },
          }
        );
        const image = card.querySelector("img");
        if (image) {
          gsap.to(image, {
            yPercent: -7,
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      // Studio and trust imagery.
      [[".re-studio-image img", ".re-studio"], [".re-trust-image img", ".re-trust"], [".re-final-image img", ".re-final"]].forEach(([image, trigger]) => {
        gsap.to(image, {
          yPercent: -10,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.from(".re-studio-copy > *, .re-trust-panel > *, .re-final-copy > *", {
        y: 55,
        opacity: 0,
        stagger: 0.07,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-studio",
          start: "top 82%",
          end: "top 35%",
          scrub: true,
        },
        clearProps: "all",
      });

      // Final CTA scale.
      gsap.to(".re-final-copy", {
        scale: 1.05,
        opacity: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-final",
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });

      // Refresh after images/fonts settle.
      const images = Array.from(document.images);
      images.forEach((img) => {
        if (!img.complete) img.addEventListener("load", refresh, { once: true });
      });
      document.fonts?.ready.then(refresh).catch(() => undefined);
      window.addEventListener("resize", refresh, { passive: true });
      window.addEventListener("orientationchange", refresh, { passive: true });
      window.setTimeout(refresh, 100);
      window.setTimeout(refresh, 700);

      return () => {
        window.removeEventListener("resize", refresh);
        window.removeEventListener("orientationchange", refresh);
        mm.revert();
      };
    });

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("onyx-motion-ready", "onyx-motion-reduced");
    };
  }, []);

  return null;
}
