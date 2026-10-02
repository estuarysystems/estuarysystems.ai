"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { moduleId, useCaseModules } from "@/lib/use-cases";

const PIXELS_PER_SECOND = 42;

function ReelSet({ clone = false }: { clone?: boolean }) {
  return (
    <>
      {useCaseModules.map((item) => (
        <Link
          key={`${clone ? "clone" : "live"}-${item.title}`}
          href={`/use-cases#${moduleId(item.title)}`}
          className={`use-case-reel-bar${clone ? " use-case-reel-clone" : ""}`}
          tabIndex={clone ? -1 : undefined}
          aria-hidden={clone ? true : undefined}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
}

export function UseCaseReel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const elapsed = now - last;
      last = now;
      if (!paused.current) {
        scroller.scrollLeft += (PIXELS_PER_SECOND * elapsed) / 1000;
        const half = scroller.scrollWidth / 2;
        if (half > 0 && scroller.scrollLeft >= half) {
          scroller.scrollLeft -= half;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return (
    <section
      className="use-case-reel"
      aria-label="Use cases"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
      onFocusCapture={() => {
        paused.current = true;
      }}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          paused.current = false;
        }
      }}
    >
      <div
        ref={scrollerRef}
        className={`use-case-reel-track${reduced ? " is-static" : ""}`}
      >
        <ReelSet />
        {reduced ? null : <ReelSet clone />}
      </div>
    </section>
  );
}
