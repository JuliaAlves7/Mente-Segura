import React from 'react';
import { AssessmentResult } from '../types';
import { DIMENSIONS, getRiskBadge } from '../data/questions';
import { Logo } from './Logo';
import { X, Printer, Download, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';

interface ReportPDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  result?: AssessmentResult;
}

export const ReportPDFModal: React.FC<ReportPDFModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  const userProfile = result?.userProfile || {
    name: 'Avaliação Geral Integrada',
    company: 'Indústria Exemplo Brasil S.A.',
    department: 'Produção & Operações',
    role: 'Quadro Operacional',
    tenure: 'Geral',
    isAnonymous: false,
  };

  const score = result?.overallScore ?? 72;
  const riskLevel = result?.riskLevel ?? 'moderado';
  const riskBadge = getRiskBadge(riskLevel);
  const dimensionScores = result?.dimensionScores || {
    demandas: 58,
    controle: 70,
    apoio_chefia: 74,
    apoio_colegas: 82,
    relacionamentos: 68,
    cargo: 85,
    mudancas: 65,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-w-none print:w-full print:h-auto print:max-h-none print:bg-white print:text-black">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-[#07152b] print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-white">Visualização do Laudo Técnico PGR (NR-01)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              id="btn-print-report"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar em PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Paper Viewport */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 print:overflow-visible print:p-8 font-sans">
          {/* Official Document Header */}
          <div className="border-b-2 border-slate-800 pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Laudo Técnico Ocupacional
                </span>
                <span className="text-xs text-slate-500">Portaria SEPRT nº 6.730/2020</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Relatório de Avaliação de Riscos Psicossociais
              </h1>
              <p className="text-xs text-slate-600">
                Alinhado ao Programa de Gerenciamento de Riscos (PGR - Norma Regulamentadora nº 01)
              </p>
            </div>

            <div className="text-right text-xs text-slate-600 sm:border-l sm:border-slate-300 sm:pl-4">
              <p><strong>Emissão:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
              <p><strong>Código Doc:</strong> MS-PGR-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p><strong>Status:</strong> Válido para Ciclo Anual</p>
            </div>
          </div>

          {/* Identification Grid */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-slate-500 block uppercase text-[10px] font-bold">Empresa</span>
              <span className="font-bold text-slate-900">{userProfile.company}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px] font-bold">Setor / Área</span>
              <span className="font-bold text-slate-900">{userProfile.department}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px] font-bold">Avaliador / Colaborador</span>
              <span className="font-bold text-slate-900">{userProfile.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block uppercase text-[10px] font-bold">Cargo</span>
              <span className="font-bold text-slate-900">{userProfile.role}</span>
            </div>
          </div>

          {/* Primary Assessment Results Block */}
          <div className="border border-slate-200 rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full border-4 border-emerald-600 flex flex-col items-center justify-center bg-white shadow-inner">
                <span className="text-2xl font-black text-slate-900">{score}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase">Pontos</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Índice Consolidado de Risco Psicossocial
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 capitalize">
                  {riskBadge.label}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-md">
                  A pontuação indica a probabilidade e severidade de estressores psicossociais no ambiente de trabalho, conforme metodologia NR-01.
                </p>
              </div>
            </div>

            <div className="text-right text-xs">
              <div className="border border-slate-300 rounded-lg p-2.5 bg-white space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-500">Escala de Risco:</div>
                <div className="text-[11px]"><span className="text-emerald-700 font-bold">80-100:</span> Baixo Risco</div>
                <div className="text-[11px]"><span className="text-amber-600 font-bold">60-79:</span> Risco Moderado</div>
                <div className="text-[11px]"><span className="text-orange-600 font-bold">40-59:</span> Alto Risco</div>
                <div className="text-[11px]"><span className="text-red-600 font-bold">&lt; 40:</span> Risco Crítico</div>
              </div>
            </div>
          </div>

          {/* 7 Dimensions Table */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              1. Avaliação Detalhada por Dimensão Psicossocial
            </h4>

            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Dimensão Avaliada</th>
                  <th className="py-2.5 px-3">Pontuação</th>
                  <th className="py-2.5 px-3">Classificação</th>
                  <th className="py-2.5 px-3">Conduta Recomendada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {DIMENSIONS.map((dim) => {
                  const dimScore = dimensionScores[dim.id] || 70;
                  const dimRisk = dimScore >= 80 ? 'Baixo Risco' : dimScore >= 60 ? 'Moderado' : 'Alto Risco';

                  return (
                    <tr key={dim.id}>
                      <td className="py-2 px-3 font-semibold text-slate-900">{dim.title}</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{dimScore} / 100</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          dimScore >= 80 ? 'bg-emerald-100 text-emerald-800' : dimScore >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {dimRisk}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        {dimScore < 70 ? 'Requer medida corretiva no PGR' : 'Manter medidas preventivas existentes'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 5W2H Action Plan */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              2. Plano de Ação Recomendado (Metodologia 5W2H - PGR)
            </h4>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead className="bg-slate-100 text-slate-800 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">O Que (What)</th>
                    <th className="py-2 px-3">Por Quê (Why)</th>
                    <th className="py-2 px-3">Quem (Who)</th>
                    <th className="py-2 px-3">Onde (Where)</th>
                    <th className="py-2 px-3">Quando (When)</th>
                    <th className="py-2 px-3">Como (How)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-2 px-3 font-medium">Equalização de Cargas e Prazos</td>
                    <td className="py-2 px-3">Diminuir estresse por volume excessivo de entregas</td>
                    <td className="py-2 px-3">Liderança imediata + RH</td>
                    <td className="py-2 px-3">{userProfile.department}</td>
                    <td className="py-2 px-3">30 dias</td>
                    <td className="py-2 px-3">Auditoria de processos e pausas obrigatórias</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Capacitação em Liderança Positiva</td>
                    <td className="py-2 px-3">Fortalecer suporte e clareza de papéis</td>
                    <td className="py-2 px-3">Treinamento & Desenvolvimento</td>
                    <td className="py-2 px-3">Setor Corporativo</td>
                    <td className="py-2 px-3">45 dias</td>
                    <td className="py-2 px-3">Workshops de feedback e escuta empática</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Canal de Acolhimento e Prevenção</td>
                    <td className="py-2 px-3">Garantir sigilo e prevenção de conflitos</td>
                    <td className="py-2 px-3">CIPA + SESMT</td>
                    <td className="py-2 px-3">Toda a organização</td>
                    <td className="py-2 px-3">Imediato</td>
                    <td className="py-2 px-3">Disponibilização de ouvidoria ética e canal seguro</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Formal Signature Area */}
          <div className="pt-6 border-t-2 border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <div className="border-b border-slate-400 pb-1 mb-1 mx-auto max-w-xs h-10"></div>
              <p className="font-bold text-slate-900">Técnico em Segurança do Trabalho (SST)</p>
              <p className="text-slate-500 text-[10px]">Registro MTE / CREA</p>
            </div>

            <div>
              <div className="border-b border-slate-400 pb-1 mb-1 mx-auto max-w-xs h-10"></div>
              <p className="font-bold text-slate-900">Gestão de Recursos Humanos / DHO</p>
              <p className="text-slate-500 text-[10px]">Representante Legal da Organização</p>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center text-[10px] text-slate-400 border-t border-slate-200 pt-3">
            Documento gerado pelo sistema Mente Segura • Em conformidade com a Norma Regulamentadora nº 01 (Portaria 6.730/2020)
          </div>
        </div>
      </div>
    </div>
  );
};
