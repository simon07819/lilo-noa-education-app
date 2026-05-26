"use client";

import { Stage, World } from "@/data/worlds";
import { useGame } from "@/lib/GameContext";

interface StageMapProps {
  world: World;
  onSelectStage: (stage: Stage) => void;
}

const bubbleImages = {
  completed: "/images/stage-select-level-bubble-completed-3-stars.png",
  current: "/images/stage-select-level-bubble-current-character.png",
  locked: "/images/stage-select-level-bubble-empty.png",
};

export default function StageMap({ world, onSelectStage }: StageMapProps) {
  const { profile, checkStageLocked, getProgress } = useGame();
  const { completed, total } = getProgress(world.id);

  return (
    <div className="relative w-full px-4 pb-28">
      {/* Stage nodes — vertical list */}
      <div className="relative z-10 flex flex-col gap-2 mt-3">
        {world.stages.map((stage, idx) => {
          const stageProgress = profile.completedStages.find(s => s.stageId === stage.id);
          const isCompleted = stageProgress?.completed;
          const isLocked = checkStageLocked(world.id, idx, world.requiredStars);
          const isLeft = idx % 2 === 0;

          let bubbleSrc = bubbleImages.current;
          if (isCompleted) bubbleSrc = bubbleImages.completed;
          else if (isLocked) bubbleSrc = bubbleImages.locked;

          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Bubble image */}
              <button
                onClick={() => {
                  if (!isLocked) onSelectStage(stage);
                }}
                disabled={isLocked}
                className="relative shrink-0 transition-all duration-200 active:scale-90 hover:scale-105"
              >
                <img
                  src={bubbleSrc}
                  alt={isCompleted ? "Complété" : isLocked ? "Verrouillé" : stage.title}
                  className="w-[60px] h-[60px] object-contain"
                />
                {!isCompleted && !isLocked && (
                  <span className="absolute inset-0 flex items-center justify-center font-extrabold text-[16px]"
                    style={{ color: "#FFFFFF", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                    {stage.number}
                  </span>
                )}
              </button>

              {/* Stage info */}
              <div className={`flex-1 p-2.5 rounded-2xl ${isLeft ? "text-left" : "text-right"}`}
                style={{ background: "rgba(255,255,255,0.85)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div className="font-bold text-[13px]" style={{ color: "#333333" }}>{stage.title}</div>
                <div className="text-[11px]" style={{ color: "#999999" }}>{stage.description}</div>
                {isLocked && (
                  <div className="text-[10px] font-bold mt-1" style={{ color: "#4A90E2" }}>
                    Termine le stage précédent !
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ TREASURE CHEST ═══ */}
      <div className="flex justify-center mt-4">
        <img
          src={completed === total
            ? "/images/stage-select-treasure-chest-open.png"
            : "/images/stage-select-treasure-chest-closed.png"}
          alt="Coffre"
          className={`w-[56px] h-[56px] object-contain ${completed === total ? "animate-bounce" : "opacity-60"}`}
        />
      </div>
    </div>
  );
}
