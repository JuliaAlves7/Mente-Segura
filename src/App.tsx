/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AssessmentResult, ScreenState, UserProfile } from './types';
import { calculateScore, generateRecommendations } from './data/questions';
import { LoginScreen } from './components/LoginScreen';
import { ExplanationScreen } from './components/ExplanationScreen';
import { QuestionnaireScreen } from './components/QuestionnaireScreen';
import { ResultScreen } from './components/ResultScreen';
import { ManagerDashboard } from './components/ManagerDashboard';
import { BreathingExerciseModal } from './components/BreathingExerciseModal';
import { SupportChannelModal } from './components/SupportChannelModal';
import { EducationalModal } from './components/EducationalModal';
import { MonthlyReminderModal } from './components/MonthlyReminderModal';
import { ReportPDFModal } from './components/ReportPDFModal';
import {
  Wind,
  BookOpen,
  HeartHandshake,
  Bell,
  LayoutDashboard,
  ShieldCheck,
  History,
  X,
} from 'lucide-react';

const STORAGE_KEY_HISTORY = 'mente_segura_history_v1';
const STORAGE_KEY_PROFILE = 'mente_segura_profile_v1';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('login');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Felipe Silva',
    company: 'Metalúrgica Inovação S.A.',
    department: 'Operacional / Produção',
    role: 'Operador de Máquinas',
    tenure: '2 anos',
    isAnonymous: false,
  });

  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentResult[]>([]);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);

  // Modals
  const [showBreathing, setShowBreathing] = useState<boolean>(false);
  const [showSupport, setShowSupport] = useState<boolean>(false);
  const [showEducation, setShowEducation] = useState<boolean>(false);
  const [showReminder, setShowReminder] = useState<boolean>(false);
  const [showPDFReport, setShowPDFReport] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) {
        setAssessmentHistory(JSON.parse(savedHistory));
      }
      const savedProf = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (savedProf) {
        setUserProfile(JSON.parse(savedProf));
      }
    } catch (e) {
      console.error('Error loading stored assessments', e);
    }
  }, []);

  // Save profile & start
  const handleStartFromLogin = (profile: UserProfile) => {
    setUserProfile(profile);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      // ignore
    }
    setCurrentScreen('explanation');
  };

  // Start actual questionnaire
  const handleStartQuestionnaire = () => {
    setCurrentScreen('questionnaire');
  };

  // Finished questionnaire -> calculate scores and recommendations
  const handleFinishQuestionnaire = (answers: Record<number, number>) => {
    const { overallScore, dimensionScores, riskLevel } = calculateScore(answers);
    const generatedRecommendations = generateRecommendations(dimensionScores);

    const newResult: AssessmentResult = {
      id: `eval_${Date.now()}`,
      date: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      userProfile,
      answers,
      overallScore,
      dimensionScores,
      riskLevel,
      generatedRecommendations,
    };

    setCurrentResult(newResult);
    const updatedHistory = [newResult, ...assessmentHistory];
    setAssessmentHistory(updatedHistory);
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
    } catch (e) {
      // ignore
    }

    setCurrentScreen('results');
  };

  return (
    <div className="relative min-h-screen bg-[#061224] font-sans antialiased text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Active Screen Render */}
      {currentScreen === 'login' && (
        <LoginScreen
          savedProfile={userProfile}
          onStart={handleStartFromLogin}
          onGoToManager={() => setCurrentScreen('manager')}
        />
      )}

      {currentScreen === 'explanation' && (
        <ExplanationScreen
          userProfile={userProfile}
          onStartQuestionnaire={handleStartQuestionnaire}
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'questionnaire' && (
        <QuestionnaireScreen
          userProfile={userProfile}
          onFinish={handleFinishQuestionnaire}
          onCancel={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'results' && currentResult && (
        <ResultScreen
          result={currentResult}
          onGoToManager={() => setCurrentScreen('manager')}
          onRestart={() => setCurrentScreen('login')}
          onOpenBreathing={() => setShowBreathing(true)}
          onOpenSupport={() => setShowSupport(true)}
          onExportPDF={() => setShowPDFReport(true)}
        />
      )}

      {currentScreen === 'manager' && (
        <ManagerDashboard
          userAssessments={assessmentHistory}
          onBackToApp={() => setCurrentScreen('login')}
          onExportPDF={() => setShowPDFReport(true)}
        />
      )}

      {/* Persistent Floating Utility Bar at Bottom Right (Hidden during questionnaire for focus) */}
      {currentScreen !== 'questionnaire' && (
        <aside className="fixed bottom-4 right-4 z-40 flex flex-wrap items-center justify-end gap-2 bg-[#0b1d38]/90 border border-slate-700/80 p-1.5 sm:p-2 rounded-2xl backdrop-blur-md shadow-2xl">
          <button
            type="button"
            id="btn-quick-breathing"
            onClick={() => setShowBreathing(true)}
            title="Exercício de Respiração"
            className="p-2 text-cyan-400 hover:bg-slate-800/80 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <Wind className="w-4 h-4" />
            <span className="hidden md:inline">Respiração</span>
          </button>

          <button
            type="button"
            id="btn-quick-education"
            onClick={() => setShowEducation(true)}
            title="Biblioteca de Saúde Mental"
            className="p-2 text-emerald-400 hover:bg-slate-800/80 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Biblioteca</span>
          </button>

          <button
            type="button"
            id="btn-quick-support"
            onClick={() => setShowSupport(true)}
            title="Canal de Apoio RH"
            className="p-2 text-pink-400 hover:bg-slate-800/80 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <HeartHandshake className="w-4 h-4" />
            <span className="hidden md:inline">Apoio RH</span>
          </button>

          <button
            type="button"
            id="btn-quick-reminder"
            onClick={() => setShowReminder(true)}
            title="Lembrete Mensal"
            className="p-2 text-amber-400 hover:bg-slate-800/80 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <Bell className="w-4 h-4" />
            <span className="hidden md:inline">Lembrete</span>
          </button>

          {assessmentHistory.length > 0 && (
            <button
              type="button"
              id="btn-quick-history"
              onClick={() => setShowHistoryModal(true)}
              title="Histórico de Avaliações"
              className="p-2 text-purple-400 hover:bg-slate-800/80 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <History className="w-4 h-4" />
              <span className="hidden md:inline">Histórico ({assessmentHistory.length})</span>
            </button>
          )}

          {currentScreen !== 'manager' && (
            <button
              type="button"
              id="btn-quick-manager"
              onClick={() => setCurrentScreen('manager')}
              className="p-2 bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 rounded-xl transition-colors flex items-center gap-1.5 text-xs shadow-md shadow-emerald-500/20"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Painel SST / RH</span>
            </button>
          )}
        </aside>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1d38] border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                  Histórico de Avaliações Realizadas
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
              {assessmentHistory.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-[#07152b] border border-slate-800 rounded-2xl p-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-white block">
                      {item.userProfile.name} ({item.userProfile.department})
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.completedAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm text-emerald-400">
                      {item.overallScore} pts
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentResult(item);
                        setCurrentScreen('results');
                        setShowHistoryModal(false);
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold text-[11px]"
                    >
                      Abrir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <BreathingExerciseModal
        isOpen={showBreathing}
        onClose={() => setShowBreathing(false)}
      />

      <SupportChannelModal
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
        userProfile={userProfile}
      />

      <EducationalModal
        isOpen={showEducation}
        onClose={() => setShowEducation(false)}
      />

      <MonthlyReminderModal
        isOpen={showReminder}
        onClose={() => setShowReminder(false)}
      />

      <ReportPDFModal
        isOpen={showPDFReport}
        onClose={() => setShowPDFReport(false)}
        result={currentResult || undefined}
      />
    </div>
  );
}
