"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import SettingsModal from "./SettingsModal";

/* ═══════════════════════════════════════════════════════════════
   HOME SCREEN — rebuilt per Gemini analysis & reference design
   Colors: #D9F0FF, #E8F7FF, #F0FCFF, #4A90E2, #333333, #999999,
           #92D050, #70AD47, #FFFFFF, #FFD700, #3A7BD5, #000000
   ═══════════════════════════════════════════════════════════════ */

export default function HomeScreen() {
  const { profile, setScreen } = useGame();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ═══ BACKGROUND — home-background.png ═══ */}
      <img
        src="/images/home-background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ═══ TITLE — app-title-lilo-noa-home-screen.png ═══ */}
      <div className="absolute top-[5%] left-0 right-0 z-20 flex justify-center">
        <img
          src="/images/app-title-lilo-noa-home-screen.png"
          alt="Lilo & Noa"
          className="w-[280px] h-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
        />
      </div>

      {/* ═══ HEADER — avatar + name + star count ═══ */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-1.5"
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "30px",
            padding: "3px 14px 3px 3px",
            boxShadow: "0 3px 14px rgba(0,0,0,0.08), inset 0 1px 0 white",
          }}>
          <img
            src="/images/home-boy-avatar-icon.png"
            alt="Avatar"
            className="w-[42px] h-[42px] rounded-full object-cover border-2 border-white shrink-0"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] font-semibold" style={{ color: "#333333" }}>
              {profile.name}
            </span>
            <div className="flex items-center gap-0.5 -mt-0.5">
              <img
                src="/images/home-star-icon.png"
                alt="Star"
                className="w-[16px] h-[16px] object-contain"
              />
              <span className="text-[11px] font-bold" style={{ color: "#333333" }}>
                {profile.stars}
              </span>
            </div>
          </div>
        </div>

        {/* Settings gear — top right */}
        <button
          onClick={() => setShowSettings(true)}
          className="w-[44px] h-[44px] rounded-full flex items-center justify-center hover:scale-110 transition active:scale-95"
          style={{
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}>
          <img
            src="/images/home-settings-gear-icon.png"
            alt="Paramètres"
            className="w-[24px] h-[24px] object-contain"
          />
        </button>
      </div>

      {/* ═══ CHARACTER — lilo-home-screen, absolute on bg ═══ */}
      <img
        src="/images/character-lilo-home-screen.png"
        alt="Lilo"
        className="absolute z-10 object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.25)]"
        style={{
          left: "50%",
          top: "58%",
          transform: "translate(-50%, -50%)",
          width: "55%",
          maxWidth: "220px",
          height: "auto",
        }}
      />

      {/* ═══ PLAY BUTTON — gradient #92D050 → #70AD47 ═══ */}
      <div className="absolute bottom-[14%] left-0 right-0 z-20 flex justify-center">
        <button
          onClick={() => setScreen("worlds")}
          className="font-extrabold text-[22px] text-white flex items-center justify-center
            transition-all hover:brightness-110 active:scale-[0.97]"
          style={{
            width: "200px",
            height: "60px",
            borderRadius: "30px",
            background: "linear-gradient(180deg, #92D050 0%, #70AD47 100%)",
            boxShadow: "0 5px 0 #5A9B35, 0 7px 20px rgba(0,0,0,0.18), inset 0 2px 0 rgba(255,255,255,0.5)",
            border: "3px solid rgba(255,255,255,0.5)",
          }}>
          Jouer
        </button>
      </div>

      {/* ═══ PROFILE + SETTINGS BUTTONS ═══ */}
      <div className="absolute bottom-[5%] left-0 right-0 z-20 flex justify-center gap-3">
        <button
          onClick={() => setScreen("profile")}
          className="flex items-center justify-center gap-2 font-semibold text-[14px] transition-all hover:brightness-105 active:scale-95"
          style={{
            width: "150px",
            height: "50px",
            borderRadius: "25px",
            background: "#D9F0FF",
            color: "#333333",
            boxShadow: "0 3px 0 #B0D8F0, 0 3px 10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
            border: "2px solid rgba(255,255,255,0.6)",
          }}>
          <img
            src="/images/profile-nav-profile-icon.png"
            alt=""
            className="w-[20px] h-[20px] object-contain"
          />
          Profil
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center justify-center gap-2 font-semibold text-[14px] transition-all hover:brightness-105 active:scale-95"
          style={{
            width: "150px",
            height: "50px",
            borderRadius: "25px",
            background: "#D9F0FF",
            color: "#333333",
            boxShadow: "0 3px 0 #B0D8F0, 0 3px 10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
            border: "2px solid rgba(255,255,255,0.6)",
          }}>
          <img
            src="/images/profile-settings-gear-icon.png"
            alt=""
            className="w-[20px] h-[20px] object-contain"
          />
          Paramètres
        </button>
      </div>

      {/* ═══ BOTTOM NAV ═══ */}
      <div className="absolute bottom-0 left-0 right-0 z-30"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        }}>
        <div className="flex justify-around items-center h-[68px] px-2">
          <NavItem
            img="/images/footer-learn-playing-icon.png"
            label="Jouer"
            active
            onClick={() => setScreen("home")}
          />
          <NavItem
            img="/images/footer-explore-worlds-icon.png"
            label="Mondes"
            onClick={() => setScreen("worlds")}
          />
          <NavItem
            img="/images/footer-rewards-surprises-icon.png"
            label="Récompenses"
            onClick={() => setScreen("profile")}
          />
          <NavItem
            img="/images/footer-exciting-stages-icon.png"
            label="Étapes"
            onClick={() => setScreen("stages")}
          />
        </div>
      </div>

      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

function NavItem({ img, label, active, onClick }: {
  img: string; label: string; active?: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 px-2 py-1 rounded-xl hover:brightness-95 transition active:scale-90">
      <img src={img} alt={label} className="w-[28px] h-[28px] object-contain"
        style={{ filter: active ? "none" : "grayscale(100%) opacity(0.5)" }} />
      <span className="text-[9px] font-bold whitespace-nowrap"
        style={{ color: active ? "#4A90E2" : "#999999" }}>
        {label}
      </span>
    </button>
  );
}
