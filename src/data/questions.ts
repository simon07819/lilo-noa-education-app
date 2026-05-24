export type GameType = "letters" | "counting" | "addition" | "shapes" | "words";

export interface Question {
  id: string;
  type: GameType;
  prompt: string;
  options: string[];
  correctAnswer: string;
  image?: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
}

// 50+ questions organized by type
const questionsLetters: Question[] = [
  { id: "l1", type: "letters", prompt: "Quelle lettre commence le mot ABEILLE ?", options: ["A", "B", "C", "D"], correctAnswer: "A", explanation: "Abeille commence par la lettre A ! 🐝", difficulty: 1 },
  { id: "l2", type: "letters", prompt: "Quelle lettre commence le mot MAISON ?", options: ["M", "N", "P", "L"], correctAnswer: "M", explanation: "Maison commence par la lettre M ! 🏠", difficulty: 1 },
  { id: "l3", type: "letters", prompt: "Quelle lettre commence le mot VOITURE ?", options: ["F", "V", "B", "T"], correctAnswer: "V", explanation: "Voiture commence par la lettre V ! 🚗", difficulty: 1 },
  { id: "l4", type: "letters", prompt: "Quelle lettre commence le mot CHAT ?", options: ["S", "C", "K", "G"], correctAnswer: "C", explanation: "Chat commence par la lettre C ! 🐱", difficulty: 1 },
  { id: "l5", type: "letters", prompt: "Quelle lettre commence le mot SOLEIL ?", options: ["Z", "S", "C", "O"], correctAnswer: "S", explanation: "Soleil commence par la lettre S ! ☀️", difficulty: 1 },
  { id: "l6", type: "letters", prompt: "Quelle lettre commence le mot BALLON ?", options: ["D", "P", "B", "T"], correctAnswer: "B", explanation: "Ballon commence par la lettre B ! 🎈", difficulty: 1 },
  { id: "l7", type: "letters", prompt: "Quelle lettre commence le mot FLEUR ?", options: ["F", "V", "L", "R"], correctAnswer: "F", explanation: "Fleur commence par la lettre F ! 🌸", difficulty: 1 },
  { id: "l8", type: "letters", prompt: "Quelle lettre commence le mot LUNE ?", options: ["M", "N", "L", "R"], correctAnswer: "L", explanation: "Lune commence par la lettre L ! 🌙", difficulty: 1 },
  { id: "l9", type: "letters", prompt: "Quelle lettre commence le mot ROBOT ?", options: ["B", "R", "T", "P"], correctAnswer: "R", explanation: "Robot commence par la lettre R ! 🤖", difficulty: 1 },
  { id: "l10", type: "letters", prompt: "Quelle lettre commence le mot ÉTOILE ?", options: ["A", "T", "É", "I"], correctAnswer: "É", explanation: "Étoile commence par la lettre É ! ⭐", difficulty: 1 },
  { id: "l11", type: "letters", prompt: "Quelle lettre commence le mot PAPILLON ?", options: ["B", "P", "T", "D"], correctAnswer: "P", explanation: "Papillon commence par la lettre P ! 🦋", difficulty: 2 },
  { id: "l12", type: "letters", prompt: "Quelle lettre commence le mot GUITARE ?", options: ["K", "J", "G", "C"], correctAnswer: "G", explanation: "Guitare commence par la lettre G ! 🎸", difficulty: 2 },
  { id: "l13", type: "letters", prompt: "Quelle lettre commence le mot NUAGE ?", options: ["M", "N", "G", "L"], correctAnswer: "N", explanation: "Nuage commence par la lettre N ! ☁️", difficulty: 2 },
  { id: "l14", type: "letters", prompt: "Quelle lettre commence le mot DRAGON ?", options: ["B", "G", "D", "T"], correctAnswer: "D", explanation: "Dragon commence par la lettre D ! 🐉", difficulty: 2 },
  { id: "l15", type: "letters", prompt: "Quelle lettre commence le mot ZÈBRE ?", options: ["S", "Z", "V", "X"], correctAnswer: "Z", explanation: "Zèbre commence par la lettre Z ! 🦓", difficulty: 2 },
];

