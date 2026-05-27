"use client";

import { World } from "@/data/worlds";
import { useGame } from "@/lib/GameContext";

interface WorldCardProps {
  world: World;
  onSelect: (world: World) => void;
}

const worldThumbnails: Record<string, string> = {
  forest: "/images/world-thumbnail-enchanted-forest.png",
  city: "/images/world-thumbnail-number-city.png",
  island: "/images/world-thumbnail-letter-island.png",
  space: "/images/world-thumbnail-shapes-space.png",
};

export default function WorldCard({ world, onSelect }: WorldCardProps) {
  const { getProgress, profile } = useGame();
  const { completed, total } = getProgress(world.id);
  const isLocked = world.requiredStars > profile.stars;

  return (
    <button
      onClick={() => onSelect(world)}
      className="relative w-full overflow-hidden transition-all duration-200 active:scale-[0.98]"
      style={{ height: "100px", borderRadius: "22px", boxShadow: "0 4px 16px rgba(0,0,0,0.20)" }}>

      {/* Thumbnail as full background */}
      <img
        src={worldThumbnails[world.id] || worldThumbnails.forest}
        alt={world.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: isLocked ? "grayscale(50%) brightness(0.65)" : "none" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.35) 100%)" }} />

      {/* World name — centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h3 style={{
          fontSize: "20px", fontWeight: 900, color: "#FFFFFF",
          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
        }}>{world.title}</h3>

        {/* Star count pill */}
        {!isLocked && (
          <div className="flex items-center gap-1 mt-1.5 px-3 py-0.5 rounded-full"
            style={{ background: "rgba(0,0,0,0.45)" }}>
            <span style={{ color: "#FFD700", fontSize: "14px" }}>★</span>
            <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>{completed}/{total}</span>
          </div>
        )}
      </div>

      {/* Lock icon */}
      {isLocked && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <img src="/images/world-card-lock-icon.png" alt="🔒"
            style={{ width: "38px", height: "38px", objectFit: "contain" }} />
        </div>
      )}
    </button>
  );
}
