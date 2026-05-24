"use client";

import { useGame } from "@/lib/GameContext";
import { getStageById } from "@/data/worlds";
import MiniGame from "./MiniGame";

export default function GameScreen() {
  const { setScreen, selectedStage, selectedWorld } = useGame();

  if (!selectedStage || !selectedWorld) {
    return (
      <div className="flex items-center justify-center min-h-full" style={{ background: "linear-gradient(180deg, #B8E4FC 0%, #D4EFFE 100%)" }}>
        <p className="text-xl font-bold" style={{ color: "#27145C" }}>Aucun stage sélectionné</p>
      </div>
    );
  }

  const stage = getStageById(selectedWorld, selectedStage);

  if (!stage) {
    return (
      <div className="flex items-center justify-center min-h-full" style={{ background: "linear-gradient(180deg, #B8E4FC 0%, #D4EFFE 100%)" }}>
        <p className="text-xl font-bold" style={{ color: "#27145C" }}>Stage introuvable</p>
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
