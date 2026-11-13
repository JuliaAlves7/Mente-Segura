import React from 'react';
import { UserProfile } from '../types';
import { Logo } from './Logo';
import { Mascot } from './Mascot';
import { DIMENSIONS } from '../data/questions';
import { ShieldCheck, Lock, Clock, ArrowRight, ArrowLeft, CheckCircle2, HeartHandshake } from 'lucide-react';

interface ExplanationScreenProps {
  userProfile: UserProfile;
  onStartQuestionnaire: () => void;
  onBack: () => void;
}

export const ExplanationScreen: React.FC<ExplanationScreenProps> = ({
  userProfile,
  onStartQuestionnaire,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061224] via-[#091b33] to-[#040d1a] text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Top Header */}
      <div className="max-w-2xl w-full mx-auto flex items-center justify-between py-2">
        <button
          id="btn-back-to-login"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para identificação</span>
        </button>

        <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
          Etapa 2 de 5: Orientações
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl w-full mx-auto my-auto py-6">
        <div className="text-center mb-6">
          <Logo size="md" showSubtitle={false} className="mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
            Olá, {userProfile.name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {userProfile.company} • {userProfile.department}
          </p>
        </div>

        {/* Central Explanatory Box */}
        <div className="bg-[#0b1d38]/90 border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Accent decoration glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="shrink-0">
              <Mascot
                pose="survey"
                size="md"
                speechBubble="Responda com sinceridade. Sua voz transforma nosso ambiente!"
              />
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantia de Confidencialidade e Sigilo</span>
              </div>

              {/* Exact user requirement quote */}
              <blockquote className="text-base sm:text-lg font-medium text-white italic border-l-2 sm:border-emerald-500 sm:pl-4 leading-relaxed">
                “O questionário é confidencial e tem como objetivo identificar fatores psicossociais relacionados ao ambiente de trabalho.”
              </blockquote>

              <p className="text-xs text-slate-300 leading-relaxed">
                Não existem respostas certas ou erradas. O objetivo é diagnosticar o nível de exigências, autonomia e suporte social na sua rotina para gerar melhorias práticas na empresa.
              </p>
            </div>
          </div>

          {/* Quick Metrics / Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 pt-2">
            <div className="bg-[#07152b]/80 border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">5 a 8 minutos</span>
                <span className="text-[11px] text-slate-400">Duração média</span>
              </div>
            </div>

            <div className="bg-[#07152b]/80 border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">100% Confidencial</span>
                <span className="text-[11px] text-slate-400">Proteção LGPD</span>
              </div>
            </div>

            <div className="bg-[#07152b]/80 border border-slate-700/60 rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">7 Dimensões</span>
                <span className="text-[11px] text-slate-400">Análise completa</span>
              </div>
            </div>
          </div>

          {/* 7 Dimensions Preview Chips */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
              Dimensões Avaliadas no Questionário:
            </h3>
            <div className="flex flex-wrap gap-2">
              {DIMENSIONS.map((dim) => (
                <span
                  key={dim.id}
                  className={`text-xs px-2.5 py-1 rounded-lg border ${dim.badgeBg} font-medium flex items-center gap-1`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {dim.shortTitle}
                </span>
              ))}
            </div>
          </div>

          {/* Start Action Button */}
          <div>
            <button
              id="btn-comecar"
              onClick={onStartQuestionnaire}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/30 active:scale-[0.99] transition-all duration-200 cursor-pointer text-base group"
            >
              <span>Começar</span>
              <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-2xl w-full mx-auto text-center py-2 text-slate-500 text-[11px]">
        Suas respostas alimentam os indicadores de saúde ocupacional sem qualquer identificação punitiva.
      </footer>
    </div>
  );
};
