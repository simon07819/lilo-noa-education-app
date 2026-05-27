"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { UserProfile, loadProfile, saveProfile, resetProfile, completeStage, isStageLocked, getWorldProgress } from "./gameState";

interface GameContextType {
  profile: UserProfile;
  updateProfile: (p: UserProfile) => void;
  resetGame: () => void;
  finishStage: (stageId: string, errors: number, total: number) => void;
  checkStageLocked: (worldId: string, stageIdx: number, worldStars: number) => boolean;
  getProgress: (worldId: string) => { completed: number; total: number };
  screen: string;
  setScreen: (s: string) => void;
  selectedWorld: string;
  setSelectedWorld: (w: string) => void;
  selectedStage: string;
  setSelectedStage: (s: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (v: boolean) => void;
}

const GameContext = createContext<GameContextType>(null!);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [screen, setScreen] = useState("home");
  const [selectedWorld, setSelectedWorld] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProfile(loadProfile());
  }, []);

  const updateProfile = useCallback((p: UserProfile) => {
    setProfile(p);
    saveProfile(p);
  }, []);

  const resetGame = useCallback(() => {
    resetProfile();
    setProfile(loadProfile());
  }, []);

  const finishStage = useCallback((stageId: string, errors: number, total: number) => {
    setProfile((prev) => completeStage(prev, stageId, errors, total));
  }, []);

  const checkStageLocked = useCallback(
    (worldId: string, stageIdx: number, worldStars: number) =>
      isStageLocked(profile, worldId, stageIdx, worldStars),
    [profile]
  );

  const getProgress = useCallback(
    (worldId: string) => getWorldProgress(profile, worldId),
    [profile]
  );

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center bg-[#1a0a3e]">
      <div className="text-white text-2xl animate-bounce">🌟 Chargement...</div>
    </div>;
  }

  return (
    <GameContext.Provider
      value={{
        profile,
        updateProfile,
        resetGame,
        finishStage,
        checkStageLocked,
        getProgress,
        screen, setScreen,
        selectedWorld, setSelectedWorld,
        selectedStage, setSelectedStage,
        soundEnabled, setSoundEnabled,
        animationsEnabled, setAnimationsEnabled,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
