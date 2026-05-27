"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import SettingsModal from "./SettingsModal";

const navItems = [
  { img: "/images/profile-nav-profile-icon.png", label: "Profil", screen: "profile", activeOn: "profile" },
  { img: "/images/profile-nav-worlds-icon.png", label: "Mondes", screen: "worlds", activeOn: "worlds" },
  { img: "/images/profile-nav-rewards-icon.png", label: "Récompenses", screen: "profile", activeOn: "NEVER" },
  { img: "/images/profile-nav-settings-icon.png", label: "Paramètres", screen: "settings", activeOn: "NEVER" },
];

export default function BottomNav() {
  const { screen, setScreen, selectedWorld, setSelectedWorld } = useGame();
  const [showSettings, setShowSettings] = useState(false);

  const handleNav = (targetScreen: string) => {
    if (targetScreen === "settings") {
      setShowSettings(true);
      return;
    }
    if (targetScreen === "stages" && !selectedWorld) {
      setSelectedWorld("forest");
    }
    setScreen(targetScreen);
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 z-30"
        style={{
          background: "rgba(255,255,255,0.97)",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.10)",
        }}>
        <div className="flex justify-around items-center h-[68px] px-2">
          {navItems.map((item) => {
            const active = screen === item.activeOn;
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.screen)}
                className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition active:scale-90">
                <img src={item.img} alt={item.label} className="w-[30px] h-[30px] object-contain"
                  style={{ filter: active ? "none" : "grayscale(100%) opacity(0.45)" }} />
                <span className="text-[10px] font-bold whitespace-nowrap"
                  style={{ color: active ? "#4A90E2" : "#999999" }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}
