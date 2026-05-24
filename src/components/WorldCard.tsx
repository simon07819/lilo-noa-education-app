"use client";

import { World } from "@/data/worlds";
import ProgressBar from "./ProgressBar";
import { useGame } from "@/lib/GameContext";

interface WorldCardProps {
  world: World;
  onSelect: (world: World) => void;
}

const worldCardImages: Record<string, string> = {
  forest: "/images/world-forest.png",
  city: "/images/world-city.png",
  island: "/images/world-island.png",
  space: "/images/world-space.png",
};

const worldIcon: Record<string, string> = {
  forest: "🌳",
  city: "🏙️",
  island: "🏝️",
  space: "🚀",
};

export default function WorldCard({ world, onSelect }: WorldCardProps) {
  const { getProgress, profile } = useGame();
  const { completed, total } = getProgress(world.id);
  const isLocked = world.requiredStars > profile.stars;

  return (
    <button
      onClick={() => onSelect(world)}
      disabled={isLocked}
      className="relative w-full rounded-[28px] overflow-hidden shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] hover:shadow-xl"
      style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.12)" }}
    >
      {/* Card image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={worldCardImages[world.id] || worldCardImages.forest}
          alt={world.title}
          className={`w-full h-full object-cover transition-all ${isLocked ? "grayscale-[60%] opacity-60" : ""}`}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        {/* Lock */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <span className="text-5xl drop-shadow-lg">🔒</span>
          </div>
        )}

        {/* Title */}
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{worldIcon[world.id] || "🌟"}</span>
            <h3 className="text-xl font-extrabold text-white drop-shadow-lg leading-tight">
              {world.title}
            </h3>
          </div>
          <span className="inline-block text-xs font-bold text-white/85 bg-white/20 rounded-full px-3 py-0.5">
            {world.theme}
          </span>
        </div>
      </div>

      {/* Card footer */}
      <div className="bg-white px-4 py-3">
        {isLocked ? (
          <p className="text-sm font-bold text-orange-500 text-center">
            🔒 Encore {world.requiredStars - profile.stars} ⭐ pour débloquer
          </p>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-2">{world.description}</p>
            <ProgressBar value={completed} max={total} color="#4CAF50" showValue={true} />
          </>
        )}
      </div>
    </button>
  );
}
