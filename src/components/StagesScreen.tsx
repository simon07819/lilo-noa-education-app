"use client";

import { useGame } from "@/lib/GameContext";
import { getWorldById } from "@/data/worlds";
import StageMap from "./StageMap";
import { Stage } from "@/data/worlds";
import BottomNav from "./BottomNav";

const worldBackgrounds: Record<string, string> = {
  forest: "/images/stage-select-background-enchanted-forest.png",
  city: "/images/stages-background.png",
  island: "/images/stages-background.png",
  space: "/images/stages-background.png",
};

const worldBanners: Record<string, string> = {
  forest: "/images/stage-select-enchanted-forest-banner.png",
  city: "/images/stage-select-enchanted-forest-banner.png",
  island: "/images/stage-select-enchanted-forest-banner.png",
  space: "/images/stage-select-enchanted-forest-banner.png",
};

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
      {/* ═══ BACKGROUND ═══ */}
      <img
        src={worldBackgrounds[world.id] || worldBackgrounds.forest}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ═══ CHARACTER — absolute on background ═══ */}
      <img
        src="/images/character-lilo.png"
        alt="Lilo"
        className="absolute bottom-[10%] right-[-4%] w-[160px] h-[160px] object-contain z-10"
        style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))" }}
      />

      <div className="relative z-20 flex flex-col h-full">
        {/* ═══ HEADER ═══ */}
        <div className="flex items-center justify-between px-4 pt-9 pb-2">
          <button onClick={() => setScreen("worlds")}
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
            <img src="/images/stage-select-star-progress-bar.png" alt="⭐" className="w-[16px] h-[16px] object-contain" />
            <span className="font-bold text-[14px]" style={{ color: "#333333" }}>{completed}/{total}</span>
          </div>
          <div className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.85)" }}>
            <img src="/images/stage-select-gift-box-icon.png" alt="🎁" className="w-[24px] h-[24px] object-contain" />
          </div>
        </div>

        {/* ═══ BANNER ═══ */}
        <div className="flex justify-center px-4 mt-1">
          <img
            src={worldBanners[world.id] || worldBanners.forest}
            alt={world.title}
            className="w-[260px] h-auto object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,0.12)]"
          />
        </div>

        {/* ═══ STAGE MAP ═══ */}
        <div className="flex-1 overflow-y-auto">
          <StageMap world={world} onSelectStage={handleSelectStage} />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
