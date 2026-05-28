"use client";

import { useEffect, useMemo, useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";

type Screen =
  | "home"
  | "create"
  | "players"
  | "worlds"
  | "worldMap"
  | "game"
  | "result"
  | "rewards"
  | "profile"
  | "settings";

type Gender = "boy" | "girl";
type AccessoryCategory = "head" | "outfit" | "backpack" | "effect";
type Rarity = "common" | "rare" | "legendary";

type Accessory = {
  id: string;
  name: string;
  category: AccessoryCategory;
  rarity: Rarity;
  priceCandies?: number;
  priceDiamonds?: number;
  compatibleWith: "all" | Gender;
  icon: string;
};

type Badge = {
  id: string;
  name: string;
  description: string;
  condition: string;
  icon: string;
};

type StageProgress = {
  unlocked: boolean;
  completed: boolean;
  stars: number;
  bestScore: number;
  attempts: number;
};

type WorldProgress = {
  unlocked: boolean;
  starsEarned: number;
  chestOpened: boolean;
  stageChestsOpened: string[];
  stages: Record<string, StageProgress>;
};

type Player = {
  id: string;
  name: string;
  gender: Gender;
  avatar: {
    faceId: string;
    skinTone?: string;
    hairStyle?: string;
    hairColor?: string;
    outfitColor?: string;
  };
  level: number;
  xp: number;
  stars: number;
  candies: number;
  diamonds: number;
  unlockedBadges: string[];
  unlockedAccessories: string[];
  equippedAccessories: Partial<Record<AccessoryCategory, string>>;
  progression: {
    worlds: Record<string, WorldProgress>;
    lastWorldId: string;
    lastStageId: string;
  };
  daily: {
    lastDailyChallengeDate?: string;
    lastDailyChestDate?: string;
  };
  createdAt: string;
  updatedAt: string;
};

type Settings = {
  music: boolean;
  sounds: boolean;
};

type WorldDef = {
  id: string;
  name: string;
  short: string;
  requiredStars: number;
  totalStages: number;
  maxStars: number;
  theme: "forest" | "numbers" | "letters" | "shapes" | "stories";
  image: string;
  background: string;
  gradient: string;
};

type Question = {
  id: string;
  kind: string;
  instruction: string;
  prompt: string;
  visual: string;
  options: string[];
  answer: string;
  hint: string;
};

type Result = {
  worldId: string;
  stageId: string;
  score: number;
  correct: number;
  total: number;
  hints: number;
  stars: number;
  xp: number;
  candies: number;
  diamonds: number;
  newBadges: string[];
  accessory?: string;
  replay: boolean;
};

const PLAYERS_KEY = "liloNoa.players";
const ACTIVE_KEY = "liloNoa.activePlayerId";
const SETTINGS_KEY = "liloNoa.settings";

const worlds: WorldDef[] = [
  {
    id: "forest",
    name: "Forêt Enchantée",
    short: "Lettres, nombres et observation",
    requiredStars: 0,
    totalStages: 25,
    maxStars: 75,
    theme: "forest",
    image: "/images/world-card-forest-v3.png",
    background: "/images/gemini-scenes/forest-stage-map-background.png",
    gradient: "linear-gradient(135deg,#78D96B,#37B77B)",
  },
  {
    id: "numbers-city",
    name: "Ville des Nombres",
    short: "Calculs, chiffres et comparaisons",
    requiredStars: 25,
    totalStages: 25,
    maxStars: 75,
    theme: "numbers",
    image: "/images/world-card-city-v3.png",
    background: "/images/world-select-background.png",
    gradient: "linear-gradient(135deg,#42A5F5,#FFB347)",
  },
  {
    id: "letters-island",
    name: "Île des Lettres",
    short: "Alphabet, sons et petits mots",
    requiredStars: 50,
    totalStages: 25,
    maxStars: 75,
    theme: "letters",
    image: "/images/world-card-island-v3.png",
    background: "/images/world-select-background.png",
    gradient: "linear-gradient(135deg,#5CCBFF,#22C7A9)",
  },
  {
    id: "shapes-space",
    name: "Espace des Formes",
    short: "Formes, couleurs et logique",
    requiredStars: 75,
    totalStages: 25,
    maxStars: 75,
    theme: "shapes",
    image: "/images/world-card-space-v3.png",
    background: "/images/mini-game-background.png",
    gradient: "linear-gradient(135deg,#7467F0,#55D6FF)",
  },
  {
    id: "story-kingdom",
    name: "Royaume des Histoires",
    short: "Compréhension et vocabulaire",
    requiredStars: 100,
    totalStages: 25,
    maxStars: 75,
    theme: "stories",
    image: "/images/world-thumbnail-letter-island.png",
    background: "/images/profile-background.png",
    gradient: "linear-gradient(135deg,#FF8DC7,#FFCA5C)",
  },
];

const accessories: Accessory[] = [
  { id: "blue-cap", name: "Casquette bleue", category: "head", rarity: "common", priceCandies: 30, compatibleWith: "all", icon: "🧢" },
  { id: "green-cap", name: "Casquette verte", category: "head", rarity: "common", priceCandies: 30, compatibleWith: "all", icon: "🟢" },
  { id: "bow-star", name: "Boucle étoile", category: "head", rarity: "common", priceCandies: 40, compatibleWith: "girl", icon: "🎀" },
  { id: "round-glasses", name: "Lunettes rondes", category: "head", rarity: "common", priceCandies: 45, compatibleWith: "all", icon: "👓" },
  { id: "explorer-hat", name: "Chapeau explorateur", category: "head", rarity: "rare", priceDiamonds: 5, compatibleWith: "all", icon: "🤠" },
  { id: "magic-backpack", name: "Sac magique", category: "backpack", rarity: "rare", priceDiamonds: 8, compatibleWith: "all", icon: "🎒" },
  { id: "star-cape", name: "Cape étoilée", category: "outfit", rarity: "legendary", priceDiamonds: 15, compatibleWith: "all", icon: "🦸" },
  { id: "sparkle-effect", name: "Effet étoiles", category: "effect", rarity: "legendary", priceDiamonds: 12, compatibleWith: "all", icon: "✨" },
];

const badges: Badge[] = [
  { id: "first-stage", name: "Premier pas", description: "Tu as terminé ton premier stage.", condition: "Termine 1 stage.", icon: "🌟" },
  { id: "super-reader", name: "Super lecteur", description: "Tu progresses en lecture.", condition: "Réussis 10 activités de lecture.", icon: "📖" },
  { id: "numbers-champion", name: "Champion des nombres", description: "Tu maîtrises les nombres.", condition: "Réussis 10 activités de nombres.", icon: "🔢" },
  { id: "forest-explorer", name: "Explorateur de la forêt", description: "Tu as terminé la forêt.", condition: "Complète les 25 stages de la forêt.", icon: "🌳" },
  { id: "perfect-star", name: "Étoile parfaite", description: "Un stage parfait.", condition: "Obtiens 3 étoiles dans un stage.", icon: "⭐" },
  { id: "royal-star", name: "Roi/Reine des étoiles", description: "Une grande collection d'étoiles.", condition: "Gagne 100 étoiles.", icon: "👑" },
];

const words = [
  ["A", "Abeille", "🐝"],
  ["B", "Bateau", "⛵"],
  ["C", "Chat", "🐱"],
  ["D", "Dinosaure", "🦕"],
  ["E", "Étoile", "⭐"],
  ["F", "Fusée", "🚀"],
  ["L", "Lune", "🌙"],
  ["M", "Maison", "🏠"],
  ["S", "Sac", "🎒"],
  ["V", "Vélo", "🚲"],
];

const today = () => new Date().toISOString().slice(0, 10);
const tomorrowTimer = () => {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const diff = Math.max(0, next.getTime() - now.getTime());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${String(m).padStart(2, "0")}`;
};
const dayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
};
const xpToNext = (level: number) => level * 100;
const makeId = () => `p-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const stageId = (worldId: string, n: number) => `${worldId}-${n}`;

function emptyWorldProgress(world: WorldDef, totalStars: number): WorldProgress {
  const unlocked = totalStars >= world.requiredStars;
  const stages: Record<string, StageProgress> = {};
  for (let i = 1; i <= world.totalStages; i += 1) {
    stages[stageId(world.id, i)] = {
      unlocked: unlocked && i === 1,
      completed: false,
      stars: 0,
      bestScore: 0,
      attempts: 0,
    };
  }
  return { unlocked, starsEarned: 0, chestOpened: false, stageChestsOpened: [], stages };
}

function normalizePlayer(player: Player): Player {
  const worldsProgress: Record<string, WorldProgress> = {};
  for (const world of worlds) {
    const existing = player.progression?.worlds?.[world.id];
    worldsProgress[world.id] = existing || emptyWorldProgress(world, player.stars || 0);
    worldsProgress[world.id].unlocked = (player.stars || 0) >= world.requiredStars;
    for (let i = 1; i <= world.totalStages; i += 1) {
      const id = stageId(world.id, i);
      if (!worldsProgress[world.id].stages[id]) {
        worldsProgress[world.id].stages[id] = { unlocked: false, completed: false, stars: 0, bestScore: 0, attempts: 0 };
      }
      if (worldsProgress[world.id].unlocked && i === 1) worldsProgress[world.id].stages[id].unlocked = true;
      if (i > 1 && worldsProgress[world.id].stages[stageId(world.id, i - 1)]?.completed) {
        worldsProgress[world.id].stages[id].unlocked = true;
      }
    }
    worldsProgress[world.id].starsEarned = Object.values(worldsProgress[world.id].stages).reduce((sum, s) => sum + s.stars, 0);
  }
  return {
    ...player,
    diamonds: player.diamonds ?? 0,
    unlockedAccessories: player.unlockedAccessories?.length ? player.unlockedAccessories : ["blue-cap"],
    equippedAccessories: player.equippedAccessories || { head: "blue-cap" },
    progression: {
      worlds: worldsProgress,
      lastWorldId: player.progression?.lastWorldId || "forest",
      lastStageId: player.progression?.lastStageId || "forest-1",
    },
    daily: player.daily || {},
  };
}

function createPlayer(name: string, gender: Gender, faceId: string, outfitColor: string): Player {
  const now = new Date().toISOString();
  return normalizePlayer({
    id: makeId(),
    name,
    gender,
    avatar: { faceId, outfitColor, skinTone: "warm", hairStyle: "soft", hairColor: gender === "girl" ? "brown" : "dark" },
    level: 1,
    xp: 0,
    stars: 0,
    candies: 20,
    diamonds: 0,
    unlockedBadges: [],
    unlockedAccessories: ["blue-cap"],
    equippedAccessories: { head: "blue-cap" },
    progression: { worlds: {}, lastWorldId: "forest", lastStageId: "forest-1" },
    daily: {},
    createdAt: now,
    updatedAt: now,
  });
}

function loadPlayers(): Player[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(PLAYERS_KEY) || "[]").map(normalizePlayer);
  } catch {
    return [];
  }
}

