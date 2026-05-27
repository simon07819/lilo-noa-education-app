"use client";

import { useGame } from "@/lib/GameContext";

const navItems = [
  { img: "/images/footer-learn-playing-icon.png", label: "Jouer", screen: "home" },
  { img: "/images/footer-explore-worlds-icon.png", label: "Mondes", screen: "worlds" },
  { img: "/images/footer-exciting-stages-icon.png", label: "Étapes", screen: "stages" },
  { img: "/images/footer-rewards-surprises-icon.png", label: "Récompenses", screen: "profile" },
];

export default function BottomNav() {
  const { screen, setScreen, selectedWorld, setSelectedWorld } = useGame();

  const handleNav = (targetScreen: string) => {
    if (targetScreen === "stages" && !selectedWorld) {
      setSelectedWorld("forest");
    }
    setScreen(targetScreen);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30"
      style={{
        background: "rgba(255,255,255,0.95)",
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.10)",
      }}>
      <div className="flex justify-around items-center h-[68px] px-2">
        {navItems.map((item) => {
          const active = screen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => handleNav(item.screen)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition active:scale-90">
              <img src={item.img} alt={item.label} className="w-[30px] h-[30px] object-contain"
                style={{ filter: active ? "none" : "grayscale(100%) opacity(0.45)" }} />
              <span className="text-[10px] font-bold whitespace-nowrap"
                style={{ color: active ? "#4A90E2" : "#999999" }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
