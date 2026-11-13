import React, { useState, useEffect } from 'react';
import { DimensionId, Question, UserProfile } from '../types';
import { DIMENSIONS, QUESTIONS, ANSWER_OPTIONS } from '../data/questions';
import { Logo } from './Logo';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Shield,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Check,
} from 'lucide-react';

interface QuestionnaireScreenProps {
  userProfile: UserProfile;
  initialAnswers?: Record<number, number>;
  onFinish: (answers: Record<number, number>) => void;
  onCancel: () => void;
}

export const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({
  userProfile,
  initialAnswers = {},
  onFinish,
  onCancel,
}) => {
  const [answers, setAnswers] = useState<Record<number, number>>(initialAnswers);
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState<number>(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const currentDimension = DIMENSIONS[currentDimensionIndex];
  const dimensionQuestions = QUESTIONS.filter((q) => q.dimensionId === currentDimension.id);

  // Total answers progress
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = QUESTIONS.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Check if current dimension questions are all answered
  const currentDimAnsweredCount = dimensionQuestions.filter((q) => answers[q.id] !== undefined).length;
  const isCurrentDimComplete = currentDimAnsweredCount === dimensionQuestions.length;

  const handleSelectAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const toggleBookmark = (questionId: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  const handleNextDimension = () => {
    if (currentDimensionIndex < DIMENSIONS.length - 1) {
      setCurrentDimensionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowConfirmModal(true);
    }
  };

  const handlePrevDimension = () => {
    if (currentDimensionIndex > 0) {
      setCurrentDimensionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuickDemoFill = (type: 'healthy' | 'moderate' | 'critical') => {
    const mockAns: Record<number, number> = {};
    QUESTIONS.forEach((q) => {
      if (type === 'healthy') {
        // Mostly favorable: positive questions gets 4 or 5, inverted gets 1 or 2
        mockAns[q.id] = q.isInverted ? (Math.random() > 0.3 ? 1 : 2) : (Math.random() > 0.3 ? 5 : 4);
      } else if (type === 'critical') {
        // Critical risk: positive gets 1 or 2, inverted gets 4 or 5
        mockAns[q.id] = q.isInverted ? (Math.random() > 0.3 ? 5 : 4) : (Math.random() > 0.3 ? 1 : 2);
      } else {
        // Moderate: mix of 3s, 2s and 4s
        mockAns[q.id] = Math.floor(Math.random() * 3) + 2;
      }
    });
    setAnswers(mockAns);
  };

  const handleCompleteSubmission = () => {
    onFinish(answers);
  };

  return (
    <div className="min-h-screen bg-[#061224] text-slate-100 flex flex-col justify-between">
      {/* Top Floating Navbar */}
      <header className="sticky top-0 z-30 bg-[#061224]/95 border-b border-slate-800/80 backdrop-blur-md px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              id="btn-cancel-questionnaire"
              onClick={onCancel}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
              title="Voltar ao início"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Logo size="sm" showSubtitle={false} />
          </div>

          {/* Overall Progress Bar */}
          <div className="flex-1 max-w-xs sm:max-w-md hidden sm:block">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">Progresso Geral</span>
              <span className="text-emerald-400 font-bold">
                {answeredCount} / {totalQuestions} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Demo Pre-fill Dropdown */}
          <div className="flex items-center gap-2">
            <div className="dropdown relative group">
              <button
                type="button"
                id="btn-demo-quickfill"
                className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 hover:bg-emerald-900/60 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Preencher Rápido</span>
              </button>

              <div className="absolute right-0 top-full mt-1 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-1.5 hidden group-hover:block z-40">
                <button
                  type="button"
                  id="btn-fill-healthy"
                  onClick={() => handleQuickDemoFill('healthy')}
                  className="w-full text-left px-3 py-2 text-xs text-emerald-400 hover:bg-emerald-950/60 rounded-lg flex items-center justify-between"
                >
                  <span>Simular Baixo Risco</span>
                  <span>🟢</span>
                </button>
                <button
                  type="button"
                  id="btn-fill-moderate"
                  onClick={() => handleQuickDemoFill('moderate')}
                  className="w-full text-left px-3 py-2 text-xs text-amber-400 hover:bg-amber-950/60 rounded-lg flex items-center justify-between"
                >
                  <span>Simular Moderado</span>
                  <span>🟡</span>
                </button>
                <button
                  type="button"
                  id="btn-fill-critical"
                  onClick={() => handleQuickDemoFill('critical')}
                  className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/60 rounded-lg flex items-center justify-between"
                >
                  <span>Simular Alto Risco</span>
                  <span>🔴</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="w-full sm:hidden pt-2">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-slate-400">Dimensão {currentDimensionIndex + 1} de {DIMENSIONS.length}</span>
            <span className="text-emerald-400 font-bold">{progressPercent}% concluído</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl w-full mx-auto px-4 py-6 flex-1">
        {/* Dimension Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 scrollbar-none">
          {DIMENSIONS.map((dim, idx) => {
            const isCurrent = idx === currentDimensionIndex;
            const dimQs = QUESTIONS.filter((q) => q.dimensionId === dim.id);
            const isCompleted = dimQs.every((q) => answers[q.id] !== undefined);

            return (
              <button
                key={dim.id}
                id={`tab-dimension-${dim.id}`}
                onClick={() => {
                  setCurrentDimensionIndex(idx);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  isCurrent
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                    : isCompleted
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/40'
                    : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                )}
                <span>{dim.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Current Dimension Banner Card */}
        <div className="bg-[#0b1d38] border border-slate-700/80 rounded-2xl p-4 sm:p-5 mb-6 relative overflow-hidden shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                  Dimensão {currentDimensionIndex + 1} de {DIMENSIONS.length}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Obrigatória
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
                {currentDimension.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {currentDimension.description}
              </p>
            </div>

            <div className="hidden sm:flex flex-col items-end text-right shrink-0">
              <span className="text-xs font-semibold text-slate-400">Respondidas</span>
              <span className="text-lg font-extrabold text-emerald-400">
                {currentDimAnsweredCount} / {dimensionQuestions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Response Scale Guide Legend */}
        <div className="bg-[#07152b]/90 border border-slate-800 rounded-xl p-3 mb-6 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            Escala de respostas:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px]">
            {ANSWER_OPTIONS.map((opt) => (
              <span key={opt.value} className="inline-flex items-center gap-1 text-slate-300">
                <span>{opt.emoji}</span>
                <span className="font-medium">{opt.value}. {opt.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 mb-8">
          {dimensionQuestions.map((question) => {
            const currentVal = answers[question.id];
            const isBookmarked = bookmarkedIds.includes(question.id);

            return (
              <div
                key={question.id}
                id={`card-question-${question.id}`}
                className={`bg-[#0b1d38]/85 border rounded-2xl p-4 sm:p-5 transition-all duration-200 ${
                  currentVal !== undefined
                    ? 'border-emerald-500/40 shadow-sm shadow-emerald-950/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-start gap-3">
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        currentVal !== undefined
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {question.number}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                      {question.text}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleBookmark(question.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isBookmarked
                        ? 'text-amber-400 bg-amber-950/40'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                    }`}
                    title={isBookmarked ? 'Marcada para revisar' : 'Marcar para revisar'}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* 5 Likert Buttons (Nunca, Raramente, Às vezes, Frequentemente, Sempre) */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 pt-1">
                  {ANSWER_OPTIONS.map((option) => {
                    const isSelected = currentVal === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        id={`btn-q${question.id}-opt${option.value}`}
                        onClick={() => handleSelectAnswer(question.id, option.value)}
                        className={`flex flex-col items-center justify-center py-2.5 sm:py-3 px-1 rounded-xl border transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold scale-[1.02] shadow-md shadow-emerald-500/25'
                            : 'bg-[#07152b] text-slate-300 border-slate-700/80 hover:border-emerald-500/40 hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="text-base sm:text-xl mb-1">{option.emoji}</span>
                        <span className="text-[10px] sm:text-xs text-center leading-tight whitespace-nowrap">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            id="btn-prev-dimension"
            disabled={currentDimensionIndex === 0}
            onClick={handlePrevDimension}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-colors ${
              currentDimensionIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-500'
                : 'border-slate-700 bg-slate-800 text-white hover:bg-slate-700 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dimensão Anterior</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {currentDimensionIndex < DIMENSIONS.length - 1 ? (
              <button
                type="button"
                id="btn-next-dimension"
                onClick={handleNextDimension}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <span>Próxima: {DIMENSIONS[currentDimensionIndex + 1].shortTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                id="btn-finish-questionnaire"
                onClick={() => setShowConfirmModal(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/30 transition-all cursor-pointer animate-pulse"
              >
                <CheckCircle className="w-4 h-4 text-slate-950" />
                <span>Finalizar Avaliação</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 text-center flex items-center justify-center gap-1.5 text-slate-500 text-xs">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Suas respostas são 100% confidenciais e protegidas.</span>
        </div>
      </main>

      {/* Confirmation Modal before finishing */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1d38] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in duration-200">
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                Confirmar Envio da Avaliação?
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Você respondeu {answeredCount} de {totalQuestions} perguntas.
                {answeredCount < totalQuestions && (
                  <span className="block text-amber-400 mt-1">
                    Atenção: existem {totalQuestions - answeredCount} perguntas sem resposta. As perguntas não respondidas receberão pontuação neutra.
                  </span>
                )}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                id="btn-modal-cancel"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Revisar Respostas
              </button>
              <button
                type="button"
                id="btn-modal-confirm"
                onClick={handleCompleteSubmission}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
              >
                Calcular Resultado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