function savePlayers(players: Player[]) {
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players.map(normalizePlayer)));
}

function loadSettings(): Settings {
  if (typeof window === "undefined") return { music: true, sounds: true };
  try {
    return { music: true, sounds: true, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
  } catch {
    return { music: true, sounds: true };
  }
}

function buildQuestions(worldId: string, stageNumber: number, daily = false): Question[] {
  const world = worlds.find((w) => w.id === worldId) || worlds[0];
  const seed = stageNumber + world.id.length + (daily ? 7 : 0);
  const pick = <T,>(items: T[], index: number) => items[index % items.length];
  const number = (seed % 8) + 2;
  const addA = (seed % 5) + 1;
  const addB = ((seed + 2) % 5) + 1;
  const subA = addA + addB + 2;
  const subB = addB;
  const letter = pick(words, Math.max(0, stageNumber - 1));
  const otherWords = words.filter((w) => w[0] !== letter[0]).slice(seed % 3, seed % 3 + 3);
  const common: Question[] = [
    {
      id: `${worldId}-${stageNumber}-letter`,
      kind: "lettres",
      instruction: "Associe la lettre à l'image qui commence par cette lettre.",
      prompt: `Quel mot commence par la lettre ${letter[0]} ?`,
      visual: letter[0],
      options: [letter[1], ...otherWords.map((w) => w[1])].sort(),
      answer: letter[1],
      hint: `${letter[1]} commence par ${letter[0]}.`,
    },
    {
      id: `${worldId}-${stageNumber}-count`,
      kind: "compter",
      instruction: "Compte les objets et choisis le bon nombre.",
      prompt: "Combien vois-tu d'étoiles ?",
      visual: "⭐".repeat(number),
      options: [String(number - 1), String(number), String(number + 1), String(number + 2)],
      answer: String(number),
      hint: "Compte lentement chaque étoile avec ton doigt.",
    },
    {
      id: `${worldId}-${stageNumber}-add`,
      kind: "addition",
      instruction: "Additionne les objets.",
      prompt: `${addA} + ${addB} = ?`,
      visual: `${"🍎".repeat(addA)} + ${"🍎".repeat(addB)}`,
      options: [addA + addB - 1, addA + addB, addA + addB + 1, addA + addB + 2].map(String),
      answer: String(addA + addB),
      hint: "Compte les pommes des deux groupes ensemble.",
    },
    {
      id: `${worldId}-${stageNumber}-sub`,
      kind: "soustraction",
      instruction: "Retire les objets et choisis ce qui reste.",
      prompt: `${subA} - ${subB} = ?`,
      visual: `${"🍬".repeat(subA)} puis on enlève ${subB}`,
      options: [subA - subB - 1, subA - subB, subA - subB + 1, subA - subB + 2].map(String),
      answer: String(subA - subB),
      hint: "Cache les bonbons enlevés, puis compte le reste.",
    },
    {
      id: `${worldId}-${stageNumber}-compare`,
      kind: "comparer",
      instruction: "Choisis le plus grand nombre.",
      prompt: "Quel nombre est le plus grand ?",
      visual: `${number}   ${number + 3}`,
      options: [String(number), String(number + 3), String(number - 1)],
      answer: String(number + 3),
      hint: "Le plus grand est celui qui compte le plus loin.",
    },
    {
      id: `${worldId}-${stageNumber}-shape`,
      kind: "formes",
      instruction: "Observe la forme et la couleur.",
      prompt: "Trouve le cercle bleu.",
      visual: "🔵 🔺 🟨 ⭐",
      options: ["cercle bleu", "triangle rouge", "carré jaune", "étoile"],
      answer: "cercle bleu",
      hint: "Le cercle est tout rond.",
    },
    {
      id: `${worldId}-${stageNumber}-pattern`,
      kind: "suite logique",
      instruction: "Trouve l'élément suivant dans la suite.",
      prompt: "⭐ 🌙 ⭐ 🌙 ?",
      visual: "⭐ 🌙 ⭐ 🌙",
      options: ["⭐", "🌙", "☁️", "🍬"],
      answer: "⭐",
      hint: "La suite alterne étoile, lune, étoile, lune.",
    },
    {
      id: `${worldId}-${stageNumber}-odd`,
      kind: "intrus",
      instruction: "Trouve l'image qui ne va pas avec les autres.",
      prompt: "Quel est l'intrus ?",
      visual: "🐱 🐶 🐰 🚗",
      options: ["chat", "chien", "lapin", "voiture"],
      answer: "voiture",
      hint: "Trois réponses sont des animaux.",
    },
    {
      id: `${worldId}-${stageNumber}-word`,
      kind: "mot-image",
      instruction: "Lis le mot et choisis la bonne image.",
      prompt: "Quel dessin va avec le mot LUNE ?",
      visual: "LUNE",
      options: ["🌙", "🐱", "🚲", "🏠"],
      answer: "🌙",
      hint: "La lune est dans le ciel la nuit.",
    },
    {
      id: `${worldId}-${stageNumber}-story`,
      kind: "histoire",
      instruction: "Lis la petite histoire et réponds.",
      prompt: "Léo voit trois étoiles. Il en trouve deux autres. Combien a-t-il d'étoiles ?",
      visual: "⭐⭐⭐ + ⭐⭐",
      options: ["4", "5", "6"],
      answer: "5",
      hint: "Trois et deux font cinq.",
    },
  ];

  if (world.theme === "numbers") return [common[1], common[2], common[3], common[4], common[9], common[6]];
  if (world.theme === "letters") return [common[0], common[8], common[9], common[7], common[1], common[6]];
  if (world.theme === "shapes") return [common[5], common[6], common[7], common[1], common[4], common[9]];
  if (world.theme === "stories") return [common[9], common[8], common[0], common[7], common[2], common[6]];
  return [common[0], common[1], common[5], common[7], common[2], common[9]];
}

function playerAvatar(player: Player, large = false) {
  return (
    <div className={large ? "avatar avatar-lg" : "avatar"}>
      <img src="/images/profile-boy-avatar.png" alt={player.name} />
    </div>
  );
}

function currency(player: Player) {
  return (
    <div className="currency">
      <span>⭐ {player.stars}</span>
      <span>🍬 {player.candies}</span>
      <span>💎 {player.diamonds}</span>
    </div>
  );
}

function starsFor(score: number, hints: number) {
  if (score >= 90 && hints <= 1) return 3;
  if (score >= 70) return 2;
  return 1;
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({ music: true, sounds: true });
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedWorldId, setSelectedWorldId] = useState("forest");
  const [selectedStageId, setSelectedStageId] = useState("forest-1");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    const loaded = loadPlayers();
    setPlayers(loaded);
    const active = localStorage.getItem(ACTIVE_KEY);
    setActivePlayerId(active && loaded.some((p) => p.id === active) ? active : null);
    setSettings(loadSettings());
    setMounted(true);
  }, []);

  const activePlayer = useMemo(
    () => players.find((p) => p.id === activePlayerId) || null,
    [players, activePlayerId]
  );

  const persistPlayers = (next: Player[], active = activePlayerId) => {
    const normalized = next.map(normalizePlayer);
    setPlayers(normalized);
    savePlayers(normalized);
    if (active) localStorage.setItem(ACTIVE_KEY, active);
    else localStorage.removeItem(ACTIVE_KEY);
  };

  const updateActivePlayer = (updater: (player: Player) => Player) => {
    if (!activePlayer) return;
    const nextPlayer = normalizePlayer({ ...updater(activePlayer), updatedAt: new Date().toISOString() });
    persistPlayers(players.map((p) => (p.id === nextPlayer.id ? nextPlayer : p)), nextPlayer.id);
  };

  const activatePlayer = (id: string) => {
    setActivePlayerId(id);
    localStorage.setItem(ACTIVE_KEY, id);
    setScreen("worlds");
  };

  const goCreate = () => setScreen("create");

  const requirePlayer = (target: Screen, fallback = "Crée ton personnage pour continuer l'aventure !") => {
    if (!activePlayer) {
      setMessage(fallback);
      setScreen("create");
      return false;
    }
    setScreen(target);
    return true;
  };

  const nextStageFor = (player: Player) => {
    for (const world of worlds) {
      const wp = player.progression.worlds[world.id];
      if (!wp.unlocked) continue;
      for (let i = 1; i <= world.totalStages; i += 1) {
        const id = stageId(world.id, i);
        const stage = wp.stages[id];
        if (stage.unlocked && !stage.completed) return { worldId: world.id, id };
      }
    }
    return { worldId: player.progression.lastWorldId, id: player.progression.lastStageId };
  };

  const startStage = (worldId: string, id: string) => {
    setSelectedWorldId(worldId);
    setSelectedStageId(id);
    setScreen("game");
  };

  const completeStage = (correct: number, total: number, hints: number, daily = false) => {
    if (!activePlayer) return;
    const score = Math.round((correct / total) * 100);
    const stars = starsFor(score, hints);
    const xp = stars === 3 ? 35 : stars === 2 ? 20 : 10;
    const candies = daily ? 20 + stars * 5 : stars === 3 ? 15 : stars === 2 ? 10 : 5;
    const diamonds = (daily && score >= 80) || score === 100 ? 1 : 0;
    let replay = false;
    let newBadges: string[] = [];
    let accessory: string | undefined;

    updateActivePlayer((player) => {
      const p = normalizePlayer(structuredClone(player) as Player);
      const worldId = daily ? "forest" : selectedWorldId;
      const sid = daily ? `daily-${today()}` : selectedStageId;
      const wp = p.progression.worlds[worldId];
      if (!daily) {
        const sp = wp.stages[sid];
        const oldStars = sp.stars;
        replay = sp.completed;
        sp.completed = true;
        sp.unlocked = true;
        sp.stars = Math.max(sp.stars, stars);
        sp.bestScore = Math.max(sp.bestScore, score);
        sp.attempts += 1;
        wp.starsEarned += Math.max(0, sp.stars - oldStars);
        p.stars += Math.max(0, sp.stars - oldStars);
        const n = Number(sid.split("-").pop());
        if (n < 25) wp.stages[stageId(worldId, n + 1)].unlocked = true;
        p.progression.lastWorldId = worldId;
        p.progression.lastStageId = n < 25 ? stageId(worldId, n + 1) : sid;
      } else {
        p.daily.lastDailyChallengeDate = today();
      }
      p.xp += replay ? Math.ceil(xp / 3) : xp;
      p.candies += replay ? Math.ceil(candies / 3) : candies;
      p.diamonds += replay ? 0 : diamonds;
      while (p.xp >= xpToNext(p.level)) {
        p.xp -= xpToNext(p.level);
        p.level += 1;
      }
      for (const world of worlds) {
        p.progression.worlds[world.id].unlocked = p.stars >= world.requiredStars;
        if (p.progression.worlds[world.id].unlocked) p.progression.worlds[world.id].stages[stageId(world.id, 1)].unlocked = true;
      }
      const completedCount = worlds.reduce((sum, w) => sum + Object.values(p.progression.worlds[w.id].stages).filter((s) => s.completed).length, 0);
      const numberStars = p.progression.worlds["numbers-city"].starsEarned;
      const readingStars = p.progression.worlds["forest"].starsEarned + p.progression.worlds["letters-island"].starsEarned;
      const unlocks = [
        completedCount >= 1 && "first-stage",
        readingStars >= 20 && "super-reader",
        numberStars >= 20 && "numbers-champion",
        p.progression.worlds.forest.starsEarned >= 75 && "forest-explorer",
        stars === 3 && "perfect-star",
        p.stars >= 100 && "royal-star",
      ].filter(Boolean) as string[];
      for (const badge of unlocks) {
        if (!p.unlockedBadges.includes(badge)) {
          p.unlockedBadges.push(badge);
          newBadges.push(badge);
        }
      }
      if (!replay && score === 100 && !p.unlockedAccessories.includes("sparkle-effect")) {
        p.unlockedAccessories.push("sparkle-effect");
        accessory = "sparkle-effect";
      }
      return p;
    });
    setResult({ worldId: daily ? "forest" : selectedWorldId, stageId: daily ? "daily" : selectedStageId, score, correct, total, hints, stars, xp, candies, diamonds, newBadges, accessory, replay });
    setScreen("result");
  };

  const openDailyChest = () => {
    if (!activePlayer) {
      setMessage("Crée ton personnage pour recevoir des récompenses !");
      setScreen("create");
      return;
    }
    if (activePlayer.daily.lastDailyChestDate === today()) {
      setMessage(`Coffre déjà ouvert. Prochain coffre dans ${tomorrowTimer()}.`);
      return;
    }
    updateActivePlayer((p) => {
      const next = normalizePlayer(structuredClone(p) as Player);
      next.daily.lastDailyChestDate = today();
      next.candies += 25;
      next.diamonds += 1;
      return next;
    });
    setMessage("Coffre bonus ouvert : +25 bonbons et +1 diamant !");
  };

  const openWorldChest = (worldId: string) => {
    if (!activePlayer) return;
    const wp = activePlayer.progression.worlds[worldId];
    if (wp.chestOpened) {
      setMessage("Ce coffre de monde est déjà ouvert.");
      return;
    }
    if (wp.starsEarned < 75) {
      setMessage("Obtiens 75 étoiles dans ce monde pour ouvrir le coffre.");
      return;
    }
    updateActivePlayer((p) => {
      const next = normalizePlayer(structuredClone(p) as Player);
      next.progression.worlds[worldId].chestOpened = true;
      next.candies += 80;
      next.diamonds += 5;
      if (!next.unlockedAccessories.includes("magic-backpack")) next.unlockedAccessories.push("magic-backpack");
      return next;
    });
    setMessage("Coffre de monde ouvert : +80 bonbons, +5 diamants et Sac magique !");
  };

  if (!mounted) return <div className="min-h-screen bg-[#1a0a3e]" />;

  return (
    <PhoneFrame>
      <div className="app-shell">
        {screen === "home" && (
          <Home
            player={activePlayer}
            message={message}
            onClear={() => setMessage("")}
            onPlay={() => {
              if (!activePlayer) return goCreate();
              const next = nextStageFor(activePlayer);
              setSelectedWorldId(next.worldId);
              setScreen("worlds");
            }}
            onDaily={() => {
              if (!activePlayer) {
                setMessage("Crée ton personnage pour jouer au défi du jour !");
                return goCreate();
              }
              if (activePlayer.daily.lastDailyChallengeDate === today()) {
                setMessage(`Défi du jour déjà fait. Prochain défi dans ${tomorrowTimer()}.`);
                return;
              }
              setSelectedWorldId("forest");
              setSelectedStageId(`daily-${today()}`);
              setScreen("game");
            }}
            onChest={openDailyChest}
            onProfile={() => requirePlayer("profile")}
            onSettings={() => setScreen("settings")}
          />
        )}

        {screen === "create" && (
          <CreatePlayer
            message={message}
            hasPlayers={players.length > 0}
            onBack={() => setScreen("home")}
            onPlayers={() => setScreen("players")}
            onCreate={(name, gender, faceId, outfitColor) => {
              const p = createPlayer(name, gender, faceId, outfitColor);
              const next = [...players, p];
              setActivePlayerId(p.id);
              persistPlayers(next, p.id);
              setMessage("");
              setScreen("worlds");
            }}
          />
        )}

        {screen === "players" && (
          <PlayersScreen
            players={players}
            activeId={activePlayerId}
            onBack={() => setScreen("home")}
            onNew={() => setScreen("create")}
            onSelect={activatePlayer}
            onDelete={(id) => {
              if (!confirm("Supprimer ce joueur définitivement ?")) return;
              const next = players.filter((p) => p.id !== id);
              const nextActive = activePlayerId === id ? null : activePlayerId;
              setActivePlayerId(nextActive);
              persistPlayers(next, nextActive);
              if (!next.length) setScreen("home");
            }}
          />
        )}

        {screen === "worlds" && activePlayer && (
          <Worlds
            player={activePlayer}
            message={message}
            onClear={() => setMessage("")}
            onHome={() => setScreen("home")}
            onWorld={(world) => {
              if (!activePlayer.progression.worlds[world.id].unlocked) {
                setMessage(`Encore ${world.requiredStars - activePlayer.stars} étoiles pour débloquer ${world.name}.`);
                return;
              }
              setSelectedWorldId(world.id);
              setScreen("worldMap");
            }}
            onNav={setScreen}
          />
        )}

        {screen === "worlds" && !activePlayer && <Gate onCreate={() => setScreen("create")} />}

        {screen === "worldMap" && activePlayer && (
          <WorldMap
            player={activePlayer}
            world={worlds.find((w) => w.id === selectedWorldId) || worlds[0]}
            onBack={() => setScreen("worlds")}
            onStage={(id) => startStage(selectedWorldId, id)}
            onLocked={() => setMessage("Termine le stage précédent pour débloquer celui-ci.")}
            onChest={() => openWorldChest(selectedWorldId)}
            message={message}
            onClear={() => setMessage("")}
          />
        )}

        {screen === "game" && activePlayer && (
          <Game
            player={activePlayer}
            world={worlds.find((w) => w.id === selectedWorldId) || worlds[0]}
            stageId={selectedStageId}
            onBack={() => setScreen(selectedStageId.startsWith("daily") ? "home" : "worldMap")}
            onDone={(correct, total, hints) => completeStage(correct, total, hints, selectedStageId.startsWith("daily"))}
          />
        )}

        {screen === "result" && activePlayer && result && (
          <ResultScreen
            player={activePlayer}
            result={result}
            onContinue={() => {
              const nextNumber = Number(result.stageId.split("-").pop()) + 1;
              if (result.stageId === "daily" || nextNumber > 25) return setScreen("worldMap");
              startStage(result.worldId, stageId(result.worldId, nextNumber));
            }}
            onReplay={() => startStage(result.worldId, result.stageId === "daily" ? `daily-${today()}` : result.stageId)}
            onMap={() => setScreen(result.stageId === "daily" ? "home" : "worldMap")}
            onProfile={() => setScreen("profile")}
          />
        )}

        {screen === "rewards" && activePlayer && (
          <Rewards
            player={activePlayer}
            message={message}
            onClear={() => setMessage("")}
            onNav={setScreen}
            onOpenDaily={openDailyChest}
            onOpenWorld={openWorldChest}
            onBuy={(acc) => {
              updateActivePlayer((p) => {
                const next = normalizePlayer(structuredClone(p) as Player);
                if (next.unlockedAccessories.includes(acc.id)) return next;
                if (acc.priceCandies && next.candies >= acc.priceCandies) {
                  next.candies -= acc.priceCandies;
                  next.unlockedAccessories.push(acc.id);
                  setMessage(`${acc.name} acheté !`);
                } else if (acc.priceDiamonds && next.diamonds >= acc.priceDiamonds) {
                  next.diamonds -= acc.priceDiamonds;
                  next.unlockedAccessories.push(acc.id);
                  setMessage(`${acc.name} acheté !`);
                } else {
                  setMessage("Pas assez de monnaie pour cet accessoire.");
                }
                return next;
              });
            }}
            onEquip={(acc) => updateActivePlayer((p) => {
              const next = normalizePlayer(structuredClone(p) as Player);
              if (!next.unlockedAccessories.includes(acc.id)) return next;
              next.equippedAccessories[acc.category] = next.equippedAccessories[acc.category] === acc.id ? undefined : acc.id;
              return next;
            })}
          />
        )}

        {screen === "profile" && activePlayer && (
          <Profile
            player={activePlayer}
            onNav={setScreen}
            onEditName={() => {
              const name = prompt("Nouveau prénom", activePlayer.name)?.trim();
              if (name) updateActivePlayer((p) => ({ ...p, name }));
            }}
            onEditAvatar={() => updateActivePlayer((p) => ({
              ...p,
              avatar: {
                ...p.avatar,
                faceId: p.avatar.faceId === "smile" ? "happy" : p.avatar.faceId === "happy" ? "curious" : "smile",
                outfitColor: p.avatar.outfitColor === "green" ? "blue" : p.avatar.outfitColor === "blue" ? "pink" : "green",
              },
            }))}
            onSwitchGender={() => updateActivePlayer((p) => ({ ...p, gender: p.gender === "boy" ? "girl" : "boy" }))}
            onPlayers={() => setScreen("players")}
            onLogout={() => {
              setActivePlayerId(null);
              localStorage.removeItem(ACTIVE_KEY);
              setScreen("home");
            }}
            onDelete={() => {
              if (!confirm("Supprimer ce joueur définitivement ?")) return;
              const next = players.filter((p) => p.id !== activePlayer.id);
              setActivePlayerId(null);
              persistPlayers(next, null);
              setScreen("home");
            }}
          />
        )}

        {screen === "profile" && !activePlayer && <Gate onCreate={() => setScreen("create")} />}

        {screen === "settings" && (
          <SettingsScreen
            settings={settings}
            confirmText={confirmText}
            onConfirm={setConfirmText}
            onBack={() => setScreen("home")}
            onToggle={(key) => {
              const next = { ...settings, [key]: !settings[key] };
              setSettings(next);
              localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
            }}
            onResetActive={() => {
              if (!activePlayer || confirmText !== "7") return setMessage("Portail parent : réponds 3 + 4 = 7.");
              updateActivePlayer((p) => {
                const reset = createPlayer(p.name, p.gender, p.avatar.faceId, p.avatar.outfitColor || "green");
                return { ...reset, id: p.id, createdAt: p.createdAt };
              });
              setMessage("Progression du joueur réinitialisée.");
            }}
            onDeleteAll={() => {
              if (confirmText !== "7") return setMessage("Portail parent : réponds 3 + 4 = 7.");
              setPlayers([]);
              setActivePlayerId(null);
              localStorage.removeItem(PLAYERS_KEY);
              localStorage.removeItem(ACTIVE_KEY);
              setScreen("home");
            }}
            message={message}
            onClear={() => setMessage("")}
          />
        )}

        <style jsx global>{styles}</style>
      </div>
    </PhoneFrame>
  );
}

