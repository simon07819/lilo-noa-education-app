"use client";

export function StarCounter({ count, size = "sm" }: { count: number; size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "text-xs px-2 py-0.5 gap-1", md: "text-sm px-3 py-1 gap-1.5", lg: "text-base px-4 py-1.5 gap-2" };
  const imgSize = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
  return (
    <div className={`counter-badge ${sizeMap[size]} flex items-center`}>
      <img src="/images/star-icon.png" alt="⭐" className={`${imgSize[size]} object-contain`} />
      <span>{count}</span>
    </div>
  );
}

export function CandyCounter({ count, size = "sm" }: { count: number; size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "text-xs px-2 py-0.5 gap-1", md: "text-sm px-3 py-1 gap-1.5", lg: "text-base px-4 py-1.5 gap-2" };
  const imgSize = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
  return (
    <div className={`counter-badge ${sizeMap[size]} flex items-center`} style={{ background: "linear-gradient(135deg, #FF6B9D, #FF85A2)" }}>
      <img src="/images/candy-icon.png" alt="🍬" className={`${imgSize[size]} object-contain`} />
      <span className="text-white">{count}</span>
    </div>
  );
}

export function GemCounter({ count, size = "sm" }: { count: number; size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "text-xs px-2 py-0.5 gap-1", md: "text-sm px-3 py-1 gap-1.5", lg: "text-base px-4 py-1.5 gap-2" };
  const imgSize = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
  return (
    <div className={`counter-badge ${sizeMap[size]} flex items-center`} style={{ background: "linear-gradient(135deg, #00D4AA, #00E5C0)" }}>
      <img src="/images/gem-icon.png" alt="💎" className={`${imgSize[size]} object-contain`} />
      <span className="text-white">{count}</span>
    </div>
  );
}
