"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import SettingsModal from "./SettingsModal";

export default function HomeScreen() {
  const { profile, setScreen } = useGame();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">

      {/* Background */}
      <img
        src="/images/home-background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Header — avatar gold + nom + étoile direct sur le background */}
      <div className="absolute top-0 left-0 z-20 flex items-center gap-2 pt-5 pl-4">
        <img
          src="/images/home-boy-avatar-icon.png"
          alt="Avatar"
          className="home-avatar-header"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #FFD700",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
          <span style={{
            color: "#FFFFFF",
            fontSize: "20px",
            fontWeight: 800,
            textShadow: "0 1px 5px rgba(0,0,0,0.7)",
          }}>
            {profile.name}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#FFD700", fontSize: "24px", lineHeight: 1, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>★</span>
            <span style={{
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: 800,
              textShadow: "0 1px 5px rgba(0,0,0,0.7)",
            }}>
              {profile.stars}
            </span>
          </div>
        </div>
      </div>

      {/* Logo Lilo & Noa */}
      <div className="absolute left-0 right-0 z-20 flex justify-center" style={{ top: "13%" }}>
        <img
          src="/images/app-logo-lilo-noa.png"
          alt="Lilo & Noa"
          style={{
            width: "92%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Mascotte — z:5, pieds cachés par le bouton Jouer */}
      <img
        src="/images/character-lilo-home-screen.png"
        alt="Lilo"
        className="absolute object-contain"
        style={{
          zIndex: 5,
          left: "50%",
          bottom: "12%",
          transform: "translateX(-50%)",
          height: "60%",
          width: "auto",
        }}
      />

      {/* Bouton Jouer — z:20 cache les pieds */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: "17%", zIndex: 20 }}>
        <button
          onClick={() => setScreen("worlds")}
          style={{
            width: "75%",
            maxWidth: "290px",
            height: "62px",
            borderRadius: "31px",
            fontSize: "26px",
            fontWeight: 900,
            color: "white",
            background: "linear-gradient(180deg, #92D050 0%, #70AD47 100%)",
            boxShadow: "0 6px 0 #5A9B35, 0 8px 24px rgba(0,0,0,0.22), inset 0 2px 0 rgba(255,255,255,0.5)",
            border: "3px solid rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          Jouer <span style={{ fontSize: "24px" }}>▶</span>
        </button>
      </div>

      {/* Bas — Profil + Paramètres */}
      <div className="absolute left-0 right-0 flex justify-center gap-10"
        style={{ bottom: "1%", zIndex: 20 }}>

        {/* Profil */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <button
            onClick={() => setScreen("profile")}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid white",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              padding: 0,
              cursor: "pointer",
              background: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/home-boy-avatar-icon.png"
              alt="Profil"
              className="home-avatar-bottom"
              style={{ objectFit: "cover", display: "block" }}
            />
          </button>
          <span style={{
            fontSize: "13px",
            fontWeight: 800,
            color: "#FFFFFF",
            textShadow: "0 1px 6px rgba(0,0,0,0.7)",
          }}>Profil</span>
        </div>

        {/* Paramètres */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "3px solid white",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src="/images/home-settings-gear-icon.png"
              alt="Paramètres"
              style={{ width: "58px", height: "58px", objectFit: "contain" }}
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
