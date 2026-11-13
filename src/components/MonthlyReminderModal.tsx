import React, { useState } from 'react';
import { Bell, Calendar, Clock, CheckCircle2, X } from 'lucide-react';
import { Mascot } from './Mascot';

interface MonthlyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MonthlyReminderModal: React.FC<MonthlyReminderModalProps> = ({ isOpen, onClose }) => {
  const [frequency, setFrequency] = useState<'mensal' | 'trimestral'>('mensal');
  const [dayOfMonth, setDayOfMonth] = useState<number>(1);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduled(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isScheduled ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
              Lembrete Ativado com Sucesso!
            </h3>
            <p className="text-xs text-slate-300">
              Você será notificado todo dia <strong>{dayOfMonth} de cada mês</strong> para realizar o acompanhamento do seu bem-estar no trabalho.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                  Lembrete Mensal de Avaliação
                </h2>
                <p className="text-xs text-slate-400">
                  Acompanhe a evolução do seu clima organizacional mês a mês
                </p>
              </div>
            </div>

            <div className="flex justify-center -my-1 mb-3">
              <Mascot pose="welcome" size="sm" speechBubble="Cuidar da rotina todo mês faz toda a diferença!" />
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Periodicidade recomendada
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('mensal')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold ${
                      frequency === 'mensal'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-[#07152b] text-slate-300 border-slate-700'
                    }`}
                  >
                    Mensal (Ideal)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('trimestral')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold ${
                      frequency === 'trimestral'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : 'bg-[#07152b] text-slate-300 border-slate-700'
                    }`}
                  >
                    Trimestral
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Dia de preferência para o lembrete
                </label>
                <select
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(Number(e.target.value))}
                  className="w-full bg-[#07152b] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value={1}>Dia 01 do mês (Início do ciclo)</option>
                  <option value={10}>Dia 10 do mês</option>
                  <option value={15}>Dia 15 do mês (Meio de ciclo)</option>
                  <option value={28}>Dia 28 do mês (Fechamento)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                💡 <strong className="text-slate-300">Por que o acompanhamento mensal?</strong> Avaliações contínuas permitem ao RH e SST detectar aumentos de sobrecarga precocemente, prevenindo o esgotamento profissional (Burnout) e acidentes.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Agendar Notificação Mensal
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
