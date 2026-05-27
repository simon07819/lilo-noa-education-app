"use client";

import { useGame } from "@/lib/GameContext";
import { getWorldById } from "@/data/worlds";
import StageMap from "./StageMap";
import { Stage } from "@/data/worlds";
import BottomNav from "./BottomNav";

export default function StagesScreen() {
  const { selectedWorld, setScreen, setSelectedStage, getProgress } = useGame();
  const world = getWorldById(selectedWorld);

  if (!world) {
    return (
      <div className="flex items-center justify-center min-h-full bg-[#C8E8C8]">
        <p className="text-xl font-bold" style={{ color: "#333333" }}>Monde non trouvé</p>
      </div>
    );
  }

  const { completed, total } = getProgress(world.id);

  const handleSelectStage = (stage: Stage) => {
    setSelectedStage(stage.id);
    setScreen("game");
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <img src="/images/stage-select-background-enchanted-forest.png" alt=""
        className="absolute inset-0 w-full h-full object-cover" />

      {/* Character — bottom right */}
      <img src="/images/character-lilo-home-screen.png" alt="Lilo"
        className="absolute object-contain"
        style={{ zIndex: 5, right: "-5%", bottom: "10%", height: "35%", width: "auto",
          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))" }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-9 pb-2">
          <button onClick={() => setScreen("worlds")}
            className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-xl transition active:scale-90"
            style={{ background: "rgba(255,255,255,0.90)", color: "#333333", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            ←
          </button>
          <div className="flex items-center gap-2"
            style={{ background: "rgba(255,255,255,0.90)", borderRadius: "20px", padding: "6px 14px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
            <img src="/images/stage-select-star-progress-bar.png" alt="⭐"
              style={{ width: "18px", height: "18px", objectFit: "contain" }} />
            <span className="font-extrabold" style={{ color: "#333333", fontSize: "14px" }}>{completed}/{total}</span>
          </div>
          <div className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.90)", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            <img src="/images/stage-select-gift-box-icon.png" alt="🎁"
              style={{ width: "26px", height: "26px", objectFit: "contain" }} />
          </div>
        </div>

        {/* Banner */}
        <div className="flex justify-center px-4 mt-1">
          <img src="/images/stage-select-enchanted-forest-banner.png" alt={world.title}
            style={{ width: "260px", height: "auto", objectFit: "contain",
              filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.12))" }} />
        </div>

        {/* Stage Map */}
        <div className="flex-1 overflow-y-auto">
          <StageMap world={world} onSelectStage={handleSelectStage} />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
