import { AssessmentResult, EducationalArticle, SectorMetric } from '../types';

export const INITIAL_SECTORS = [
  'Operacional / Produção',
  'Comercial & Vendas',
  'Tecnologia / TI',
  'Administrativo / Financeiro',
  'Logística & Transporte',
  'Recursos Humanos',
  'Atendimento ao Cliente',
];

export const INITIAL_SECTOR_METRICS: SectorMetric[] = [
  {
    sector: 'Operacional / Produção',
    evaluationsCount: 42,
    avgScore: 54,
    riskLevel: 'alto',
    highestRiskDimension: 'Demandas (38 pts)',
  },
  {
    sector: 'Comercial & Vendas',
    evaluationsCount: 28,
    avgScore: 59,
    riskLevel: 'alto',
    highestRiskDimension: 'Demandas & Metas (42 pts)',
  },
  {
    sector: 'Logística & Transporte',
    evaluationsCount: 31,
    avgScore: 66,
    riskLevel: 'moderado',
    highestRiskDimension: 'Pausas e Ritmo (52 pts)',
  },
  {
    sector: 'Atendimento ao Cliente',
    evaluationsCount: 35,
    avgScore: 62,
    riskLevel: 'moderado',
    highestRiskDimension: 'Relacionamentos (55 pts)',
  },
  {
    sector: 'Tecnologia / TI',
    evaluationsCount: 24,
    avgScore: 78,
    riskLevel: 'moderado',
    highestRiskDimension: 'Demandas e Prazos (68 pts)',
  },
  {
    sector: 'Administrativo / Financeiro',
    evaluationsCount: 19,
    avgScore: 82,
    riskLevel: 'baixo',
    highestRiskDimension: 'Comunicação de Mudanças (74 pts)',
  },
  {
    sector: 'Recursos Humanos',
    evaluationsCount: 12,
    avgScore: 89,
    riskLevel: 'baixo',
    highestRiskDimension: 'Demandas (82 pts)',
  },
];

export const MONTHLY_EVOLUTION_DATA = [
  { month: 'Abril', mediaEmpresa: 58, operacional: 48, comercial: 52, ti: 72, administrativo: 76 },
  { month: 'Maio', mediaEmpresa: 61, operacional: 50, comercial: 55, ti: 74, administrativo: 78 },
  { month: 'Junho', mediaEmpresa: 64, operacional: 52, comercial: 57, ti: 75, administrativo: 80 },
  { month: 'Julho', mediaEmpresa: 67, operacional: 53, comercial: 58, ti: 77, administrativo: 81 },
  { month: 'Agosto', mediaEmpresa: 69, operacional: 55, comercial: 60, ti: 78, administrativo: 82 },
  { month: 'Setembro', mediaEmpresa: 71, operacional: 54, comercial: 59, ti: 78, administrativo: 82 },
];

export const RADAR_DATA_GLOBAL = [
  { dimension: 'Demandas', empresa: 58, setorCritico: 40, ideal: 85 },
  { dimension: 'Controle', empresa: 72, setorCritico: 55, ideal: 85 },
  { dimension: 'Apoio Chefia', empresa: 76, setorCritico: 62, ideal: 85 },
  { dimension: 'Apoio Colegas', empresa: 82, setorCritico: 70, ideal: 85 },
  { dimension: 'Relacionamento', empresa: 69, setorCritico: 51, ideal: 85 },
  { dimension: 'Cargo / Papel', empresa: 84, setorCritico: 73, ideal: 85 },
  { dimension: 'Comunicação', empresa: 68, setorCritico: 54, ideal: 85 },
];

export const RISK_PIE_DATA = [
  { name: 'Baixo Risco', value: 31, color: '#10B981' },
  { name: 'Risco Moderado', value: 65, color: '#F59E0B' },
  { name: 'Alto Risco', value: 70, color: '#F97316' },
  { name: 'Risco Crítico', value: 25, color: '#EF4444' },
];

