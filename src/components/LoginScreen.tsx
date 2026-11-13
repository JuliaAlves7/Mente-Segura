import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Logo } from './Logo';
import { Mascot } from './Mascot';
import { INITIAL_SECTORS } from '../data/mockEnterpriseData';
import { Shield, Lock, Sparkles, Building2, User, Briefcase, Clock, EyeOff, LayoutDashboard } from 'lucide-react';

interface LoginScreenProps {
  onStart: (profile: UserProfile) => void;
  onGoToManager: () => void;
  savedProfile?: UserProfile;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onStart, onGoToManager, savedProfile }) => {
  const [name, setName] = useState(savedProfile?.name || 'Felipe Silva');
  const [company, setCompany] = useState(savedProfile?.company || 'Metalúrgica Inovação S.A.');
  const [department, setDepartment] = useState(savedProfile?.department || 'Operacional / Produção');
  const [customDept, setCustomDept] = useState('');
  const [role, setRole] = useState(savedProfile?.role || 'Operador de Produção');
  const [tenure, setTenure] = useState(savedProfile?.tenure || '2 anos');
  const [isAnonymous, setIsAnonymous] = useState(savedProfile?.isAnonymous || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDept = department === 'outro' ? (customDept.trim() || 'Geral') : department;
    onStart({
      name: isAnonymous ? 'Colaborador Anônimo' : (name.trim() || 'Colaborador'),
      company: company.trim() || 'Empresa Confidencial',
      department: finalDept,
      role: role.trim() || 'Colaborador',
      tenure: tenure.trim() || 'Não informado',
      isAnonymous,
    });
  };

  const handleFillDemo = () => {
    setName('Mariana Duarte');
    setCompany('Indústria TecnoMax Brasil');
    setDepartment('Comercial & Vendas');
    setRole('Analista Comercial');
    setTenure('1 ano e 6 meses');
    setIsAnonymous(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061224] via-[#091b33] to-[#040d1a] text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Top Bar with Manager Link */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between py-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Programa de Gestão de Riscos (NR-01)</span>
        </div>

        <button
          id="btn-goto-manager-top"
          onClick={onGoToManager}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors px-2.5 py-1 rounded-lg hover:bg-slate-800/60"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
          <span>Área RH / SST</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-xl w-full mx-auto my-auto py-6">
        {/* Logo & Welcome Mascot */}
        <div className="text-center mb-6">
          <Logo size="lg" showSubtitle={true} className="mb-4" />
          
          <div className="flex justify-center -my-3">
            <Mascot
              pose="welcome"
              size="md"
              speechBubble="Olá! Vamos cuidar do seu ambiente de trabalho?"
            />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-4 font-['Outfit',sans-serif]">
            Avaliação de Riscos Psicossociais
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
            Identifique fatores de bem-estar e sobrecarga na sua rotina profissional de forma segura e confidencial.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0b1d38]/90 border border-slate-700/60 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/40">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span>Dados de Identificação</span>
              </h2>
              <p className="text-xs text-slate-400">Preencha para iniciar a sua avaliação</p>
            </div>

            <button
              type="button"
              id="btn-fill-demo"
              onClick={handleFillDemo}
              className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/40 px-2.5 py-1 rounded-lg border border-emerald-500/20 transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Preencher Teste
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Modo Anônimo Toggle */}
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5 pr-2">
                <div className={`p-2 rounded-lg ${isAnonymous ? 'bg-emerald-500 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>
                  <EyeOff className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">Responder em Modo Anônimo</span>
                  <span className="text-[11px] text-slate-400 block">Seu nome não será exibido nos relatórios de equipe</span>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="chk-anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Nome */}
            {!isAnonymous && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Nome completo</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    id="input-name"
                    required={!isAnonymous}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo"
                    className="w-full bg-[#07152b] border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Empresa */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Empresa</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  id="input-company"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Nome da empresa ou organização"
                  className="w-full bg-[#07152b] border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Setor e Cargo em grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Setor / Departamento</label>
                <select
                  id="select-sector"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#07152b] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                >
                  {INITIAL_SECTORS.map((s) => (
                    <option key={s} value={s} className="bg-slate-900 text-white">
                      {s}
                    </option>
                  ))}
                  <option value="outro" className="bg-slate-900 text-white">Outro setor...</option>
                </select>

                {department === 'outro' && (
                  <input
                    type="text"
                    id="input-custom-dept"
                    required
                    value={customDept}
                    onChange={(e) => setCustomDept(e.target.value)}
                    placeholder="Digite seu setor"
                    className="w-full mt-2 bg-[#07152b] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Cargo / Função</label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    id="input-role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Operador, Analista"
                    className="w-full bg-[#07152b] border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Tempo de empresa (opcional) */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Tempo de empresa <span className="text-slate-500">(opcional)</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  id="input-tenure"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="Ex: Menos de 1 ano, 2 anos, 5+ anos"
                  className="w-full bg-[#07152b] border border-slate-700/80 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Botão Iniciar Avaliação */}
            <div className="pt-3">
              <button
                type="submit"
                id="btn-iniciar-avaliacao"
                className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all duration-200 cursor-pointer text-base"
              >
                <span>Iniciar Avaliação</span>
                <span className="text-slate-900 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </form>

          {/* Confidentiality notice */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Seus dados estão protegidos e são 100% confidenciais (LGPD & NR-01).</span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <footer className="max-w-xl w-full mx-auto text-center py-2 text-slate-500 text-[11px]">
        Mente Segura • Ferramenta alinhada ao ciclo PGR (Programa de Gerenciamento de Riscos - NR-01)
      </footer>
    </div>
  );
};
