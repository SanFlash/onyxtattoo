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
      const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh(true));

      document.documentElement.classList.add("onyx-motion-ready");

      // -----------------------------
      // Global / always-on motion
      // -----------------------------
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".re-loader-copy", { opacity: 0, y: 18, duration: 0.45 })
        .to(".re-loader-copy", { opacity: 0, y: -12, duration: 0.35, delay: 0.2 })
        .from(".re-hero-image", { scale: 1.12, opacity: 0, duration: 1.15 }, "-=0.1")
        .from(".re-hero-copy .eyebrow", { y: 25, opacity: 0, duration: 0.45 }, "-=0.65")
        .from(".re-hero-copy h1 span, .re-hero-copy h1 em", {
          yPercent: 110,
          opacity: 0,
          duration: 0.8,
          stagger: 0.07,
        }, "-=0.3")
        .from(".re-hero-copy p, .re-hero-actions", {
          y: 20,
          opacity: 0,
          duration: 0.45,
          stagger: 0.06,
        }, "-=0.3")
        .from(".re-hero-topline, .re-hero-index", { opacity: 0, duration: 0.3 }, "-=0.25");

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

      let lastY = 0;
      ScrollTrigger.create({
        id: "onyx-nav",
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          if (Math.abs(y - lastY) < 4) return;
          gsap.to(".redesign-nav", {
            y: y > lastY && y > 90 ? -100 : 0,
            duration: 0.28,
            overwrite: true,
            ease: "power2.out",
          });
          lastY = y;
        },
      });

      gsap.to(".re-hero-image", {
        yPercent: 10,
        scale: 1.07,
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
        yPercent: -12,
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
        xPercent: 6,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // -----------------------------
      // Desktop / large-screen system
      // -----------------------------
      mm.add("(min-width: 1024px)", () => {
        // Manifesto: only the inner scene is pinned. The section itself
        // remains in normal flow, preventing the following chapter from
        // visually colliding with the pin spacer.
        const manifesto = gsap.timeline({
          scrollTrigger: {
            id: "onyx-manifesto",
            trigger: ".re-manifesto",
            start: "top top",
            end: "+=150%",
            pin: ".re-manifesto-pin",
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            preventOverlaps: "onyx-editorial",
          },
        });

        manifesto
          .fromTo(".re-manifesto-word",
            { yPercent: 10, scale: 0.92, opacity: 0.35 },
            { yPercent: -6, scale: 1, opacity: 1, duration: 1, ease: "none" },
            0
          )
          .fromTo(".re-manifesto-image",
            { xPercent: 18, scale: 0.9, clipPath: "inset(12% 0 12% 16%)" },
            { xPercent: -4, scale: 1.02, clipPath: "inset(0)", duration: 1, ease: "none" },
            0
          )
          .fromTo(".re-manifesto-copy",
            { yPercent: 25, opacity: 0 },
            { yPercent: -4, opacity: 1, duration: 0.8, ease: "none" },
            0.18
          );

        // Desktop archive: the track itself is the pinned viewport.
        // This keeps the heading in normal flow and prevents the huge
        // horizontal transform from covering the next section.
        const work = document.querySelector<HTMLElement>(".re-work");
        const track = document.querySelector<HTMLElement>(".re-work-track");

        if (work && track) {
          const distance = () => Math.max(
            0,
            track.scrollWidth - window.innerWidth + window.innerWidth * 0.14
          );
          const archiveEnd = () => Math.max(
            window.innerHeight * 2.15,
            distance() * 1.08
          );

          const horizontal = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              id: "onyx-archive",
              trigger: work,
              start: "top top+=12",
              end: () => "+=" + archiveEnd(),
              pin: track,
              pinSpacing: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              preventOverlaps: "onyx-editorial",
            },
          });

          gsap.to(".re-work-head", {
            yPercent: -12,
            opacity: 0.32,
            ease: "none",
            scrollTrigger: {
              trigger: work,
              start: "top top",
              end: () => "+=" + archiveEnd(),
              scrub: true,
            },
          });

          gsap.utils.toArray<HTMLElement>(".re-work-card").forEach((card, i) => {
            gsap.fromTo(card,
              { y: i % 2 ? 45 : -32, rotate: i % 2 ? 0.8 : -0.8, opacity: 0.45 },
              {
                y: 0,
                rotate: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontal,
                  start: "left 92%",
                  end: "left 52%",
                  scrub: true,
                  preventOverlaps: "onyx-archive-cards",
                },
              }
            );

            const image = card.querySelector("img");
            if (image) {
              gsap.to(image, {
                xPercent: i % 2 ? -4 : 4,
                scale: 1.045,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontal,
                  start: "left 108%",
                  end: "right -8%",
                  scrub: true,
                },
              });
            }
          });
        }

        // Process chapter: CSS sticky is disabled on desktop; ScrollTrigger
        // owns the pin so the spacer is deterministic.
        const scenes = gsap.utils.toArray<HTMLElement>(".re-process-scene");
        if (scenes.length) {
          gsap.set(scenes, {
            autoAlpha: 0,
            y: 42,
            scale: 0.97,
            rotateX: 3,
            transformOrigin: "center center",
          });
          gsap.set(scenes[0], { autoAlpha: 1, y: 0, scale: 1, rotateX: 0 });

          const timeline = gsap.timeline({ defaults: { ease: "none" } });

          scenes.forEach((scene, i) => {
            if (i === 0) {
              timeline.to(scene, { duration: 0.6 });
            } else {
              timeline
                .to(scenes[i - 1], {
                  autoAlpha: 0,
                  y: -32,
                  scale: 0.975,
                  rotateX: -3,
                  duration: 0.38,
                  ease: "power2.in",
                })
                .fromTo(scene,
                  { autoAlpha: 0, y: 42, scale: 0.97, rotateX: 3 },
                  { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 0.55, ease: "power2.out" },
                  "<0.16"
                );
            }

            timeline.to(".re-process-line span", {
              scaleX: (i + 1) / scenes.length,
              duration: 0.18,
              ease: "none",
            }, "<0.05");
          });

          ScrollTrigger.create({
            id: "onyx-process",
            animation: timeline,
            trigger: ".re-process",
            start: "top top",
            end: () => "+=" + window.innerHeight * Math.max(4.2, scenes.length * 1.15),
            pin: ".re-process-sticky",
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            preventOverlaps: "onyx-editorial",
          });
        }
      });

      // -----------------------------
      // Tablet / mobile-safe system
      // -----------------------------
      mm.add("(max-width: 1023px)", () => {
        // Manifesto remains a native sticky scene on smaller screens.
        gsap.fromTo(".re-manifesto-word",
          { yPercent: 8, opacity: 0.4 },
          {
            yPercent: -5,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".re-manifesto",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.to(".re-manifesto-image", {
          yPercent: -5,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: ".re-manifesto",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".re-work-card").forEach((card, i) => {
          gsap.fromTo(card,
            { y: i % 2 ? 24 : -18, opacity: 0.55 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "left 92%",
                end: "right 55%",
                horizontal: true,
                scroller: ".re-work-track",
                scrub: true,
              },
            }
          );
        });

        const scenes = gsap.utils.toArray<HTMLElement>(".re-process-scene");
        scenes.forEach((scene, i) => {
          gsap.fromTo(scene,
            { y: i === 0 ? 0 : 35, opacity: i === 0 ? 1 : 0.15 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: scene,
                start: "top 85%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
        });
      });

      // -----------------------------
      // Shared editorial reveals
      // -----------------------------
      gsap.to(".re-statement-bg", {
        xPercent: -8,
        yPercent: -8,
        scale: 1.06,
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
        y: 55,
        opacity: 0,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-statement",
          start: "top 82%",
          end: "top 38%",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".re-style-row").forEach((row, i) => {
        gsap.fromTo(row,
          { xPercent: i % 2 ? 3 : -3, opacity: 0.35 },
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
      });

      gsap.utils.toArray<HTMLElement>(".re-artist-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: i === 1 ? 65 : 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 52%",
              scrub: true,
            },
          }
        );
        const image = card.querySelector("img");
        if (image) {
          gsap.to(image, {
            yPercent: -6,
            scale: 1.045,
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

      [
        [".re-studio-image img", ".re-studio"],
        [".re-trust-image img", ".re-trust"],
        [".re-final-image img", ".re-final"],
      ].forEach(([image, trigger]) => {
        gsap.to(image, {
          yPercent: -8,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.from(".re-studio-copy > *", {
        y: 45,
        opacity: 0,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-studio",
          start: "top 82%",
          end: "top 40%",
          scrub: true,
        },
      });

      gsap.from(".re-trust-panel > *", {
        y: 40,
        opacity: 0,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-trust",
          start: "top 82%",
          end: "top 40%",
          scrub: true,
        },
      });

      gsap.from(".re-final-copy > *", {
        y: 35,
        opacity: 0,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".re-final",
          start: "top 82%",
          end: "top 45%",
          scrub: true,
        },
      });

      // Let ScrollTrigger recalculate after remote images and fonts settle.
      const images = Array.from(document.images);
      images.forEach((img) => {
        if (!img.complete) img.addEventListener("load", refresh, { once: true });
      });
      document.fonts?.ready.then(refresh).catch(() => undefined);

      window.addEventListener("resize", refresh, { passive: true });
      window.addEventListener("orientationchange", refresh, { passive: true });
      window.setTimeout(refresh, 120);
      window.setTimeout(refresh, 800);

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