function Home(props: {
  player: Player | null;
  message: string;
  onClear: () => void;
  onPlay: () => void;
  onDaily: () => void;
  onChest: () => void;
  onProfile: () => void;
  onSettings: () => void;
}) {
  return (
    <div className="screen home-screen">
      <img src="/images/home-background.png" alt="" className="bg" />
      {props.player && (
        <button className="player-chip" onClick={props.onProfile}>
          {playerAvatar(props.player)}
          <span>{props.player.name}</span>
          <b>Niv. {props.player.level}</b>
        </button>
      )}
      <button className="gear" onClick={props.onSettings}>⚙️</button>
      <img src="/images/app-logo-lilo-noa.png" alt="Lilo & Noa" className="home-logo" />
      <img src="/images/gemini-transparent/lilo-mascot-transparent.png" alt="Mascotte Lilo" className="home-mascot" />
      <button className="play-button" onClick={props.onPlay}>JOUER ▶</button>
      <div className="home-actions">
        <button onClick={props.onDaily}>
          <img src="/images/gemini-transparent/daily-star-transparent.png" alt="" />
          <b>⭐ Défi du jour</b>
          <small>{props.player?.daily.lastDailyChallengeDate === today() ? `Dans ${tomorrowTimer()}` : props.player ? "Un mini-défi rapide" : "Crée ton personnage"}</small>
          <span>JOUER</span>
        </button>
        <button onClick={props.onChest}>
          <img src="/images/gemini-transparent/bonus-chest-transparent.png" alt="" />
          <b>🎁 Coffre bonus</b>
          <small>{props.player?.daily.lastDailyChestDate === today() ? `Dans ${tomorrowTimer()}` : props.player ? "Ouvre ton coffre gratuit" : "Crée ton personnage"}</small>
          <span>OUVRIR</span>
        </button>
      </div>
      {props.message && <Toast text={props.message} onClose={props.onClear} />}
    </div>
  );
}

