import React, { useState } from 'react';
import { EDUCATIONAL_ARTICLES } from '../data/mockEnterpriseData';
import { Mascot } from './Mascot';
import { X, BookOpen, Clock, Tag, ExternalLink, ShieldAlert, Sparkles, Brain } from 'lucide-react';

interface EducationalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EducationalModal: React.FC<EducationalModalProps> = ({ isOpen, onClose }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(EDUCATIONAL_ARTICLES[0].id);

  if (!isOpen) return null;

  const currentArticle =
    EDUCATIONAL_ARTICLES.find((a) => a.id === selectedArticleId) || EDUCATIONAL_ARTICLES[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl max-w-3xl w-full h-[88vh] max-h-[700px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-[#07152b]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                Biblioteca de Saúde Mental no Trabalho
              </h2>
              <p className="text-[11px] text-slate-400">
                Guias práticos alinhados à legislação e ao bem-estar ocupacional
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Sidebar List + Article Reader */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 p-3 overflow-y-auto shrink-0 bg-[#07152b]/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
              Artigos Recomendados
            </span>
            <div className="space-y-1.5">
              {EDUCATIONAL_ARTICLES.map((article) => {
                const isSelected = article.id === currentArticle.id;
                return (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-emerald-950/70 border border-emerald-500/40 text-white'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="font-semibold line-clamp-1">{article.title}</span>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>{article.category}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Article View */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {currentArticle.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentArticle.readTime}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
              {currentArticle.title}
            </h3>

            <p className="text-xs text-emerald-400 font-medium italic border-l-2 border-emerald-500 pl-3">
              {currentArticle.summary}
            </p>

            <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line pt-2">
              {currentArticle.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#07152b] flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>Fonte: NR-01, OMS e Ministério do Trabalho</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
