"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import SettingsModal from "./SettingsModal";

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

      {/* ── Header ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between px-4 pt-5">
        {/* Avatar pill — avatar bigger, star visible */}
        <div className="flex items-center gap-2"
          style={{
            background: "rgba(255,255,255,0.93)",
            borderRadius: "40px",
            padding: "4px 16px 4px 4px",
            boxShadow: "0 3px 14px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}>
          <img
            src="/images/home-boy-avatar-icon.png"
            alt="Avatar"
            className="w-[52px] h-[52px] rounded-full object-cover shrink-0"
            style={{ border: "2.5px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[14px] font-bold" style={{ color: "#333333" }}>
              {profile.name}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full"
                style={{ background: "#FFD700" }}>
                <span style={{ fontSize: "11px", lineHeight: 1 }}>★</span>
              </div>
              <span className="text-[13px] font-bold" style={{ color: "#333333" }}>
                {profile.stars}
              </span>
            </div>
          </div>
        </div>

        {/* Settings gear top-right — bigger icon, no white circle */}
        <button
          onClick={() => setShowSettings(true)}
          className="hover:scale-110 transition active:scale-95 shrink-0"
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.88)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <img
            src="/images/home-settings-gear-icon.png"
            alt="Paramètres"
            className="object-contain"
            style={{ width: "32px", height: "32px" }}
          />
        </button>
      </div>

      {/* ── Logo — full-size, proper image ── */}
      <div className="absolute top-[8%] left-0 right-0 z-20 flex justify-center">
        <img
          src="/images/app-logo-lilo-noa.png"
          alt="Lilo & Noa"
          style={{
            width: "340px",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.18))",
          }}
        />
      </div>

      {/* ── Character — z:5 so feet hide behind Jouer button ── */}
      <img
        src="/images/character-lilo-home-screen.png"
        alt="Lilo"
        className="absolute object-contain"
        style={{
          zIndex: 5,
          left: "50%",
          bottom: "17%",
          transform: "translateX(-50%)",
          height: "62%",
          width: "auto",
        }}
      />

      {/* ── Jouer button — z:20 hides character feet ── */}
      <div className="absolute left-0 right-0 flex justify-center"
        style={{ bottom: "14%", zIndex: 20 }}>
        <button
          onClick={() => setScreen("worlds")}
          className="font-extrabold text-white flex items-center justify-center gap-2
            transition-all hover:brightness-110 active:scale-[0.97]"
          style={{
            width: "268px",
            height: "66px",
            borderRadius: "33px",
            fontSize: "28px",
            background: "linear-gradient(180deg, #92D050 0%, #70AD47 100%)",
            boxShadow: "0 6px 0 #5A9B35, 0 8px 24px rgba(0,0,0,0.22), inset 0 2px 0 rgba(255,255,255,0.5)",
            border: "3px solid rgba(255,255,255,0.5)",
          }}>
          Jouer
          <span style={{ fontSize: "26px", lineHeight: 1 }}>▶</span>
        </button>
      </div>

      {/* ── Bottom: Profil + Paramètres ── */}
      <div className="absolute left-0 right-0 flex justify-center gap-10"
        style={{ bottom: "3%", zIndex: 20 }}>

        {/* Profil — avatar photo directly, white ring */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setScreen("profile")}
            className="hover:scale-110 transition active:scale-90 rounded-full overflow-hidden"
            style={{
              width: "66px",
              height: "66px",
              border: "3.5px solid white",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            }}>
            <img
              src="/images/home-boy-avatar-icon.png"
              alt="Profil"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </button>
          <span style={{
            fontSize: "13px",
            fontWeight: 800,
            color: "#FFFFFF",
            textShadow: "0 1px 6px rgba(0,0,0,0.7)",
          }}>Profil</span>
        </div>

        {/* Paramètres — gear big inside white circle */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setShowSettings(true)}
            className="hover:scale-110 transition active:scale-90 rounded-full flex items-center justify-center"
            style={{
              width: "66px",
              height: "66px",
              background: "rgba(255,255,255,0.93)",
              border: "3.5px solid white",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            }}>
            <img
              src="/images/home-settings-gear-icon.png"
              alt="Paramètres"
              style={{ width: "42px", height: "42px", objectFit: "contain" }}
            />
          </button>
          <span style={{
            fontSize: "13px",
            fontWeight: 800,
            color: "#FFFFFF",
            textShadow: "0 1px 6px rgba(0,0,0,0.7)",
          }}>Paramètres</span>
        </div>
      </div>

      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}
