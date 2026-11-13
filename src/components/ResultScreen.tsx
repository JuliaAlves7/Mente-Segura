import React, { useEffect, useState } from 'react';
import { AssessmentResult, DimensionId } from '../types';
import { DIMENSIONS, getRiskBadge } from '../data/questions';
import { Logo } from './Logo';
import { Mascot } from './Mascot';
import confetti from 'canvas-confetti';
import {
  Download,
  Share2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Shield,
  FileText,
  Heart,
  Wind,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface ResultScreenProps {
  result: AssessmentResult;
  onGoToManager: () => void;
  onRestart: () => void;
  onOpenBreathing: () => void;
  onOpenSupport: () => void;
  onExportPDF: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onGoToManager,
  onRestart,
  onOpenBreathing,
  onOpenSupport,
  onExportPDF,
}) => {
  const [activeTab, setActiveTab] = useState<'resultado' | 'recomendacoes' | 'pgr'>('resultado');
  const riskInfo = getRiskBadge(result.riskLevel);

  useEffect(() => {
    if (result.overallScore >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#34D399', '#22D3EE', '#F59E0B'],
      });
    }
  }, [result.overallScore]);

  return (
    <div className="min-h-screen bg-[#061224] text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-2 border-b border-slate-800/80 pb-4 mb-6">
        <Logo size="sm" showSubtitle={false} />

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="btn-export-pdf-top"
            onClick={onExportPDF}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 hover:bg-emerald-900/60 px-3 py-2 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar Relatório PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>

          <button
            type="button"
            id="btn-restart-eval"
            onClick={onRestart}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nova Avaliação</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto flex-1">
        {/* Navigation Tabs between Screen 4 (Resultado) and Screen 5 (Recomendações / PGR) */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          <button
            type="button"
            id="tab-resultado"
            onClick={() => setActiveTab('resultado')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'resultado'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>4ª Tela: Resultado e Pontuação</span>
          </button>

          <button
            type="button"
            id="tab-recomendacoes"
            onClick={() => setActiveTab('recomendacoes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'recomendacoes'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>5ª Tela: Recomendações Automáticas</span>
          </button>

          <button
            type="button"
            id="tab-pgr"
            onClick={() => setActiveTab('pgr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 hidden sm:flex ${
              activeTab === 'pgr'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Plano de Ação PGR (NR-01)</span>
          </button>
        </div>

        {activeTab === 'resultado' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Primary Score Hero Card */}
            <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Score Gauge Circle */}
                <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                    {/* SVG Gauge */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#1E293B"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke={riskInfo.colorHex}
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 50}
                        strokeDashoffset={2 * Math.PI * 50 * (1 - result.overallScore / 100)}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
                        {result.overallScore}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        de 100 pontos
                      </span>
                    </div>
                  </div>

                  <div className={`mt-3 px-4 py-1.5 rounded-full text-xs font-bold border ${riskInfo.badgeClass}`}>
                    {riskInfo.label}
                  </div>
                </div>

                {/* Score Explanation & Benchmark */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Diagnóstico Concluído
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
                      Índice de Risco Psicossocial
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Colaborador: <strong className="text-white">{result.userProfile.name}</strong> •{' '}
                      Setor: <strong className="text-white">{result.userProfile.department}</strong>
                    </p>
                  </div>

                  {/* Benchmark Ranges Table from Prompt */}
                  <div className="bg-[#07152b] border border-slate-800 rounded-2xl p-3.5 space-y-2 text-xs">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Escala Oficial de Referência Mente Segura:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className={`p-2 rounded-xl border ${result.riskLevel === 'baixo' ? 'bg-emerald-950/60 border-emerald-500' : 'bg-slate-900/50 border-slate-800'}`}>
                        <div className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                          <span>🟢</span> 80–100
                        </div>
                        <span className="text-[10px] text-slate-300 block">Baixo Risco</span>
                      </div>

                      <div className={`p-2 rounded-xl border ${result.riskLevel === 'moderado' ? 'bg-amber-950/60 border-amber-500' : 'bg-slate-900/50 border-slate-800'}`}>
                        <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
                          <span>🟡</span> 60–79
                        </div>
                        <span className="text-[10px] text-slate-300 block">Risco Moderado</span>
                      </div>

                      <div className={`p-2 rounded-xl border ${result.riskLevel === 'alto' ? 'bg-orange-950/60 border-orange-500' : 'bg-slate-900/50 border-slate-800'}`}>
                        <div className="flex items-center gap-1 text-orange-400 font-bold text-[11px]">
                          <span>🟠</span> 40–59
                        </div>
                        <span className="text-[10px] text-slate-300 block">Alto Risco</span>
                      </div>

                      <div className={`p-2 rounded-xl border ${result.riskLevel === 'critico' ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900/50 border-slate-800'}`}>
                        <div className="flex items-center gap-1 text-rose-400 font-bold text-[11px]">
                          <span>🔴</span> &lt; 40
                        </div>
                        <span className="text-[10px] text-slate-300 block">Risco Crítico</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('recomendacoes')}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
                    >
                      <span>Ver Recomendações Automáticas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={onOpenBreathing}
                      className="px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Wind className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Exercício de Respiração</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Score by 7 Dimensions Breakdown */}
            <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                    Desempenho por Dimensão Psicossocial
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pontuações detalhadas para subsidiar o plano de melhorias (0 a 100 pontos)
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                  7 Dimensões NR-01
                </span>
              </div>

              <div className="space-y-3.5">
                {DIMENSIONS.map((dim) => {
                  const score = result.dimensionScores[dim.id] || 0;
                  const isLow = score < 60;
                  const isModerate = score >= 60 && score < 80;

                  return (
                    <div
                      key={dim.id}
                      className="bg-[#07152b] border border-slate-800 rounded-2xl p-3.5 sm:p-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">{dim.title}</span>
                          {isLow && (
                            <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full border border-rose-500/40">
                              Atenção Imediata
                            </span>
                          )}
                          {isModerate && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                              Acompanhar
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-white">{score}</span>
                          <span className="text-[11px] text-slate-400">/100</span>
                        </div>
                      </div>

                      {/* Bar indicator */}
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${score}%`,
                            backgroundColor: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : score >= 40 ? '#F97316' : '#EF4444',
                          }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5">{dim.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 5ª Tela: Recomendações Automáticas */}
        {activeTab === 'recomendacoes' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      5ª Tela • Algoritmo Diagnóstico
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white font-['Outfit',sans-serif]">
                    Recomendações Automáticas de Melhoria
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Sugestões geradas conforme os pontos de atenção identificados no seu questionário.
                  </p>
                </div>

                <div className="shrink-0">
                  <Mascot pose="support" size="sm" />
                </div>
              </div>

              {/* Recommendations Cards */}
              <div className="space-y-4">
                {result.generatedRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-[#07152b] border border-slate-700/70 rounded-2xl p-5 hover:border-emerald-500/40 transition-all shadow-md"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h4 className="text-base font-bold text-white">{rec.title}</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      {/* Para a Organização / Empresa */}
                      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">
                          🏢 Ação Recomendada para a Organização / RH:
                        </span>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed">
                          {rec.companyAction}
                        </p>
                      </div>

                      {/* Para o Colaborador */}
                      <div className="bg-sky-950/30 border border-sky-500/30 rounded-xl p-3.5">
                        <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-1.5">
                          💡 Dica Prática de Bem-Estar Pessoal:
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">{rec.userTip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions Footer */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  id="btn-goto-support-channel"
                  onClick={onOpenSupport}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-950/50 border border-pink-500/30 text-pink-300 text-xs font-semibold hover:bg-pink-900/50 transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>Precisa de Ajuda? Fale com o Canal Confidencial</span>
                </button>

                <button
                  type="button"
                  id="btn-goto-manager-from-rec"
                  onClick={onGoToManager}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <span>Acessar Painel do Gestor / SST (PGR)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PGR Action Plan Tab */}
        {activeTab === 'pgr' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Diferencial Técnico em Segurança do Trabalho
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white font-['Outfit',sans-serif]">
                    Plano de Ação Alinhado ao Ciclo PGR (NR-01)
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    Metodologia 5W2H para controle sistemático de riscos psicossociais ocupacionais.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onExportPDF}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF Laudo PGR</span>
                </button>
              </div>

              <div className="space-y-4">
                {result.generatedRecommendations.map((rec, i) => (
                  <div key={i} className="bg-[#07152b] border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-400">
                        Ação #{i + 1} • {rec.title}
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full">
                        Prioridade Alta
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <strong className="text-white block text-[11px] text-emerald-400 mb-0.5">O QUE (What):</strong>
                        {rec.pgrAction.what}
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <strong className="text-white block text-[11px] text-emerald-400 mb-0.5">POR QUÊ (Why):</strong>
                        {rec.pgrAction.why}
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <strong className="text-white block text-[11px] text-emerald-400 mb-0.5">QUEM (Who):</strong>
                        {rec.pgrAction.who}
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <strong className="text-white block text-[11px] text-emerald-400 mb-0.5">ONDE (Where):</strong>
                        {rec.pgrAction.where}
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <strong className="text-white block text-[11px] text-emerald-400 mb-0.5">QUANDO (When):</strong>
                        {rec.pgrAction.when}
                      </div>

                      <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <strong className="text-white block text-[11px] text-emerald-400 mb-0.5">COMO (How):</strong>
                        {rec.pgrAction.how}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto text-center py-4 border-t border-slate-800 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 mt-8">
        <span>MENTE SEGURA • Cuidar da mente é proteger a vida</span>
        <span>Conforme Portaria SEPRT 6.730/2020 e NR-01</span>
      </footer>
    </div>
  );
};
