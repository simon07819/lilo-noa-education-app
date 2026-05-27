"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import SettingsModal from "./SettingsModal";

export default function HomeScreen() {
  const { profile, setScreen } = useGame();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Full-screen background */}
      <img
        src="/images/home-background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Header: avatar top-left, settings top-right */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between px-4 pt-5">
        <div className="flex items-center gap-2"
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "30px",
            padding: "5px 14px 5px 5px",
            boxShadow: "0 3px 14px rgba(0,0,0,0.1), inset 0 1px 0 white",
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
            <div className="flex items-center gap-0.5">
              <img src="/images/home-star-icon.png" alt="" className="w-[14px] h-[14px] object-contain" />
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
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}>
          <img src="/images/home-settings-gear-icon.png" alt="Paramètres" className="w-[22px] h-[22px] object-contain" />
        </button>
      </div>

      {/* Logo — upper center, below header */}
      <div className="absolute top-[8%] left-0 right-0 z-20 flex justify-center">
        <img
          src="/images/app-title-lilo-noa-home-screen.png"
          alt="Lilo & Noa"
          className="w-[240px] h-auto object-contain"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
        />
      </div>

      {/* Character — LARGE, dominant, centered */}
      <img
        src="/images/character-lilo-home-screen.png"
        alt="Lilo"
        className="absolute z-10 object-contain"
        style={{
          left: "50%",
          bottom: "25%",
          transform: "translateX(-50%)",
          height: "58%",
          width: "auto",
        }}
      />

      {/* Jouer button — at grass level */}
      <div className="absolute left-0 right-0 z-20 flex justify-center" style={{ bottom: "16%" }}>
        <button
          onClick={() => setScreen("worlds")}
          className="font-extrabold text-white flex items-center justify-center gap-3 transition-all hover:brightness-110 active:scale-[0.97]"
          style={{
            width: "270px",
            height: "62px",
            borderRadius: "31px",
            fontSize: "22px",
            background: "linear-gradient(180deg, #92D050 0%, #70AD47 100%)",
            boxShadow: "0 6px 0 #5A9B35, 0 8px 24px rgba(0,0,0,0.22), inset 0 2px 0 rgba(255,255,255,0.5)",
            border: "3px solid rgba(255,255,255,0.5)",
          }}>
          Jouer <span style={{ fontSize: "18px" }}>▶</span>
        </button>
      </div>

      {/* Profil + Paramètres — circular icon buttons */}
      <div className="absolute left-0 right-0 z-20 flex justify-center gap-10" style={{ bottom: "4%" }}>
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setScreen("profile")}
            className="w-[54px] h-[54px] rounded-full flex items-center justify-center hover:scale-110 transition active:scale-90"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 white",
            }}>
            <img src="/images/profile-nav-profile-icon.png" alt="" className="w-[28px] h-[28px] object-contain" />
          </button>
          <span className="text-[11px] font-bold"
            style={{ color: "#FFFFFF", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
            Profil
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setShowSettings(true)}
            className="w-[54px] h-[54px] rounded-full flex items-center justify-center hover:scale-110 transition active:scale-90"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 white",
            }}>
            <img src="/images/profile-settings-gear-icon.png" alt="" className="w-[28px] h-[28px] object-contain" />
          </button>
          <span className="text-[11px] font-bold"
            style={{ color: "#FFFFFF", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
            Paramètres
          </span>
        </div>
      </div>

      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
