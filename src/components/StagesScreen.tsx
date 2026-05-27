"use client";

import { useGame } from "@/lib/GameContext";
import { getWorldById } from "@/data/worlds";
import StageMap from "./StageMap";
import { Stage } from "@/data/worlds";
import BottomNav from "./BottomNav";

export default function StagesScreen() {
  const { selectedWorld, setSelectedWorld, setScreen, setSelectedStage, getProgress } = useGame();

  // Default to forest if no world selected
  const worldId = selectedWorld || "forest";
  if (!selectedWorld) setSelectedWorld("forest");

  const world = getWorldById(worldId);

  if (!world) {
    return (
      <div className="flex items-center justify-center min-h-full" style={{ background: "#C8E8C8" }}>
        <p className="text-xl font-bold" style={{ color: "#333333" }}>Monde non trouvé</p>
      </div>
    );
  }

  const { completed, total } = getProgress(world.id);
  const progressPct = total > 0 ? (completed / total) * 100 : 0;

  const handleSelectStage = (stage: Stage) => {
    setSelectedStage(stage.id);
    setScreen("game");
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <img src="/images/stage-select-background-enchanted-forest.png" alt=""
        className="absolute inset-0 w-full h-full object-cover" />

      {/* Character — bottom right, smaller so it doesn't cover the map */}
      <img src="/images/character-lilo-home-screen.png" alt="Lilo"
        className="absolute object-contain"
        style={{ zIndex: 5, right: "-3%", bottom: "8%", height: "22%", width: "auto",
          filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.25))" }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-9 pb-2">
          <button onClick={() => setScreen("worlds")}
            className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-xl transition active:scale-90"
            style={{ background: "rgba(255,255,255,0.90)", color: "#333333", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            ←
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.90)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
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
            style={{ width: "240px", height: "auto", objectFit: "contain",
              filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.12))" }} />
        </div>

        {/* Stage Map — scrollable */}
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "130px" }}>
          <StageMap world={world} onSelectStage={handleSelectStage} />
        </div>

        {/* Progress bar — fixed above BottomNav */}
        <div className="absolute left-0 right-0 z-20 px-4" style={{ bottom: "76px" }}>
          <div className="rounded-2xl px-4 py-2.5 flex items-center gap-3"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
            <img src="/images/stage-select-star-progress-bar.png" alt="⭐"
              style={{ width: "20px", height: "20px", objectFit: "contain", flexShrink: 0 }} />
            <div className="flex-1" style={{ height: "8px", background: "rgba(255,255,255,0.25)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPct}%`,
                background: "linear-gradient(90deg, #FFD700 0%, #FF9500 100%)", borderRadius: "4px",
                transition: "width 0.6s ease" }} />
            </div>
            <span style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "14px", flexShrink: 0 }}>
              {completed}/{total}
            </span>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
