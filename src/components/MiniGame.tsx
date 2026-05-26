"use client";

import { useState, useEffect } from "react";
import { Stage } from "@/data/worlds";
import { Question, getQuestionsForStage } from "@/data/questions";
import { useGame } from "@/lib/GameContext";

interface MiniGameProps {
  stage: Stage;
  onComplete: (errors: number, total: number, stars: number, candies: number) => void;
  onBack: () => void;
}

const gameItems = [
  "/images/mini-game-item-bee.png",
  "/images/mini-game-item-house.png",
  "/images/mini-game-item-car.png",
];

const letterCards: Record<string, string> = {
  A: "/images/mini-game-letter-A-card.png",
  B: "/images/mini-game-letter-B-card.png",
  C: "/images/mini-game-letter-C-card.png",
};

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
          setGameOver(true);
          const newStars = errors === 0 ? 3 : errors <= 1 ? 2 : 1;
          const newCandies = (totalCorrect + 1) * 5;
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

  /* ── GAME OVER SCREEN ── */
  if (gameOver) {
    const total = questions.length;
    const stars = errors === 0 ? 3 : errors <= 1 ? 2 : 1;
    const candies = totalCorrect * 5;
    return (
      <div className="relative h-full w-full overflow-hidden">
        <img src="/images/mini-game-background.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-full p-6 text-center">
          <div className="animate-pop-in">
            <img src="/images/mini-game-gem-icon.png" alt="🎉" className="w-[64px] h-[64px] object-contain mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: "#333333" }}>Bravo {profile.name} !</h2>
            <p className="text-lg font-bold mb-2" style={{ color: "#4A90E2" }}>Tu as réussi l&apos;aventure !</p>
            <div className="flex justify-center gap-3 my-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className={s <= stars ? "animate-pop-in" : "opacity-20"} style={s <= stars ? { animationDelay: `${s * 0.2}s` } : {}}>
                  <img src="/images/mini-game-star-icon.png" alt="⭐" className="w-[40px] h-[40px] object-contain" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 max-w-[250px] mx-auto">
              <button onClick={() => window.location.reload()}
                className="font-extrabold text-[16px] text-white py-3 px-8 rounded-[28px] transition-all hover:brightness-110 active:scale-95"
                style={{ background: "linear-gradient(180deg, #92D050 0%, #70AD47 100%)", boxShadow: "0 4px 0 #5A9B35", border: "2px solid rgba(255,255,255,0.5)" }}>
                ▶ Rejouer
              </button>
              <button onClick={onBack}
                className="font-extrabold text-[16px] py-3 px-8 rounded-[28px] transition-all hover:brightness-105 active:scale-95"
                style={{ background: "#D9F0FF", color: "#333333", boxShadow: "0 3px 0 #B0D8F0", border: "2px solid rgba(255,255,255,0.6)" }}>
                ← Retour aux stages
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── LOADING ── */
  if (!currentQuestion) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <img src="/images/mini-game-background.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 flex items-center justify-center min-h-full">
          <img src="/images/mini-game-character-lilo-peeking.png" alt="Chargement..." className="w-[100px] h-[100px] object-contain animate-bounce" />
        </div>
      </div>
    );
  }

  /* ── GAME SCREEN ── */
  const letters = ["A", "B", "C"];

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ═══ BACKGROUND ═══ */}
      <img
        src="/images/mini-game-background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* ═══ TOP BAR ═══ */}
        <div className="flex items-center justify-between px-4 pt-9 pb-2">
          <button onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg hover:scale-105 transition"
            style={{ background: "rgba(255,255,255,0.85)", color: "#333333", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            ←
          </button>

          {/* Stars progress */}
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => {
              const threshold = questions.length / 3;
              const earned = totalCorrect >= Math.ceil(s * threshold);
              return (
                <img key={s} src="/images/mini-game-star-icon.png" alt="⭐"
                  className={`w-[28px] h-[28px] object-contain transition-all ${earned ? "" : "opacity-30"}`} />
              );
            })}
          </div>

          {/* Candy counter */}
          <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.85)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
            <img src="/images/mini-game-gem-icon.png" alt="🍬" className="w-[16px] h-[16px] object-contain" />
            <span className="font-bold text-[13px]" style={{ color: "#333333" }}>{profile.candies}</span>
          </div>
        </div>

        {/* ═══ INSTRUCTION BANNER ═══ */}
        <div className="flex justify-center px-4 mt-2">
          <img
            src="/images/mini-game-instruction-banner.png"
            alt="Consigne"
            className="w-full max-w-[340px] h-auto object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,0.1)]"
          />
        </div>

        {/* ═══ QUESTION PROMPT ═══ */}
        <div className="px-4 py-3 flex justify-center">
          <div className="rounded-2xl px-5 py-3"
            style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 3px 12px rgba(0,0,0,0.08)" }}>
            <p className="font-extrabold text-[16px] text-center" style={{ color: "#333333" }}>
              {currentQuestion.prompt}
            </p>
          </div>
        </div>

        {/* ═══ ITEMS + LETTER CHOICES ═══ */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
          {/* Display items */}
          <div className="flex justify-center gap-6">
            {gameItems.map((item, i) => (
              <img key={i} src={item} alt={`Item ${i + 1}`}
                className="w-[80px] h-[80px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]" />
            ))}
          </div>

          {/* Letter choice buttons */}
          <div className="flex justify-center gap-3 w-full max-w-[340px]">
            {currentQuestion.options.map((option, idx) => {
              const letter = letters[idx] || String.fromCharCode(65 + idx);
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.correctAnswer;

              let ringStyle = "rgba(255,255,255,0.7)";
              if (showFeedback && isSelected) {
                ringStyle = isCorrectOption ? "#92D050" : "#F472B6";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback && isSelected}
                  className={`relative shrink-0 transition-all duration-200 active:scale-90 hover:scale-105
                    ${shaking && isSelected ? "animate-shake" : ""}`}
                  style={{
                    borderRadius: "16px",
                    border: `3px solid ${ringStyle}`,
                    boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
                  }}>
                  <img
                    src={letterCards[letter] || letterCards.A}
                    alt={letter}
                    className="w-[90px] h-[110px] object-contain rounded-[14px]"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ PROGRESS BAR ═══ */}
        <div className="px-6 pb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold" style={{ color: "#333333" }}>
              Question {currentIdx + 1}/{questions.length}
            </span>
            {showFeedback && isCorrect && (
              <span className="text-[12px] font-bold animate-pop-in" style={{ color: "#92D050" }}>Bravo ! 🎉</span>
            )}
            {showFeedback && !isCorrect && (
              <span className="text-[12px] font-bold" style={{ color: "#4A90E2" }}>Essaie encore ! 💪</span>
            )}
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.5)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((currentIdx) / questions.length) * 100}%`,
                background: showFeedback && isCorrect ? "#92D050" : "#4A90E2",
              }}
            />
          </div>
        </div>

        {/* ═══ HINT BUTTON ═══ */}
        <div className="px-4 pb-24 flex justify-end">
          <button className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.85)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <img src="/images/mini-game-hint-lightbulb-icon.png" alt="💡" className="w-[20px] h-[20px] object-contain" />
          </button>
        </div>

        {/* ═══ CHARACTER — absolute on background ═══ */}
        <img
          src="/images/mini-game-character-lilo-peeking.png"
          alt="Lilo"
          className="absolute bottom-[10%] right-[-2%] w-[140px] h-[140px] object-contain z-0"
          style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.2))" }}
        />
      </div>
    </div>
  );
}