const questionsCounting: Question[] = [
  { id: "c1", type: "counting", prompt: "Combien vois-tu d'étoiles ? ⭐⭐⭐", options: ["2", "3", "4", "5"], correctAnswer: "3", explanation: "Il y a 3 étoiles ! ⭐⭐⭐", difficulty: 1 },
  { id: "c2", type: "counting", prompt: "Combien de pommes ? 🍎🍎🍎🍎", options: ["3", "4", "5", "2"], correctAnswer: "4", explanation: "Il y a 4 pommes ! 🍎", difficulty: 1 },
  { id: "c3", type: "counting", prompt: "Combien de bonbons ? 🍬🍬🍬🍬🍬", options: ["4", "5", "6", "3"], correctAnswer: "5", explanation: "Il y a 5 bonbons ! 🍬", difficulty: 1 },
  { id: "c4", type: "counting", prompt: "Compte les lapins : 🐰🐰", options: ["1", "2", "3", "4"], correctAnswer: "2", explanation: "Il y a 2 lapins ! 🐰🐰", difficulty: 1 },
  { id: "c5", type: "counting", prompt: "Combien de cœurs ? ❤️❤️❤️❤️❤️❤️", options: ["5", "6", "7", "8"], correctAnswer: "6", explanation: "Il y a 6 cœurs ! ❤️", difficulty: 1 },
  { id: "c6", type: "counting", prompt: "Combien de livres ? 📚📚📚", options: ["2", "3", "4", "5"], correctAnswer: "3", explanation: "Il y a 3 livres ! 📚", difficulty: 2 },
  { id: "c7", type: "counting", prompt: "Combien de papillons ? 🦋🦋🦋🦋🦋🦋🦋", options: ["6", "7", "8", "5"], correctAnswer: "7", explanation: "Il y a 7 papillons ! 🦋", difficulty: 2 },
  { id: "c8", type: "counting", prompt: "Combien de voitures ? 🚗🚗🚗🚗🚗🚗🚗🚗", options: ["7", "8", "9", "6"], correctAnswer: "8", explanation: "Il y a 8 voitures ! 🚗", difficulty: 2 },
  { id: "c9", type: "counting", prompt: "Combien de lunes ? 🌙🌙🌙🌙🌙🌙🌙🌙🌙", options: ["8", "9", "10", "7"], correctAnswer: "9", explanation: "Il y a 9 lunes ! 🌙", difficulty: 2 },
  { id: "c10", type: "counting", prompt: "Combien de fleurs ? 🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸", options: ["9", "10", "11", "8"], correctAnswer: "10", explanation: "Il y a 10 fleurs ! 🌸", difficulty: 3 },
  { id: "c11", type: "counting", prompt: "Compte : 🦊🦊🦊 + 🐸🐸 = ?", options: ["4", "5", "3", "6"], correctAnswer: "5", explanation: "3 renards + 2 grenouilles = 5 animaux !", difficulty: 3 },
  { id: "c12", type: "counting", prompt: "Compte : 🐶🐶 + 🐱🐱🐱 = ?", options: ["4", "5", "6", "3"], correctAnswer: "5", explanation: "2 chiens + 3 chats = 5 animaux !", difficulty: 3 },
  { id: "c13", type: "counting", prompt: "Combien de doigts ? ✋", options: ["4", "5", "10", "3"], correctAnswer: "5", explanation: "Une main a 5 doigts ! ✋", difficulty: 2 },
  { id: "c14", type: "counting", prompt: "Combien de pattes a un chat ? 🐱", options: ["2", "3", "4", "6"], correctAnswer: "4", explanation: "Un chat a 4 pattes ! 🐱", difficulty: 2 },
  { id: "c15", type: "counting", prompt: "Combien de roues a une voiture ? 🚗", options: ["2", "3", "4", "5"], correctAnswer: "4", explanation: "Une voiture a 4 roues ! 🚗", difficulty: 1 },
];

const questionsAddition: Question[] = [
  { id: "a1", type: "addition", prompt: "🍎🍎 + 🍎🍎🍎 = ?", options: ["4", "5", "6", "3"], correctAnswer: "5", explanation: "2 + 3 = 5 pommes ! 🍎", difficulty: 1 },
  { id: "a2", type: "addition", prompt: "⭐ + ⭐⭐ = ?", options: ["2", "3", "4", "1"], correctAnswer: "3", explanation: "1 + 2 = 3 étoiles ! ⭐", difficulty: 1 },
  { id: "a3", type: "addition", prompt: "1 + 4 = ?", options: ["4", "5", "6", "3"], correctAnswer: "5", explanation: "1 + 4 = 5 ! 🎉", difficulty: 1 },
  { id: "a4", type: "addition", prompt: "3 + 2 = ?", options: ["4", "5", "6", "7"], correctAnswer: "5", explanation: "3 + 2 = 5 ! 🎉", difficulty: 2 },
  { id: "a5", type: "addition", prompt: "2 + 2 = ?", options: ["3", "4", "5", "2"], correctAnswer: "4", explanation: "2 + 2 = 4 ! 🎉", difficulty: 1 },
  { id: "a6", type: "addition", prompt: "🐱🐱 + 🐱 = ?", options: ["2", "3", "4", "1"], correctAnswer: "3", explanation: "2 + 1 = 3 chats ! 🐱", difficulty: 1 },
  { id: "a7", type: "addition", prompt: "🌸🌸🌸 + 🌸🌸 = ?", options: ["4", "5", "6", "3"], correctAnswer: "5", explanation: "3 + 2 = 5 fleurs ! 🌸", difficulty: 2 },
  { id: "a8", type: "addition", prompt: "5 + 3 = ?", options: ["7", "8", "9", "6"], correctAnswer: "8", explanation: "5 + 3 = 8 ! 🎉", difficulty: 3 },
  { id: "a9", type: "addition", prompt: "4 + 4 = ?", options: ["6", "7", "8", "9"], correctAnswer: "8", explanation: "4 + 4 = 8 ! 🎉", difficulty: 2 },
  { id: "a10", type: "addition", prompt: "2 + 6 = ?", options: ["7", "8", "9", "6"], correctAnswer: "8", explanation: "2 + 6 = 8 ! 🎉", difficulty: 3 },
];

