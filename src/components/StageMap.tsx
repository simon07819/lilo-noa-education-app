"use client";

import { Stage, World } from "@/data/worlds";
import { useGame } from "@/lib/GameContext";

interface StageMapProps {
  world: World;
  onSelectStage: (stage: Stage) => void;
}

// Zigzag positions: 0 = left column, 1 = right column
const POSITIONS = [0.20, 0.68, 0.20, 0.68, 0.20, 0.68, 0.20, 0.68, 0.20, 0.68];
const BUBBLE_SIZE = 96;
const ROW_HEIGHT = 118;

export default function StageMap({ world, onSelectStage }: StageMapProps) {
  const { profile, checkStageLocked } = useGame();

  const currentStageIdx = world.stages.findIndex((stage, idx) => {
    const stageProgress = profile.completedStages.find(s => s.stageId === stage.id);
    const isLocked = checkStageLocked(world.id, idx, world.requiredStars);
    return !stageProgress?.completed && !isLocked;
  });

  const mapHeight = world.stages.length * ROW_HEIGHT + 120;

  return (
    <div className="relative w-full" style={{ minHeight: mapHeight }}>

      {/* SVG path connecting bubbles */}
      <svg className="absolute inset-0 w-full pointer-events-none"
        style={{ height: mapHeight, zIndex: 0 }}>
        {world.stages.map((_, idx) => {
          if (idx === world.stages.length - 1) return null;
          const x1 = POSITIONS[idx] * 100 + 13; // center of bubble %
          const y1 = 44 + idx * ROW_HEIGHT + BUBBLE_SIZE / 2;
          const x2 = POSITIONS[idx + 1] * 100 + 13;
          const y2 = 44 + (idx + 1) * ROW_HEIGHT;
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          return (
            <path key={idx}
              d={`M ${x1}% ${y1} Q ${mx}% ${my} ${x2}% ${y2}`}
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="4"
              strokeDasharray="10,7"
              strokeLinecap="round" />
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
        const top = 44 + idx * ROW_HEIGHT;

        let bubbleSrc = "/images/stage-select-level-bubble-empty.png";
        if (isCompleted) bubbleSrc = "/images/stage-select-level-bubble-completed-3-stars.png";
        else if (isCurrent) bubbleSrc = "/images/stage-select-level-bubble-current-character.png";

        const size = isCurrent ? BUBBLE_SIZE + 10 : BUBBLE_SIZE;
        const offset = isCurrent ? -5 : 0;

        return (
          <div key={stage.id}
            className="absolute flex flex-col items-center"
            style={{ left: `calc(${xPct * 100}% + ${offset}px)`, top, zIndex: 1 }}>

            <button
              onClick={() => { if (!isLocked) onSelectStage(stage); }}
              disabled={isLocked}
              className="relative transition-all duration-200 active:scale-90"
              style={{ opacity: isLocked ? 0.50 : 1 }}>
              <img src={bubbleSrc} alt={stage.title}
                style={{ width: `${size}px`, height: `${size}px`, objectFit: "contain" }} />

              {/* Stage number — only shown if not completed */}
              {!isCompleted && (
                <span className="absolute inset-0 flex items-center justify-center font-black"
                  style={{
                    fontSize: isCurrent ? "22px" : "20px",
                    color: "#FFFFFF",
                    textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                    paddingBottom: isCurrent ? "22px" : "0",
                  }}>
                  {stage.number}
                </span>
              )}
            </button>

            {/* Stars below completed stages */}
            {isCompleted && (
              <div className="flex gap-0.5 mt-0.5">
                <span style={{ color: "#FFD700", fontSize: "13px", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>★</span>
                <span style={{ color: "#FFD700", fontSize: "13px", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>★</span>
                <span style={{ color: "#FFD700", fontSize: "13px", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>★</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Treasure chest at end */}
      <div className="absolute flex flex-col items-center"
        style={{
          left: `calc(${POSITIONS[(world.stages.length - 1) % 2 === 0 ? 1 : 0] * 100}%)`,
          top: 44 + world.stages.length * ROW_HEIGHT,
          zIndex: 1,
        }}>
        <img
          src="/images/stage-select-treasure-chest-closed.png"
          alt="Coffre"
          style={{ width: "72px", height: "72px", objectFit: "contain", opacity: 0.75 }} />
      </div>
    </div>
  );
}