function CreatePlayer(props: {
  message: string;
  hasPlayers: boolean;
  onBack: () => void;
  onPlayers: () => void;
  onCreate: (name: string, gender: Gender, faceId: string, outfitColor: string) => void;
}) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("girl");
  const [faceId, setFaceId] = useState("smile");
  const [outfitColor, setOutfitColor] = useState("green");
  const [error, setError] = useState("");

  return (
    <div className="screen panel-screen">
      <img src="/images/world-select-background.png" alt="" className="bg" />
      <TopBack title="Créer ton personnage" onBack={props.onBack} />
      <div className="scroll">
        {props.message && <div className="notice">{props.message}</div>}
        <div className="kid-panel center">
          {playerAvatar(createPlayer(name || "Ami", gender, faceId, outfitColor), true)}
          <input className="name-input" placeholder="Ton prénom" value={name} onChange={(e) => setName(e.target.value)} maxLength={14} />
          <div className="segmented">
            <button className={gender === "girl" ? "active" : ""} onClick={() => setGender("girl")}>Fille</button>
            <button className={gender === "boy" ? "active" : ""} onClick={() => setGender("boy")}>Garçon</button>
          </div>
          <div className="avatar-grid">
            {["smile", "happy", "curious"].map((id) => (
              <button key={id} className={faceId === id ? "picked" : ""} onClick={() => setFaceId(id)}>{id === "smile" ? "😊" : id === "happy" ? "😄" : "🤔"}</button>
            ))}
          </div>
          <div className="swatches">
            {["green", "blue", "pink", "orange"].map((c) => (
              <button key={c} className={outfitColor === c ? "picked" : ""} onClick={() => setOutfitColor(c)} style={{ background: c }} />
            ))}
          </div>
          {error && <div className="error">{error}</div>}
          <button className="primary" onClick={() => {
            if (!name.trim()) return setError("Entre ton prénom pour commencer.");
            props.onCreate(name.trim(), gender, faceId, outfitColor);
          }}>Commencer l'aventure</button>
          {props.hasPlayers && <button className="secondary" onClick={props.onPlayers}>Choisir un joueur</button>}
        </div>
      </div>
    </div>
  );
}

