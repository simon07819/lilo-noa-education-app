"use client";

import { Stage, World } from "@/data/worlds";
import { useGame } from "@/lib/GameContext";

interface StageMapProps {
  world: World;
  onSelectStage: (stage: Stage) => void;
}

export default function StageMap({ world, onSelectStage }: StageMapProps) {
  const { profile, checkStageLocked, getProgress } = useGame();
  const { completed, total } = getProgress(world.id);

  return (
    <div className="relative w-full px-4 pb-32">
      {/* Curved path */}
      <div className="absolute left-1/2 top-8 bottom-8 w-4 bg-amber-200/60 rounded-full -translate-x-1/2 z-0" />

      {/* Stage nodes */}
      <div className="relative z-10 flex flex-col gap-4 mt-4">
        {world.stages.map((stage, idx) => {
          const stageProgress = profile.completedStages.find(s => s.stageId === stage.id);
          const isCompleted = stageProgress?.completed;
          const isLocked = checkStageLocked(world.id, idx, world.requiredStars);
          const starsEarned = stageProgress?.starsEarned || 0;

          // Alternate left/right for path effect
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Stage button */}
              <button
                onClick={() => {
                  if (!isLocked) onSelectStage(stage);
                }}
                disabled={isLocked}
                className={`relative w-16 h-16 rounded-full flex flex-col items-center justify-center font-extrabold text-lg shadow-kid-sm transition-all duration-200 active:scale-90
                  ${isCompleted
                    ? "bg-gradient-to-b from-green-400 to-green-600 text-white"
                    : isLocked
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-b from-star to-orange-400 text-kidtext hover:scale-110"
                  }`}
              >
                {isCompleted ? "✓" : isLocked ? "🔒" : stage.number}
                {isCompleted && (
                  <div className="absolute -bottom-1 flex gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <span key={s} className={`text-xs ${s <= starsEarned ? "opacity-100" : "opacity-30"}`}>⭐</span>
                    ))}
                  </div>
                )}
              </button>

              {/* Stage info card */}
              <div className={`flex-1 bg-white/90 rounded-2xl p-3 shadow-kid-sm ${isLeft ? "text-left" : "text-right"}`}>
                <div className="font-bold text-sm text-kidtext">{stage.title}</div>
                <div className="text-xs text-gray-500">{stage.description}</div>
                {isLocked && (
                  <div className="text-xs text-orange-500 font-bold mt-1">
                    Termine le stage précédent !
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Treasure chest at end */}
      <div className="flex justify-center mt-6">
        <div className={`text-5xl ${completed === total ? "animate-bounce" : "opacity-40"}`}>
          {completed === total ? "🎁" : "🔒🎁"}
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="fixed bottom-20 left-0 right-0 px-4 mx-auto max-w-[420px]">
        <div className="bg-white/95 rounded-2xl p-3 shadow-card">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-kidtext">{completed}/{total} stages</span>
          </div>
          <div className="h-4 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-star to-orange-400 transition-all duration-500"
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
