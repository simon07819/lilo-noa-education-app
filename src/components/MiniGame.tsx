"use client";

import { useState, useEffect, useCallback } from "react";
import { Stage } from "@/data/worlds";
import { Question, getQuestionsForStage } from "@/data/questions";
import { useGame } from "@/lib/GameContext";

interface MiniGameProps {
  stage: Stage;
  onComplete: (errors: number, total: number, stars: number, candies: number) => void;
  onBack: () => void;
}

export default function MiniGame({ stage, onComplete, onBack }: MiniGameProps) {
  const { profile, finishStage } = useGame();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [errors, setErrors] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);

  useEffect(() => {
    const qs = getQuestionsForStage(stage.gameType, 5);
    setQuestions(qs);
  }, [stage]);

  const handleAnswer = (answer: string) => {
    if (showFeedback || gameOver) return;
    if (!currentQuestion) return;
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;

    if (correct) {
      setIsCorrect(true);
      setTotalCorrect((c) => c + 1);
      setShowFeedback(true);
      const nextIdx = currentIdx + 1;
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        setIsCorrect(false);
        if (nextIdx >= questions.length) {
          const total = questions.length;
          finishStage(stage.id, errors, total);
          const newStars = errors === 0 ? 3 : errors <= 1 ? 2 : 1;
          const newCandies = (totalCorrect + 1) * 5;
          setGameOver(true);
          onComplete(errors, total, newStars, newCandies);
        } else {
          setCurrentIdx(nextIdx);
        }
      }, 1200);
    } else {
      setShaking(true);
      setShowFeedback(true);
      setErrors((e) => e + 1);
      setTimeout(() => {
        setShaking(false);
        setShowFeedback(false);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const currentQuestion = questions[currentIdx];

  if (gameOver) {
    const total = questions.length;
    const stars = errors === 0 ? 3 : errors <= 1 ? 2 : 1;
    const candies = totalCorrect * 5;
    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6 text-center">
        <div className="animate-pop-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-extrabold text-purple mb-2">Bravo {profile.name} !</h2>
          <p className="text-xl text-kidtext mb-2">Tu as réussi l&apos;aventure !</p>
          <div className="flex justify-center gap-3 my-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`${s <= stars ? "animate-pop-in" : "opacity-20 grayscale"}`} style={s <= stars ? { animationDelay: `${s * 0.2}s` } : {}}>
                <img src="/images/star-icon.png" alt="⭐" className="w-10 h-10 object-contain" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-kidtext mb-1">
            <img src="/images/candy-icon.png" alt="🍬" className="w-5 h-5 object-contain" />
            <span>+{candies} bonbons</span>
          </div>
          <p className="text-lg font-bold text-kidtext mb-4">+25 ⚡ XP</p>
          <div className="flex flex-col gap-2 max-w-[250px] mx-auto">
            <button onClick={() => window.location.reload()} className="big-btn-green text-base">
              ▶ Rejouer
            </button>
            <button onClick={onBack} className="big-btn-purple text-base">
              ← Retour aux stages
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion && !gameOver) {
    return (
      <div className="flex items-center justify-center min-h-full bg-gradient-to-b from-sky-100 to-blue-200">
        <div className="text-4xl animate-bounce">🌟 Chargement du jeu...</div>
      </div>
    );
  }

  if (!currentQuestion && gameOver) return null;

  return (
    <div className="relative flex flex-col min-h-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #B8E4FC 0%, #D4EFFE 50%, #E8F5FF 100%)" }}>
      <div className="relative z-10 flex flex-col min-h-full">
        <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-greenbtn flex items-center justify-center text-white font-bold shadow-kid-sm text-lg">
            ←
          </button>

        {/* Stars progress */}
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => {
            const threshold = questions.length / 3;
            const earned = totalCorrect >= Math.ceil(s * threshold);
            return (
              <span key={s} className={`text-2xl transition-all ${earned ? "animate-pop-in" : "opacity-30"}`}>
                ⭐
              </span>
            );
          })}
        </div>

        <div className="counter-badge bg-pink-300 text-white">
          <span>🍬</span> <span>{profile.candies}</span>
        </div>
      </div>

      {/* Mascot and prompt */}
      <div className="flex items-start gap-2 px-4 py-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-b from-sky-300 to-deepblue flex items-center justify-center shrink-0 shadow-md">
          <div className="relative">
            <div className="flex gap-1.5 mb-0.5">
              <div className="w-2 h-2.5 bg-white rounded-full"><div className="w-1 h-1.5 bg-gray-800 rounded-full mt-0.5 mx-auto" /></div>
              <div className="w-2 h-2.5 bg-white rounded-full"><div className="w-1 h-1.5 bg-gray-800 rounded-full mt-0.5 mx-auto" /></div>
            </div>
            <div className="w-2.5 h-1 bg-pink-300 rounded-full mx-auto" />
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl rounded-tl-none p-4 shadow-md relative">
          <div className="absolute top-0 left-0 -mt-2 -ml-1 w-4 h-4 bg-white rotate-45" />
          <p className="font-bold text-kidtext text-lg">{currentQuestion.prompt}</p>
        </div>
      </div>

      {/* Game area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 gap-3">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === currentQuestion.correctAnswer;
          let btnStyle = "bg-white border-2 border-gray-200 text-kidtext hover:border-purple hover:bg-purple-50";

          if (showFeedback && isSelected) {
            btnStyle = isCorrectOption
              ? "bg-green-400 border-green-500 text-white scale-105"
              : "bg-red-300 border-red-400 text-white";
          } else if (showFeedback && isCorrectOption) {
            btnStyle = "bg-green-400 border-green-500 text-white";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback && isSelected}
              className={`w-full max-w-xs py-4 px-5 rounded-2xl font-bold text-lg shadow-kid-sm transition-all duration-200 ${btnStyle} ${shaking && isSelected ? "animate-shake" : ""}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="px-4 py-3 bg-white/80">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold text-kidtext">Question {currentIdx + 1}/{questions.length}</span>
          {showFeedback && isCorrect && <span className="text-green-500 font-bold animate-pop-in">Bravo ! 🎉</span>}
          {showFeedback && !isCorrect && <span className="text-orange-500 font-bold">Essaie encore ! 💪</span>}
        </div>
        <div className="h-4 rounded-full bg-gray-200 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${showFeedback && isCorrect ? "bg-green-400" : "bg-purple"}`}
            style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Hint button */}
      <div className="px-4 pb-4 flex justify-end">
        <button className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-kid-sm text-xl">
          💡
        </button>
      </div>
      </div>
    </div>
  );
}
