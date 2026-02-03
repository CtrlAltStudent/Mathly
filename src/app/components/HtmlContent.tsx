"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function HtmlContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const blockMaths = ref.current.querySelectorAll("[data-type='block-math']");
    const inlineMaths = ref.current.querySelectorAll("[data-type='inline-math']");
    blockMaths.forEach((el) => {
      const latex = el.getAttribute("data-latex");
      if (latex) {
        try {
          katex.render(latex, el as HTMLElement, { displayMode: true, throwOnError: false });
        } catch {
          (el as HTMLElement).textContent = latex;
        }
      }
    });
    inlineMaths.forEach((el) => {
      const latex = el.getAttribute("data-latex");
      if (latex) {
        try {
          katex.render(latex, el as HTMLElement, { displayMode: false, throwOnError: false });
        } catch {
          (el as HTMLElement).textContent = latex;
        }
      }
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-700 prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