export const SAMPLE_HISTORICAL_ASSESSMENTS: AssessmentResult[] = [
  {
    id: 'eval-1',
    date: '2026-09-10T14:30:00Z',
    userProfile: {
      name: 'Felipe Silva',
      company: 'Indústria Metalúrgica Segura S.A.',
      department: 'Operacional / Produção',
      role: 'Operador de Máquinas',
      tenure: '2 anos',
      isAnonymous: false,
    },
    answers: {},
    overallScore: 56,
    riskLevel: 'alto',
    dimensionScores: {
      demandas: 42,
      controle: 48,
      apoio_chefia: 60,
      apoio_colegas: 72,
      relacionamentos: 58,
      cargo: 65,
      comunicacao_mudancas: 47,
    },
    generatedRecommendations: [],
  },
  {
    id: 'eval-2',
    date: '2026-08-12T10:15:00Z',
    userProfile: {
      name: 'Felipe Silva',
      company: 'Indústria Metalúrgica Segura S.A.',
      department: 'Operacional / Produção',
      role: 'Operador de Máquinas',
      tenure: '2 anos',
      isAnonymous: false,
    },
    answers: {},
    overallScore: 50,
    riskLevel: 'alto',
    dimensionScores: {
      demandas: 36,
      controle: 45,
      apoio_chefia: 54,
      apoio_colegas: 68,
      relacionamentos: 52,
      cargo: 60,
      comunicacao_mudancas: 40,
    },
    generatedRecommendations: [],
  },
];

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'art-1',
    title: 'O que são Riscos Psicossociais e sua Relação com a NR-01 (PGR)?',
    category: 'Segurança do Trabalho & Legislação',
    readTime: '4 min',
    summary: 'Entenda como os fatores cognitivos, emocionais e de organização do trabalho passaram a ser formalmente integrados ao Gerenciamento de Riscos Ocupacionais.',
    content: [
      'A Norma Regulamentadora nº 01 (NR-01) estabelece as diretrizes para o Programa de Gerenciamento de Riscos (PGR). Tradicionalmente, focava-se apenas em agentes físicos, químicos e biológicos.',
      'Contudo, o reconhecimento contemporâneo da Organização Internacional do Trabalho (OIT) e do Ministério do Trabalho destaca que fatores psicossociais — como excesso de horas extras, assédio, falta de clareza de metas e ausência de pausas — provocam acidentes, afastamentos e adoecimento mental.',
      'Avaliar periodicamente os riscos psicossociais com instrumentos padronizados é hoje uma obrigação ética e legal para proteger a integridade dos trabalhadores.',
    ],
    tips: [
      'Identificar perigos psicossociais antes que se convertam em acidentes ou afastamentos pelo INSS.',
      'Documentar os planos de ação dentro do inventário de riscos da NR-01.',
      'Promover diálogo aberto sem retaliações através de avaliações anônimas.',
    ],
  },
  {
    id: 'art-2',
    title: 'Prevenção do Esgotamento Profissional (Síndrome de Burnout)',
    category: 'Saúde Mental',
    readTime: '3 min',
    summary: 'Aprenda a reconhecer os 3 sinais fundamentais do Burnout e as técnicas de desconexão saudável.',
    content: [
      'Classificado pela OMS como fenômeno ocupacional na CID-11, o Burnout se caracteriza por: exaustão emocional profunda, despersonalização/cinismo frente ao trabalho e redução da sensação de eficácia.',
      'Não se trata de fraqueza individual, mas de um descompasso contínuo entre as exigências do ambiente corporativo e os recursos disponíveis para o colaborador.',
    ],
    tips: [
      'Estabeleça barreiras nítidas entre horário de expediente e vida pessoal.',
      'Evite checar mensagens corporativas antes de dormir.',
      'Comunique a liderança quando a carga de trabalho estiver recorrentemente insustentável.',
    ],
  },
  {
    id: 'art-3',
    title: 'A Importância da Segurança Psicológica nas Equipes',
    category: 'Cultura & Liderança',
    readTime: '3 min',
    summary: 'Por que times onde os colaboradores têm liberdade para opinar e assumir erros cometem menos falhas graves?',
    content: [
      'Segurança psicológica é a crença compartilhada de que a equipe é um ambiente seguro para assumir riscos interpessoais sem medo de humilhação, punição ou desdém.',
      'Em setores industriais e operacionais, a falta de segurança psicológica faz com que operadores não relatem incidentes preliminares, culminando em acidentes graves.',
    ],
    tips: [
      'Líderes devem incentivar perguntas mesmo que pareçam simples.',
      'Adotar postura de curiosidade em vez de julgamento ao analisar falhas operacionais.',
      'Celebrar feedbacks honestos e sugestões de melhoria vindas da base.',
    ],
  },
  {
    id: 'art-4',
    title: 'Ergonomia Cognitiva: Organizando o Fluxo Mental de Trabalho',
    category: 'Ergonomia NR-17',
    readTime: '4 min',
    summary: 'Como a sobrecarga de informações e interrupções frequentes afetam sua atenção e amplificam o estresse.',
    content: [
      'A NR-17 trata da adaptação das condições de trabalho às características psicofisiológicas dos trabalhadores.',
      'A ergonomia cognitiva estuda a percepção, memória, raciocínio e resposta motora exigidos nas funções modernas, prevenindo a fadiga mental provocada por interfaces confusas, notificações incessantes e multitarefa dispersa.',
    ],
    tips: [
      'Trabalhe em blocos de foco concentrado (técnica Pomodoro ou blocos de 45 minutos).',
      'Desative notificações secundárias durante tarefas complexas que exijam alta precisão.',
      'Realize pausas ativas com alongamento e hidratação regular.',
    ],
  },
];
