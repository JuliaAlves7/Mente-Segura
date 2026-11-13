import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Mascot } from './Mascot';
import { X, Send, HeartHandshake, Lock, CheckCircle2, Shield, EyeOff } from 'lucide-react';

interface SupportChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
}

export const SupportChannelModal: React.FC<SupportChannelModalProps> = ({
  isOpen,
  onClose,
  userProfile,
}) => {
  const [category, setCategory] = useState<string>('Carga de Trabalho');
  const [message, setMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(userProfile?.isAnonymous || false);
  const [contactInfo, setContactInfo] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
              Solicitação Enviada com Segurança
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Sua mensagem foi registrada de forma restrita e confidencial para a equipe de Recursos Humanos e Segurança do Trabalho. Acolhimento e sigilo são premissas absolutas.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
            >
              Concluir e Fechar
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                  Canal de Apoio ao Colaborador (RH & SST)
                </h2>
                <p className="text-xs text-slate-400">
                  Espaço seguro para relatar dificuldades, sobrecarga ou solicitar orientação.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Motivo do contato
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#07152b] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Carga de Trabalho">Sobrecarga de trabalho ou prazos impraticáveis</option>
                  <option value="Conflito interpessoal">Conflito interpessoal ou desgaste no clima</option>
                  <option value="Orientação de Saúde Mental">Orientação sobre estresse e saúde mental</option>
                  <option value="Relato Confidencial">Relato confidencial de situação adversa</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Mensagem / Descrição da situação
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva como você está se sentindo ou o que podemos fazer para ajudar..."
                  className="w-full bg-[#07152b] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Anonymous Toggle */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-slate-200 font-medium">Enviar de forma 100% anônima</span>
                </div>

                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                />
              </div>

              {!isAnonymous && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Como prefere receber retorno? <span className="text-slate-500">(E-mail, ramal ou telefone)</span>
                  </label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Ex: seu.email@empresa.com ou ramal 1234"
                    className="w-full bg-[#07152b] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 text-xs font-bold hover:from-emerald-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Solicitação de Apoio</span>
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Garantia de acolhimento ético e confidencialidade.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
