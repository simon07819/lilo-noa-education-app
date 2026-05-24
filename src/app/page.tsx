"use client";

import { GameProvider, useGame } from "@/lib/GameContext";
import PhoneFrame from "@/components/PhoneFrame";
import HomeScreen from "@/components/HomeScreen";
import WorldsScreen from "@/components/WorldsScreen";
import StagesScreen from "@/components/StagesScreen";
import GameScreen from "@/components/GameScreen";
import ProfileScreen from "@/components/ProfileScreen";

function AppRouter() {
  const { screen } = useGame();

  switch (screen) {
    case "home":
      return <HomeScreen />;
    case "worlds":
      return <WorldsScreen />;
    case "stages":
      return <StagesScreen />;
    case "game":
      return <GameScreen />;
    case "profile":
      return <ProfileScreen />;
    default:
      return <HomeScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <PhoneFrame>
        <AppRouter />
      </PhoneFrame>
    </GameProvider>
  );
}
