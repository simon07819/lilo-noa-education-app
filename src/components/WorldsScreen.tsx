"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import { worlds, World } from "@/data/worlds";
import WorldCard from "./WorldCard";
import Modal from "./Modal";
import BottomNav from "./BottomNav";

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
      {/* Background */}
      <img src="/images/world-select-background.png" alt="" className="absolute inset-0 w-full h-full object-cover" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="px-4 pt-9 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => setScreen("home")}
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-xl transition active:scale-90"
              style={{ background: "rgba(255,255,255,0.90)", color: "#333333", boxShadow: "0 2px 10px rgba(0,0,0,0.10)" }}>
              ←
            </button>

            {/* Stars + Candies */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.90)", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
                <img src="/images/world-select-star-icon.png" alt="⭐" style={{ width: "18px", height: "18px", objectFit: "contain" }} />
                <span className="font-extrabold" style={{ color: "#333333", fontSize: "14px" }}>{profile.stars}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.90)", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
                <img src="/images/candy-icon.png" alt="🍬" style={{ width: "18px", height: "18px", objectFit: "contain" }} />
                <span className="font-extrabold" style={{ color: "#333333", fontSize: "14px" }}>{profile.candies}</span>
              </div>
              <button className="w-9 h-9 rounded-full flex items-center justify-center font-black text-lg"
                style={{ background: "#92D050", color: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                +
              </button>
            </div>
          </div>

          {/* Banner */}
          <div className="flex justify-center mb-2">
            <img src="/images/world-select-choose-your-world-banner.png" alt="Choisis ton monde"
              style={{ width: "260px", height: "auto", objectFit: "contain", filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.15))" }} />
          </div>
        </div>

        {/* Cards */}
        <div className="flex-1 overflow-y-auto px-4 py-2 pb-24 space-y-4">
          {worlds.map((world) => (
            <WorldCard key={world.id} world={world} onSelect={handleSelectWorld} />
          ))}
        </div>

        {/* Locked Modal */}
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
