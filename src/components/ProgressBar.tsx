"use client";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  label?: string;
  showValue?: boolean;
}

export default function ProgressBar({ value, max, color = "#8DD928", label, showValue = true }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-bold text-kidtext">{label}</span>}
          {showValue && <span className="text-sm font-bold text-kidtext">{value}/{max}</span>}
        </div>
      )}
      <div className="h-5 rounded-full bg-gray-200 overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
        >
          {pct >= 15 && <span className="text-xs text-white font-bold">{pct}%</span>}
        </div>
      </div>
    </div>
  );
}
