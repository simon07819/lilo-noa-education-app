export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface Accessory {
  id: string;
  name: string;
  icon: string;
  cost: number; // in candies
  color: string;
}

export const badges: Badge[] = [
  { id: "super-reader", name: "Super Lecteur", description: "Complète 5 stages de lettres", icon: "📖", requirement: "5 stages lettres" },
  { id: "number-champ", name: "Champion des Nombres", description: "Complète 5 stages de chiffres", icon: "🔢", requirement: "5 stages chiffres" },
  { id: "explorer", name: "Explorateur", description: "Termine un monde entier", icon: "🧭", requirement: "1 monde complet" },
  { id: "magic-streak", name: "Série Magique", description: "Joue 3 jours de suite", icon: "🔥", requirement: "3 jours consécutifs" },
  { id: "perfect", name: "Sans Faute", description: "Finis un mini-jeu sans erreur", icon: "💯", requirement: "0 erreur sur un stage" },
  { id: "star-collector", name: "Collectionneur d'Étoiles", description: "Gagne 30 étoiles au total", icon: "⭐", requirement: "30 étoiles" },
  { id: "candy-master", name: "Roi des Bonbons", description: "Gagne 100 bonbons au total", icon: "🍬", requirement: "100 bonbons" },
  { id: "coming-1", name: "???", description: "Débloque ce badge mystère !", icon: "❓", requirement: "secret" },
  { id: "coming-2", name: "???", description: "Débloque ce badge mystère !", icon: "❓", requirement: "secret" },
];

export const accessories: Accessory[] = [
  { id: "hat-blue", name: "Casquette Bleue", icon: "🧢", cost: 0, color: "bg-blue-400" },
  { id: "hat-star", name: "Casquette Étoile", icon: "⭐🧢", cost: 30, color: "bg-green-400" },
  { id: "backpack", name: "Sac à Dos Violet", icon: "🎒", cost: 50, color: "bg-purple-400" },
  { id: "glasses", name: "Lunettes Rondes", icon: "👓", cost: 40, color: "bg-yellow-400" },
  { id: "cape", name: "Cape Magique", icon: "🦸", cost: 80, color: "bg-red-400" },
  { id: "crown", name: "Couronne Royale", icon: "👑", cost: 100, color: "bg-amber-400" },
];
