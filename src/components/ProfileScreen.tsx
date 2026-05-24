"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import { badges, accessories, Badge, Accessory } from "@/data/rewards";
import { StarCounter, CandyCounter, GemCounter } from "./StarCounter";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import BottomNav from "./BottomNav";
import { LeoAvatar } from "./Mascot";

export default function ProfileScreen() {
  const { profile, updateProfile, setScreen } = useGame();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(null);

  const totalStages = 40;
  const completedStages = profile.completedStages.filter(s => s.completed).length;

  const handleEquipAccessory = (acc: Accessory) => {
    if (!profile.unlockedAccessories.includes(acc.id)) {
      if (profile.candies >= acc.cost) {
        updateProfile({
          ...profile,
          candies: profile.candies - acc.cost,
          unlockedAccessories: [...profile.unlockedAccessories, acc.id],
          selectedAccessory: acc.id,
        });
      }
    } else {
      updateProfile({ ...profile, selectedAccessory: acc.id });
    }
  };

  return (
    <div className="flex flex-col min-h-full overflow-y-auto pb-24 relative">
      {/* Recraft-inspired gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-300 via-violet-200 to-pink-100" />
      {/* Header */}
      <div className="bg-gradient-to-b from-purple to-violet-600 px-4 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setScreen("home")}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg"
          >
            ←
          </button>
          <StarCounter count={profile.stars} size="md" />
        </div>

        {/* Avatar & Name */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <LeoAvatar size="lg" />
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-kid-sm flex items-center justify-center text-sm">
              ✏️
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-white">{profile.name}</h2>
            <div className="inline-block bg-white/20 rounded-full px-3 py-1 text-white font-bold text-sm mt-1">
              Niveau {profile.level}
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-white text-xs font-bold mb-1">
            <span>XP</span>
            <span>{profile.xp}/{profile.xpToNextLevel}</span>
          </div>
          <div className="h-5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-star to-orange-400 transition-all duration-500"
              style={{ width: `${Math.min(100, (profile.xp / profile.xpToNextLevel) * 100)}%` }}
            />
          </div>
        </div>

        {/* Counters */}
        <div className="flex justify-center gap-3 mt-4">
          <StarCounter count={profile.stars} size="md" />
          <CandyCounter count={profile.candies} size="md" />
          <GemCounter count={profile.gems} size="md" />
        </div>
      </div>

      {/* Content sections */}
      <div className="px-4 py-4 space-y-4">
        {/* Badges */}
        <Section title="🏅 Mes Badges">
          <div className="flex flex-wrap gap-3">
            {badges.map((badge) => {
              const unlocked = profile.unlockedBadges.includes(badge.id);
              return (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-kid-sm text-2xl transition ${
                    unlocked
                      ? "bg-gradient-to-br from-star to-orange-400 hover:scale-110"
                      : "bg-gray-300 text-gray-400"
                  }`}
                >
                  {unlocked ? badge.icon : "❓"}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Accessories */}
        <Section title="🎒 Mes Accessoires">
          <div className="flex flex-wrap gap-3">
            {accessories.map((acc) => {
              const unlocked = profile.unlockedAccessories.includes(acc.id);
              const equipped = profile.selectedAccessory === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => {
                    if (unlocked) {
                      handleEquipAccessory(acc);
                    } else {
                      setSelectedAccessory(acc);
                    }
                  }}
                  className={`relative w-16 h-16 rounded-xl flex flex-col items-center justify-center shadow-kid-sm transition text-sm ${
                    equipped
                      ? "bg-gradient-to-br from-green-400 to-emerald-500 ring-2 ring-green-500"
                      : unlocked
                      ? "bg-white hover:scale-105"
                      : "bg-gray-200 opacity-60"
                  }`}
                >
                  <span className="text-xl">{acc.icon}</span>
                  {!unlocked && <span className="absolute top-1 right-1 text-xs">🔒</span>}
                  {equipped && <span className="absolute -top-1 -right-1 text-sm">✅</span>}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Progress */}
        <Section title="📊 Ma Progression">
          <ProgressBar
            value={completedStages}
            max={totalStages}
            color="#8B5CF6"
            label="Stages complétés"
            showValue={true}
          />
          <div className="mt-2 text-sm text-gray-500 font-bold">
            🔥 Série de {profile.streak} jour{profile.streak > 1 ? "s" : ""} !
          </div>
        </Section>
      </div>

      {/* Badge detail modal */}
      <Modal open={!!selectedBadge} onClose={() => setSelectedBadge(null)}>
        {selectedBadge && (
          <>
            <div className={`text-5xl mb-3 ${profile.unlockedBadges.includes(selectedBadge.id) ? "" : "grayscale"}`}>
              {profile.unlockedBadges.includes(selectedBadge.id) ? selectedBadge.icon : "❓"}
            </div>
            <h3 className="text-xl font-extrabold text-kidtext mb-1">{selectedBadge.name}</h3>
            <p className="text-gray-600 mb-1">{selectedBadge.description}</p>
            {profile.unlockedBadges.includes(selectedBadge.id) ? (
              <p className="text-green-500 font-bold">✅ Débloqué !</p>
            ) : (
              <p className="text-orange-500 font-bold">🔒 Encore verrouillé...</p>
            )}
          </>
        )}
      </Modal>

      {/* Accessory detail modal */}
      <Modal open={!!selectedAccessory} onClose={() => setSelectedAccessory(null)}>
        {selectedAccessory && (
          <>
            <div className="text-5xl mb-3">{selectedAccessory.icon}</div>
            <h3 className="text-xl font-extrabold text-kidtext mb-1">{selectedAccessory.name}</h3>
            {profile.unlockedAccessories.includes(selectedAccessory.id) ? (
              <>
                <p className="text-green-500 font-bold mb-3">✅ Débloqué !</p>
                <button
                  onClick={() => {
                    handleEquipAccessory(selectedAccessory);
                    setSelectedAccessory(null);
                  }}
                  className={`big-btn-green text-base ${profile.selectedAccessory === selectedAccessory.id ? "opacity-50" : ""}`}
                >
                  {profile.selectedAccessory === selectedAccessory.id ? "Déjà équipé" : "Équiper"}
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-1">Prix : {selectedAccessory.cost} 🍬 bonbons</p>
                {profile.candies >= selectedAccessory.cost ? (
                  <button
                    onClick={() => {
                      handleEquipAccessory(selectedAccessory);
                      setSelectedAccessory(null);
                    }}
                    className="big-btn-orange text-base"
                  >
                    Acheter pour {selectedAccessory.cost} 🍬
                  </button>
                ) : (
                  <p className="text-orange-500 font-bold">
                    Gagne plus de bonbons pour débloquer cet accessoire !
                  </p>
                )}
              </>
            )}
          </>
        )}
      </Modal>

      <BottomNav />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-kid-sm">
      <h3 className="font-extrabold text-kidtext text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}
