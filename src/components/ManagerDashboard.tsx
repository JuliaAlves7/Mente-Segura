import React, { useState } from 'react';
import { AssessmentResult, RiskLevel, SectorMetric } from '../types';
import {
  INITIAL_SECTOR_METRICS,
  MONTHLY_EVOLUTION_DATA,
  RADAR_DATA_GLOBAL,
  RISK_PIE_DATA,
} from '../data/mockEnterpriseData';
import { DIMENSIONS, getRiskBadge } from '../data/questions';
import { Logo } from './Logo';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
} from 'recharts';
import {
  ShieldAlert,
  ShieldCheck,
  Download,
  Users,
  Building2,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  ArrowLeft,
  Filter,
  CheckCircle2,
  PieChart as PieIcon,
  BarChart3,
  Activity,
  PlusCircle,
  HelpCircle,
  Eye,
} from 'lucide-react';

interface ManagerDashboardProps {
  userAssessments: AssessmentResult[];
  onBackToApp: () => void;
  onExportPDF: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  userAssessments,
  onBackToApp,
  onExportPDF,
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('todos');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('6meses');
  const [activeTab, setActiveTab] = useState<'indicadores' | 'graficos' | 'setores' | 'pgr'>('indicadores');

  // Calculate stats including any user completed assessments
  const totalBaseEvaluations = INITIAL_SECTOR_METRICS.reduce((acc, curr) => acc + curr.evaluationsCount, 0);
  const totalEvaluations = totalBaseEvaluations + userAssessments.length;

  const totalWeightedScore =
    INITIAL_SECTOR_METRICS.reduce((acc, curr) => acc + curr.avgScore * curr.evaluationsCount, 0) +
    userAssessments.reduce((acc, curr) => acc + curr.overallScore, 0);
  const companyAverage = Math.round(totalWeightedScore / totalEvaluations);

  // Sector with highest risk (lowest score)
  const sectorList = [...INITIAL_SECTOR_METRICS];
  const sortedSectors = [...sectorList].sort((a, b) => a.avgScore - b.avgScore);
  const highestRiskSector = sortedSectors[0];

  // Bar chart data formatted
  const barChartData = INITIAL_SECTOR_METRICS.map((s) => ({
    name: s.sector.split(' ')[0], // short name
    fullName: s.sector,
    score: s.avgScore,
    risk: s.riskLevel,
    avaliacoes: s.evaluationsCount,
  }));

