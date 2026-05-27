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
        {/* Avatar pill */}
        <div className="flex items-center gap-2"
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "30px",
            padding: "5px 14px 5px 5px",
            boxShadow: "0 3px 14px rgba(0,0,0,0.12), inset 0 1px 0 white",
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
              <span style={{ color: "#FFD700", fontSize: "13px" }}>★</span>
              <span className="text-[12px] font-bold" style={{ color: "#333333" }}>
                {profile.stars}
              </span>
            </div>
          </div>
        </div>

        {/* Settings gear — top right */}
        <button
          onClick={() => setShowSettings(true)}
          className="w-[42px] h-[42px] rounded-full flex items-center justify-center hover:scale-110 transition active:scale-95 shrink-0"
          style={{
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          }}>
          <img
            src="/images/home-settings-gear-icon.png"
            alt="Paramètres"
            className="w-[26px] h-[26px] object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </button>
      </div>

      {/* Logo — centered, upper area */}
      <div className="absolute top-[6%] left-0 right-0 z-20 flex justify-center">
        <img
          src="/images/app-logo-lilo-noa.png"
          alt="Lilo & Noa"
          className="w-[320px] h-auto object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* Character — dominant, centered */}
      <img
        src="/images/character-lilo-home-screen.png"
        alt="Lilo"
        className="absolute z-10 object-contain"
        style={{
          left: "50%",
          bottom: "24%",
          transform: "translateX(-50%)",
          height: "60%",
          width: "auto",
        }}
      />

      {/* Jouer button */}
      <div className="absolute left-0 right-0 z-20 flex justify-center" style={{ bottom: "15%" }}>
        <button
          onClick={() => setScreen("worlds")}
          className="font-extrabold text-white flex items-center justify-center gap-3 transition-all hover:brightness-110 active:scale-[0.97]"
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

      {/* Profil + Paramètres — circular avatar/icon buttons */}
      <div className="absolute left-0 right-0 z-20 flex justify-center gap-12" style={{ bottom: "3%" }}>
        {/* Profil: avatar photo as button */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setScreen("profile")}
            className="rounded-full overflow-hidden hover:scale-110 transition active:scale-90"
            style={{
              width: "62px",
              height: "62px",
              border: "3px solid white",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
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

        {/* Paramètres: gear icon in white circle */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setShowSettings(true)}
            className="w-[62px] h-[62px] rounded-full flex items-center justify-center hover:scale-110 transition active:scale-90"
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "3px solid white",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            }}>
            <img
              src="/images/home-settings-gear-icon.png"
              alt="Paramètres"
              className="w-[36px] h-[36px] object-contain"
              style={{ mixBlendMode: "multiply" }}
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
