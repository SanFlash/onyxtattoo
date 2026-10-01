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
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 01 — hero: masked typography + restrained depth.
      gsap.from(".hero-line span", {
        yPercent: 108,
        opacity: 0,
        duration: 1.35,
        stagger: 0.11,
        ease: "expo.out",
        delay: 0.12,
      });

      gsap.from(".hero .eyebrow, .hero-meta, .hero-side", {
        y: 22,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.65,
      });

      mm.add("(min-width: 801px)", () => {
        // 02 — hero image parallax: slow camera movement.
        gsap.to(".hero-photo-inner", {
          scale: 1.14,
          yPercent: -7,
          xPercent: 2,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.8,
          },
        });

        // 03 — manifesto image curtain + internal parallax.
        gsap.fromTo(".manifesto-image",
          { clipPath: "inset(14% 0 14% 0)" },
          { clipPath: "inset(0% 0 0% 0)", ease: "none",
            scrollTrigger:{trigger:".manifesto",start:"top 75%",end:"top 25%",scrub:1.1}}
        );
        gsap.to(".manifesto-image img", {
          yPercent: -9, scale: 1.08, ease:"none",
          scrollTrigger:{trigger:".manifesto-image",start:"top bottom",end:"bottom top",scrub:1.5}
        });
        gsap.from(".manifesto-copy > *", {
          y: 45, opacity: 0, stagger: 0.08, ease:"power3.out",
          scrollTrigger:{trigger:".manifesto-copy",start:"top 78%",end:"top 42%",scrub:1}
        });

        // 04 — pinned horizontal archive, inspired by sticky horizontal scroll patterns.
        const track = document.querySelector<HTMLElement>(".horizontal-track");
        if (track) {
          const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.08);
          const horizontalTween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: ".horizontal-stage",
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          gsap.utils.toArray<HTMLElement>(".archive-card").forEach((card, i) => {
            const image = card.querySelector("img");
            gsap.fromTo(card,
              { y: i % 2 ? 55 : -35, rotate: i % 2 ? 1.5 : -1.5, opacity: 0.45 },
              { y: 0, rotate: 0, opacity: 1, ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left 88%",
                  end: "left 42%",
                  scrub: 1,
                }
              }
            );
            if (image) {
              gsap.to(image, {
                xPercent: i % 2 ? -5 : 5,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left 100%",
                  end: "right 0%",
                  scrub: 1.3,
                }
              });
            }
          });
        }

        // 05 — process: one sticky viewport, sequential scene replacement.
        const scenes = gsap.utils.toArray<HTMLElement>(".process-scene");
        const processTl = gsap.timeline({
          scrollTrigger:{trigger:".process-stage",start:"top top",end:"bottom bottom",scrub:1.05}
        });
        scenes.forEach((scene,i)=>{
          processTl.to(scene,{
            opacity:1,x:0,y:0,scale:1,clipPath:"inset(0 0 0 0)",
            duration:i===0?.2:0.75,ease:"power2.out"
          });
          processTl.to(".process-progress span",{scaleX:(i+1)/scenes.length,duration:.5,ease:"none"},"<");
          if(i<scenes.length-1){
            processTl.to(scene,{opacity:0,x:"-4%",y:-18,scale:.97,clipPath:"inset(0 14% 0 0)",duration:.65,ease:"power2.inOut"});
            processTl.fromTo(scenes[i+1],
              {opacity:0,x:"8%",y:22,scale:1.03,clipPath:"inset(0 0 0 14%)"},
              {opacity:1,x:0,y:0,scale:1,clipPath:"inset(0 0 0 0)",duration:.65,ease:"power2.inOut"},
              "<"
            );
          }
        });

        // 06 — depth gallery: three different speeds.
        gsap.to(".depth-one",{yPercent:-12,rotation:-2,ease:"none",scrollTrigger:{trigger:".depth-gallery",start:"top bottom",end:"bottom top",scrub:1.7}});
        gsap.to(".depth-two",{yPercent:8,rotation:2,ease:"none",scrollTrigger:{trigger:".depth-gallery",start:"top bottom",end:"bottom top",scrub:1.3}});
        gsap.to(".depth-three",{yPercent:-18,rotation:-1,ease:"none",scrollTrigger:{trigger:".depth-gallery",start:"top bottom",end:"bottom top",scrub:2}});

        // 07 — style list: progressive reveal, then subtle hover motion.
        gsap.utils.toArray<HTMLElement>(".style-item").forEach((item)=>{
          gsap.from(item,{x:-35,opacity:0,ease:"power3.out",
            scrollTrigger:{trigger:item,start:"top 92%",end:"top 70%",scrub:1}});
          const title=item.querySelector("h3"); const arrow=item.querySelector("i");
          if(title&&arrow){
            const enter=()=>{gsap.to(title,{x:18,duration:.35,ease:"power3.out"});gsap.to(arrow,{x:-8,rotation:-8,duration:.35,ease:"power3.out"});};
            const leave=()=>{gsap.to(title,{x:0,duration:.4,ease:"power3.out"});gsap.to(arrow,{x:0,rotation:0,duration:.4,ease:"power3.out"});};
            item.addEventListener("mouseenter",enter);item.addEventListener("mouseleave",leave);
          }
        });

        // 08 — studio photograph: slow breathing movement.
        gsap.to(".studio-frame img",{yPercent:-9,scale:1.08,ease:"none",
          scrollTrigger:{trigger:".studio-editorial",start:"top bottom",end:"bottom top",scrub:1.7}});

        // 09 — final seal: very slow rotation, no perpetual animation.
        gsap.to(".final-ring",{rotation:180,ease:"none",
          scrollTrigger:{trigger:".final-mark",start:"top bottom",end:"bottom top",scrub:1.7}});
      });

      mm.add("(max-width: 800px)", () => {
        // Mobile: retain the visual rhythm but avoid expensive continuous transforms.
        gsap.utils.toArray<HTMLElement>(".manifesto-image, .manifesto-copy, .depth-copy, .studio-copy").forEach((el)=>{
          gsap.from(el,{y:42,opacity:0,duration:.8,ease:"power3.out",
            scrollTrigger:{trigger:el,start:"top 88%",once:true}});
        });

        gsap.utils.toArray<HTMLElement>(".archive-card").forEach((card)=>{
          gsap.from(card,{y:35,opacity:0,duration:.7,ease:"power3.out",
            scrollTrigger:{trigger:card,start:"top 90%",once:true}});
        });

        gsap.to(".final-ring",{rotation:90,ease:"none",
          scrollTrigger:{trigger:".final-mark",start:"top bottom",end:"bottom top",scrub:2}});
      });

      // 10 — one global progress indicator.
      gsap.to(".scroll-progress span",{
        scaleX:1,ease:"none",
        scrollTrigger:{trigger:document.documentElement,start:"top top",end:"max",scrub:.15}
      });

      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") refresh();
      else window.addEventListener("load",refresh,{once:true});

      return () => {
        window.removeEventListener("load",refresh);
        mm.revert();
      };
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
