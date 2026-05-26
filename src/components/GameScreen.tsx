"use client";

import { useGame } from "@/lib/GameContext";
import { getStageById } from "@/data/worlds";
import MiniGame from "./MiniGame";

export default function GameScreen() {
  const { setScreen, selectedStage, selectedWorld } = useGame();

  if (!selectedStage || !selectedWorld) {
    return (
      <div className="relative flex items-center justify-center min-h-full overflow-hidden">
        <img src="/images/mini-game-background.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <p className="relative z-10 text-xl font-bold" style={{ color: "#333333" }}>Aucun stage sélectionné</p>
      </div>
    );
  }

  const stage = getStageById(selectedWorld, selectedStage);

  if (!stage) {
    return (
      <div className="relative flex items-center justify-center min-h-full overflow-hidden">
        <img src="/images/mini-game-background.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <p className="relative z-10 text-xl font-bold" style={{ color: "#333333" }}>Stage introuvable</p>
      </div>
    );
  }

  return (
    <MiniGame
      stage={stage}
      onComplete={() => {}}
      onBack={() => setScreen("stages")}
    />
  );
}
