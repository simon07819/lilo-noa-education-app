"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import { worlds, World } from "@/data/worlds";
import WorldCard from "./WorldCard";
import { StarCounter, CandyCounter } from "./StarCounter";
import Modal from "./Modal";
import BottomNav from "./BottomNav";

/*
 * WORLDS SCREEN — Reference-accurate
 * ZONES: Header 0-20%, Cards 20-82%, Nav 82-100%
 * COLORS: Lavender bg, Purple ribbon, Forest cards
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
    <div className="relative h-full w-full flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #E8DCF5 0%, #D4C8F0 20%, #F0E8FF 50%, #DCE8FA 100%)" }}>
      {/* Clouds */}
      <div className="absolute top-[4%] left-[6%] w-24 h-12 rounded-full bg-white/50 blur-[3px]" />
      <div className="absolute top-[12%] right-[8%] w-20 h-10 rounded-full bg-white/40 blur-[2px]" />
      <span className="absolute top-[6%] right-[18%] text-[#C4A8F0] text-sm animate-sparkle">✦</span>
      <span className="absolute top-[14%] left-[28%] text-[#C4A8F0] text-xs animate-sparkle" style={{ animationDelay: "0.5s" }}>✦</span>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="px-5 pt-9 pb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setScreen("home")} className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center font-bold text-xl shadow-lg hover:scale-105 transition"
              style={{ color: "#27145C" }}>←</button>
            <div className="flex gap-2.5">
              <StarCounter count={profile.stars} size="sm" />
              <CandyCounter count={profile.candies} size="sm" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="inline-block px-10 py-3.5 text-2xl font-extrabold text-white rounded-2xl shadow-lg"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #693CC3)", boxShadow: "0 4px 15px rgba(105,60,195,0.3)" }}>
              Choisis ton monde
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="flex-1 overflow-y-auto px-4 py-2 pb-24 space-y-4">
          {worlds.map((world) => (
            <WorldCard key={world.id} world={world} onSelect={handleSelectWorld} />
          ))}
        </div>

        <Modal open={!!lockedModal} onClose={() => setLockedModal(null)}>
          <div className="text-6xl mb-3">🔒</div>
          <h3 className="text-xl font-extrabold mb-2" style={{ color: "#27145C" }}>{lockedWorld?.title}</h3>
          <p className="text-lg text-gray-600 mb-2">Ce monde est verrouillé !</p>
          <p className="font-bold text-orange-500">
            Gagne encore {lockedWorld ? lockedWorld.requiredStars - profile.stars : 0} ⭐ pour l&apos;ouvrir !
          </p>
        </Modal>

        <BottomNav />
      </div>
    </div>
  );
}
