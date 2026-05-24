"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import SettingsModal from "./SettingsModal";

/* ================================================================
   SVG LOGO — sticker with per-letter colors, thick white outline
   ================================================================ */
function LogoSticker() {
  return (
    <div className="relative inline-block select-none">
      <svg viewBox="0 0 320 76" className="w-[270px] h-auto"
        style={{ filter: "drop-shadow(0 5px 12px rgba(0,0,0,0.22))" }}>
        <defs>
          <filter id="ls2" x="-15%" y="-15%" width="130%" height="130%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="3.5" result="e" />
            <feFlood floodColor="white" result="w" />
            <feComposite in="w" in2="e" operator="in" result="o" />
            <feMerge><feMergeNode in="o" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <text x="160" y="60" textAnchor="middle"
          fontFamily="'Nunito','Baloo 2','Fredoka One',sans-serif"
          fontWeight="900" fontSize="52" filter="url(#ls2)">
          <tspan fill="#F59E0B">L</tspan>
          <tspan fill="#F97316">i</tspan>
          <tspan fill="#3B82F6">l</tspan>
          <tspan fill="#8B5CF6">o</tspan>
          <tspan fill="#FFD93D" fontSize="40">&amp;</tspan>
          <tspan fill="#EC4899">N</tspan>
          <tspan fill="#3B82F6">o</tspan>
          <tspan fill="#8B5CF6">a</tspan>
        </text>
      </svg>
      <span className="absolute animate-sparkle pointer-events-none"
        style={{ top: -8, left: -22, color: "#FFD93D", fontSize: 18 }}>✦</span>
      <span className="absolute animate-sparkle pointer-events-none"
        style={{ top: -6, right: -20, color: "#FFD93D", fontSize: 14, animationDelay: "0.4s" }}>✦</span>
      <span className="absolute animate-sparkle pointer-events-none"
        style={{ bottom: -2, left: -14, color: "#FFD93D", fontSize: 12, animationDelay: "0.8s" }}>✦</span>
    </div>
  );
}

/* ================================================================
   SVG CASTLE — distant fairy-tale castle
   ================================================================ */
function BackgroundScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Sky gradient */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #7EC8F8 0%, #96D8F8 15%, #B8E8FC 30%, #D4F0FC 50%, #C8E8D4 65%, #B0DCA8 80%, #90CC90 100%)" }} />

      {/* Castle SVG */}
      <div className="absolute" style={{ top: "24%", left: "55%", opacity: 0.4 }}>
        <svg width="100" height="80" viewBox="0 0 100 80">
          <rect x="5" y="30" width="16" height="50" fill="#D4B8E8" rx="3" />
          <rect x="38" y="20" width="24" height="60" fill="#E0C8F0" rx="4" />
          <rect x="78" y="30" width="16" height="50" fill="#D4B8E8" rx="3" />
          <rect x="3" y="20" width="8" height="12" fill="#B088D8" rx="2" />
          <rect x="88" y="20" width="8" height="12" fill="#B088D8" rx="2" />
          <rect x="36" y="8" width="10" height="14" fill="#C098E0" rx="2" />
          <rect x="48" y="0" width="3" height="20" fill="#8B5CF6" />
          <polygon points="48,0 56,5 48,10" fill="#F472B6" />
          <polygon points="56,12 48,16 40,12" fill="#F472B6" />
        </svg>
      </div>

      {/* Clouds */}
      <div className="absolute" style={{ top: "8%", left: "8%" }}>
        <div className="flex gap-1">
          <div className="rounded-full bg-white/70" style={{ width: 48, height: 28, filter: "blur(2px)" }} />
          <div className="rounded-full bg-white/60" style={{ width: 36, height: 22, filter: "blur(2px)", marginTop: 4 }} />
          <div className="rounded-full bg-white/50" style={{ width: 40, height: 24, filter: "blur(2px)", marginTop: 2 }} />
        </div>
      </div>
      <div className="absolute" style={{ top: "12%", right: "10%" }}>
        <div className="flex gap-1">
          <div className="rounded-full bg-white/65" style={{ width: 38, height: 24, filter: "blur(2px)" }} />
          <div className="rounded-full bg-white/55" style={{ width: 44, height: 28, filter: "blur(2px)", marginTop: 4 }} />
        </div>
      </div>
      <div className="absolute" style={{ top: "6%", left: "35%" }}>
        <div className="rounded-full bg-white/60" style={{ width: 50, height: 26, filter: "blur(2px)" }} />
      </div>

      {/* Flowers at bottom */}
      <div className="absolute" style={{ bottom: "18%", left: "8%" }}>
        {["#F472B6","#FFD93D","#F472B6"].map((c, i) => (
          <div key={i} className="inline-block mx-1 rounded-full" style={{ width: 10, height: 10, background: c }} />
        ))}
      </div>
      <div className="absolute" style={{ bottom: "16%", right: "12%" }}>
        {["#FFD93D","#F472B6","#E879F9"].map((c, i) => (
          <div key={i} className="inline-block mx-1 rounded-full" style={{ width: 9, height: 9, background: c }} />
        ))}
      </div>

      {/* Sparkles */}
      {[
        { t: "8%", l: "18%", s: 14 },
        { t: "14%", l: "55%", s: 11 },
        { t: "6%", l: "78%", s: 13 },
        { t: "19%", l: "28%", s: 10 },
      ].map((p, i) => (
        <span key={i} className="absolute animate-sparkle" style={{
          top: p.t, left: p.l, fontSize: p.s, color: "#FFD93D",
          animationDelay: i * 0.3 + "s"
        }}>✦</span>
      ))}
    </div>
  );
}