  return (
    <div className="min-h-screen bg-[#061224] text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Header */}
      <header className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="btn-back-to-collaborator"
            onClick={onBackToApp}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Modo Colaborador</span>
          </button>

          <Logo size="sm" showSubtitle={false} />

          <span className="text-xs bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Módulo Gestor / Técnico de Segurança (SST)</span>
          </span>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            type="button"
            id="btn-manager-export-pdf"
            onClick={onExportPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>Exportar Laudo PGR Técnico (PDF)</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto flex-1">
        {/* Title and Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit',sans-serif]">
              Painel de Riscos Psicossociais & NR-01
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Indicadores consolidados para subsidiar o Programa de Gerenciamento de Riscos (PGR)
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#0b1d38] border border-slate-700/80 p-1.5 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-emerald-400 ml-2" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none pr-3 py-1 cursor-pointer"
            >
              <option value="todos" className="bg-slate-900">Todos os Setores</option>
              {INITIAL_SECTOR_METRICS.map((s) => (
                <option key={s.sector} value={s.sector} className="bg-slate-900">
                  {s.sector}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1: Quantidade de Avaliações */}
          <div className="bg-[#0b1d38] border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Avaliações Realizadas</span>
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white font-['Outfit',sans-serif]">
              {totalEvaluations}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-2 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+18% de adesão no último ciclo</span>
            </div>
          </div>

          {/* Card 2: Média Geral da Empresa */}
          <div className="bg-[#0b1d38] border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Média Geral da Empresa</span>
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-white font-['Outfit',sans-serif]">
                {companyAverage}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/ 100 pts</span>
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mt-2 bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Risco Moderado Geral
            </div>
          </div>

          {/* Card 3: Setor com Maior Risco */}
          <div className="bg-[#0b1d38] border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Setor com Maior Risco</span>
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-bold text-white leading-tight font-['Outfit',sans-serif]">
              {highestRiskSector.sector}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-rose-400 mt-2 font-medium">
              <AlertTriangle className="w-3 h-3" />
              <span>Média: {highestRiskSector.avgScore} pts ({highestRiskSector.highestRiskDimension})</span>
            </div>
          </div>

          {/* Card 4: Conformidade NR-01 / PGR */}
          <div className="bg-[#0b1d38] border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Status no Ciclo PGR</span>
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-bold text-emerald-300 font-['Outfit',sans-serif]">
              Inventário Atualizado
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Plano de ação 5W2H gerado para {INITIAL_SECTOR_METRICS.length} setores
            </div>
          </div>
        </div>

        {/* Dashboard Section Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            id="tab-manager-graficos"
            onClick={() => setActiveTab('indicadores')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'indicadores'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Gráficos Integrados (4 Modelos)</span>
          </button>

          <button
            type="button"
            id="tab-manager-setores"
            onClick={() => setActiveTab('setores')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'setores'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Comparação Entre Setores</span>
          </button>

          <button
            type="button"
            id="tab-manager-pgr"
            onClick={() => setActiveTab('pgr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'pgr'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Matriz & Plano de Ação PGR</span>
          </button>
        </div>

        {/* 4 Required Charts: Pizza, Barras, Radar, Linha */}
        {activeTab === 'indicadores' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico 1: Pizza / Donut (Nível de Risco Geral) */}
              <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit',sans-serif]">
                      <PieIcon className="w-4 h-4 text-emerald-400" />
                      <span>1. Gráfico de Pizza: Nível de Risco</span>
                    </h3>
                    <p className="text-xs text-slate-400">Distribuição percentual dos colaboradores avaliados</p>
                  </div>
                </div>

                <div className="h-64 sm:h-72 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={RISK_PIE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {RISK_PIE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#07152b', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gráfico 2: Barras (Resultado por Setor) */}
              <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit',sans-serif]">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      <span>2. Gráfico de Barras: Resultado por Setor</span>
                    </h3>
                    <p className="text-xs text-slate-400">Pontuação média de 0 a 100 pontos por departamento</p>
                  </div>
                </div>

                <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 15, right: 10, left: -20, bottom: 25 }}>
                      <XAxis
                        dataKey="name"
                        stroke="#94A3B8"
                        fontSize={10}
                        interval={0}
                        angle={-25}
                        textAnchor="end"
                      />
                      <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#07152b', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                        formatter={(val: any) => [`${val} pontos`, 'Média Setorial']}
                      />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                        {barChartData.map((entry, index) => (
                          <Cell
                            key={`bar-${index}`}
                            fill={entry.score >= 80 ? '#10B981' : entry.score >= 60 ? '#F59E0B' : '#F97316'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gráfico 3: Radar (Sete Dimensões Psicossociais) */}
              <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit',sans-serif]">
                      <Activity className="w-4 h-4 text-purple-400" />
                      <span>3. Gráfico Radar: As 7 Dimensões</span>
                    </h3>
                    <p className="text-xs text-slate-400">Comparativo: Média Empresa vs. Setor Crítico vs. Meta Ideal</p>
                  </div>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={RADAR_DATA_GLOBAL} outerRadius="75%">
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="dimension" stroke="#CBD5E1" fontSize={10} />
                      <PolarRadiusAxis stroke="#64748B" angle={30} domain={[0, 100]} fontSize={10} />
                      <Radar name="Média Empresa" dataKey="empresa" stroke="#10B981" fill="#10B981" fillOpacity={0.35} />
                      <Radar name="Setor Crítico (Produção)" dataKey="setorCritico" stroke="#F97316" fill="#F97316" fillOpacity={0.25} />
                      <Radar name="Meta Ideal" dataKey="ideal" stroke="#38BDF8" strokeDasharray="3 3" fill="none" />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#07152b', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gráfico 4: Linha (Evolução Mensal) */}
              <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2 font-['Outfit',sans-serif]">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>4. Gráfico de Linha: Evolução Mensal</span>
                    </h3>
                    <p className="text-xs text-slate-400">Histórico de acompanhamento contínuo dos últimos 6 meses</p>
                  </div>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MONTHLY_EVOLUTION_DATA} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} domain={[40, 90]} />
                      <Tooltip contentStyle={{ backgroundColor: '#07152b', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Line type="monotone" dataKey="mediaEmpresa" name="Média Geral" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="operacional" name="Produção" stroke="#F97316" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="comercial" name="Comercial" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="ti" name="TI" stroke="#38BDF8" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Comparação Entre Setores */}
        {activeTab === 'setores' && (
          <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                  Matriz Comparativa de Riscos por Setor
                </h3>
                <p className="text-xs text-slate-400">
                  Ranking dos departamentos para priorização de intervenções preventivas
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#07152b] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Setor / Área</th>
                    <th className="py-3 px-4">Avaliações</th>
                    <th className="py-3 px-4">Pontuação Média</th>
                    <th className="py-3 px-4">Classificação de Risco</th>
                    <th className="py-3 px-4">Dimensão Mais Crítica</th>
                    <th className="py-3 px-4 text-right">Ação PGR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {INITIAL_SECTOR_METRICS.map((s, idx) => {
                    const badge = getRiskBadge(s.riskLevel);

                    return (
                      <tr key={s.sector} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          {s.sector}
                        </td>
                        <td className="py-3.5 px-4">{s.evaluationsCount} colaboradores</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-white text-sm">{s.avgScore}</span>
                            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${s.avgScore}%`, backgroundColor: badge.colorHex }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.badgeClass}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 font-medium">{s.highestRiskDimension}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={onExportPDF}
                            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold px-2 py-1 bg-emerald-950/40 rounded-lg border border-emerald-500/20"
                          >
                            Gerar Laudo
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Matriz & Plano de Ação PGR */}
        {activeTab === 'pgr' && (
          <div className="space-y-6">
            {/* PGR Explanation Card */}
            <div className="bg-[#0b1d38] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Diferencial Técnico em Segurança do Trabalho</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
                    Alinhamento ao Ciclo PGR (NR-01)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                    O aplicativo Mente Segura conecta a identificação de perigos psicossociais com o Inventário de Riscos e o Plano de Ação 5W2H, exigência legal da NR-01 para todas as organizações.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onExportPDF}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-md shadow-emerald-500/25 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Laudo Técnico Completo</span>
                </button>
              </div>

              {/* Matriz de Severidade x Probabilidade */}
              <div className="bg-[#07152b] border border-slate-800 rounded-2xl p-5 mb-6">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Matriz de Classificação de Risco Psicossocial (Severidade × Probabilidade)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                    <span className="font-bold text-emerald-400 block mb-1">Nível 1: Baixo Risco (80-100)</span>
                    <p className="text-[11px] text-slate-300">
                      Probabilidade Rara • Severidade Leve. Manter monitoramento contínuo e canais de escuta ativos.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
                    <span className="font-bold text-amber-400 block mb-1">Nível 2: Moderado (60-79)</span>
                    <p className="text-[11px] text-slate-300">
                      Probabilidade Possível • Severidade Moderada. Implementar melhorias em prazos e liderança.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-orange-950/40 border border-orange-500/30">
                    <span className="font-bold text-orange-400 block mb-1">Nível 3: Alto Risco (40-59)</span>
                    <p className="text-[11px] text-slate-300">
                      Probabilidade Frequente • Severidade Alta. Revisão ergonômica cognitiva e redistribuição em 30 dias.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30">
                    <span className="font-bold text-rose-400 block mb-1">Nível 4: Crítico (&lt; 40)</span>
                    <p className="text-[11px] text-slate-300">
                      Probabilidade Iminente • Severidade Crítica. Intervenção imediata da diretoria e comitê de crise.
                    </p>
                  </div>
                </div>
              </div>

              {/* Master 5W2H Action Plan Table */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Plano de Ação 5W2H Consolidado (Ciclo Anual de Melhoria Contínua)
                </h4>

                <div className="space-y-3">
                  {[
                    {
                      what: 'Auditoria de Jornada e Redistribuição da Carga Operacional',
                      why: 'Reduzir a sobrecarga crônica no setor de Produção (Demandas com score 38)',
                      who: 'Engenheiro de Segurança + Gerente de Fábrica + RH',
                      where: 'Pavilhão Operacional / Linha de Montagem',
                      when: 'Início imediato com conclusão em 20 dias',
                      how: 'Mapeamento de tempos e movimentos e limite de horas extras',
                      status: 'Em Andamento',
                      priority: 'Alta',
                    },
                    {
                      what: 'Programa de Desenvolvimento de Liderança Humanizada',
                      why: 'Elevar o apoio da chefia e reduzir ruídos nos feedbacks',
                      who: 'Consultoria de RH / DHO + SESMT',
                      where: 'Todas as gerências e supervisões',
                      when: 'Seminários mensais a partir de Outubro/2026',
                      how: 'Workshops práticos de escuta ativa e reuniões 1:1 quinzenais',
                      status: 'Pendente',
                      priority: 'Média',
                    },
                    {
                      what: 'Campanha de Convivência Saudável e Prevenção de Conflitos',
                      why: 'Assegurar ambiente livre de assédio e atritos interpessoais',
                      who: 'CIPA + Comitê de Ética',
                      where: 'Todos os canais internos da organização',
                      when: 'Novembro/2026 (Semana Interna SIPAT)',
                      how: 'Palestras interativas, dinâmicas de integração e divulgação da ouvidoria anônima',
                      status: 'Pendente',
                      priority: 'Média',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#07152b] border border-slate-800 rounded-2xl p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                        <span className="text-xs font-bold text-white">{item.what}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full">
                            {item.priority}
                          </span>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-[11px] text-slate-300">
                        <div>
                          <strong className="text-emerald-400 block text-[10px]">POR QUÊ:</strong> {item.why}
                        </div>
                        <div>
                          <strong className="text-emerald-400 block text-[10px]">QUEM:</strong> {item.who}
                        </div>
                        <div>
                          <strong className="text-emerald-400 block text-[10px]">ONDE:</strong> {item.where}
                        </div>
                        <div>
                          <strong className="text-emerald-400 block text-[10px]">QUANDO:</strong> {item.when}
                        </div>
                        <div className="sm:col-span-2">
                          <strong className="text-emerald-400 block text-[10px]">COMO:</strong> {item.how}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center py-4 border-t border-slate-800 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 mt-8">
        <span>MENTE SEGURA • Módulo Gestão SST & RH</span>
        <span>Em conformidade com a Norma Regulamentadora nº 01 (NR-01)</span>
      </footer>
    </div>
  );
};
