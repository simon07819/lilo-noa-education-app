"use client";

import { useGame } from "@/lib/GameContext";
import { getWorldById } from "@/data/worlds";
import StageMap from "./StageMap";
import { Stage } from "@/data/worlds";
import BottomNav from "./BottomNav";

/*
 * STAGES SCREEN — Reference-accurate
 * ZONES: Header 0-20%, Stage path 20-80%, Progress 80-100%
 * COLORS: Vary by world theme (forest=green, city=orange, island=teal, space=purple)
 */

export default function StagesScreen() {
  const { selectedWorld, setScreen, setSelectedStage, profile, getProgress } = useGame();
  const world = getWorldById(selectedWorld);

  if (!world) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <p className="text-xl">Monde non trouvé</p>
      </div>
    );
  }

  const { completed, total } = getProgress(world.id);

  const handleSelectStage = (stage: Stage) => {
    setSelectedStage(stage.id);
    setScreen("game");
  };

  // Theme-specific gradients
  const themeGradients: Record<string, string> = {
    forest: "linear-gradient(180deg, #C8E8C8 0%, #A8D8B0 20%, #D8F0D8 50%, #E8F8E8 100%)",
    city: "linear-gradient(180deg, #FFE0C0 0%, #FFD0A8 20%, #FFF0E0 50%, #FFF8F0 100%)",
    island: "linear-gradient(180deg, #B8E8F0 0%, #A0D8E8 20%, #D0F0F8 50%, #E8F8FC 100%)",
    space: "linear-gradient(180deg, #D0C0F0 0%, #C0B0E8 20%, #E0D8F8 50%, #F0E8FF 100%)",
  };

  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden"
      style={{ background: themeGradients[world.id] || themeGradients.forest }}>
      {/* Decorative */}
      <div className="absolute top-[5%] left-[10%] w-20 h-10 rounded-full bg-white/40 blur-[3px]" />
      <div className="absolute top-[10%] right-[12%] w-16 h-8 rounded-full bg-white/35 blur-[2px]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-9 pb-2">
        <button onClick={() => setScreen("worlds")}
          className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center font-bold text-xl shadow-md hover:scale-105 transition"
          style={{ color: "#27145C" }}>←</button>
        <div className="flex items-center gap-1.5 bg-white/60 rounded-full px-4 py-1.5 shadow-sm">
          <span className="text-lg">⭐</span>
          <span className="font-bold" style={{ color: "#27145C" }}>{completed}/{total}</span>
        </div>
        <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center text-xl shadow-sm">🎁</div>
      </div>

      <h2 className="relative z-10 text-center text-2xl font-extrabold mt-1 mb-2 px-4"
        style={{ color: "#1A4A1A", textShadow: "0 1px 0 rgba(255,255,255,0.5)" }}>
        {world.icon} {world.title}
      </h2>

      {/* Stage map */}
      <div className="flex-1 overflow-y-auto">
        <StageMap world={world} onSelectStage={handleSelectStage} />
      </div>

      <BottomNav />
    </div>
  );
}
