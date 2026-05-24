"use client";

/**
 * Premium sticker-style "Lilo & Noa" logo
 * SVG with real text, thick white stroke, drop shadow, per-letter colors
 */
export default function LiloNoaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 340 80"
        className="w-full max-w-[310px] h-auto"
        style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.2))" }}
      >
        <defs>
          <filter id="ls" x="-20%" y="-20%" width="140%" height="140%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="expand" />
            <feFlood floodColor="white" result="white" />
            <feComposite in="white" in2="expand" operator="in" result="outline" />
            <feMerge>
              <feMergeNode in="outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <text
          x="170" y="62" textAnchor="middle"
          fontFamily="'Nunito','Baloo 2','Fredoka One',sans-serif"
          fontWeight="900" fontSize="54" letterSpacing="0"
          filter="url(#ls)"
        >
          <tspan fill="#F59E0B">L</tspan>
          <tspan fill="#F472B6">i</tspan>
          <tspan fill="#60A5FA">l</tspan>
          <tspan fill="#A78BFA">o</tspan>
          <tspan fill="#FFD93D" fontSize="44">&amp;</tspan>
          <tspan fill="#F472B6">N</tspan>
          <tspan fill="#60A5FA">o</tspan>
          <tspan fill="#A78BFA">a</tspan>
        </text>
      </svg>

      {/* Decorative stars */}
      <span className="absolute animate-sparkle pointer-events-none"
        style={{ top: -6, left: -18, color: "#FFD93D", fontSize: 16 }}>✦</span>
      <span className="absolute animate-sparkle pointer-events-none"
        style={{ top: -4, right: -16, color: "#FFD93D", fontSize: 13, animationDelay: "0.4s" }}>✦</span>
      <span className="absolute animate-sparkle pointer-events-none"
        style={{ bottom: 0, left: -10, color: "#FFD93D", fontSize: 11, animationDelay: "0.8s" }}>✦</span>
    </div>
  );
}