function PlayersScreen(props: {
  players: Player[];
  activeId: string | null;
  onBack: () => void;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="screen panel-screen">
      <img src="/images/profile-background.png" alt="" className="bg" />
      <TopBack title="Choisir un joueur" onBack={props.onBack} />
      <div className="scroll">
        {props.players.map((player) => (
          <div className="kid-panel player-card" key={player.id}>
            {playerAvatar(player)}
            <div>
              <h3>{player.name}</h3>
              <p>Niveau {player.level} • ⭐ {player.stars}</p>
            </div>
            <button className="small-primary" onClick={() => props.onSelect(player.id)}>Jouer</button>
            <button className="danger-mini" onClick={() => props.onDelete(player.id)}>Supprimer</button>
          </div>
        ))}
        <button className="primary wide" onClick={props.onNew}>Nouveau personnage</button>
      </div>
    </div>
  );
}

function Worlds(props: {
  player: Player;
  message: string;
  onClear: () => void;
  onHome: () => void;
  onWorld: (world: WorldDef) => void;
  onNav: (screen: Screen) => void;
}) {
  return (
    <div className="screen internal-screen">
      <img src="/images/world-select-background.png" alt="" className="bg" />
      <Header player={props.player} title="Mondes" onHome={props.onHome} />
      <div className="worlds-panel scroll nav-space">
        <h2>Choisis ton monde</h2>
        {worlds.map((world) => {
          const wp = props.player.progression.worlds[world.id];
          const missing = Math.max(0, world.requiredStars - props.player.stars);
          return (
            <button key={world.id} className={`world-card ${wp.unlocked ? "" : "locked"}`} onClick={() => props.onWorld(world)}>
              <img src={world.image} alt="" />
              <div>
                <h3>{world.name}</h3>
                <p>{world.short}</p>
                <b>⭐ {wp.starsEarned}/{world.maxStars}</b>
                {!wp.unlocked && <span>🔒 Encore {missing} étoiles</span>}
              </div>
            </button>
          );
        })}
      </div>
      <Bottom onNav={props.onNav} active="worlds" />
      {props.message && <Toast text={props.message} onClose={props.onClear} />}
    </div>
  );
}

