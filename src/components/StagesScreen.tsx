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
        <p className="text-xl font-bold text-[#27145C]">Monde non trouvé</p>
      </div>
    );
  }

  const { completed, total } = getProgress(world.id);

  const handleSelectStage = (stage: Stage) => {
    setSelectedStage(stage.id);
    setScreen("game");
  };

  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden">
      {/* Recraft background */}
      <img
        src="/images/stages-background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Lilo character — positioned directly on background */}
      <img
        src="/images/character-lilo.png"
        alt="Lilo"
        className="absolute bottom-[12%] right-[-6%] w-[170px] h-[170px] object-contain z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
      />

      <div className="relative z-20 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-9 pb-2">
          <button onClick={() => setScreen("worlds")}
            className="w-12 h-12 rounded-full bg-[#FFFFFFCC] flex items-center justify-center font-bold text-xl shadow-md hover:scale-105 transition text-[#27145C]">←</button>
          <div className="flex items-center gap-1.5 bg-[#FFFFFF99] rounded-full px-4 py-1.5 shadow-sm">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-[#27145C]">{completed}/{total}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF99] flex items-center justify-center text-xl shadow-sm">🎁</div>
        </div>

        <h2 className="text-center text-2xl font-extrabold mt-1 mb-2 px-4 text-[#1A4A1A] drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
          {world.icon} {world.title}
        </h2>

        {/* Stage map */}
        <div className="flex-1 overflow-y-auto">
          <StageMap world={world} onSelectStage={handleSelectStage} />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
