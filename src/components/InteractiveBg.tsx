"use client";

import { useEffect, useRef } from "react";

interface MatrixColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
}

export function InteractiveBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    // Matrix rain characters - mix of code symbols and binary
    const MATRIX_CHARS = "01アイウエオカキクケコサシスセソタチツテト{}[]()<>/\\|=+-*&^%$#@!~`?;:.,";
    const COLUMN_COUNT = Math.floor(W / 20);
    const FONT_SIZE = 14;
    const GLOW_RADIUS = 150;
    const ACCELERATION = 2.5;

    const mouse = { x: -9999, y: -9999 };

    // Initialize matrix columns
    const columns: MatrixColumn[] = [];
    for (let i = 0; i < COLUMN_COUNT; i++) {
      columns.push({
        x: i * 20,
        y: Math.random() * H - H,
        speed: 0.5 + Math.random() * 1.5,
        chars: Array(Math.floor(H / FONT_SIZE))
          .fill("")
          .map(() => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]),
      });
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    const draw = () => {
      // Fade effect for trail
      ctx.fillStyle = "rgba(10, 14, 15, 0.08)";
      ctx.fillRect(0, 0, W, H);

      // Draw circuit grid (subtle background)
      ctx.strokeStyle = "rgba(0, 255, 170, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Draw matrix rain
      ctx.font = `${FONT_SIZE}px "Fira Code", monospace`;

      columns.forEach((col) => {
        // Check distance from mouse for acceleration
        const dx = mouse.x - col.x;
        const dy = mouse.y - col.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speedMultiplier = dist < GLOW_RADIUS ? ACCELERATION : 1;

        col.y += col.speed * speedMultiplier;

        // Reset column when it goes off screen
        if (col.y > H + 100) {
          col.y = -Math.random() * H;
          col.speed = 0.5 + Math.random() * 1.5;
        }

        // Draw each character in the column
        col.chars.forEach((char, i) => {
          const y = col.y + i * FONT_SIZE;
          if (y < 0 || y > H) return;

          // Calculate glow based on mouse proximity
          const charDist = Math.sqrt(Math.pow(mouse.x - col.x, 2) + Math.pow(mouse.y - y, 2));
          const proximity = Math.max(0, 1 - charDist / GLOW_RADIUS);

          // Color gradient: neon green (#00ffaa) primary, cyan (#00d9ff) on glow
          const isHead = i < 3;
          let alpha = isHead ? 0.9 : 0.15 - i * 0.01;
          alpha += proximity * 0.5;

          if (proximity > 0.3) {
            // Cyan glow near cursor
            ctx.fillStyle = `rgba(0, 217, 255, ${alpha})`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(0, 217, 255, 0.8)";
          } else {
            // Neon green default
            ctx.fillStyle = `rgba(0, 255, 170, ${alpha})`;
            ctx.shadowBlur = isHead ? 10 : 0;
            ctx.shadowColor = "rgba(0, 255, 170, 0.6)";
          }

          ctx.fillText(char, col.x, y);
        });

        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Canvas for matrix rain */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 w-full h-full"
        style={{ background: "#0a0e0f" }}
      />
      
      {/* Palm tree silhouettes (SVG) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        {/* Left palm tree */}
        <svg
          className="absolute bottom-0 left-0 h-64 w-64 animate-palm-sway"
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M95 300 Q90 250 85 200 Q80 150 90 100 Q95 50 100 0"
            stroke="#00ffaa"
            strokeWidth="3"
            opacity="0.3"
            fill="none"
          />
          <path d="M100 50 Q50 30 20 40 Q40 50 100 60 Z" fill="#00ffaa" opacity="0.25" />
          <path d="M100 50 Q150 30 180 40 Q160 50 100 60 Z" fill="#00ffaa" opacity="0.25" />
          <path d="M100 80 Q60 70 30 85 Q50 90 100 95 Z" fill="#00ffaa" opacity="0.25" />
          <path d="M100 80 Q140 70 170 85 Q150 90 100 95 Z" fill="#00ffaa" opacity="0.25" />
          <path d="M100 110 Q70 105 40 120 Q60 120 100 125 Z" fill="#00ffaa" opacity="0.25" />
          <path d="M100 110 Q130 105 160 120 Q140 120 100 125 Z" fill="#00ffaa" opacity="0.25" />
        </svg>

        {/* Right palm tree */}
        <svg
          className="absolute bottom-0 right-0 h-72 w-72 animate-palm-sway"
          style={{ animationDelay: "1s" }}
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M105 300 Q110 250 115 200 Q120 150 110 100 Q105 50 100 0"
            stroke="#ff6b35"
            strokeWidth="3"
            opacity="0.2"
            fill="none"
          />
          <path d="M100 50 Q50 30 20 40 Q40 50 100 60 Z" fill="#ff6b35" opacity="0.15" />
          <path d="M100 50 Q150 30 180 40 Q160 50 100 60 Z" fill="#ff6b35" opacity="0.15" />
          <path d="M100 80 Q60 70 30 85 Q50 90 100 95 Z" fill="#ff6b35" opacity="0.15" />
          <path d="M100 80 Q140 70 170 85 Q150 90 100 95 Z" fill="#ff6b35" opacity="0.15" />
          <path d="M100 110 Q70 105 40 120 Q60 120 100 125 Z" fill="#ff6b35" opacity="0.15" />
        </svg>
      </div>
    </>
  );
}
