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

      {/* Header gauche — avatar gold border + nom + étoile, PAS de bulle blanche */}
      <div className="absolute top-0 left-0 z-20 flex items-center gap-2 pt-5 pl-4">
        <img
          src="/images/home-boy-avatar-icon.png"
          alt="Avatar"
          style={{
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #FFD700",
            boxShadow: "0 0 0 1.5px rgba(0,0,0,0.15)",
            flexShrink: 0,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
          <span style={{
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: 800,
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}>
            {profile.name}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
            <span style={{ color: "#FFD700", fontSize: "15px", lineHeight: 1, textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>★</span>
            <span style={{
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: 800,
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}>
              {profile.stars}
            </span>
          </div>
        </div>
      </div>

      {/* Header droite — gear grande, juste un contour blanc, pas de fond blanc */}
      <button
        onClick={() => setShowSettings(true)}
        className="absolute z-20 hover:scale-110 transition active:scale-95"
        style={{
          top: "16px",
          right: "16px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "2.5px solid rgba(255,255,255,0.85)",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <img
          src="/images/home-settings-gear-icon.png"
          alt="Paramètres"
          style={{ width: "36px", height: "36px", objectFit: "contain" }}
        />
      </button>

      {/* Logo Lilo & Noa — grand, fond transparent, contours blancs préservés */}
      <div className="absolute left-0 right-0 z-20 flex justify-center" style={{ top: "6%" }}>
        <img
          src="/images/app-logo-lilo-noa.png"
          alt="Lilo & Noa"
          style={{
            width: "88%",
            maxWidth: "400px",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
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
          bottom: "17%",
          transform: "translateX(-50%)",
          height: "60%",
          width: "auto",
        }}
      />

      {/* Bouton Jouer — monté à 21% pour cacher les pieds (z:20) */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: "21%", zIndex: 20 }}>
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
        style={{ bottom: "4%", zIndex: 20 }}>

        {/* Profil — grande photo avatar, pas de cercle blanc */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <button
            onClick={() => setScreen("profile")}
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid white",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              padding: 0,
              cursor: "pointer",
              background: "none",
            }}
          >
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

        {/* Paramètres — gear grande, PAS de cercle blanc rempli */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              width: "72px",
              height: "72px",
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
              style={{ width: "48px", height: "48px", objectFit: "contain" }}
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
