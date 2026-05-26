"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import { badges, accessories, Badge, Accessory } from "@/data/rewards";
import Modal from "./Modal";
import BottomNav from "./BottomNav";

const badgeImages: Record<string, string> = {
  "super-reader": "/images/profile-badge-super-reader.png",
  "number-champ": "/images/profile-badge-number-champion.png",
  explorer: "/images/profile-badge-explorer.png",
};

const accessoryImages: Record<string, string> = {
  "hat-blue": "/images/profile-accessory-blue-cap.png",
  "hat-star": "/images/profile-accessory-green-cap.png",
  backpack: "/images/profile-accessory-purple-backpack.png",
};

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
    <div className="relative h-full w-full overflow-hidden">
      {/* ═══ BACKGROUND ═══ */}
      <img
        src="/images/profile-background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col h-full overflow-y-auto pb-24">
        {/* ═══ HEADER ═══ */}
        <div className="px-4 pt-9 pb-3">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setScreen("home")}
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-xl hover:scale-105 transition"
              style={{
                background: "rgba(255,255,255,0.85)",
                color: "#333333",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              }}>
              ←
            </button>
            <div className="flex items-center gap-1.5"
              style={{
                background: "rgba(255,255,255,0.85)",
                borderRadius: "20px",
                padding: "4px 12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}>
              <img src="/images/profile-star-icon.png" alt="⭐" className="w-[18px] h-[18px] object-contain" />
              <span className="font-bold text-[14px]" style={{ color: "#333333" }}>{profile.stars}</span>
            </div>
          </div>

          {/* ═══ AVATAR + NAME ═══ */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="/images/profile-boy-avatar.png"
                alt="Avatar"
                className="w-[80px] h-[80px] rounded-full object-cover border-3 border-white"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
              />
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
                <img src="/images/profile-edit-pencil-icon.png" alt="✏️" className="w-[16px] h-[16px] object-contain" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-extrabold" style={{ color: "#333333" }}>{profile.name}</h2>
              <div className="inline-block rounded-full px-3 py-1 font-bold text-[12px] mt-1"
                style={{ background: "rgba(255,255,255,0.85)", color: "#4A90E2" }}>
                Niveau {profile.level}
              </div>
            </div>
          </div>

          {/* ═══ XP BAR ═══ */}
          <div className="mt-4">
            <div className="flex justify-between text-[11px] font-bold mb-1" style={{ color: "#333333" }}>
              <span>XP</span>
              <span>{profile.xp}/{profile.xpToNextLevel}</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.5)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (profile.xp / profile.xpToNextLevel) * 100)}%`,
                  background: "linear-gradient(90deg, #FFD700 0%, #4A90E2 100%)",
                }}
              />
            </div>
          </div>

          {/* ═══ COUNTERS ═══ */}
          <div className="flex justify-center gap-3 mt-4">
            <Counter img="/images/profile-star-icon.png" value={profile.stars} />
            <Counter img="/images/profile-gem-icon.png" value={profile.candies} />
            <Counter img="/images/profile-diamond-icon.png" value={profile.gems} />
          </div>
        </div>

        {/* ═══ BADGES ═══ */}
        <div className="px-4 py-2">
          <h3 className="font-extrabold text-[16px] mb-3" style={{ color: "#333333" }}>🏅 Mes Badges</h3>
          <div className="flex flex-wrap gap-3">
            {badges.map((badge) => {
              const unlocked = profile.unlockedBadges.includes(badge.id);
              const imgSrc = unlocked
                ? (badgeImages[badge.id] || "/images/profile-badge-explorer.png")
                : "/images/profile-badge-upcoming-lock.png";
              return (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className="w-[64px] h-[64px] rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                  style={{ boxShadow: "0 3px 10px rgba(0,0,0,0.1)" }}>
                  <img src={imgSrc} alt={badge.name} className="w-full h-full object-contain rounded-full" />
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ ACCESSORIES ═══ */}
        <div className="px-4 py-2">
          <h3 className="font-extrabold text-[16px] mb-3" style={{ color: "#333333" }}>🎒 Mes Accessoires</h3>
          <div className="flex flex-wrap gap-3">
            {accessories.map((acc) => {
              const unlocked = profile.unlockedAccessories.includes(acc.id);
              const equipped = profile.selectedAccessory === acc.id;
              const imgSrc = unlocked || acc.cost === 0
                ? (accessoryImages[acc.id] || "/images/profile-accessory-blue-cap.png")
                : "/images/profile-accessory-lock.png";
              return (
                <button
                  key={acc.id}
                  onClick={() => {
                    if (unlocked || acc.cost === 0) {
                      handleEquipAccessory(acc);
                    } else {
                      setSelectedAccessory(acc);
                    }
                  }}
                  className="relative w-[64px] h-[64px] rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-90"
                  style={{
                    background: equipped ? "#D9F0FF" : "rgba(255,255,255,0.85)",
                    boxShadow: equipped ? "0 0 0 3px #4A90E2, 0 3px 10px rgba(0,0,0,0.1)" : "0 3px 10px rgba(0,0,0,0.08)",
                  }}>
                  <img src={imgSrc} alt={acc.name} className="w-[44px] h-[44px] object-contain" />
                  {equipped && (
                    <span className="absolute -top-1 -right-1 w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px]"
                      style={{ background: "#92D050", color: "#FFFFFF" }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ PROGRESS ═══ */}
        <div className="px-4 py-2">
          <h3 className="font-extrabold text-[16px] mb-3" style={{ color: "#333333" }}>📊 Ma Progression</h3>
          <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.85)", boxShadow: "0 3px 12px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[13px]" style={{ color: "#333333" }}>
                Stages complétés : {completedStages}/{totalStages}
              </span>
              <img src="/images/profile-my-progress-treasure-chest.png" alt="🏆" className="w-[24px] h-[24px] object-contain" />
            </div>
            <div className="h-4 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.08)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(completedStages / totalStages) * 100}%`,
                  background: "linear-gradient(90deg, #4A90E2 0%, #8B5CF6 100%)",
                }}
              />
            </div>
            <div className="mt-2 text-[11px] font-bold" style={{ color: "#999999" }}>
              🔥 Série de {profile.streak} jour{profile.streak > 1 ? "s" : ""} !
            </div>
          </div>
        </div>

        {/* ═══ BADGE MODAL ═══ */}
        <Modal open={!!selectedBadge} onClose={() => setSelectedBadge(null)}>
          {selectedBadge && (
            <>
              <img
                src={profile.unlockedBadges.includes(selectedBadge.id)
                  ? (badgeImages[selectedBadge.id] || "/images/profile-badge-explorer.png")
                  : "/images/profile-badge-upcoming-lock.png"}
                alt={selectedBadge.name}
                className="w-[64px] h-[64px] object-contain mx-auto mb-3 rounded-full"
              />
              <h3 className="text-xl font-extrabold mb-1" style={{ color: "#333333" }}>{selectedBadge.name}</h3>
              <p className="text-sm font-bold mb-2" style={{ color: "#999999" }}>{selectedBadge.description}</p>
              {profile.unlockedBadges.includes(selectedBadge.id) ? (
                <p className="font-bold" style={{ color: "#92D050" }}>✅ Débloqué !</p>
              ) : (
                <p className="font-bold" style={{ color: "#4A90E2" }}>🔒 Encore verrouillé...</p>
              )}
            </>
          )}
        </Modal>

        {/* ═══ ACCESSORY MODAL ═══ */}
        <Modal open={!!selectedAccessory} onClose={() => setSelectedAccessory(null)}>
          {selectedAccessory && (
            <>
              <img
                src={accessoryImages[selectedAccessory.id] || "/images/profile-accessory-blue-cap.png"}
                alt={selectedAccessory.name}
                className="w-[56px] h-[56px] object-contain mx-auto mb-3"
              />
              <h3 className="text-xl font-extrabold mb-1" style={{ color: "#333333" }}>{selectedAccessory.name}</h3>
              {profile.unlockedAccessories.includes(selectedAccessory.id) || selectedAccessory.cost === 0 ? (
                <>
                  <p className="font-bold mb-3" style={{ color: "#92D050" }}>✅ Débloqué !</p>
                  <button
                    onClick={() => {
                      handleEquipAccessory(selectedAccessory);
                      setSelectedAccessory(null);
                    }}
                    className="font-extrabold text-[15px] py-2.5 px-8 rounded-[28px] transition-all hover:brightness-110 active:scale-95"
                    style={{
                      background: profile.selectedAccessory === selectedAccessory.id ? "#D9F0FF" : "#92D050",
                      color: profile.selectedAccessory === selectedAccessory.id ? "#333333" : "#FFFFFF",
                      boxShadow: "0 3px 0 #5A9B35",
                      border: "2px solid rgba(255,255,255,0.5)",
                    }}>
                    {profile.selectedAccessory === selectedAccessory.id ? "Déjà équipé" : "Équiper"}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold mb-1" style={{ color: "#999999" }}>
                    Prix : {selectedAccessory.cost} 🍬 bonbons
                  </p>
                  {profile.candies >= selectedAccessory.cost ? (
                    <button
                      onClick={() => {
                        handleEquipAccessory(selectedAccessory);
                        setSelectedAccessory(null);
                      }}
                      className="font-extrabold text-[15px] py-2.5 px-8 rounded-[28px] text-white transition-all hover:brightness-110 active:scale-95"
                      style={{
                        background: "linear-gradient(180deg, #92D050 0%, #70AD47 100%)",
                        boxShadow: "0 3px 0 #5A9B35",
                        border: "2px solid rgba(255,255,255,0.5)",
                      }}>
                      Acheter pour {selectedAccessory.cost} 🍬
                    </button>
                  ) : (
                    <p className="font-bold" style={{ color: "#4A90E2" }}>
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
    </div>
  );
}

function Counter({ img, value }: { img: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
      style={{ background: "rgba(255,255,255,0.85)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
      <img src={img} alt="" className="w-[20px] h-[20px] object-contain" />
      <span className="font-bold text-[14px]" style={{ color: "#333333" }}>{value}</span>
    </div>
  );
}
