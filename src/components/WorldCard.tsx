"use client";

import { World } from "@/data/worlds";
import ProgressBar from "./ProgressBar";
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
      disabled={isLocked}
      className="relative w-full rounded-[28px] overflow-hidden transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
      style={{
        boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
      }}>
      {/* Thumbnail image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={worldThumbnails[world.id] || worldThumbnails.forest}
          alt={world.title}
          className={`w-full h-full object-cover ${isLocked ? "grayscale-[60%] opacity-60" : ""}`}
        />

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <img src="/images/world-card-lock-icon.png" alt="Verrouillé" className="w-[48px] h-[48px] object-contain" />
          </div>
        )}

        {/* Title bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3"
          style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)" }}>
          <h3 className="text-lg font-extrabold text-white drop-shadow-md">
            {world.title}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3" style={{ background: "rgba(255,255,255,0.85)" }}>
        {isLocked ? (
          <p className="text-sm font-bold text-center" style={{ color: "#333333" }}>
            🔒 Encore {world.requiredStars - profile.stars} ⭐ pour débloquer
          </p>
        ) : (
          <ProgressBar value={completed} max={total} color="#4A90E2" showValue={true} />
        )}
      </div>
    </button>
  );
}
