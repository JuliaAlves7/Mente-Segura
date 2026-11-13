import { DimensionId, DimensionInfo, Question, Recommendation, RiskLevel } from '../types';

export const DIMENSIONS: DimensionInfo[] = [
  {
    id: 'demandas',
    title: 'Demandas de Trabalho',
    shortTitle: 'Demandas',
    description: 'Avalia volume, ritmo, prazos, pressão e equilíbrio com a vida pessoal.',
    color: '#0EA5E9',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    iconName: 'Clock',
  },
  {
    id: 'controle',
    title: 'Controle e Autonomia',
    shortTitle: 'Controle',
    description: 'Avalia o nível de autonomia, poder de decisão e gestão do próprio tempo.',
    color: '#10B981',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    iconName: 'Compass',
  },
  {
    id: 'apoio_chefia',
    title: 'Apoio da Chefia',
    shortTitle: 'Chefia',
    description: 'Avalia disponibilidade, feedback, respeito e acolhimento da liderança.',
    color: '#8B5CF6',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    iconName: 'UserCheck',
  },
  {
    id: 'apoio_colegas',
    title: 'Apoio dos Colegas',
    shortTitle: 'Colegas',
    description: 'Avalia espírito de equipe, ajuda mútua, confiança e ambiente acolhedor.',
    color: '#F59E0B',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    iconName: 'Users',
  },
  {
    id: 'relacionamentos',
    title: 'Relacionamentos e Convivência',
    shortTitle: 'Relacionamentos',
    description: 'Avalia saúde do clima organizacional, respeito mútuo e ausência de atritos.',
    color: '#EC4899',
    badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    iconName: 'HeartHandshake',
  },
  {
    id: 'cargo',
    title: 'Clareza de Cargo e Papel',
    shortTitle: 'Cargo',
    description: 'Avalia entendimento das responsabilidades, metas, sentido e treinamento.',
    color: '#06B6D4',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    iconName: 'Briefcase',
  },
  {
    id: 'comunicacao_mudancas',
    title: 'Comunicação e Mudanças',
    shortTitle: 'Comunicação',
    description: 'Avalia transparência prévia, oportunidade de opinar e clareza nas transições.',
    color: '#14B8A6',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    iconName: 'MessageSquare',
  },
];

