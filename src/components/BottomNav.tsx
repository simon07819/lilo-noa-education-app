"use client";

import { useGame } from "@/lib/GameContext";

export default function BottomNav() {
  const { setScreen } = useGame();

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[420px] bg-white/95 backdrop-blur-sm border-t-2 border-purple-100 rounded-t-3xl px-4 py-2 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex justify-around items-center">
        <NavItem icon="🏠" label="Accueil" onClick={() => setScreen("home")} />
        <NavItem icon="🌍" label="Mondes" onClick={() => setScreen("worlds")} />
        <NavItem icon="👤" label="Profil" onClick={() => setScreen("profile")} />
        <NavItem icon="⚙️" label="Réglages" onClick={() => setScreen("settings")} />
      </div>
    </div>
  );
}

function NavItem({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl hover:bg-purple-50 transition active:scale-90"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-[10px] font-bold text-gray-500">{label}</span>
    </button>
  );
}