const questionsShapes: Question[] = [
  { id: "s1", type: "shapes", prompt: "Trouve le TRIANGLE ROUGE ! 🔴", options: ["🔵 Rond bleu", "🔴 Triangle rouge", "🟢 Carré vert", "🟡 Étoile jaune"], correctAnswer: "🔴 Triangle rouge", explanation: "Bravo ! C'est le triangle rouge ! 🔺", difficulty: 1 },
  { id: "s2", type: "shapes", prompt: "Trouve le CERCLE BLEU !", options: ["🔴 Carré rouge", "🔵 Cercle bleu", "🟢 Triangle vert", "🟡 Losange jaune"], correctAnswer: "🔵 Cercle bleu", explanation: "Bravo ! C'est le cercle bleu ! 🔵", difficulty: 1 },
  { id: "s3", type: "shapes", prompt: "Trouve le CARRÉ VERT !", options: ["🟣 Rond violet", "🟡 Triangle jaune", "🟢 Carré vert", "🔴 Cercle rouge"], correctAnswer: "🟢 Carré vert", explanation: "Bravo ! C'est le carré vert ! 🟩", difficulty: 1 },
  { id: "s4", type: "shapes", prompt: "Quelle forme a 4 côtés égaux ?", options: ["Triangle", "Cercle", "Carré", "Ovale"], correctAnswer: "Carré", explanation: "Le carré a 4 côtés égaux ! 🟫", difficulty: 2 },
  { id: "s5", type: "shapes", prompt: "Quelle forme n'a pas de côtés ?", options: ["Carré", "Triangle", "Rectangle", "Cercle"], correctAnswer: "Cercle", explanation: "Le cercle n'a pas de côtés, il est tout rond ! ⭕", difficulty: 2 },
  { id: "s6", type: "shapes", prompt: "Quelle forme a 3 côtés ?", options: ["Carré", "Cercle", "Triangle", "Rectangle"], correctAnswer: "Triangle", explanation: "Le triangle a 3 côtés ! 🔺", difficulty: 2 },
  { id: "s7", type: "shapes", prompt: "Trouve le plus GRAND cercle :", options: ["○ petit", "◯ grand", "○ moyen", "• tout petit"], correctAnswer: "◯ grand", explanation: "C'est le plus grand cercle ! ⭕", difficulty: 2 },
  { id: "s8", type: "shapes", prompt: "De quelle couleur est un triangle STOP ? 🛑", options: ["Bleu", "Vert", "Rouge", "Jaune"], correctAnswer: "Rouge", explanation: "Le panneau stop est un triangle rouge ! 🛑", difficulty: 3 },
  { id: "s9", type: "shapes", prompt: "Combien de côtés a un rectangle ?", options: ["3", "4", "5", "6"], correctAnswer: "4", explanation: "Un rectangle a 4 côtés ! ▬", difficulty: 3 },
  { id: "s10", type: "shapes", prompt: "Quelle forme ressemble à un ballon ? ⚽", options: ["Carré", "Triangle", "Cercle", "Rectangle"], correctAnswer: "Cercle", explanation: "Un ballon est rond comme un cercle ! ⚽", difficulty: 1 },
];

const questionsWords: Question[] = [
  { id: "w1", type: "words", prompt: "Complète le mot : C _ A T", options: ["H", "B", "S", "R"], correctAnswer: "H", explanation: "C-H-A-T = CHAT ! 🐱", difficulty: 1 },
  { id: "w2", type: "words", prompt: "Complète le mot : _ O M M E (fruit)", options: ["P", "T", "B", "D"], correctAnswer: "P", explanation: "P-O-M-M-E = POMME ! 🍎", difficulty: 1 },
  { id: "w3", type: "words", prompt: "Complète le mot : L _ N E", options: ["A", "U", "I", "O"], correctAnswer: "U", explanation: "L-U-N-E = LUNE ! 🌙", difficulty: 1 },
  { id: "w4", type: "words", prompt: "Complète : M A I _ O N", options: ["S", "T", "R", "L"], correctAnswer: "S", explanation: "M-A-I-S-O-N = MAISON ! 🏠", difficulty: 2 },
  { id: "w5", type: "words", prompt: "Complète : _ O L E I L", options: ["S", "L", "M", "P"], correctAnswer: "S", explanation: "S-O-L-E-I-L = SOLEIL ! ☀️", difficulty: 2 },
];

// Shuffle helper
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Get questions for a stage based on game type
export function getQuestionsForStage(gameType: GameType, count: number = 3): Question[] {
  let pool: Question[];
  switch (gameType) {
    case "letters": pool = questionsLetters; break;
    case "counting": pool = questionsCounting; break;
    case "addition": pool = questionsAddition; break;
    case "shapes": pool = questionsShapes; break;
    case "words": pool = questionsWords; break;
  }
  return shuffle(pool).slice(0, count);
}

export const allQuestions = [
  ...questionsLetters,
  ...questionsCounting,
  ...questionsAddition,
  ...questionsShapes,
  ...questionsWords,
];