export const QUESTIONS: Question[] = [
  // 1. DEMANDAS (10 perguntas)
  { id: 1, number: 1, text: 'Consigo concluir minhas tarefas dentro do horário de trabalho.', dimensionId: 'demandas', isInverted: false },
  { id: 2, number: 2, text: 'Meu volume de trabalho é adequado.', dimensionId: 'demandas', isInverted: false },
  { id: 3, number: 3, text: 'Tenho tempo suficiente para realizar minhas atividades.', dimensionId: 'demandas', isInverted: false },
  { id: 4, number: 4, text: 'Meu trabalho exige esforço excessivo.', dimensionId: 'demandas', isInverted: true },
  { id: 5, number: 5, text: 'Costumo levar trabalho para casa.', dimensionId: 'demandas', isInverted: true },
  { id: 6, number: 6, text: 'Trabalho sob muita pressão.', dimensionId: 'demandas', isInverted: true },
  { id: 7, number: 7, text: 'Tenho pausas suficientes durante o expediente.', dimensionId: 'demandas', isInverted: false },
  { id: 8, number: 8, text: 'O ritmo de trabalho é confortável.', dimensionId: 'demandas', isInverted: false },
  { id: 9, number: 9, text: 'Consigo lidar com as cobranças.', dimensionId: 'demandas', isInverted: false },
  { id: 10, number: 10, text: 'Meu trabalho interfere na minha vida pessoal.', dimensionId: 'demandas', isInverted: true },

  // 2. CONTROLE (8 perguntas)
  { id: 11, number: 1, text: 'Posso decidir como realizar minhas tarefas.', dimensionId: 'controle', isInverted: false },
  { id: 12, number: 2, text: 'Tenho autonomia para organizar meu trabalho.', dimensionId: 'controle', isInverted: false },
  { id: 13, number: 3, text: 'Minha opinião é considerada.', dimensionId: 'controle', isInverted: false },
  { id: 14, number: 4, text: 'Posso sugerir melhorias.', dimensionId: 'controle', isInverted: false },
  { id: 15, number: 5, text: 'Tenho liberdade para tomar decisões.', dimensionId: 'controle', isInverted: false },
  { id: 16, number: 6, text: 'Consigo administrar meu tempo.', dimensionId: 'controle', isInverted: false },
  { id: 17, number: 7, text: 'Tenho oportunidade de aprender coisas novas.', dimensionId: 'controle', isInverted: false },
  { id: 18, number: 8, text: 'Participo das decisões relacionadas ao meu trabalho.', dimensionId: 'controle', isInverted: false },

  // 3. APOIO DA CHEFIA (7 perguntas)
  { id: 19, number: 1, text: 'Meu chefe está disponível quando preciso.', dimensionId: 'apoio_chefia', isInverted: false },
  { id: 20, number: 2, text: 'Recebo orientação adequada.', dimensionId: 'apoio_chefia', isInverted: false },
  { id: 21, number: 3, text: 'Meu trabalho é reconhecido.', dimensionId: 'apoio_chefia', isInverted: false },
  { id: 22, number: 4, text: 'Sou tratado com respeito.', dimensionId: 'apoio_chefia', isInverted: false },
  { id: 23, number: 5, text: 'Meu chefe escuta minhas opiniões.', dimensionId: 'apoio_chefia', isInverted: false },
  { id: 24, number: 6, text: 'Posso conversar quando tenho dificuldades.', dimensionId: 'apoio_chefia', isInverted: false },
  { id: 25, number: 7, text: 'Recebo feedbacks construtivos.', dimensionId: 'apoio_chefia', isInverted: false },

  // 4. APOIO DOS COLEGAS (6 perguntas)
  { id: 26, number: 1, text: 'Meus colegas ajudam quando preciso.', dimensionId: 'apoio_colegas', isInverted: false },
  { id: 27, number: 2, text: 'Existe cooperação entre a equipe.', dimensionId: 'apoio_colegas', isInverted: false },
  { id: 28, number: 3, text: 'Posso confiar nos meus colegas.', dimensionId: 'apoio_colegas', isInverted: false },
  { id: 29, number: 4, text: 'Sou respeitado.', dimensionId: 'apoio_colegas', isInverted: false },
  { id: 30, number: 5, text: 'O ambiente é acolhedor.', dimensionId: 'apoio_colegas', isInverted: false },
  { id: 31, number: 6, text: 'Existe trabalho em equipe.', dimensionId: 'apoio_colegas', isInverted: false },

  // 5. RELACIONAMENTOS (7 perguntas)
  { id: 32, number: 1, text: 'O ambiente é saudável.', dimensionId: 'relacionamentos', isInverted: false },
  { id: 33, number: 2, text: 'Existe respeito entre todos.', dimensionId: 'relacionamentos', isInverted: false },
  { id: 34, number: 3, text: 'Há conflitos frequentes.', dimensionId: 'relacionamentos', isInverted: true },
  { id: 35, number: 4, text: 'Sinto-me valorizado.', dimensionId: 'relacionamentos', isInverted: false },
  { id: 36, number: 5, text: 'Sofro algum tipo de desrespeito.', dimensionId: 'relacionamentos', isInverted: true },
  { id: 37, number: 6, text: 'Existe boa comunicação.', dimensionId: 'relacionamentos', isInverted: false },
  { id: 38, number: 7, text: 'Há igualdade de tratamento.', dimensionId: 'relacionamentos', isInverted: false },

  // 6. CARGO (7 perguntas)
  { id: 39, number: 1, text: 'Sei exatamente minhas responsabilidades.', dimensionId: 'cargo', isInverted: false },
  { id: 40, number: 2, text: 'Recebo orientações claras.', dimensionId: 'cargo', isInverted: false },
  { id: 41, number: 3, text: 'Conheço os objetivos da empresa.', dimensionId: 'cargo', isInverted: false },
  { id: 42, number: 4, text: 'Meu trabalho faz sentido.', dimensionId: 'cargo', isInverted: false },
  { id: 43, number: 5, text: 'Sei o que esperam de mim.', dimensionId: 'cargo', isInverted: false },
  { id: 44, number: 6, text: 'Tenho treinamento suficiente.', dimensionId: 'cargo', isInverted: false },
  { id: 45, number: 7, text: 'Entendo minha função.', dimensionId: 'cargo', isInverted: false },

  // 7. COMUNICAÇÃO E MUDANÇAS (7 perguntas)
  { id: 46, number: 1, text: 'Sou informado antes das mudanças.', dimensionId: 'comunicacao_mudancas', isInverted: false },
  { id: 47, number: 2, text: 'Posso opinar.', dimensionId: 'comunicacao_mudancas', isInverted: false },
  { id: 48, number: 3, text: 'Recebo informações claras.', dimensionId: 'comunicacao_mudancas', isInverted: false },
  { id: 49, number: 4, text: 'As mudanças são bem explicadas.', dimensionId: 'comunicacao_mudancas', isInverted: false },
  { id: 50, number: 5, text: 'Minha equipe participa das decisões.', dimensionId: 'comunicacao_mudancas', isInverted: false },
  { id: 51, number: 6, text: 'A comunicação interna funciona.', dimensionId: 'comunicacao_mudancas', isInverted: false },
  { id: 52, number: 7, text: 'Tenho liberdade para perguntar.', dimensionId: 'comunicacao_mudancas', isInverted: false },
];

