"use client";

interface MascotProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Mascot({ size = "lg", className = "" }: MascotProps) {
  const sizeMap = { sm: "w-16 h-16 text-3xl", md: "w-24 h-24 text-5xl", lg: "w-44 h-44 text-8xl" };

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      {/* Noa the blue mascot */}
      <div className="w-full h-full rounded-full bg-gradient-to-b from-sky-300 to-deepblue shadow-lg flex items-center justify-center relative animate-float">
        {/* Face */}
        <div className="relative">
          {/* Eyes */}
          <div className="flex gap-3 mb-2">
            <div className="w-5 h-6 bg-white rounded-full flex items-center justify-center shadow-inner">
              <div className="w-3 h-3 bg-gray-800 rounded-full" />
            </div>
            <div className="w-5 h-6 bg-white rounded-full flex items-center justify-center shadow-inner">
              <div className="w-3 h-3 bg-gray-800 rounded-full" />
            </div>
          </div>
          {/* Mouth */}
          <div className="w-5 h-2 bg-pink-300 rounded-full mx-auto" />
          {/* Star on chest */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-2xl">⭐</div>
        </div>
        {/* Ears */}
        <div className="absolute -top-2 -left-1 w-6 h-8 bg-deepblue rounded-full -rotate-12" />
        <div className="absolute -top-2 -right-1 w-6 h-8 bg-deepblue rounded-full rotate-12" />
      </div>
    </div>
  );
}

export function LeoAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "w-10 h-10 text-lg", md: "w-14 h-14 text-2xl", lg: "w-20 h-20 text-4xl" };
  return (
    <div className={`${sizeMap[size]} rounded-full bg-gradient-to-b from-yellow-300 to-orange-400 shadow-kid-sm flex items-center justify-center font-extrabold text-white ring-2 ring-white`}>
      L
    </div>
  );
}
