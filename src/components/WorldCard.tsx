"use client";

import { World } from "@/data/worlds";
import { useGame } from "@/lib/GameContext";

interface WorldCardProps {
  world: World;
  onSelect: (world: World) => void;
}

const worldCards: Record<string, string> = {
  forest: "/images/world-card-forest-v3.png",
  city: "/images/world-card-city-v3.png",
  island: "/images/world-card-island-v3.png",
  space: "/images/world-card-space-v3.png",
};

const worldColors: Record<string, string> = {
  forest: "#5AB552",
  city: "#4A90E2",
  island: "#F5A623",
  space: "#8B5CF6",
};

export default function WorldCard({ world, onSelect }: WorldCardProps) {
  const { getProgress, profile } = useGame();
  const { completed, total } = getProgress(world.id);
  const isLocked = world.requiredStars > profile.stars;
  const pct = Math.round((completed / total) * 100);
  const color = worldColors[world.id] || "#4A90E2";

  return (
    <button
      onClick={() => onSelect(world)}
      className="relative w-full overflow-hidden transition-all duration-200 active:scale-[0.97]"
      style={{
        borderRadius: "28px",
        boxShadow: isLocked ? "0 4px 16px rgba(0,0,0,0.10)" : "0 6px 20px rgba(0,0,0,0.18)",
      }}>

      {/* Card image */}
      <div className="relative overflow-hidden" style={{ height: "160px", borderRadius: "28px 28px 0 0" }}>
        <img
          src={worldCards[world.id] || worldCards.forest}
          alt={world.title}
          className="w-full h-full object-cover"
          style={{ filter: isLocked ? "grayscale(60%) brightness(0.7)" : "none" }}
        />
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div style={{ background: "rgba(0,0,0,0.35)", borderRadius: "50%", width: "64px", height: "64px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/images/world-card-lock-icon.png" alt="🔒" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3"
          style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
          <h3 className="font-extrabold text-white" style={{ fontSize: "18px", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
            {world.title}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3" style={{ background: "rgba(255,255,255,0.92)", borderRadius: "0 0 28px 28px" }}>
        {isLocked ? (
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#999999" }}>
            🔒 Encore {world.requiredStars - profile.stars} ⭐ pour débloquer
          </span>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#666666" }}>Progression</span>
              <span style={{ fontSize: "12px", fontWeight: 800, color }}>{completed}/{total}</span>
            </div>
            <div style={{ height: "8px", background: "#E8E8E8", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "4px", minWidth: pct > 0 ? "8px" : "0" }} />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
