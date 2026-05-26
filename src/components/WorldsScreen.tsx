"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import { worlds, World } from "@/data/worlds";
import WorldCard from "./WorldCard";
import Modal from "./Modal";
import BottomNav from "./BottomNav";

/*
 * WORLDS SCREEN — rebuilt per Gemini analysis
 * Background: world-select-background.png
 * Banner: world-select-choose-your-world-banner.png
 * Cards: 4 world thumbnails
 */

export default function WorldsScreen() {
  const { profile, setScreen, setSelectedWorld } = useGame();
  const [lockedModal, setLockedModal] = useState<string | null>(null);

  const handleSelectWorld = (world: World) => {
    if (world.requiredStars > profile.stars) {
      setLockedModal(world.id);
      return;
    }
    setSelectedWorld(world.id);
    setScreen("stages");
  };

  const lockedWorld = lockedModal ? worlds.find(w => w.id === lockedModal) : null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ═══ BACKGROUND ═══ */}
      <img
        src="/images/world-select-background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* ═══ HEADER ═══ */}
        <div className="px-5 pt-9 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setScreen("home")}
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-xl hover:scale-105 transition"
              style={{
                background: "rgba(255,255,255,0.85)",
                color: "#333333",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}>←</button>
            <div className="flex items-center gap-1.5"
              style={{
                background: "rgba(255,255,255,0.85)",
                borderRadius: "20px",
                padding: "4px 12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}>
              <img src="/images/world-select-star-icon.png" alt="⭐" className="w-[18px] h-[18px] object-contain" />
              <span className="font-bold text-[14px]" style={{ color: "#333333" }}>{profile.stars}</span>
            </div>
          </div>

          {/* ═══ BANNER ═══ */}
          <div className="flex justify-center">
            <img
              src="/images/world-select-choose-your-world-banner.png"
              alt="Choisis ton monde"
              className="w-[260px] h-auto object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>

        {/* ═══ CARDS ═══ */}
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-24 space-y-4">
          {worlds.map((world) => (
            <WorldCard key={world.id} world={world} onSelect={handleSelectWorld} />
          ))}
        </div>

        {/* ═══ LOCKED MODAL ═══ */}
        <Modal open={!!lockedModal} onClose={() => setLockedModal(null)}>
          <img src="/images/world-card-lock-icon.png" alt="🔒" className="w-[48px] h-[48px] object-contain mx-auto mb-3" />
          <h3 className="text-xl font-extrabold mb-2" style={{ color: "#333333" }}>{lockedWorld?.title}</h3>
          <p className="text-base font-bold mb-2" style={{ color: "#999999" }}>Ce monde est verrouillé !</p>
          <p className="font-bold" style={{ color: "#4A90E2" }}>
            Gagne encore {lockedWorld ? lockedWorld.requiredStars - profile.stars : 0} ⭐ pour l&apos;ouvrir !
          </p>
        </Modal>

        <BottomNav />
      </div>
    </div>
  );
}