function WorldMap(props: {
  player: Player;
  world: WorldDef;
  onBack: () => void;
  onStage: (id: string) => void;
  onLocked: () => void;
  onChest: () => void;
  message: string;
  onClear: () => void;
}) {
  const wp = props.player.progression.worlds[props.world.id];
  const positions = [
    [66, 86], [53, 154], [38, 222], [52, 290], [35, 358], [49, 426], [64, 494], [45, 562], [61, 630], [72, 698],
    [54, 766], [38, 834], [51, 902], [66, 970], [46, 1038], [34, 1106], [50, 1174], [64, 1242], [47, 1310], [35, 1378],
    [52, 1446], [67, 1514], [48, 1582], [36, 1650], [52, 1718],
  ];
  return (
    <div className="screen map-screen">
      <img src={props.world.background} alt="" className="bg" />
      <TopBack title={props.world.name} onBack={props.onBack} right={`⭐ ${wp.starsEarned}/75`} />
      <div className="map-scroll">
      <div className="stage-path">
        {Array.from({ length: 25 }, (_, i) => {
          const n = i + 1;
          const id = stageId(props.world.id, n);
          const sp = wp.stages[id];
          return (
            <button
              key={id}
              className={`stage-dot ${sp.completed ? "done" : ""} ${sp.unlocked ? "" : "locked"} ${sp.unlocked && !sp.completed ? "current" : ""}`}
              style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}px` }}
              onClick={() => sp.unlocked ? props.onStage(id) : props.onLocked()}
            >
              <span>{sp.unlocked ? n : "🔒"}</span>
              {sp.completed && <small>{"★".repeat(sp.stars)}</small>}
            </button>
          );
        })}
        <button className={`world-chest ${wp.starsEarned >= 75 && !wp.chestOpened ? "ready" : ""}`} onClick={props.onChest}>
          <span>Récompense du monde</span>
          <b>{wp.chestOpened ? "🎁 Ouvert" : "🧰"}</b>
          <small>Obtiens 75 ⭐ pour ouvrir</small>
          <em>{wp.starsEarned}/75</em>
        </button>
      </div>
      </div>
      {props.message && <Toast text={props.message} onClose={props.onClear} />}
    </div>
  );
}

function Game(props: {
  player: Player;
  world: WorldDef;
  stageId: string;
  onBack: () => void;
  onDone: (correct: number, total: number, hints: number) => void;
}) {
  const stageNumber = props.stageId.startsWith("daily") ? dayOfYear() : Number(props.stageId.split("-").pop()) || 1;
  const questions = useMemo(() => buildQuestions(props.world.id, stageNumber, props.stageId.startsWith("daily")), [props.world.id, stageNumber, props.stageId]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [hints, setHints] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const q = questions[index];
  const isLetterMatch = q.kind === "lettres";
  const letterRows = [
    { letter: "A", label: "Abeille", image: "🐝" },
    { letter: "B", label: "Bateau", image: "⛵" },
    { letter: "C", label: "Chat", image: "🐱" },
  ];

  const choose = (answer: string) => {
    if (feedback) return;
    setSelected(answer);
    const ok = answer === q.answer;
    if (ok) setCorrect((c) => c + 1);
    setFeedback(ok ? "Bravo !" : `Essaie encore. Réponse : ${q.answer}`);
    setTimeout(() => {
      if (index + 1 >= questions.length) props.onDone(correct + (ok ? 1 : 0), questions.length, hints);
      else {
        setIndex(index + 1);
        setSelected("");
        setFeedback("");
      }
    }, 850);
  };

  return (
    <div className="screen game-screen">
      <img src="/images/mini-game-background.png" alt="" className="bg" />
      <TopBack title={props.stageId.startsWith("daily") ? "Défi du jour" : `Stage ${stageNumber}`} onBack={props.onBack} right={`${index + 1}/${questions.length}`} />
      <div className="game-card">
        <div className="instruction">{q.instruction}</div>
        {isLetterMatch ? (
          <div className="letter-match">
            <div className="letter-column">
              {letterRows.map((row) => (
                <button key={row.letter} className={row.letter === q.visual ? "active" : ""} onClick={() => setFeedback(q.hint)}>
                  {row.letter}
                </button>
              ))}
            </div>
            <div className="connector">⋯→</div>
            <div className="image-column">
              {letterRows.map((row) => (
                <button key={row.label} className={selected === row.label ? "selected" : ""} onClick={() => choose(row.label)}>
                  <span>{row.image}</span>
                  <small>{row.label}</small>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="prompt">{q.prompt}</div>
            <div className="visual">{q.visual}</div>
            <div className="answers">
              {q.options.map((option) => (
                <button key={option} className={selected === option ? "selected" : ""} onClick={() => choose(option)}>{option}</button>
              ))}
            </div>
          </>
        )}
        <div className="game-footer">
          <button className="hint" onClick={() => { setHints((h) => h + 1); setFeedback(q.hint); setTimeout(() => setFeedback(""), 1400); }}>💡 Indice</button>
          <span>{feedback}</span>
        </div>
        <div className="game-progress">
          <img src="/images/mini-game-star-icon.png" alt="" />
          <div><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
          <b>{index + 1}/{questions.length}</b>
        </div>
      </div>
    </div>
  );
}

function ResultScreen(props: {
  player: Player;
  result: Result;
  onContinue: () => void;
  onReplay: () => void;
  onMap: () => void;
  onProfile: () => void;
}) {
  const badgeNames = props.result.newBadges.map((id) => badges.find((b) => b.id === id)?.name).filter(Boolean).join(", ");
  return (
    <div className="screen panel-screen">
      <img src="/images/mini-game-background.png" alt="" className="bg" />
      <div className="result-card">
        <h1>Bravo {props.player.name} !</h1>
        <div className="big-stars">{"★".repeat(props.result.stars)}{"☆".repeat(3 - props.result.stars)}</div>
        <p>Score {props.result.score}% • {props.result.correct}/{props.result.total}</p>
        <div className="reward-line">+{props.result.xp} XP • +{props.result.candies} 🍬 • +{props.result.diamonds} 💎</div>
        {props.result.replay && <p className="notice">Replay : les récompenses sont réduites, les étoiles ne doublent pas.</p>}
        {badgeNames && <p className="notice">Nouveau badge : {badgeNames}</p>}
        {props.result.accessory && <p className="notice">Accessoire gagné : Effet étoiles</p>}
        <button className="primary" onClick={props.onContinue}>Continuer</button>
        <button className="secondary" onClick={props.onReplay}>Rejouer</button>
        <button className="secondary" onClick={props.onMap}>Retour à la carte</button>
        <button className="secondary" onClick={props.onProfile}>Voir profil</button>
      </div>
    </div>
  );
}

function Rewards(props: {
  player: Player;
  message: string;
  onClear: () => void;
  onNav: (screen: Screen) => void;
  onOpenDaily: () => void;
  onOpenWorld: (worldId: string) => void;
  onBuy: (acc: Accessory) => void;
  onEquip: (acc: Accessory) => void;
}) {
  return (
    <div className="screen internal-screen">
      <img src="/images/profile-background.png" alt="" className="bg" />
      <Header player={props.player} title="Récompenses" />
      <div className="scroll nav-space">
        <section className="kid-panel">
          <h3>Coffres</h3>
          <button className="reward-row" onClick={props.onOpenDaily}>🎁 Coffre quotidien <span>25 🍬 + chance 💎</span></button>
          {worlds.map((w) => <button key={w.id} className="reward-row" onClick={() => props.onOpenWorld(w.id)}>🧰 {w.name} <span>{props.player.progression.worlds[w.id].starsEarned}/75 ⭐</span></button>)}
        </section>
        <section className="kid-panel">
          <h3>Boutique d'accessoires</h3>
          <div className="shop-grid">
            {accessories.map((acc) => {
              const owned = props.player.unlockedAccessories.includes(acc.id);
              const compatible = acc.compatibleWith === "all" || acc.compatibleWith === props.player.gender;
              return (
                <div key={acc.id} className="shop-item">
                  <b>{acc.icon}</b><span>{acc.name}</span><small>{acc.rarity}</small>
                  <button onClick={() => owned ? props.onEquip(acc) : props.onBuy(acc)} disabled={!compatible}>
                    {!compatible ? "Non équipable" : owned ? (props.player.equippedAccessories[acc.category] === acc.id ? "Retirer" : "Équiper") : acc.priceCandies ? `${acc.priceCandies} 🍬` : `${acc.priceDiamonds} 💎`}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
        <section className="kid-panel">
          <h3>Badges</h3>
          {badges.map((badge) => (
            <div key={badge.id} className="badge-row">
              <b>{props.player.unlockedBadges.includes(badge.id) ? badge.icon : "🔒"}</b>
              <span>{badge.name}<small>{badge.condition}</small></span>
            </div>
          ))}
        </section>
      </div>
      <Bottom onNav={props.onNav} active="rewards" />
      {props.message && <Toast text={props.message} onClose={props.onClear} />}
    </div>
  );
}

function Profile(props: {
  player: Player;
  onNav: (screen: Screen) => void;
  onEditName: () => void;
  onEditAvatar: () => void;
  onSwitchGender: () => void;
  onPlayers: () => void;
  onLogout: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="screen internal-screen">
      <img src="/images/profile-background.png" alt="" className="bg" />
      <Header player={props.player} title="Profil" />
      <div className="scroll nav-space">
        <section className="kid-panel center profile-main">
          {playerAvatar(props.player, true)}
          <h2>{props.player.name}</h2>
          <p>Niveau {props.player.level} • XP {props.player.xp}/{xpToNext(props.player.level)}</p>
          {currency(props.player)}
          <div className="profile-actions">
            <button onClick={props.onEditName}>Modifier prénom</button>
            <button onClick={props.onEditAvatar}>Modifier avatar</button>
            <button onClick={props.onSwitchGender}>Changer garçon/fille</button>
            <button onClick={() => props.onNav("rewards")}>Voir récompenses</button>
            <button onClick={props.onPlayers}>Changer de joueur</button>
            <button onClick={props.onLogout}>Déconnecter</button>
            <button className="danger" onClick={props.onDelete}>Supprimer ce joueur</button>
          </div>
        </section>
        <section className="kid-panel">
          <h3>Progression par monde</h3>
          {worlds.map((w) => <div className="progress-row" key={w.id}><span>{w.name}</span><b>{props.player.progression.worlds[w.id].starsEarned}/75 ⭐</b></div>)}
        </section>
        <section className="kid-panel">
          <h3>À quoi ça sert ?</h3>
          <p>Étoiles : débloquent de nouveaux mondes et coffres.</p>
          <p>Bonbons : achètent des accessoires pour ton avatar.</p>
          <p>Diamants : achètent des accessoires rares.</p>
          <p>XP : fait monter ton niveau.</p>
          <p>Badges : montrent tes réussites.</p>
        </section>
      </div>
      <Bottom onNav={props.onNav} active="profile" />
    </div>
  );
}

function SettingsScreen(props: {
  settings: Settings;
  confirmText: string;
  message: string;
  onClear: () => void;
  onConfirm: (value: string) => void;
  onBack: () => void;
  onToggle: (key: keyof Settings) => void;
  onResetActive: () => void;
  onDeleteAll: () => void;
}) {
  return (
    <div className="screen panel-screen">
      <img src="/images/home-background.png" alt="" className="bg" />
      <TopBack title="Paramètres parent" onBack={props.onBack} />
      <div className="scroll">
        <section className="kid-panel">
          <label className="toggle"><span>Musique</span><button onClick={() => props.onToggle("music")}>{props.settings.music ? "ON" : "OFF"}</button></label>
          <label className="toggle"><span>Sons</span><button onClick={() => props.onToggle("sounds")}>{props.settings.sounds ? "ON" : "OFF"}</button></label>
          <div className="notice">Portail parent : 3 + 4 = ?</div>
          <input className="name-input" value={props.confirmText} onChange={(e) => props.onConfirm(e.target.value)} placeholder="Réponse" />
          <button className="secondary" onClick={props.onResetActive}>Réinitialiser joueur actif</button>
          <button className="danger wide" onClick={props.onDeleteAll}>Supprimer tous les joueurs</button>
          <p className="tiny">Données locales : localStorage liloNoa.players, liloNoa.activePlayerId, liloNoa.settings.</p>
        </section>
      </div>
      {props.message && <Toast text={props.message} onClose={props.onClear} />}
    </div>
  );
}

function Header({ player, title, onHome }: { player: Player; title: string; onHome?: () => void }) {
  return (
    <div className="header">
      {onHome ? <button onClick={onHome}>⌂</button> : <span />}
      <h1>{title}</h1>
      <div>{playerAvatar(player)} {currency(player)}</div>
    </div>
  );
}

function TopBack({ title, onBack, right }: { title: string; onBack: () => void; right?: string }) {
  return <div className="topbar"><button onClick={onBack}>←</button><h1>{title}</h1><b>{right}</b></div>;
}

function Bottom({ onNav, active }: { onNav: (screen: Screen) => void; active: "worlds" | "rewards" | "profile" }) {
  return (
    <div className="bottom-nav">
      <button onClick={() => onNav("home")}>⌂<span>Accueil</span></button>
      <button className={active === "worlds" ? "active" : ""} onClick={() => onNav("worlds")}>🗺️<span>Mondes</span></button>
      <button className={active === "rewards" ? "active" : ""} onClick={() => onNav("rewards")}>🎁<span>Récompenses</span></button>
      <button className={active === "profile" ? "active" : ""} onClick={() => onNav("profile")}>👤<span>Profil</span></button>
    </div>
  );
}

function Gate({ onCreate }: { onCreate: () => void }) {
  return <div className="screen panel-screen"><img src="/images/home-background.png" alt="" className="bg" /><div className="result-card"><h2>Aucun joueur actif</h2><button className="primary" onClick={onCreate}>Créer ton personnage</button></div></div>;
}

function Toast({ text, onClose }: { text: string; onClose: () => void }) {
  return <button className="toast" onClick={onClose}>{text}</button>;
}

const styles = `
.app-shell,.screen{position:relative;width:100%;height:100%;overflow:hidden;color:#243044}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.screen::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,0) 34%,rgba(54,120,48,.10))}
button{font-family:inherit;cursor:pointer}
.scroll{position:relative;z-index:2;height:100%;overflow-y:auto;padding:92px 16px 24px}
.nav-space{padding-bottom:92px}
.home-logo{position:absolute;z-index:2;left:8%;top:13.5%;width:84%;filter:drop-shadow(0 6px 14px rgba(0,0,0,.18))}
.home-mascot{position:absolute;z-index:1;left:43%;bottom:30%;height:43%;transform:translateX(-50%);object-fit:contain;filter:drop-shadow(0 8px 18px rgba(0,0,0,.24))}
.play-button,.primary{border:4px solid rgba(255,255,255,.9);border-radius:34px;background:linear-gradient(#9FE64C,#70C638 58%,#56A82E);box-shadow:0 7px 0 #3F8429,0 14px 24px rgba(0,0,0,.24),inset 0 2px 0 rgba(255,255,255,.45);color:white;font-weight:900;font-size:25px;padding:15px 28px;text-shadow:0 2px 0 rgba(0,0,0,.12)}
.play-button{position:absolute;z-index:3;left:12%;right:12%;bottom:28.5%;min-height:74px}
.home-actions{position:absolute;z-index:4;left:18px;right:18px;bottom:18px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.home-actions button{min-height:142px;border:4px solid rgba(255,255,255,.98);border-radius:22px;background:linear-gradient(180deg,rgba(255,255,255,.97),rgba(247,242,255,.94));box-shadow:0 7px 18px rgba(0,0,0,.2),inset 0 2px 0 rgba(255,255,255,.9);font-weight:900;color:#253874;padding:12px 8px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;text-align:center}
.home-actions img{width:42px;height:42px;object-fit:contain;margin-top:-2px;filter:drop-shadow(0 3px 4px rgba(0,0,0,.12))}
.home-actions b{font-size:14px}.home-actions small{font-size:10px;line-height:1.15;color:#374874}.home-actions span{border-radius:18px;background:linear-gradient(#8B65F3,#7147D5);color:white;padding:7px 16px;font-size:13px;box-shadow:0 4px 0 #5231A9}
.secondary,.small-primary,.reward-row,.profile-actions button{border:2px solid rgba(255,255,255,.75);border-radius:20px;background:rgba(255,255,255,.92);box-shadow:0 4px 12px rgba(0,0,0,.14);font-weight:900;color:#31506d;padding:12px}
.gear{position:absolute;z-index:5;right:18px;top:24px;width:50px;height:50px;border-radius:50%;border:3px solid white;background:linear-gradient(#8C65F2,#6547D9);font-size:22px;box-shadow:0 4px 14px rgba(0,0,0,.2);color:white}
.player-chip{position:absolute;z-index:5;left:14px;top:22px;display:flex;align-items:center;gap:6px;border:3px solid white;border-radius:26px;background:rgba(255,255,255,.9);padding:4px 10px 4px 4px;box-shadow:0 4px 14px rgba(0,0,0,.16);font-weight:900}
.player-chip b{font-size:11px;color:#4b7ccc}
.avatar{position:relative;width:46px;height:46px;border-radius:50%;background:linear-gradient(#fff,#dff4ff);border:3px solid white;display:inline-flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 3px 10px rgba(0,0,0,.15);flex:0 0 auto;overflow:hidden}
.avatar img{width:100%;height:100%;object-fit:cover;display:block}
.avatar-lg{width:118px;height:118px;font-size:62px;margin:auto}
.topbar,.header{position:absolute;z-index:10;left:0;right:0;top:0;display:flex;align-items:center;justify-content:space-between;padding:28px 14px 10px}
.topbar h1,.header h1{font-size:19px;font-weight:900;color:white;text-shadow:0 2px 8px rgba(0,0,0,.35);text-align:center}
.topbar button,.header button{width:48px;height:48px;border-radius:50%;border:4px solid white;background:linear-gradient(#A7E13D,#5CAC2E);font-size:24px;font-weight:900;box-shadow:0 4px 0 #3f8429,0 6px 14px rgba(0,0,0,.18);color:white}
.topbar b{min-width:44px;color:white;text-shadow:0 2px 8px rgba(0,0,0,.35)}
.header>div{display:flex;align-items:center;gap:4px}.currency{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}.currency span{background:rgba(255,255,255,.94);border-radius:16px;padding:4px 7px;font-size:12px;font-weight:900;box-shadow:0 2px 8px rgba(0,0,0,.1)}
.kid-panel,.result-card,.game-card{position:relative;background:rgba(255,255,255,.94);border:4px solid rgba(255,255,255,.9);border-radius:24px;box-shadow:0 8px 26px rgba(0,0,0,.16),inset 0 2px 0 rgba(255,255,255,.9);padding:16px;margin-bottom:14px}
.center{text-align:center}.notice{background:#EAF7FF;border-radius:16px;padding:10px;margin:8px 0;font-weight:800;color:#3370a6}.error{color:#d94168;font-weight:900}.tiny{font-size:12px;color:#607084;font-weight:700}
.name-input{width:100%;border:3px solid #cde8ff;border-radius:18px;padding:12px 14px;font-size:18px;font-weight:900;margin:10px 0;color:#243044;background:white}
.segmented,.avatar-grid,.swatches{display:flex;gap:8px;justify-content:center;margin:10px 0}.segmented button,.avatar-grid button{border:2px solid #cde8ff;border-radius:18px;background:white;padding:10px 16px;font-weight:900}.segmented .active,.avatar-grid .picked,.swatches .picked{outline:4px solid #FFD84D}
.swatches button{width:38px;height:38px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.16)}
.wide{width:100%;margin-top:10px}.danger,.danger-mini{background:#ffe2e8!important;color:#c3284b!important}.danger-mini{border:0;border-radius:12px;padding:8px;font-weight:900}
.player-card{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px}.player-card h3{font-size:20px;font-weight:900}.player-card p{font-weight:800;color:#607084}.player-card .danger-mini{grid-column:3}
.worlds-panel{padding-top:122px;background:linear-gradient(180deg,rgba(0,119,214,.78),rgba(0,73,148,.62));border:4px solid rgba(255,255,255,.75);border-radius:28px;margin:52px 8px 0;height:calc(100% - 62px);box-shadow:inset 0 2px 12px rgba(255,255,255,.28),0 8px 22px rgba(0,0,0,.18)}
.worlds-panel h2{position:absolute;z-index:4;top:74px;left:0;right:0;text-align:center;color:white;font-size:26px;font-weight:900;text-shadow:0 3px 7px rgba(0,0,0,.35)}
.world-card{width:100%;min-height:96px;display:block;text-align:left;border:4px solid white;border-radius:22px;background:#0a62a9;box-shadow:0 7px 18px rgba(0,0,0,.26),inset 0 0 18px rgba(255,255,255,.2);padding:0;margin-bottom:12px;color:white;overflow:hidden;position:relative}.world-card::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.1),rgba(0,40,90,.62));z-index:1}.world-card::after{content:"➜";position:absolute;right:12px;top:50%;transform:translateY(-50%);z-index:3;width:42px;height:42px;border-radius:50%;background:linear-gradient(#A6E64D,#62B735);border:3px solid white;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 0 #3F8429;font-size:25px}.world-card.locked::after{content:"🔒";background:linear-gradient(#e6edf4,#aeb8c6);box-shadow:0 4px 0 #7c8795;font-size:18px}.world-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(1.18)}.world-card div{position:relative;z-index:2;padding:18px 58px 12px 76px;min-height:96px}.world-card h3{font-size:22px;font-weight:900;text-shadow:0 2px 5px rgba(0,0,0,.45);line-height:1.05}.world-card p{font-size:0;height:0;overflow:hidden}.world-card span{display:block;margin-top:5px;font-size:12px;font-weight:900;color:white;text-shadow:0 1px 4px rgba(0,0,0,.65)}.world-card b{display:block;color:white;text-shadow:0 2px 5px rgba(0,0,0,.7);font-size:17px;margin-top:5px}.world-card b::first-letter{color:#FFD84D}.world-card.locked{filter:saturate(.75);opacity:.86}
.map-scroll{position:relative;z-index:2;height:100%;overflow-y:auto;padding-bottom:170px}
.stage-path{position:relative;z-index:2;height:1900px;margin-top:82px;padding-bottom:220px}.stage-dot{position:absolute;width:64px;height:64px;transform:translateX(-50%);border-radius:50%;border:5px solid white;background:linear-gradient(#86D23B,#3D8625);box-shadow:0 6px 0 #2f6d1f,0 8px 18px rgba(0,0,0,.28),inset 0 2px 0 rgba(255,255,255,.5);font-weight:900;color:white}.stage-dot span{display:block;font-size:21px;text-shadow:0 2px 5px rgba(0,0,0,.35)}.stage-dot small{display:block;color:#FFD84D;font-size:11px;text-shadow:0 1px 3px rgba(0,0,0,.45)}.stage-dot.done{background:linear-gradient(#A3E34B,#64B730);box-shadow:0 6px 0 #3F8429,0 8px 18px rgba(0,0,0,.18)}.stage-dot.locked{background:linear-gradient(#c6ccd5,#8993a1);box-shadow:0 6px 0 #66707d;color:#f7fbff}.stage-dot.current{background:linear-gradient(#8C65F2,#663DD3);animation:glow 1.4s infinite}
.world-chest{position:fixed;z-index:12;left:28px;right:28px;bottom:28px;transform:none;border:3px solid #78cb3d;border-radius:18px;background:linear-gradient(180deg,rgba(21,117,61,.9),rgba(11,80,49,.92));padding:12px 96px 12px 14px;font-weight:900;box-shadow:0 6px 18px rgba(0,0,0,.28),inset 0 0 0 2px rgba(255,255,255,.18);color:white;text-align:left}.world-chest span{display:block;font-size:16px}.world-chest b{position:absolute;right:18px;top:12px;font-size:52px;line-height:1}.world-chest small{display:block;color:#FFE955;margin-top:4px}.world-chest em{display:block;margin-top:8px;height:18px;border-radius:10px;background:rgba(0,0,0,.28);font-style:normal;text-align:center}.world-chest.ready{animation:pulse 1.2s infinite;background:linear-gradient(#ffe06c,#ec9f22);color:#3b2600}
.game-card{z-index:2;margin:104px 14px 0;text-align:center;background:transparent;border:0;box-shadow:none;padding:0}.instruction{position:relative;background:#fff7f0;border:3px solid #ead6c9;border-radius:18px;padding:14px 16px;font-weight:900;color:#19175d;box-shadow:0 5px 12px rgba(0,0,0,.12);font-size:16px;line-height:1.25}.prompt{font-size:20px;font-weight:900;margin:14px;color:#19175d}.visual{min-height:118px;border-radius:22px;background:linear-gradient(#ffffff,#e3f6ff);border:3px solid #c6e7fb;display:flex;align-items:center;justify-content:center;font-size:46px;padding:14px;letter-spacing:2px;box-shadow:0 6px 14px rgba(74,144,226,.16)}.answers{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}.answers button{border:4px solid #fff;border-radius:20px;background:linear-gradient(#fff,#e6f8ff);padding:15px 8px;font-size:18px;font-weight:900;box-shadow:0 5px 0 #aacce2,0 7px 13px rgba(0,0,0,.12);color:#1c3770}.answers .selected{background:linear-gradient(#e8ffd6,#b8ef80)}
.letter-match{display:grid;grid-template-columns:78px 44px 1fr;align-items:center;gap:12px;margin-top:24px}.letter-column,.image-column{display:grid;gap:22px}.letter-column button,.image-column button{height:92px;border:4px solid #fff;border-radius:18px;background:linear-gradient(#fff9ee,#fff1dc);box-shadow:0 5px 0 #d8c6b8,0 7px 15px rgba(0,0,0,.14);font-weight:900;color:#1b2d69}.letter-column button{font-size:48px}.letter-column .active{color:#e63e27}.connector{font-size:30px;color:#e63e27;font-weight:900;letter-spacing:-4px}.image-column button{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(#f7fdff,#dff4ff);box-shadow:0 5px 0 #aecde1,0 7px 15px rgba(0,0,0,.14);font-size:16px}.image-column span{font-size:42px}.image-column small{font-weight:900}.image-column .selected{background:linear-gradient(#e8ffd6,#b8ef80)}
.game-footer{display:flex;align-items:center;gap:10px;justify-content:space-between;margin-top:18px;font-weight:900}.hint{border:4px solid white;border-radius:28px;background:linear-gradient(#ffd55b,#f69a2a);padding:10px 14px;font-weight:900;box-shadow:0 4px 0 #c97218;color:white}.game-progress{position:fixed;z-index:15;left:20px;right:20px;bottom:28px;display:grid;grid-template-columns:44px 1fr 46px;align-items:center;gap:8px}.game-progress img{width:44px;height:44px;object-fit:contain;filter:drop-shadow(0 4px 5px rgba(0,0,0,.22))}.game-progress div{height:26px;border-radius:16px;background:rgba(0,67,128,.72);box-shadow:inset 0 2px 4px rgba(0,0,0,.32),0 2px 0 rgba(255,255,255,.35);overflow:hidden}.game-progress span{display:block;height:100%;border-radius:16px;background:linear-gradient(90deg,#A4E53D,#69C331)}.game-progress b{color:white;font-size:18px;text-shadow:0 2px 5px rgba(0,0,0,.35)}
.result-card{z-index:2;margin:96px 20px;text-align:center}.result-card h1{font-size:28px;font-weight:900}.big-stars{font-size:48px;color:#FFD84D;text-shadow:0 3px 0 #f09a24}.reward-line{font-size:18px;font-weight:900;color:#22814a;margin:10px}
.reward-row{display:flex;justify-content:space-between;width:100%;margin:8px 0;text-align:left}.shop-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.shop-item{border:2px solid #e0eefb;border-radius:18px;padding:10px;text-align:center;background:#fbfdff}.shop-item b{display:block;font-size:30px}.shop-item span{display:block;font-weight:900}.shop-item small{display:block;color:#7a8ca2}.shop-item button{margin-top:6px;border:0;border-radius:14px;background:#92D050;color:white;font-weight:900;padding:8px;width:100%}.shop-item button:disabled{background:#c7cbd3}
.profile-main{background:linear-gradient(180deg,#2892F0,#C7F2FF);padding-top:18px}.profile-main .avatar-lg{width:98px;height:98px;font-size:52px}.profile-main h2{font-size:24px;font-weight:900;color:white;text-shadow:0 2px 8px rgba(0,0,0,.22)}.profile-main p{font-weight:900;color:#18366d}.badge-row,.progress-row,.toggle{display:flex;align-items:center;justify-content:space-between;gap:10px;border-bottom:1px solid #edf2f7;padding:9px 0}.badge-row b{font-size:28px}.badge-row span{font-weight:900}.badge-row small{display:block;color:#718096}.profile-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.profile-actions button{min-height:48px;padding:8px;font-size:13px}.profile-actions .danger{grid-column:1 / -1}.toggle button{border:0;border-radius:16px;background:#92D050;color:white;padding:8px 16px;font-weight:900}
.bottom-nav{position:absolute;z-index:20;left:8px;right:8px;bottom:8px;height:70px;background:rgba(255,255,255,.98);border:3px solid rgba(255,255,255,.9);border-radius:24px;box-shadow:0 -5px 22px rgba(0,0,0,.14),inset 0 2px 0 rgba(255,255,255,.9);display:grid;grid-template-columns:repeat(4,1fr);align-items:center}.bottom-nav button{border:0;background:transparent;font-size:23px;font-weight:900;color:#8ca0b8}.bottom-nav span{display:block;font-size:10px}.bottom-nav .active{color:#4A90E2}
.toast{position:absolute;z-index:50;left:18px;right:18px;bottom:88px;border:3px solid white;border-radius:20px;background:#fff7cc;padding:12px;font-weight:900;color:#503b10;box-shadow:0 8px 24px rgba(0,0,0,.22)}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
@keyframes glow{0%,100%{filter:drop-shadow(0 0 0 rgba(255,216,77,0))}50%{filter:drop-shadow(0 0 12px rgba(255,216,77,.95))}}
@media(max-width:390px){.phone-frame{border-radius:28px;border:6px solid rgba(255,255,255,.92)}.home-logo{top:13.5%;width:82%;left:9%}.play-button{bottom:28.5%}.home-mascot{height:43%;bottom:30%;left:43%}.answers button{font-size:16px}}
`;
