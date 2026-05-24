import { GameType } from "./questions";

export interface Stage {
  id: string;
  worldId: string;
  number: number;
  title: string;
  description: string;
  gameType: GameType;
  difficulty: 1 | 2 | 3;
}

export interface World {
  id: string;
  title: string;
  theme: string;
  description: string;
  color: string;
  bgGradient: string;
  icon: string;
  requiredStars: number;
  stages: Stage[];
}

export const worlds: World[] = [
  {
    id: "forest",
    title: "Forêt Enchantée",
    theme: "Lecture simple, sons, lettres, mots courts",
    description: "Explore la forêt magique et découvre les lettres et les sons !",
    color: "#4CAF50",
    bgGradient: "from-green-400 to-emerald-600",
    icon: "🌳",
    requiredStars: 0,
    stages: [
      { id: "forest-1", worldId: "forest", number: 1, title: "Les lettres magiques", description: "Associe chaque lettre à la bonne image", gameType: "letters", difficulty: 1 },
      { id: "forest-2", worldId: "forest", number: 2, title: "Le son des animaux", description: "Trouve le son initial de chaque mot", gameType: "letters", difficulty: 1 },
      { id: "forest-3", worldId: "forest", number: 3, title: "Les mots cachés", description: "Complète les mots simples", gameType: "words", difficulty: 1 },
      { id: "forest-4", worldId: "forest", number: 4, title: "Le panier des syllabes", description: "Assemble les syllabes pour former des mots", gameType: "words", difficulty: 2 },
      { id: "forest-5", worldId: "forest", number: 5, title: "Le chemin des rimes", description: "Trouve les mots qui riment", gameType: "letters", difficulty: 2 },
      { id: "forest-6", worldId: "forest", number: 6, title: "Le trésor du A", description: "Reconnais la lettre A parmi d'autres lettres", gameType: "letters", difficulty: 2 },
      { id: "forest-7", worldId: "forest", number: 7, title: "Mission lecture", description: "Lis un mot et choisis la bonne image", gameType: "words", difficulty: 2 },
      { id: "forest-8", worldId: "forest", number: 8, title: "Les amis de Noa", description: "Écoute et choisis la bonne réponse", gameType: "letters", difficulty: 3 },
      { id: "forest-9", worldId: "forest", number: 9, title: "Le coffre des mots", description: "Classe les mots et les images", gameType: "words", difficulty: 3 },
      { id: "forest-10", worldId: "forest", number: 10, title: "Boss de la Forêt", description: "Défi final : toutes les lettres !", gameType: "letters", difficulty: 3 },
    ],
  },
  {
    id: "city",
    title: "Ville des Nombres",
    theme: "Chiffres, additions simples, comparaisons",
    description: "Parcours la ville et deviens un champion des nombres !",
    color: "#F59E0B",
    bgGradient: "from-orange-400 to-amber-600",
    icon: "🏙️",
    requiredStars: 0,
    stages: [
      { id: "city-1", worldId: "city", number: 1, title: "Compte avec moi", description: "Compte les objets à l'écran", gameType: "counting", difficulty: 1 },
      { id: "city-2", worldId: "city", number: 2, title: "La boulangerie", description: "Compte les pains et les gâteaux", gameType: "counting", difficulty: 1 },
      { id: "city-3", worldId: "city", number: 3, title: "Le marché", description: "Additionne les fruits au marché", gameType: "addition", difficulty: 1 },
      { id: "city-4", worldId: "city", number: 4, title: "Le train des nombres", description: "Trouve le nombre qui manque", gameType: "counting", difficulty: 2 },
      { id: "city-5", worldId: "city", number: 5, title: "La tour magique", description: "Additionne pour monter les étages", gameType: "addition", difficulty: 2 },
      { id: "city-6", worldId: "city", number: 6, title: "Le parc", description: "Compare les quantités", gameType: "counting", difficulty: 2 },
      { id: "city-7", worldId: "city", number: 7, title: "La bibliothèque", description: "Compte les livres", gameType: "counting", difficulty: 2 },
      { id: "city-8", worldId: "city", number: 8, title: "La caserne", description: "Ajoute les camions de pompiers", gameType: "addition", difficulty: 3 },
      { id: "city-9", worldId: "city", number: 9, title: "La grande roue", description: "Grandes additions", gameType: "addition", difficulty: 3 },
      { id: "city-10", worldId: "city", number: 10, title: "Boss de la Ville", description: "Défi final : tous les calculs !", gameType: "addition", difficulty: 3 },
    ],
  },
  {
    id: "island",
    title: "Île des Lettres",
    theme: "Alphabet, syllabes, reconnaissance de mots",
    description: "Navigue vers l'île et maîtrise tout l'alphabet !",
    color: "#2F80ED",
    bgGradient: "from-blue-400 to-cyan-600",
    icon: "🏝️",
    requiredStars: 0,
    stages: [
      { id: "island-1", worldId: "island", number: 1, title: "La plage des A", description: "Trouve tous les mots qui commencent par A", gameType: "letters", difficulty: 1 },
      { id: "island-2", worldId: "island", number: 2, title: "La grotte des B", description: "Trouve tous les mots en B", gameType: "letters", difficulty: 1 },
      { id: "island-3", worldId: "island", number: 3, title: "Le lagon des C", description: "Reconnais les mots en C", gameType: "letters", difficulty: 1 },
      { id: "island-4", worldId: "island", number: 4, title: "Les cocotiers", description: "Associe lettres et images", gameType: "letters", difficulty: 2 },
      { id: "island-5", worldId: "island", number: 5, title: "Le trésor des syllabes", description: "Compte les syllabes dans les mots", gameType: "words", difficulty: 2 },
      { id: "island-6", worldId: "island", number: 6, title: "Le volcan des mots", description: "Forme des mots avec des lettres", gameType: "words", difficulty: 2 },
      { id: "island-7", worldId: "island", number: 7, title: "La cascade", description: "Complète les mots qui coulent", gameType: "words", difficulty: 3 },
      { id: "island-8", worldId: "island", number: 8, title: "Le village", description: "Lis et trouve l'image", gameType: "words", difficulty: 3 },
      { id: "island-9", worldId: "island", number: 9, title: "Le phare", description: "Guide les lettres vers le bon mot", gameType: "letters", difficulty: 3 },
      { id: "island-10", worldId: "island", number: 10, title: "Boss de l'Île", description: "Défi final de lecture !", gameType: "words", difficulty: 3 },
    ],
  },
  {
    id: "space",
    title: "Espace des Formes",
    theme: "Formes, logique, suites, repérage spatial",
    description: "Voyage dans l'espace et découvre les formes magiques !",
    color: "#8B5CF6",
    bgGradient: "from-purple-400 to-violet-700",
    icon: "🚀",
    requiredStars: 12,
    stages: [
      { id: "space-1", worldId: "space", number: 1, title: "Les planètes rondes", description: "Trouve tous les cercles", gameType: "shapes", difficulty: 1 },
      { id: "space-2", worldId: "space", number: 2, title: "Les comètes triangulaires", description: "Trouve tous les triangles", gameType: "shapes", difficulty: 1 },
      { id: "space-3", worldId: "space", number: 3, title: "La station carrée", description: "Identifie les carrés", gameType: "shapes", difficulty: 1 },
      { id: "space-4", worldId: "space", number: 4, title: "Les étoiles", description: "Trouve les étoiles parmi les formes", gameType: "shapes", difficulty: 2 },
      { id: "space-5", worldId: "space", number: 5, title: "La galaxie des couleurs", description: "Associe formes et couleurs", gameType: "shapes", difficulty: 2 },
      { id: "space-6", worldId: "space", number: 6, title: "Le trou noir", description: "Quelle forme est différente ?", gameType: "shapes", difficulty: 2 },
      { id: "space-7", worldId: "space", number: 7, title: "Les aliens", description: "Repère les suites de formes", gameType: "shapes", difficulty: 3 },
      { id: "space-8", worldId: "space", number: 8, title: "La fusée", description: "Compte les formes dans l'image", gameType: "counting", difficulty: 3 },
      { id: "space-9", worldId: "space", number: 9, title: "La constellation", description: "Relie les formes pour créer un dessin", gameType: "shapes", difficulty: 3 },
      { id: "space-10", worldId: "space", number: 10, title: "Boss de l'Espace", description: "Défi final des formes !", gameType: "shapes", difficulty: 3 },
    ],
  },
];

export function getWorldById(id: string): World | undefined {
  return worlds.find((w) => w.id === id);
}

export function getStageById(worldId: string, stageId: string): Stage | undefined {
  const world = getWorldById(worldId);
  return world?.stages.find((s) => s.id === stageId);
}
