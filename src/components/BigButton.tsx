"use client";

interface BigButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  color?: "green" | "purple" | "orange" | "pink";
  className?: string;
  disabled?: boolean;
}

const colorMap = {
  green: "big-btn-green",
  purple: "big-btn-purple",
  orange: "big-btn-orange",
  pink: "big-btn-pink",
};

export default function BigButton({ children, onClick, color = "green", className = "", disabled }: BigButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`${colorMap[color]} ${className}`}>
      {children}
    </button>
  );
}
