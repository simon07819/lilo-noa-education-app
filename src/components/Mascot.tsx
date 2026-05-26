"use client";

interface MascotProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const mascotSizes: Record<string, string> = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-44 h-44",
};

export default function Mascot({ size = "lg", className = "" }: MascotProps) {
  return (
    <img
      src="/images/character-lilo-home-screen.png"
      alt="Lilo"
      className={`${mascotSizes[size]} object-contain animate-float ${className}`}
      style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))" }}
    />
  );
}

const avatarSizes: Record<string, string> = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
};

export function LeoAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <img
      src="/images/profile-boy-avatar.png"
      alt="Avatar"
      className={`${avatarSizes[size]} rounded-full object-cover ring-2 ring-white`}
      style={{ boxShadow: "0 3px 10px rgba(0,0,0,0.15)" }}
    />
  );
}
