export type DimensionId =
  | 'demandas'
  | 'controle'
  | 'apoio_chefia'
  | 'apoio_colegas'
  | 'relacionamentos'
  | 'cargo'
  | 'comunicacao_mudancas';

export type RiskLevel = 'baixo' | 'moderado' | 'alto' | 'critico';

export interface Question {
  id: number;
  number: number;
  text: string;
  dimensionId: DimensionId;
  isInverted?: boolean; // true if answering "Sempre" indicates higher adversity (e.g., "Costumo levar trabalho para casa")
}

export interface DimensionInfo {
  id: DimensionId;
  title: string;
  shortTitle: string;
  description: string;
  color: string;
  badgeBg: string;
  iconName: string;
}

export interface UserProfile {
  name: string;
  company: string;
  department: string;
  role: string;
  tenure?: string;
  isAnonymous: boolean;
}

export interface Recommendation {
  dimensionId: DimensionId;
  title: string;
  userTip: string;
  companyAction: string;
  pgrAction: {
    what: string;
    why: string;
    who: string;
    where: string;
    when: string;
    how: string;
  };
}

export type ScreenState = 'login' | 'explanation' | 'questionnaire' | 'results' | 'manager';

export interface AssessmentResult {
  id: string;
  date: string;
  completedAt?: string;
  userProfile: UserProfile;
  answers: Record<number, number>; // question id -> 1 to 5
  overallScore: number; // 0 to 100
  riskLevel: RiskLevel;
  dimensionScores: Record<DimensionId, number>; // 0 to 100
  generatedRecommendations: Recommendation[];
}

export interface ActionPlanItem {
  id: string;
  dimension: string;
  what: string;
  why: string;
  who: string;
  where: string;
  when: string;
  how: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  status: 'Pendente' | 'Em Andamento' | 'Concluído';
}

export interface SectorMetric {
  sector: string;
  evaluationsCount: number;
  avgScore: number;
  riskLevel: RiskLevel;
  highestRiskDimension: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  tips: string[];
}

export interface SupportRequest {
  id: string;
  date: string;
  category: 'Carga de Trabalho' | 'Conflito interpessoal' | 'Orientação de Saúde Mental' | 'Canal Confidencial';
  message: string;
  contactPreference: 'email' | 'presencial' | 'anonimo';
  contactInfo?: string;
  status: 'Aguardando Contato' | 'Em Atendimento' | 'Concluído';
}
