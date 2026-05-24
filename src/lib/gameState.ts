"use client";

export interface StageProgress {
  stageId: string;
  completed: boolean;
  starsEarned: number;
  bestScore: number; // 0 = perfect, >0 = errors
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  stars: number;
  candies: number;
  gems: number;
  selectedAccessory: string;
  unlockedAccessories: string[];
  unlockedBadges: string[];
  completedStages: StageProgress[];
  lastPlayedDate: string;
  streak: number;
}

const STORAGE_KEY = "lilo-noa-profile";

const defaultProfile: UserProfile = {
  name: "Léo",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  stars: 0,
  candies: 0,
  gems: 0,
  selectedAccessory: "hat-blue",
  unlockedAccessories: ["hat-blue"],
  unlockedBadges: [],
  completedStages: [],
  lastPlayedDate: "",
  streak: 0,
};

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultProfile, ...parsed };
    }
  } catch (e) {
    console.error("Failed to load profile", e);
  }
  return { ...defaultProfile };
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save profile", e);
  }
}

export function resetProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function completeStage(
  profile: UserProfile,
  stageId: string,
  errors: number,
  totalQuestions: number
): UserProfile {
  const p = { ...profile, completedStages: [...profile.completedStages.map(s => ({...s}))] };

  // Calculate stars
  let starsEarned = 1;
  if (errors === 0) starsEarned = 3;
  else if (errors === 1) starsEarned = 2;

  // Update or add stage progress
  const existingIdx = p.completedStages.findIndex((s) => s.stageId === stageId);
  const newProgress: StageProgress = {
    stageId,
    completed: true,
    starsEarned,
    bestScore: existingIdx >= 0
      ? Math.min(p.completedStages[existingIdx].bestScore, errors)
      : errors,
  };

  if (existingIdx >= 0) {
    const oldStars = p.completedStages[existingIdx].starsEarned;
    p.stars += Math.max(0, starsEarned - oldStars);
    p.completedStages[existingIdx] = newProgress;
  } else {
    p.stars += starsEarned;
    p.completedStages.push(newProgress);
  }

  // Rewards
  const correctAnswers = totalQuestions - errors;
  p.candies += correctAnswers * 5;
  p.xp += 25;
  p.gems += starsEarned === 3 ? 2 : 1;

  // Level up
  while (p.xp >= p.xpToNextLevel) {
    p.xp -= p.xpToNextLevel;
    p.level += 1;
    p.xpToNextLevel = Math.floor(p.xpToNextLevel * 1.3);
  }

  // Streak
  const today = new Date().toISOString().split("T")[0];
  if (p.lastPlayedDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    if (p.lastPlayedDate === yesterday) {
      p.streak += 1;
    } else {
      p.streak = 1;
    }
    p.lastPlayedDate = today;
  }

  // Auto-check badges
  checkAndAwardBadges(p);

  saveProfile(p);
  return p;
}

function checkAndAwardBadges(p: UserProfile): void {
  // Super Lecteur: 5 letter/word stages from forest + island
  const letterStageIds = [
    "forest-1", "forest-2", "forest-3", "forest-4", "forest-5",
    "forest-6", "forest-7", "forest-8", "forest-9", "forest-10",
    "island-1", "island-2", "island-3", "island-4", "island-5",
    "island-6", "island-7", "island-8", "island-9", "island-10",
  ];
  const completedLetters = p.completedStages.filter(s => letterStageIds.includes(s.stageId) && s.completed).length;
  if (completedLetters >= 5 && !p.unlockedBadges.includes("super-reader")) {
    p.unlockedBadges = [...p.unlockedBadges, "super-reader"];
  }

  // Champion des Nombres: 5 counting/addition stages
  const numberStageIds = [
    "city-1", "city-2", "city-3", "city-4", "city-5",
    "city-6", "city-7", "city-8", "city-9", "city-10",
  ];
  const completedNumbers = p.completedStages.filter(s => numberStageIds.includes(s.stageId) && s.completed).length;
  if (completedNumbers >= 5 && !p.unlockedBadges.includes("number-champ")) {
    p.unlockedBadges = [...p.unlockedBadges, "number-champ"];
  }

  // Explorer: all stages in any world
  const allWorldStages = [
    ["forest-1","forest-2","forest-3","forest-4","forest-5","forest-6","forest-7","forest-8","forest-9","forest-10"],
    ["city-1","city-2","city-3","city-4","city-5","city-6","city-7","city-8","city-9","city-10"],
    ["island-1","island-2","island-3","island-4","island-5","island-6","island-7","island-8","island-9","island-10"],
    ["space-1","space-2","space-3","space-4","space-5","space-6","space-7","space-8","space-9","space-10"],
  ];
  const anyWorldComplete = allWorldStages.some(worldStages =>
    worldStages.every(sid => p.completedStages.find(s => s.stageId === sid && s.completed))
  );
  if (anyWorldComplete && !p.unlockedBadges.includes("explorer")) {
    p.unlockedBadges = [...p.unlockedBadges, "explorer"];
  }

  // Perfect: any stage with 0 errors
  const hasPerfect = p.completedStages.some(s => s.bestScore === 0 && s.completed);
  if (hasPerfect && !p.unlockedBadges.includes("perfect")) {
    p.unlockedBadges = [...p.unlockedBadges, "perfect"];
  }

  // Star collector: 30 stars
  if (p.stars >= 30 && !p.unlockedBadges.includes("star-collector")) {
    p.unlockedBadges = [...p.unlockedBadges, "star-collector"];
  }

  // Candy master: 100 candies
  if (p.candies >= 100 && !p.unlockedBadges.includes("candy-master")) {
    p.unlockedBadges = [...p.unlockedBadges, "candy-master"];
  }

  // Magic streak
  if (p.streak >= 3 && !p.unlockedBadges.includes("magic-streak")) {
    p.unlockedBadges = [...p.unlockedBadges, "magic-streak"];
  }
}

export function isStageLocked(
  profile: UserProfile,
  worldId: string,
  stageIndex: number,
  worldRequiredStars: number
): boolean {
  if (worldRequiredStars > profile.stars) return true;
  if (stageIndex === 0) return false;
  // Check if previous stage is completed
  const worldStages = getWorldStageIds(worldId);
  if (stageIndex > 0) {
    const prevId = worldStages[stageIndex - 1];
    const prevStage = profile.completedStages.find(s => s.stageId === prevId);
    if (!prevStage || !prevStage.completed) return true;
  }
  return false;
}

function getWorldStageIds(worldId: string): string[] {
  const prefix = worldId + "-";
  return Array.from({ length: 10 }, (_, i) => prefix + (i + 1));
}

export function getWorldProgress(profile: UserProfile, worldId: string): { completed: number; total: number } {
  const stageIds = getWorldStageIds(worldId);
  const completed = profile.completedStages.filter(
    s => stageIds.includes(s.stageId) && s.completed
  ).length;
  return { completed, total: stageIds.length };
}