export const ANSWER_OPTIONS = [
  { value: 1, label: 'Nunca', emoji: '🟢', moodIcon: 'smile', color: 'emerald' },
  { value: 2, label: 'Raramente', emoji: '🙂', moodIcon: 'smile-subtle', color: 'teal' },
  { value: 3, label: 'Às vezes', emoji: '😐', moodIcon: 'meh', color: 'amber' },
  { value: 4, label: 'Frequentemente', emoji: '🙁', moodIcon: 'frown', color: 'orange' },
  { value: 5, label: 'Sempre', emoji: '🔴', moodIcon: 'frown-loud', color: 'rose' },
];

export function calculateScore(answers: Record<number, number>): {
  overallScore: number;
  riskLevel: RiskLevel;
  dimensionScores: Record<DimensionId, number>;
  recommendations: Recommendation[];
} {
  const dimensionScores = {} as Record<DimensionId, number>;

  DIMENSIONS.forEach((dim) => {
    const dimQuestions = QUESTIONS.filter((q) => q.dimensionId === dim.id);
    let totalPoints = 0;
    let answeredCount = 0;

    dimQuestions.forEach((q) => {
      const rawVal = answers[q.id];
      if (rawVal !== undefined && rawVal >= 1 && rawVal <= 5) {
        // Scoring scale: Higher score = healthier / lower psychosocial risk (0 to 100)
        // If inverted (e.g. "Costumo levar trabalho para casa"): 1 (Nunca) is healthy (5 pts), 5 (Sempre) is bad (1 pt)
        const adjusted = q.isInverted ? 6 - rawVal : rawVal;
        // Map 1..5 to 0..100
        const percentage = ((adjusted - 1) / 4) * 100;
        totalPoints += percentage;
        answeredCount++;
      }
    });

    dimensionScores[dim.id] = answeredCount > 0 ? Math.round(totalPoints / answeredCount) : 75;
  });

  const scoresArray = Object.values(dimensionScores);
  const overallScore = Math.round(scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length);

  let riskLevel: RiskLevel = 'baixo';
  if (overallScore >= 80) {
    riskLevel = 'baixo';
  } else if (overallScore >= 60) {
    riskLevel = 'moderado';
  } else if (overallScore >= 40) {
    riskLevel = 'alto';
  } else {
    riskLevel = 'critico';
  }

  const recommendations = generateRecommendations(dimensionScores);

  return {
    overallScore,
    riskLevel,
    dimensionScores,
    recommendations,
  };
}

