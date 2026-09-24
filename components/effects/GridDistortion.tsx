"use client";

import { useEffect, useRef } from "react";

export function GridDistortion({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const distortionAt = (x: number, y: number, time: number) => {
      const deltaX = x - pointer.x;
      const deltaY = y - pointer.y;
      const distance = Math.hypot(deltaX, deltaY);
      const influence = pointer.active ? Math.max(0, 1 - distance / 260) : 0;
      const wave = Math.sin(y * 0.022 + time * 0.0014) * (1.2 + influence * 2.5);
      return {
        x: x + Math.cos(time * 0.001 + y * 0.012) * influence * 22 + wave,
        y: y + Math.sin(time * 0.0012 + x * 0.014) * influence * 18,
        influence,
      };
    };

    const draw = (time: number) => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.globalCompositeOperation = "screen";
      context.lineWidth = 0.7;

      const spacing = width < 600 ? 34 : 46;
      const step = 8;

      for (let x = -spacing; x <= width + spacing; x += spacing) {
        context.beginPath();
        for (let y = -step; y <= height + step; y += step) {
          const point = distortionAt(x, y, time);
          if (y === -step) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
          context.strokeStyle = `rgba(255, 255, 255, ${0.11 + point.influence * 0.18})`;
        }
        context.stroke();
      }

      for (let y = -spacing; y <= height + spacing; y += spacing) {
        context.beginPath();
        for (let x = -step; x <= width + step; x += step) {
          const point = distortionAt(x, y, time);
          if (x === -step) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
          context.strokeStyle = `rgba(255, 255, 255, ${0.11 + point.influence * 0.18})`;
        }
        context.stroke();
      }

      context.globalCompositeOperation = "source-over";
    };

    const render = (time: number) => {
      draw(time);
      if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave, { passive: true });
    resize();
    draw(0);
    if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={`grid-distortion ${className}`} aria-hidden="true" />;
}
