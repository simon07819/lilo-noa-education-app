"use client";

import { useGame } from "@/lib/GameContext";
import Modal from "./Modal";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { soundEnabled, setSoundEnabled, animationsEnabled, setAnimationsEnabled, resetGame } = useGame();

  return (
    <Modal open={open} onClose={onClose} showClose={false}>
      <h2 className="text-2xl font-extrabold text-purple mb-4">⚙️ Paramètres</h2>

      <div className="flex flex-col gap-4 text-left">
        {/* Sound */}
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-3">
          <span className="font-bold text-kidtext">🔊 Son</span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-14 h-8 rounded-full transition-all ${soundEnabled ? "bg-green-400" : "bg-gray-300"}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow transition-all ${soundEnabled ? "ml-7" : "ml-1"}`} />
          </button>
        </div>

        {/* Animations */}
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-3">
          <span className="font-bold text-kidtext">✨ Animations</span>
          <button
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className={`w-14 h-8 rounded-full transition-all ${animationsEnabled ? "bg-green-400" : "bg-gray-300"}`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow transition-all ${animationsEnabled ? "ml-7" : "ml-1"}`} />
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            if (confirm("Es-tu sûr de vouloir réinitialiser toute ta progression ?")) {
              resetGame();
              onClose();
              window.location.reload();
            }
          }}
          className="w-full py-3 rounded-2xl bg-red-100 text-red-500 font-bold hover:bg-red-200 transition"
        >
          🔄 Réinitialiser la progression
        </button>
      </div>

      <button
        onClick={onClose}
        className="mt-4 px-6 py-2 rounded-full bg-purple text-white font-bold hover:bg-purple/80 transition"
      >
        Fermer
      </button>
    </Modal>
  );
}