export function getRiskBadge(level: RiskLevel): {
  label: string;
  badgeClass: string;
  bgClass: string;
  textClass: string;
  colorHex: string;
  iconName: string;
  rangeText: string;
} {
  switch (level) {
    case 'baixo':
      return {
        label: 'Baixo Risco Psicossocial',
        badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        bgClass: 'bg-emerald-500',
        textClass: 'text-emerald-400',
        colorHex: '#10B981',
        iconName: 'ShieldCheck',
        rangeText: '80–100 pontos',
      };
    case 'moderado':
      return {
        label: 'Risco Moderado',
        badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
        bgClass: 'bg-amber-500',
        textClass: 'text-amber-400',
        colorHex: '#F59E0B',
        iconName: 'AlertTriangle',
        rangeText: '60–79 pontos',
      };
    case 'alto':
      return {
        label: 'Alto Risco',
        badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
        bgClass: 'bg-orange-500',
        textClass: 'text-orange-400',
        colorHex: '#F97316',
        iconName: 'AlertOctagon',
        rangeText: '40–59 pontos',
      };
    case 'critico':
    default:
      return {
        label: 'Risco Crítico',
        badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
        bgClass: 'bg-rose-500',
        textClass: 'text-rose-400',
        colorHex: '#EF4444',
        iconName: 'Flame',
        rangeText: 'Abaixo de 40 pontos',
      };
  }
}