/* ================================================================
   BUTTONS
   ================================================================ */
function PlayButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="relative w-[280px] h-[72px] rounded-[38px] font-extrabold text-[28px] text-white
        flex items-center justify-center gap-3
        transition-all hover:brightness-110 active:scale-[0.97]"
      style={{
        background: "linear-gradient(180deg, #B4FF40 0%, #8DD928 30%, #6DC91A 60%, #4CAF50 100%)",
        boxShadow: "0 7px 0 #388E3C, 0 9px 26px rgba(0,0,0,0.25), inset 0 3px 0 rgba(255,255,255,0.7)",
        border: "3px solid rgba(255,255,255,0.6)",
      }}>
      <span className="text-[30px] drop-shadow-md">▶</span>
      Jouer
    </button>
  );
}

function BottomBtn({ label, icon, colors, textColor, shadow, onClick }: {
  label: string; icon: string;
  colors: [string, string]; textColor: string; shadow: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick}
      className="w-[135px] h-[56px] rounded-[26px] font-extrabold text-[14px]
        flex items-center justify-center gap-2
        transition-all hover:scale-[1.02] active:scale-95"
      style={{
        background: "linear-gradient(180deg, " + colors[0] + " 0%, " + colors[1] + " 100%)",
        color: textColor,
        boxShadow: "0 4px 0 " + shadow + ", 0 4px 14px rgba(0,0,0,0.13), inset 0 2px 0 rgba(255,255,255,0.6)",
        border: "2px solid rgba(255,255,255,0.7)",
      }}>
      {icon} {label}
    </button>
  );
}

/* ================================================================
   HOME SCREEN
   ================================================================ */
export default function HomeScreen() {
  const { profile, setScreen } = useGame();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <BackgroundScene />

      {/* Bottom vignette for button contrast */}
      <div className="absolute bottom-0 left-0 right-0 h-[32%] z-[1] pointer-events-none"
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.12) 0%, transparent 100%)" }} />

      {/* ═══ TOP BAR ═══ */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-6">
        {/* Badge */}
        <div className="flex items-center gap-1.5"
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "30px",
            padding: "4px 16px 4px 5px",
            boxShadow: "0 3px 14px rgba(0,0,0,0.08), inset 0 1px 0 white",
            border: "2px solid rgba(255,255,255,0.9)",
          }}>
          <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-extrabold text-white text-[18px] shrink-0"
            style={{
              background: "linear-gradient(135deg, #F59E0B, #F97316)",
              boxShadow: "0 3px 10px rgba(245,158,11,0.45), inset 0 1px 0 rgba(255,255,255,0.5)",
              border: "2px solid white",
            }}>L</div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-extrabold" style={{ color: "#5B21B6" }}>{profile.name}</span>
            <div className="flex items-center gap-0.5 -mt-0.5">
              <span className="text-[14px]">⭐</span>
              <span className="text-[11px] font-extrabold" style={{ color: "#D97706" }}>{profile.stars}</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <button onClick={() => setShowSettings(true)}
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white text-xl
            hover:scale-110 transition active:scale-95"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
            boxShadow: "0 4px 16px rgba(109,40,217,0.5), inset 0 1px 0 rgba(255,255,255,0.35)",
            border: "3px solid rgba(255,255,255,0.8)",
          }}>⚙️</button>
      </div>

      {/* ═══ LOGO ═══ */}
      <div className="absolute top-[13%] left-0 right-0 z-20 flex justify-center">
        <LogoSticker />
      </div>

      {/* ═══ MASCOT ═══ */}
      <div className="absolute top-[27%] bottom-[22%] left-0 right-0 z-10 flex items-center justify-center">
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: "160px", height: "160px", background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)", filter: "blur(16px)" }} />
          <div className="animate-float">
            <img src="/images/mascot.png" alt="Noa"
              className="w-[200px] h-[200px] object-contain relative z-10"
              style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.28))" }} />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: "100px", height: "14px", background: "rgba(0,0,0,0.18)", filter: "blur(4px)" }} />
        </div>
      </div>

      {/* ═══ PLAY + BOTTOM BUTTONS ═══ */}
      <div className="absolute bottom-[6%] left-0 right-0 z-20 flex flex-col items-center gap-3">
        <PlayButton onClick={() => setScreen("worlds")} />
        <div className="flex gap-3">
          <BottomBtn label="Profil" icon="👤"
            colors={["#FFD93D", "#F59E0B"]} textColor="#5B21B6" shadow="#D97706"
            onClick={() => setScreen("profile")} />
          <BottomBtn label="Paramètres" icon="⚙️"
            colors={["#A78BFA", "#7C3AED"]} textColor="white" shadow="#5B21B6"
            onClick={() => setShowSettings(true)} />
        </div>
      </div>

      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
