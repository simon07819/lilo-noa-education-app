"use client";

import { useState } from "react";
import { useGame } from "@/lib/GameContext";
import { badges, accessories, Badge, Accessory } from "@/data/rewards";
import Modal from "./Modal";
import BottomNav from "./BottomNav";
import SettingsModal from "./SettingsModal";

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
  const { profile, updateProfile } = useGame();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const totalStages = 40;
  const completedStages = profile.completedStages.filter(s => s.completed).length;
  const xpPct = Math.min(100, (profile.xp / profile.xpToNextLevel) * 100);

  const handleEquipAccessory = (acc: Accessory) => {
    if (!profile.unlockedAccessories.includes(acc.id)) {
      if (profile.candies >= acc.cost) {
        updateProfile({ ...profile, candies: profile.candies - acc.cost, unlockedAccessories: [...profile.unlockedAccessories, acc.id], selectedAccessory: acc.id });
      }
    } else {
      updateProfile({ ...profile, selectedAccessory: acc.id });
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <img src="/images/profile-background.png" alt="" className="absolute inset-0 w-full h-full object-cover" />

      <div className="relative z-10 flex flex-col h-full overflow-y-auto" style={{ paddingBottom: "80px" }}>

        {/* Header — avatar large + nom + level + gear */}
        <div className="px-4 pt-9 pb-4">
          <div className="rounded-3xl p-4 flex items-center gap-4 relative"
            style={{ background: "rgba(255,255,255,0.90)", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}>

            {/* Settings gear — top right corner */}
            <button
              onClick={() => setShowSettings(true)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.06)" }}>
              <img src="/images/home-settings-gear-icon.png" alt="Paramètres"
                style={{ width: "22px", height: "22px", objectFit: "contain" }} />
            </button>

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img src="/images/profile-boy-avatar.png" alt="Avatar"
                style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover",
                  border: "3px solid #FFD700", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }} />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#4A90E2", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                <img src="/images/profile-edit-pencil-icon.png" alt="✏️" style={{ width: "14px", height: "14px", objectFit: "contain" }} />
              </button>
            </div>

            {/* Name + Level + XP */}
            <div className="flex-1 pr-8">
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#333333" }}>{profile.name}</h2>
              <div className="inline-block rounded-full px-3 py-0.5 mt-0.5"
                style={{ background: "#D9F0FF", color: "#4A90E2", fontSize: "12px", fontWeight: 700 }}>
                Niveau {profile.level}
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-1" style={{ fontSize: "11px", fontWeight: 600, color: "#999" }}>
                  <span>XP</span><span>{profile.xp}/{profile.xpToNextLevel}</span>
                </div>
                <div style={{ height: "6px", background: "#E8E8E8", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${xpPct}%`, background: "linear-gradient(90deg, #FFD700 0%, #4A90E2 100%)", borderRadius: "3px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Counters */}
        <div className="flex justify-center gap-3 px-4 pb-4">
          {[
            { img: "/images/profile-star-icon.png", val: profile.stars, label: "Étoiles" },
            { img: "/images/candy-icon.png", val: profile.candies, label: "Bonbons" },
            { img: "/images/profile-gem-icon.png", val: profile.gems, label: "Gemmes" },
          ].map(({ img, val, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 flex-1 rounded-2xl py-2"
              style={{ background: "rgba(255,255,255,0.88)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <img src={img} alt={label} style={{ width: "28px", height: "28px", objectFit: "contain" }} />
              <span style={{ fontSize: "16px", fontWeight: 800, color: "#333333" }}>{val}</span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "#999" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="px-4 pb-4">
          <div className="rounded-3xl p-4" style={{ background: "rgba(255,255,255,0.88)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#333333", marginBottom: "12px" }}>🏅 Mes Badges</h3>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => {
                const unlocked = profile.unlockedBadges.includes(badge.id);
                const imgSrc = unlocked ? (badgeImages[badge.id] || "/images/profile-badge-explorer.png") : "/images/profile-badge-upcoming-lock.png";
                return (
                  <button key={badge.id} onClick={() => setSelectedBadge(badge)}
                    className="transition-all active:scale-90 hover:scale-110"
                    style={{ width: "64px", height: "64px", borderRadius: "50%", overflow: "hidden",
                      boxShadow: unlocked ? "0 3px 10px rgba(0,0,0,0.15)" : "0 2px 6px rgba(0,0,0,0.08)" }}>
                    <img src={imgSrc} alt={badge.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Accessories */}
        <div className="px-4 pb-4">
          <div className="rounded-3xl p-4" style={{ background: "rgba(255,255,255,0.88)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#333333", marginBottom: "12px" }}>🎒 Mes Accessoires</h3>
            <div className="flex flex-wrap gap-3">
              {accessories.map((acc) => {
                const unlocked = profile.unlockedAccessories.includes(acc.id);
                const equipped = profile.selectedAccessory === acc.id;
                const imgSrc = unlocked || acc.cost === 0
                  ? (accessoryImages[acc.id] || "/images/profile-accessory-blue-cap.png")
                  : "/images/profile-accessory-lock.png";
                return (
                  <button key={acc.id}
                    onClick={() => { if (unlocked || acc.cost === 0) handleEquipAccessory(acc); else setSelectedAccessory(acc); }}
                    className="relative transition-all hover:scale-105 active:scale-90"
                    style={{ width: "64px", height: "64px", borderRadius: "16px",
                      background: equipped ? "#D9F0FF" : "rgba(255,255,255,0.9)",
                      boxShadow: equipped ? "0 0 0 3px #4A90E2, 0 3px 10px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={imgSrc} alt={acc.name} style={{ width: "44px", height: "44px", objectFit: "contain" }} />
                    {equipped && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white"
                        style={{ background: "#92D050" }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="px-4 pb-4">
          <div className="rounded-3xl p-4" style={{ background: "rgba(255,255,255,0.88)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#333333", marginBottom: "12px" }}>📊 Ma Progression</h3>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#333333" }}>
                Stages : {completedStages}/{totalStages}
              </span>
              <img src="/images/profile-my-progress-treasure-chest.png" alt="🏆" style={{ width: "24px", height: "24px", objectFit: "contain" }} />
            </div>
            <div style={{ height: "10px", background: "#E8E8E8", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(completedStages / totalStages) * 100}%`, background: "linear-gradient(90deg, #4A90E2 0%, #8B5CF6 100%)", borderRadius: "5px" }} />
            </div>
            <div className="mt-2" style={{ fontSize: "11px", fontWeight: 700, color: "#999999" }}>
              🔥 Série de {profile.streak} jour{profile.streak > 1 ? "s" : ""} !
            </div>
          </div>
        </div>
      </div>

      {/* Badge Modal */}
      <Modal open={!!selectedBadge} onClose={() => setSelectedBadge(null)}>
        {selectedBadge && (
          <>
            <img src={profile.unlockedBadges.includes(selectedBadge.id) ? (badgeImages[selectedBadge.id] || "/images/profile-badge-explorer.png") : "/images/profile-badge-upcoming-lock.png"}
              alt={selectedBadge.name} style={{ width: "64px", height: "64px", objectFit: "contain", margin: "0 auto 12px", display: "block", borderRadius: "50%" }} />
            <h3 className="text-xl font-extrabold mb-1" style={{ color: "#333333" }}>{selectedBadge.name}</h3>
            <p className="text-sm font-bold mb-2" style={{ color: "#999999" }}>{selectedBadge.description}</p>
            {profile.unlockedBadges.includes(selectedBadge.id)
              ? <p className="font-bold" style={{ color: "#92D050" }}>✅ Débloqué !</p>
              : <p className="font-bold" style={{ color: "#4A90E2" }}>🔒 Encore verrouillé...</p>}
          </>
        )}
      </Modal>

      {/* Accessory Modal */}
      <Modal open={!!selectedAccessory} onClose={() => setSelectedAccessory(null)}>
        {selectedAccessory && (
          <>
            <img src={accessoryImages[selectedAccessory.id] || "/images/profile-accessory-blue-cap.png"}
              alt={selectedAccessory.name} style={{ width: "56px", height: "56px", objectFit: "contain", margin: "0 auto 12px", display: "block" }} />
            <h3 className="text-xl font-extrabold mb-1" style={{ color: "#333333" }}>{selectedAccessory.name}</h3>
            {profile.unlockedAccessories.includes(selectedAccessory.id) || selectedAccessory.cost === 0 ? (
              <>
                <p className="font-bold mb-3" style={{ color: "#92D050" }}>✅ Débloqué !</p>
                <button onClick={() => { handleEquipAccessory(selectedAccessory); setSelectedAccessory(null); }}
                  className="font-extrabold text-[15px] py-2.5 px-8 rounded-[28px] transition-all active:scale-95"
                  style={{ background: profile.selectedAccessory === selectedAccessory.id ? "#D9F0FF" : "#92D050", color: profile.selectedAccessory === selectedAccessory.id ? "#333333" : "#FFFFFF", boxShadow: "0 3px 0 #5A9B35" }}>
                  {profile.selectedAccessory === selectedAccessory.id ? "Déjà équipé" : "Équiper"}
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-bold mb-3" style={{ color: "#999999" }}>Prix : {selectedAccessory.cost} 🍬</p>
                {profile.candies >= selectedAccessory.cost ? (
                  <button onClick={() => { handleEquipAccessory(selectedAccessory); setSelectedAccessory(null); }}
                    className="font-extrabold text-[15px] py-2.5 px-8 rounded-[28px] text-white transition-all active:scale-95"
                    style={{ background: "linear-gradient(180deg, #92D050 0%, #70AD47 100%)", boxShadow: "0 3px 0 #5A9B35" }}>
                    Acheter pour {selectedAccessory.cost} 🍬
                  </button>
                ) : (
                  <p className="font-bold" style={{ color: "#4A90E2" }}>Gagne plus de bonbons !</p>
                )}
              </>
            )}
          </>
        )}
      </Modal>

      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
      <BottomNav />
    </div>
  );
}