export function generateRecommendations(scores: Record<DimensionId, number>): Recommendation[] {
  const list: Recommendation[] = [];

  // Excesso de demanda
  if (scores.demandas < 75) {
    list.push({
      dimensionId: 'demandas',
      title: 'Excesso de Demanda e Carga de Trabalho',
      userTip: 'Pratique pausas estratégicas de 5 minutos a cada bloco de trabalho e organize suas prioridades com listas curtas diárias.',
      companyAction: 'Rever carga de trabalho • Redistribuir atividades • Aumentar pausas programadas',
      pgrAction: {
        what: 'Revisão ergonômica cognitiva e redistribuição da matriz de tarefas operacionais',
        why: 'Evitar esgotamento profissional precoce (Burnout) e queda de produtividade',
        who: 'Gestor da Área + Técnico em Segurança do Trabalho (SST)',
        where: 'Setores operacionais e administrativos com sobrecarga apontada',
        when: 'Imediato (em até 15 dias)',
        how: 'Auditoria de horas extras, análise de fila de processos e contratação de apoio pontual',
      },
    });
  }

  // Baixo apoio da chefia
  if (scores.apoio_chefia < 75) {
    list.push({
      dimensionId: 'apoio_chefia',
      title: 'Baixo Apoio e Reconhecimento da Liderança',
      userTip: 'Agende conversas pontuais com seu gestor para alinhar expectativas e expressar suas dúvidas com clareza.',
      companyAction: 'Capacitação de líderes • Feedbacks periódicos • Reuniões individuais (1:1)',
      pgrAction: {
        what: 'Programa de Desenvolvimento de Liderança Humanizada e Comunicação Construtiva',
        why: 'Fortalecer a segurança psicológica e reduzir atritos verticais',
        who: 'RH / DHO + Consultoria de SST',
        where: 'Toda a liderança direta e coordenadores de equipe',
        when: 'Mensalmente (a partir do próximo ciclo)',
        how: 'Workshops práticos de escuta ativa, rotina de 1:1 quinzenais e avaliação 360°',
      },
    });
  }

  // Problemas de relacionamento
  if (scores.relacionamentos < 75) {
    list.push({
      dimensionId: 'relacionamentos',
      title: 'Atritos e Problemas de Convivência',
      userTip: 'Busque adotar comunicação não-violenta e procure o canal confidencial caso presencie desrespeito.',
      companyAction: 'Mediação de conflitos • Treinamentos de comunicação • Integração das equipes',
      pgrAction: {
        what: 'Implementação de Comitê de Mediação de Conflitos e Código de Conduta Integrado',
        why: 'Prevenir assédio moral e promover um ambiente de trabalho acolhedor e igualitário',
        who: 'Comitê de Ética + CIPA + Técnico de Segurança',
        where: 'Ambiente presencial e canais virtuais de comunicação corporativa',
        when: 'Em até 30 dias',
        how: 'Campanha de conscientização com dinâmicas de integração e canal de ouvidoria segura',
      },
    });
  }

  // Pouca autonomia
  if (scores.controle < 75) {
    list.push({
      dimensionId: 'controle',
      title: 'Pouca Autonomia e Baixo Controle',
      userTip: 'Proponha novos métodos de organização das suas atividades para seu gestor demonstrando ganhos de tempo.',
      companyAction: 'Delegação de responsabilidades • Participação nas decisões • Flexibilização das atividades',
      pgrAction: {
        what: 'Descentralização de fluxos de aprovação e comitê de melhoria contínua',
        why: 'Elevar o engajamento, senso de pertencimento e autonomia decisória do trabalhador',
        who: 'Gerências de Operações e RH',
        where: 'Todos os setores com microgerenciamento identificado',
        when: 'Ciclo trimestral contínuo',
        how: 'Mapeamento de gargalos decisórios e implantação de sugestões diretas dos funcionários',
      },
    });
  }

  // Apoio dos colegas
  if (scores.apoio_colegas < 75) {
    list.push({
      dimensionId: 'apoio_colegas',
      title: 'Fragilidade na Cooperação Entre Pares',
      userTip: 'Fortaleça laços oferecendo auxílio a um colega em momentos mais tranquilos e compartilhando boas práticas.',
      companyAction: 'Atividades de ' + 'team building' + ' • Parcerias de mentoria interna • Reconhecimento entre colegas',
      pgrAction: {
        what: 'Roda de conversa e dinâmicas intersetoriais de suporte mútuo',
        why: 'Reduzir o isolamento individual e potencializar a confiança e cooperação em equipe',
        who: 'Líderes de Equipe e RH',
        where: 'Áreas com trabalho isolado ou metas individualistas',
        when: 'Bimestral',
        how: 'Encontros mensais de alinhamento e celebração coletiva de conquistas',
      },
    });
  }

  // Cargo e clareza
  if (scores.cargo < 75) {
    list.push({
      dimensionId: 'cargo',
      title: 'Incerteza nas Atribuições e Objetivos',
      userTip: 'Peça um descritivo atualizado das suas metas e consulte quais treinamentos estão disponíveis.',
      companyAction: 'Revisão do descritivo de funções • Treinamentos específicos • Alinhamento claro de metas',
      pgrAction: {
        what: 'Atualização da Matriz de Responsabilidades (RACI) e catálogo de competências',
        why: 'Eliminar a ambiguidade de papel e o estresse por cobranças descompassadas',
        who: 'RH e Gestores Imediatos',
        where: 'Todas as equipes operacionais',
        when: 'Em até 45 dias',
        how: 'Entrevistas de alinhamento de cargo e plano de treinamento individualizado',
      },
    });
  }

  // Comunicação e Mudanças
  if (scores.comunicacao_mudancas < 75) {
    list.push({
      dimensionId: 'comunicacao_mudancas',
      title: 'Ruídos de Comunicação e Gestão de Mudanças',
      userTip: 'Participe dos canais de dúvidas corporativos e envie sugestões construtivas nas reuniões gerais.',
      companyAction: 'Comunicação antecipada de transições • Canais abertos de perguntas • Gestão participativa',
      pgrAction: {
        what: 'Protocolo de Comunicação de Mudanças Organizacionais e Painel de Transparência',
        why: 'Reduzir a ansiedade coletiva frente a transformações estruturais ou de metas',
        who: 'Comunicação Interna + Diretoria + SST',
        where: 'Murais físicos, intranet e e-mails corporativos',
        when: 'Contínuo',
        how: 'Comunicados com antecedência mínima de 15 dias e sessões de perguntas e respostas abertas',
      },
    });
  }

  // If all are high, add positive maintenance recommendation
  if (list.length === 0) {
    list.push({
      dimensionId: 'demandas',
      title: 'Ambiente Psicossocial Saudável e Equilibrado',
      userTip: 'Continue mantendo bons hábitos de descanso, diálogo aberto e equilíbrio entre trabalho e vida.',
      companyAction: 'Manter práticas preventivas • Manter canais de escuta ativos • Monitorar periodicamente',
      pgrAction: {
        what: 'Monitoramento contínuo das condições psicossociais no ciclo anual do PGR',
        why: 'Sustentar o clima organizacional positivo e a conformidade com a NR-01',
        who: 'Comitê de SST e RH',
        where: 'Toda a organização',
        when: 'Semestralmente',
        how: 'Pesquisas periódicas com Mente Segura e auditorias de bem-estar corporativo',
      },
    });
  }

  return list;
}
