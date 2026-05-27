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
      style={{ height: "118px", borderRadius: "22px", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}>

      {/* Thumbnail full background */}
      <img
        src={worldThumbnails[world.id] || worldThumbnails.forest}
        alt={world.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: isLocked ? "grayscale(40%) brightness(0.60)" : "none" }}
      />

      {/* Gradient: lighter so thumbnail stays vibrant */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.0) 80%)" }} />

      {/* World name — LEFT aligned */}
      <div className="absolute inset-0 flex flex-col justify-center pl-4">
        <h3 style={{
          fontSize: "21px", fontWeight: 900, color: "#FFFFFF",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          lineHeight: 1.2, maxWidth: "55%",
        }}>{world.title}</h3>

        {/* Star count pill — left aligned below name */}
        <div className="flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full self-start"
          style={{ background: "rgba(0,0,0,0.50)" }}>
          <span style={{ color: "#FFD700", fontSize: "13px" }}>★</span>
          <span style={{ color: "#FFFFFF", fontSize: "12px", fontWeight: 700 }}>{completed}/{total}</span>
        </div>
      </div>

      {/* Lock icon — right side */}
      {isLocked && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <img src="/images/world-card-lock-icon.png" alt="🔒"
            style={{ width: "40px", height: "40px", objectFit: "contain" }} />
        </div>
      )}
    </button>
  );
}
