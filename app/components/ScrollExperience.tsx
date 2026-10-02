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
    let tickerScroll: ((event: { velocity?: number }) => void) | null = null;
    let velocityScroll: ((event: { velocity?: number }) => void) | null = null;
    let lenisTicker: ((time: number) => void) | null = null;
    let navScroll: ((event?: { scroll: number }) => void) | null = null;
    let refreshTimer: number | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let visualViewport: VisualViewport | null = null;
    let imageLoadHandlers: Array<() => void> = [];

    const isTouch = ScrollTrigger.isTouch > 0 || window.matchMedia("(pointer: coarse)").matches;

    const cleanupMotion = () => {
      if (refreshTimer !== null) {
        window.clearTimeout(refreshTimer);
        refreshTimer = null;
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      if (visualViewport) {
        visualViewport.removeEventListener("resize", scheduleRefresh);
        visualViewport = null;
      }
      imageLoadHandlers.forEach((handler) => handler());
      imageLoadHandlers = [];
      if (lenisTicker) {
        gsap.ticker.remove(lenisTicker);
        lenisTicker = null;
      }
      if (lenis) {
        try {
          if (navScroll) lenis.off("scroll", navScroll);
          if (tickerScroll) lenis.off("scroll", tickerScroll);
          if (velocityScroll) lenis.off("scroll", velocityScroll);
          lenis.off("scroll", ScrollTrigger.update);
          lenis.destroy();
        } catch {
          // Ignore cleanup errors during route changes.
        }
        lenis = null;
      }
    };

    const scheduleRefresh = () => {
      if (refreshTimer !== null) window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        refreshTimer = null;
        try {
          ScrollTrigger.refresh(true);
          lenis?.resize();
        } catch {
          // Keep the page usable if a browser reports an unstable viewport.
        }
      }, 120);
    };

    try {
      // Use one scroll engine across desktop, tablets and phones. This prevents
      // ScrollTrigger from reading native scrollY while Lenis is animating a
      // different virtual position. syncTouch gives touch devices the same
      // scroll-linked animation clock without requiring a separate mobile path.
      lenis = new Lenis({
        lerp: isTouch ? 0.11 : 0.085,
        smoothWheel: true,
        syncTouch: isTouch,
        syncTouchLerp: 0.075,
        touchInertiaExponent: 1.7,
        touchMultiplier: 1,
        anchors: true,
        allowNestedScroll: true,
        autoRaf: false,
      });

      const activeLenis = lenis;

      // Lenis owns the animation frame; ScrollTrigger is updated from the
      // same Lenis scroll event so scrubbed animations never drift from the
      // smooth-scroll position.
      activeLenis.on("scroll", ScrollTrigger.update);
      lenisTicker = (time: number) => activeLenis.raf(time * 1000);
      gsap.ticker.add(lenisTicker);
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
        navScroll = (event?: { scroll: number }) => {
          const current = event && "scroll" in event ? event.scroll : window.scrollY;
          if (Math.abs(current - lastScroll) < 2) return;
          gsap.to(".nav", {
            y: current > lastScroll && current > 90 ? -90 : 0,
            duration: 0.35,
            overwrite: true,
            ease: "power3.out",
          });
          lastScroll = current;
        };

        const activeLenis = lenis!;
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

        // One process timeline for every viewport. CSS owns the sticky geometry;
        // ScrollTrigger only maps document scroll to one deterministic timeline.
        const processScenes = gsap.utils.toArray<HTMLElement>(".process-scene");
        if (processScenes.length) {
          gsap.set(processScenes, {
            autoAlpha: 0, x: 7, y: 18, scale: 0.985, rotationY: 7,
            transformOrigin: "50% 50%", clipPath: "inset(0 12% 0 0)",
          });
          gsap.set(processScenes[0], {
            autoAlpha: 1, x: 0, y: 0, scale: 1, rotationY: 0, clipPath: "inset(0)",
          });
          const processTimeline = gsap.timeline({ defaults: { ease: "none" } });
          processScenes.forEach((scene, index) => {
            if (index > 0) {
              processTimeline.fromTo(scene,
                { autoAlpha: 0, x: 7, y: 18, scale: 0.985, rotationY: 7, clipPath: "inset(0 12% 0 0)" },
                { autoAlpha: 1, x: 0, y: 0, scale: 1, rotationY: 0, clipPath: "inset(0)", duration: 0.58, ease: "power2.out" },
                `step-${index}-in`
              );
            }
            if (index < processScenes.length - 1) {
              processTimeline.to(".process-progress span",
                { scaleX: (index + 1) / processScenes.length, duration: 0.08 },
                `step-${index}-in+=0.62`
              );
              processTimeline.to(scene,
                { autoAlpha: 0, x: -7, y: -14, scale: 0.975, rotationY: -7, clipPath: "inset(0 0 0 12%)", duration: 0.34, ease: "power2.in" },
                `step-${index}-out`
              );
              processTimeline.addLabel(`step-${index + 1}-in`);
            }
          });
          processTimeline.to(".process-progress span",
            { scaleX: 1, duration: 0.08 },
            `step-${processScenes.length - 1}-in+=0.62`
          );
          ScrollTrigger.create({
            animation: processTimeline,
            trigger: ".process-stage",
            start: "top top",
            end: "bottom bottom",
            scrub: isTouch ? 0.55 : 0.35,
            snap: isTouch ? undefined : {
              snapTo: "labels",
              duration: { min: 0.12, max: 0.45 },
              delay: 0.08,
              ease: "power2.inOut",
            },
            invalidateOnRefresh: true,
          });
        }
        mm.add("(min-width: 801px)", () => {
          const heroST = { trigger: ".hero", start: "top top", end: "bottom top" };

          gsap.to(".hero-photo-inner", {
            scale: 1.18, yPercent: -8, xPercent: 4, ease: "none",
            scrollTrigger: { ...heroST, scrub: true },
          });
          gsap.to(".hero-copy", {
            yPercent: -16, opacity: 0.35, ease: "none",
            scrollTrigger: { ...heroST, scrub: true },
          });
          gsap.to(".hero-orbit.orbit-one", {
            rotation: 120, xPercent: -12, ease: "none",
            scrollTrigger: { ...heroST, scrub: true },
          });
          gsap.to(".hero-orbit.orbit-two", {
            rotation: -160, xPercent: 22, yPercent: -18, ease: "none",
            scrollTrigger: { ...heroST, scrub: true },
          });

          gsap.fromTo(".manifesto-image",
            { clipPath: "inset(18% 9% 18% 0)", scale: 0.92, xPercent: -4 },
            { clipPath: "inset(0)", scale: 1, xPercent: 0, ease: "none",
              scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "top 18%", scrub: true } }
          );
          gsap.to(".manifesto-image img", {
            yPercent: -11, scale: 1.1, ease: "none",
            scrollTrigger: { trigger: ".manifesto-image", start: "top bottom", end: "bottom top", scrub: true },
          });
          gsap.from(".manifesto-copy > *", {
            y: 55, opacity: 0, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: ".manifesto-copy", start: "top 82%", end: "top 42%", scrub: true },
          });
          gsap.to(".manifesto-number", {
            yPercent: 70, rotation: -8, ease: "none",
            scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: true },
          });

          gsap.to(".quote-left", {
            xPercent: 22, yPercent: -20, rotation: -5, ease: "none",
            scrollTrigger: { trigger: ".quote-stage", start: "top bottom", end: "bottom top", scrub: true },
          });
          gsap.to(".quote-right", {
            xPercent: -18, yPercent: 14, rotation: 5, ease: "none",
            scrollTrigger: { trigger: ".quote-stage", start: "top bottom", end: "bottom top", scrub: true },
          });
          gsap.from(".quote-center > *", {
            y: 70, opacity: 0, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: ".quote-center", start: "top 82%", end: "top 45%", scrub: true },
          });

          const track = document.querySelector<HTMLElement>(".horizontal-track");
          if (track) {
            const horizontalTween = gsap.to(track, {
              x: () => -(Math.max(0, track.scrollWidth - window.innerWidth * 0.98)),
              ease: "none",
              scrollTrigger: {
                trigger: ".horizontal-stage",
                start: "top top",
                end: () => "+=" + Math.max(window.innerHeight * 4, track.scrollWidth * 1.25),
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            gsap.to(".horizontal-intro", {
              xPercent: -12, opacity: 0.25, ease: "none",
              scrollTrigger: {
                trigger: ".horizontal-stage", start: "top top",
                end: () => "+=" + Math.max(window.innerHeight * 2.2, track.scrollWidth * 0.6),
                scrub: true,
              },
            });
            gsap.utils.toArray<HTMLElement>(".archive-card").forEach((card, i) => {
              const image = card.querySelector<HTMLElement>("img");
              gsap.fromTo(card,
                { y: i % 2 ? 70 : -55, rotateY: i % 2 ? 5 : -5, rotateZ: i % 2 ? 1.5 : -1.5, opacity: 0.35 },
                { y: 0, rotateY: 0, rotateZ: 0, opacity: 1, ease: "none",
                  scrollTrigger: { trigger: card, containerAnimation: horizontalTween, start: "left 95%", end: "left 48%", scrub: true } }
              );
              if (image) gsap.to(image, {
                xPercent: i % 2 ? -6 : 6, scale: 1.1, ease: "none",
                scrollTrigger: { trigger: card, containerAnimation: horizontalTween, start: "left 110%", end: "right -10%", scrub: true },
              });
            });
          }

          gsap.utils.toArray<HTMLElement>(".detail-card").forEach((card, i) => {
            const image = card.querySelector<HTMLElement>(".detail-image");
            gsap.fromTo(card,
              { y: 90 + i * 18, opacity: 0, rotationZ: i % 2 ? 1 : -1 },
              { y: 0, opacity: 1, rotationZ: 0, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 92%", end: "top 50%", scrub: true } }
            );
            if (image) {
              gsap.fromTo(image, { clipPath: "inset(14% 0 14% 0)" }, { clipPath: "inset(0)", ease: "none",
                scrollTrigger: { trigger: card, start: "top 90%", end: "top 45%", scrub: true } });
              const img = image.querySelector("img");
              if (img) gsap.to(img, { yPercent: -10, scale: 1.08, ease: "none",
                scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
            }
          });

          gsap.to(".depth-one", { yPercent: -16, xPercent: -3, rotation: -3, ease: "none", scrollTrigger: { trigger: ".depth-gallery", start: "top bottom", end: "bottom top", scrub: true } });
          gsap.to(".depth-two", { yPercent: 10, xPercent: 3, rotation: 3, ease: "none", scrollTrigger: { trigger: ".depth-gallery", start: "top bottom", end: "bottom top", scrub: true } });
          gsap.to(".depth-three", { yPercent: -22, rotation: -1, ease: "none", scrollTrigger: { trigger: ".depth-gallery", start: "top bottom", end: "bottom top", scrub: true } });
          gsap.from(".depth-copy > *", { x: -55, opacity: 0, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".depth-copy", start: "top 84%", end: "top 45%", scrub: true } });

          gsap.utils.toArray<HTMLElement>(".style-item").forEach((item, i) => {
            gsap.fromTo(item, { x: i % 2 ? 35 : -35, opacity: 0 }, { x: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 92%", end: "top 68%", scrub: true } });
            gsap.to(item.querySelector("h3"), { x: i % 2 ? -7 : 7, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } });
            gsap.to(item.querySelector("b"), { scaleX: 1, transformOrigin: "left center", ease: "none", scrollTrigger: { trigger: item, start: "top 82%", end: "top 48%", scrub: true } });
          });

          gsap.to(".studio-frame img", { yPercent: -10, scale: 1.1, ease: "none", scrollTrigger: { trigger: ".studio-editorial", start: "top bottom", end: "bottom top", scrub: true } });
          gsap.to(".studio-frame strong", { yPercent: -40, xPercent: -15, ease: "none", scrollTrigger: { trigger: ".studio-editorial", start: "top bottom", end: "bottom top", scrub: true } });
          gsap.from(".studio-copy > *", { y: 55, opacity: 0, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".studio-copy", start: "top 82%", end: "top 45%", scrub: true } });

          gsap.to(".final-ring:not(.final-ring-small)", { rotation: 180, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".final-mark", start: "top bottom", end: "bottom top", scrub: true } });
          gsap.to(".final-logo-image", { rotation: -90, scale: 1.08, yPercent: -4, ease: "none", scrollTrigger: { trigger: ".final-mark", start: "top bottom", end: "bottom top", scrub: true } });
          gsap.to(".final-ring-small", { rotation: -240, scale: 0.88, ease: "none", scrollTrigger: { trigger: ".final-mark", start: "top bottom", end: "bottom top", scrub: true } });
          gsap.from(".final-word", { y: 90, opacity: 0, scale: 0.9, scrollTrigger: { trigger: ".final-mark", start: "top 82%", end: "top 38%", scrub: true } });
        });
        mm.add("(max-width: 800px)", () => {
          // Full mobile choreography. Lenis syncTouch keeps touch scrolling
          // synchronized with ScrollTrigger, while these animations use the
          // same visual language as desktop with smaller travel distances.

          gsap.to(".hero-photo-inner", {
            scale: 1.12, yPercent: -7, xPercent: 2, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 },
          });
          gsap.to(".hero-copy", {
            yPercent: -9, opacity: 0.72, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
          });
          gsap.to(".hero-brand", {
            yPercent: -45, opacity: 0.45, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 },
          });
          gsap.to(".hero-side", {
            yPercent: -30, ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.4 },
          });

          gsap.fromTo(".manifesto-image",
            { clipPath: "inset(12% 0 12% 0)", scale: 0.96 },
            { clipPath: "inset(0% 0 0% 0)", scale: 1, ease: "none",
              scrollTrigger: { trigger: ".manifesto", start: "top 88%", end: "top 35%", scrub: 1 } }
          );
          gsap.to(".manifesto-image img", {
            yPercent: -9, scale: 1.08, ease: "none",
            scrollTrigger: { trigger: ".manifesto-image", start: "top bottom", end: "bottom top", scrub: 1.4 },
          });
          gsap.to(".manifesto-number", {
            yPercent: 35, rotation: -5, ease: "none",
            scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
          gsap.from(".manifesto-copy > *", {
            y: 42, opacity: 0, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: ".manifesto-copy", start: "top 88%", end: "top 48%", scrub: 0.9 },
          });

          gsap.to(".quote-left", {
            xPercent: 10, yPercent: -10, rotation: -3, ease: "none",
            scrollTrigger: { trigger: ".quote-stage", start: "top bottom", end: "bottom top", scrub: 1.4 },
          });
          gsap.to(".quote-right", {
            xPercent: -10, yPercent: 8, rotation: 3, ease: "none",
            scrollTrigger: { trigger: ".quote-stage", start: "top bottom", end: "bottom top", scrub: 1.6 },
          });
          gsap.from(".quote-center > *", {
            y: 48, opacity: 0, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".quote-center", start: "top 88%", end: "top 50%", scrub: 0.9 },
          });

          // Horizontal archive becomes a touch carousel, while each card still
          // participates in scroll-linked reveal/parallax.
          gsap.utils.toArray<HTMLElement>(".archive-card").forEach((card, i) => {
            const image = card.querySelector<HTMLImageElement>("img");
            gsap.fromTo(card,
              { y: i % 2 ? 28 : -28, opacity: 0.45, rotateZ: i % 2 ? 1.5 : -1.5 },
              { y: 0, opacity: 1, rotateZ: 0, ease: "none",
                scrollTrigger: { trigger: card, scroller: ".horizontal-track", horizontal: true, start: "left 92%", end: "left 42%", scrub: 1 } }
            );
            if (image) {
              gsap.to(image, {
                xPercent: i % 2 ? -4 : 4, scale: 1.06, ease: "none",
                scrollTrigger: { trigger: card, scroller: ".horizontal-track", horizontal: true, start: "left 105%", end: "right -5%", scrub: 1.1 },
              });
            }
          });

          // The process stage remains pinned and its scene transitions are
          // directly driven by vertical touch scroll.
          gsap.utils.toArray<HTMLElement>(".detail-card").forEach((card, i) => {
            const image = card.querySelector<HTMLElement>(".detail-image");
            gsap.from(card, {
              y: 55 + i * 12, opacity: 0, rotate: i % 2 ? 1 : -1,
              scrollTrigger: { trigger: card, start: "top 94%", end: "top 58%", scrub: 0.9 },
            });
            if (image) {
              gsap.fromTo(image,
                { clipPath: "inset(12% 0 12% 0)" },
                { clipPath: "inset(0% 0 0% 0)", ease: "none",
                  scrollTrigger: { trigger: card, start: "top 92%", end: "top 48%", scrub: 1 } }
              );
              const imageElement = image.querySelector<HTMLImageElement>("img");
              if (imageElement) {
                gsap.to(imageElement, {
                  yPercent: -8, scale: 1.06, ease: "none",
                  scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.4 },
                });
              }
            }
          });

          gsap.to(".depth-one", {
            yPercent: -13, xPercent: -2, rotation: -2.5, ease: "none",
            scrollTrigger: { trigger: ".depth-gallery", start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
          gsap.to(".depth-two", {
            yPercent: 9, xPercent: 2, rotation: 2.5, ease: "none",
            scrollTrigger: { trigger: ".depth-gallery", start: "top bottom", end: "bottom top", scrub: 1.3 },
          });
          gsap.to(".depth-three", {
            yPercent: -8, rotation: -1, ease: "none",
            scrollTrigger: { trigger: ".depth-gallery", start: "top bottom", end: "bottom top", scrub: 1.6 },
          });
          gsap.from(".depth-copy > *", {
            x: -38, opacity: 0, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: ".depth-copy", start: "top 88%", end: "top 50%", scrub: 0.9 },
          });

          gsap.utils.toArray<HTMLElement>(".style-item").forEach((item, i) => {
            gsap.from(item, {
              x: i % 2 ? 28 : -28, opacity: 0,
              scrollTrigger: { trigger: item, start: "top 94%", end: "top 72%", scrub: 0.8 },
            });
            gsap.to(item.querySelector("h3"), {
              x: i % 2 ? -6 : 6, ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1.1 },
            });
            gsap.to(item.querySelector("b"), {
              scaleX: 1, transformOrigin: "left center", ease: "none",
              scrollTrigger: { trigger: item, start: "top 82%", end: "top 48%", scrub: 0.8 },
            });
          });

          gsap.to(".studio-frame img", {
            yPercent: -9, scale: 1.08, ease: "none",
            scrollTrigger: { trigger: ".studio-editorial", start: "top bottom", end: "bottom top", scrub: 1.6 },
          });
          gsap.to(".studio-frame strong", {
            yPercent: -28, xPercent: -8, ease: "none",
            scrollTrigger: { trigger: ".studio-editorial", start: "top bottom", end: "bottom top", scrub: 1.4 },
          });
          gsap.from(".studio-copy > *", {
            y: 45, opacity: 0, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: ".studio-copy", start: "top 88%", end: "top 50%", scrub: 0.9 },
          });

          gsap.to(".final-ring:not(.final-ring-small)", {
            rotation: 180, scale: 1.08, ease: "none",
            scrollTrigger: { trigger: ".final-mark", start: "top bottom", end: "bottom top", scrub: 1.6 },
          });
          gsap.to(".final-ring-small", {
            rotation: -240, scale: 0.9, ease: "none",
            scrollTrigger: { trigger: ".final-mark", start: "top bottom", end: "bottom top", scrub: 2.1 },
          });
          gsap.from(".final-word", {
            y: 65, opacity: 0, scale: 0.92,
            scrollTrigger: { trigger: ".final-mark", start: "top 88%", end: "top 42%", scrub: 1 },
          });
        });

        // Cinematic chapter choreography inspired by editorial/Webflow-style
        // scroll storytelling: clipped entrances, layered depth, and deliberate
        // section rhythm without moving the document's layout geometry.
        const chapterReveals = [
          ".detail-heading",
          ".style-index-head",
          ".studio-copy",
          ".footer-brand",
        ];
        chapterReveals.forEach((selector, index) => {
          const nodes = gsap.utils.toArray<HTMLElement>(selector);
          nodes.forEach((node) => {
            gsap.fromTo(node,
              { y: 48, opacity: 0, clipPath: "inset(0 0 14% 0)" },
              { y: 0, opacity: 1, clipPath: "inset(0)", ease: "power3.out",
                scrollTrigger: {
                  trigger: node,
                  start: "top 92%",
                  end: "top 58%",
                  scrub: isTouch ? 0.75 : 0.5,
                  invalidateOnRefresh: true,
                }
              }
            );
          });
        });

        // Headline masks: the large editorial words reveal as if they are being
        // pulled through a viewport rather than simply fading in.
        gsap.utils.toArray<HTMLElement>(".manifesto-copy h2, .quote-center h2, .depth-copy h2, .studio-copy h2, .final-word").forEach((node) => {
          gsap.fromTo(node,
            { yPercent: 16, clipPath: "inset(12% 0 12% 0)", opacity: 0.25 },
            { yPercent: 0, clipPath: "inset(0)", opacity: 1, ease: "none",
              scrollTrigger: {
                trigger: node,
                start: "top 88%",
                end: "top 38%",
                scrub: isTouch ? 0.85 : 0.6,
                invalidateOnRefresh: true,
              }
            }
          );
        });

        // Small editorial details get a slower counter-motion to create the
        // layered depth seen in premium agency/portfolio scroll experiences.
        gsap.utils.toArray<HTMLElement>(".archive-caption, .scene-label, .scene-no, .depth-stat, .studio-tags").forEach((node, index) => {
          gsap.fromTo(node,
            { y: index % 2 ? 18 : -14, opacity: 0.25 },
            { y: 0, opacity: 1, ease: "none",
              scrollTrigger: {
                trigger: node,
                start: "top 92%",
                end: "top 52%",
                scrub: isTouch ? 0.9 : 0.65,
                invalidateOnRefresh: true,
              }
            }
          );
        });

        // Footer becomes a final slow reveal instead of appearing abruptly after
        // the CTA, giving the page a complete beginning-to-end motion arc.
        gsap.from(".re-footer > *", {
          y: 30, opacity: 0, stagger: 0.08, ease: "power2.out",
          scrollTrigger: {
            trigger: ".re-footer",
            start: "top 94%",
            end: "top 65%",
            scrub: isTouch ? 0.8 : 0.55,
            invalidateOnRefresh: true,
          },
        });

        // Drive a very subtle velocity response into the archive and depth
        // imagery. It uses a CSS custom property so it never fights the
        // ScrollTrigger transforms already controlling those elements.
        const velocityTargets = gsap.utils.toArray<HTMLElement>(".archive-card, .depth-photo, .quote-word");
        const velocityTo = velocityTargets.map((node) =>
          gsap.quickTo(node, "--scroll-velocity", {
            duration: isTouch ? 0.28 : 0.2,
            ease: "power3.out",
          })
        );
        velocityScroll = (event: { velocity?: number }) => {
          const velocity = Math.max(-1, Math.min(1, (event.velocity || 0) / 2.5));
          velocityTo.forEach((setter) => setter(velocity));
        };
        activeLenis.on("scroll", velocityScroll);

        // New editorial homepage motion system.
        // These scenes intentionally animate the new redesign classes, not the
        // legacy selectors, so the redesign remains deterministic.
        const revealSelectors = [
          ".re-statement-main > *",
          ".re-work-head > *",
          ".re-styles-copy > *",
          ".re-section-head > *",
          ".re-studio-copy > *",
          ".re-trust-panel > *",
          ".re-final-copy > *",
        ];
        revealSelectors.forEach((selector) => {
          gsap.from(selector, {
            y: 42,
            opacity: 0,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: selector,
              start: "top 88%",
              end: "top 48%",
              scrub: isTouch ? 0.8 : 0.55,
              invalidateOnRefresh: true,
            },
          });
        });

        const chapterImages = [
          [".re-statement-bg", { yPercent: -12, rotation: -5 }],
          [".re-studio-image img", { yPercent: -10, scale: 1.08 }],
          [".re-trust-image img", { yPercent: -12, scale: 1.08 }],
          [".re-final-image img", { yPercent: -10, scale: 1.08 }],
        ] as const;
        chapterImages.forEach(([selector, vars]) => {
          gsap.to(selector, {
            ...vars,
            ease: "none",
            scrollTrigger: {
              trigger: selector,
              start: "top bottom",
              end: "bottom top",
              scrub: isTouch ? 1.2 : 0.9,
              invalidateOnRefresh: true,
            },
          });
        });

        // Editorial horizontal work strip. On desktop the strip is driven by
        // vertical page scroll; on mobile its native horizontal scroller remains
        // touch-first.
        const workTrack = document.querySelector<HTMLElement>(".re-work-track");
        if (workTrack && !isTouch) {
          const maxX = () => Math.max(0, workTrack.scrollWidth - window.innerWidth * 0.94);
          const workTween = gsap.to(workTrack, {
            x: () => -maxX(),
            ease: "none",
            scrollTrigger: {
              trigger: ".re-work",
              start: "top top",
              end: () => "+=" + Math.max(window.innerHeight * 2.6, maxX() * 1.2),
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          gsap.utils.toArray<HTMLElement>(".re-work-card").forEach((card, index) => {
            const image = card.querySelector("img");
            gsap.fromTo(card,
              { y: index % 2 ? 75 : -45, opacity: 0.25, rotateZ: index % 2 ? 1.2 : -1.2 },
              { y: 0, opacity: 1, rotateZ: 0, ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: workTween,
                  start: "left 92%",
                  end: "left 52%",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            );
            if (image) {
              gsap.to(image, {
                xPercent: index % 2 ? -5 : 5,
                scale: 1.06,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: workTween,
                  start: "left 105%",
                  end: "right -10%",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              });
            }
          });
        }

        // Pinned manifesto: typography holds while the image crosses the frame.
        const manifestoTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".re-manifesto",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        manifestoTimeline
          .fromTo(".re-manifesto-word",
            { yPercent: 10, scale: 0.94, opacity: 0.55 },
            { yPercent: -8, scale: 1.02, opacity: 1, ease: "none" }, 0)
          .fromTo(".re-manifesto-image",
            { xPercent: 18, clipPath: "inset(10% 0 10% 16%)", scale: 0.9 },
            { xPercent: -7, clipPath: "inset(0)", scale: 1.02, ease: "none" }, 0)
          .fromTo(".re-manifesto-copy",
            { yPercent: 18, opacity: 0 },
            { yPercent: -6, opacity: 1, ease: "none" }, 0.1);

        // Statement chapter uses opposing word movement for a poster-like scene.
        gsap.to(".re-statement-bg", {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".re-statement",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
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

        // Final safety refresh after all responsive geometry, fonts and images
        // have had a chance to settle.
        requestAnimationFrame(() => {
          ScrollTrigger.refresh(true);
          window.setTimeout(() => ScrollTrigger.refresh(true), 350);
        });

        const refresh = () => {
          scheduleRefresh();
        };

        resizeObserver = new ResizeObserver(refresh);
        const shell = document.querySelector<HTMLElement>(".onyx-shell");
        if (shell) resizeObserver.observe(shell);

        visualViewport = window.visualViewport ?? null;
        visualViewport?.addEventListener("resize", refresh, { passive: true });
        window.addEventListener("orientationchange", refresh, { passive: true });

        document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
          if (!img.complete) {
            const handler = () => scheduleRefresh();
            img.addEventListener("load", handler, { once: true });
            imageLoadHandlers.push(() => img.removeEventListener("load", handler));
          }
        });

        if (document.readyState === "complete") {
          window.setTimeout(scheduleRefresh, 50);
        } else {
          window.addEventListener("load", scheduleRefresh, { once: true });
        }
        document.fonts?.ready.then(scheduleRefresh).catch(() => undefined);

        return () => {
          window.removeEventListener("load", scheduleRefresh);
          window.removeEventListener("orientationchange", scheduleRefresh);
          mm.revert();
          cleanupMotion();
        };
      });

      return () => ctx.revert();
    } catch (error) {
      // Deliberately swallow animation initialization failures.
      // The rendered page remains fully usable without motion.
      console.warn("[ONYX] Motion layer disabled:", error);
      cleanupMotion();
      return cleanupMotion;
    }

    return cleanupMotion;
  }, []);

  return null;
}
