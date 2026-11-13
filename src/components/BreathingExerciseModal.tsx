import React, { useState, useEffect } from 'react';
import { Mascot } from './Mascot';
import { X, Play, Pause, RotateCcw, Heart, Sparkles } from 'lucide-react';

interface BreathingExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export const BreathingExerciseModal: React.FC<BreathingExerciseModalProps> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [counter, setCounter] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  useEffect(() => {
    if (!isOpen || !isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // transition phases: 4-4-4-4 Box Breathing
          setPhase((currentPhase) => {
            if (currentPhase === 'inhale') return 'hold1';
            if (currentPhase === 'hold1') return 'exhale';
            if (currentPhase === 'exhale') return 'hold2';
            if (currentPhase === 'hold2') {
              setCompletedCycles((c) => c + 1);
              return 'inhale';
            }
            return 'inhale';
          });
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isActive, phase]);

  if (!isOpen) return null;

  const phaseConfig = {
    inhale: { label: 'Inspire profundamente...', sub: 'Puxe o ar pelo nariz expandindo os pulmões', scale: 'scale-125', color: 'from-emerald-400 to-teal-400' },
    hold1: { label: 'Segure o ar...', sub: 'Mantenha a calma e sinta o ar nos pulmões', scale: 'scale-125', color: 'from-cyan-400 to-blue-400' },
    exhale: { label: 'Expire lentamente...', sub: 'Solte o ar suavemente pela boca relaxando os ombros', scale: 'scale-90', color: 'from-teal-400 to-emerald-500' },
    hold2: { label: 'Pausa serena...', sub: 'Aguarde antes de iniciar o próximo ciclo', scale: 'scale-90', color: 'from-slate-400 to-teal-400' },
  }[phase];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot Header */}
        <div className="flex justify-center -mt-2 mb-2">
          <Mascot pose="meditating" size="sm" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
          Respiração Guiada (Técnica 4-4-4-4)
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
          Prática de respiração quadrada para desacelerar batimentos e aliviar sobrecarga mental imediata.
        </p>

        {/* Breathing Animated Sphere */}
        <div className="my-8 flex items-center justify-center h-52 relative">
          {/* Ripple rings */}
          <div
            className={`absolute w-44 h-44 rounded-full border border-emerald-500/20 transition-transform duration-[4000ms] ease-in-out ${phaseConfig.scale}`}
          />
          <div
            className={`absolute w-36 h-36 rounded-full border border-emerald-500/40 transition-transform duration-[4000ms] ease-in-out ${phaseConfig.scale}`}
          />

          {/* Central Orb */}
          <div
            className={`w-28 h-28 rounded-full bg-gradient-to-tr ${phaseConfig.color} flex flex-col items-center justify-center text-slate-950 font-black shadow-2xl shadow-emerald-500/40 transition-transform duration-[4000ms] ease-in-out ${phaseConfig.scale}`}
          >
            <span className="text-3xl font-['Outfit',sans-serif]">{counter}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">segundos</span>
          </div>
        </div>

        {/* Instruction Text */}
        <div className="mb-6 h-14">
          <h3 className="text-lg font-bold text-emerald-400">{phaseConfig.label}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{phaseConfig.sub}</p>
        </div>

        {/* Controls and cycle counter */}
        <div className="flex items-center justify-center gap-4 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pausar' : 'Continuar'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCounter(4);
              setPhase('inhale');
              setCompletedCycles(0);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>

          <span className="text-xs text-slate-400">
            Ciclos: <strong className="text-emerald-400 font-bold">{completedCycles}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
