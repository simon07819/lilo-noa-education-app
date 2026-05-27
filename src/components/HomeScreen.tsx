"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import SettingsModal from "./SettingsModal";

/*
  Background: 432x768 portrait, grass/ground at bottom 20-25%
  Character: 768x768 image — 7.4% transparent bottom padding (37px at 60% height)
  To place feet at target Y: bottom = target - (7.4% × character_height / screen_height)
  Character height = 60% of 844px = 506px → transparent bottom = 37px
  Jouer button top = bottom(15%) + height(64px) = ~22.6% from bottom
  → character bottom set to 17% so feet land at 17% + 4.4% = 21.4% (just touches button)
*/

export default function HomeScreen() {
  const { profile, setScreen } = useGame();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── Background ── */}
      <img
        src="/images/home-background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ── Header: avatar pill (left) + gear (right) ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between px-4 pt-5">
        <div className="flex items-center gap-2"
          style={{
            background: "rgba(255,255,255,0.93)",
            borderRadius: "30px",
            padding: "5px 14px 5px 5px",
            boxShadow: "0 3px 14px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}>
          <img
            src="/images/home-boy-avatar-icon.png"
            alt="Avatar"
            className="w-[40px] h-[40px] rounded-full object-cover border-2 border-white shrink-0"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold" style={{ color: "#333333" }}>
              {profile.name}
            </span>
            <div className="flex items-center gap-1">
              <span style={{ color: "#FFD700", fontSize: "14px", lineHeight: 1 }}>★</span>
              <span className="text-[12px] font-bold" style={{ color: "#333333" }}>
                {profile.stars}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowSettings(true)}
          className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:scale-110 transition active:scale-95 shrink-0"
          style={{
            background: "rgba(255,255,255,0.93)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          }}>
          <img
            src="/images/home-settings-gear-icon.png"
            alt="Paramètres"
            className="w-[26px] h-[26px] object-contain"
          />
        </button>
      </div>

      {/* ── Logo ── */}
      <div className="absolute top-[6%] left-0 right-0 z-20 flex justify-center">
        <img
          src="/images/app-logo-lilo-noa.png"
          alt="Lilo & Noa"
          style={{ width: "300px", height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* ── Character: feet land at ~21% from bottom (just above Jouer button) ── */}
      <img
        src="/images/character-lilo-home-screen.png"
        alt="Lilo"
        className="absolute z-10 object-contain"
        style={{
          left: "50%",
          bottom: "17%",
          transform: "translateX(-50%)",
          height: "60%",
          width: "auto",
        }}
      />

      {/* ── Jouer button ── */}
      <div className="absolute left-0 right-0 z-20 flex justify-center" style={{ bottom: "15%" }}>
        <button
          onClick={() => setScreen("worlds")}
          className="font-extrabold text-white flex items-center justify-center gap-3
            transition-all hover:brightness-110 active:scale-[0.97]"
          style={{
            width: "310px",
            height: "64px",
            borderRadius: "32px",
            fontSize: "24px",
            background: "linear-gradient(180deg, #92D050 0%, #70AD47 100%)",
            boxShadow: "0 6px 0 #5A9B35, 0 8px 24px rgba(0,0,0,0.22), inset 0 2px 0 rgba(255,255,255,0.5)",
            border: "3px solid rgba(255,255,255,0.5)",
          }}>
          Jouer <span style={{ fontSize: "20px" }}>▶</span>
        </button>
      </div>

      {/* ── Bottom nav: Profil (avatar) + Paramètres (gear) ── */}
      <div className="absolute left-0 right-0 z-20 flex justify-center gap-12" style={{ bottom: "3%" }}>
        {/* Profil */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setScreen("profile")}
            className="rounded-full overflow-hidden hover:scale-110 transition active:scale-90"
            style={{
              width: "64px",
              height: "64px",
              border: "3px solid white",
              boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
            }}>
            <img
              src="/images/home-boy-avatar-icon.png"
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </button>
          <span className="text-[12px] font-extrabold"
            style={{ color: "#FFFFFF", textShadow: "0 1px 5px rgba(0,0,0,0.6)" }}>
            Profil
          </span>
        </div>

        {/* Paramètres */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setShowSettings(true)}
            className="w-[64px] h-[64px] rounded-full flex items-center justify-center
              hover:scale-110 transition active:scale-90"
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "3px solid white",
              boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
            }}>
            <img
              src="/images/home-settings-gear-icon.png"
              alt="Paramètres"
              className="w-[36px] h-[36px] object-contain"
            />
          </button>
          <span className="text-[12px] font-extrabold"
            style={{ color: "#FFFFFF", textShadow: "0 1px 5px rgba(0,0,0,0.6)" }}>
            Paramètres
          </span>
        </div>
      </div>

      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
