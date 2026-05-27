"use client";

import { Stage, World } from "@/data/worlds";
import { useGame } from "@/lib/GameContext";

interface StageMapProps {
  world: World;
  onSelectStage: (stage: Stage) => void;
}

const POSITIONS = [0.22, 0.78, 0.22, 0.78, 0.22, 0.78, 0.22, 0.78, 0.22, 0.78];

export default function StageMap({ world, onSelectStage }: StageMapProps) {
  const { profile, checkStageLocked, getProgress } = useGame();
  const { completed, total } = getProgress(world.id);

  const currentStageIdx = world.stages.findIndex((stage, idx) => {
    const stageProgress = profile.completedStages.find(s => s.stageId === stage.id);
    const isLocked = checkStageLocked(world.id, idx, world.requiredStars);
    return !stageProgress?.completed && !isLocked;
  });

  return (
    <div className="relative w-full pb-28" style={{ minHeight: `${world.stages.length * 110 + 80}px` }}>

      {/* Connecting path — dashed vertical line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {world.stages.map((_, idx) => {
          if (idx === world.stages.length - 1) return null;
          const x1 = POSITIONS[idx] * 100;
          const y1 = 50 + idx * 110 + 44;
          const x2 = POSITIONS[idx + 1] * 100;
          const y2 = 50 + (idx + 1) * 110 + 0;
          return (
            <line key={idx}
              x1={`${x1}%`} y1={y1} x2={`${x2}%`} y2={y2}
              stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeDasharray="8,6" strokeLinecap="round" />
          );
        })}
      </svg>

      {/* Stage bubbles */}
      {world.stages.map((stage, idx) => {
        const stageProgress = profile.completedStages.find(s => s.stageId === stage.id);
        const isCompleted = !!stageProgress?.completed;
        const isLocked = checkStageLocked(world.id, idx, world.requiredStars);
        const isCurrent = idx === currentStageIdx;

        const xPct = POSITIONS[idx];
        const top = 50 + idx * 110;

        let bubbleSrc = "/images/stage-select-level-bubble-empty.png";
        if (isCompleted) bubbleSrc = "/images/stage-select-level-bubble-completed-3-stars.png";
        else if (isCurrent) bubbleSrc = "/images/stage-select-level-bubble-current-character.png";

        return (
          <div key={stage.id}
            className="absolute flex flex-col items-center"
            style={{ left: `calc(${xPct * 100}% - 44px)`, top, zIndex: 1 }}>

            <button
              onClick={() => { if (!isLocked) onSelectStage(stage); }}
              disabled={isLocked}
              className="relative transition-all duration-200 active:scale-90"
              style={{ opacity: isLocked ? 0.55 : 1 }}>
              <img src={bubbleSrc} alt={stage.title}
                style={{ width: "88px", height: "88px", objectFit: "contain" }} />
              {!isCompleted && (
                <span className="absolute inset-0 flex items-center justify-center font-black"
                  style={{ fontSize: "26px", color: "#FFFFFF", textShadow: "0 2px 6px rgba(0,0,0,0.6)",
                    paddingBottom: isCurrent ? "22px" : "0" }}>
                  {stage.number}
                </span>
              )}
            </button>

          </div>
        );
      })}

      {/* Treasure chest at bottom */}
      <div className="absolute flex flex-col items-center"
        style={{ left: `calc(${POSITIONS[world.stages.length % 2 === 0 ? 0 : 1] * 100}% - 36px)`,
          top: 50 + world.stages.length * 110, zIndex: 1 }}>
        <img
          src={completed === total
            ? "/images/stage-select-treasure-chest-open.png"
            : "/images/stage-select-treasure-chest-closed.png"}
          alt="Coffre"
          style={{ width: "72px", height: "72px", objectFit: "contain",
            opacity: completed === total ? 1 : 0.65 }} />
      </div>
    </div>
  );
}
