export type OccurrenceCategory =
  | "fio_solto"
  | "ligacao_irregular"
  | "poste_danificado"
  | "risco_vida"
  | "transformador_problema"
  | "arvore_rede"
  | "iluminacao_publica"
  | "cabo_partido";

export type RiskLevel = "baixo" | "medio" | "alto" | "critico";

export type OccurrenceStatus =
  | "pendente_ia"
  | "validacao_tecnica"
  | "em_atendimento"
  | "resolvida";

export type AIClassification = "valida" | "provavelmente_valida" | "invalida";

export interface Occurrence {
  id: string;
  category: OccurrenceCategory;
  description: string;
  photoUrl: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  anonymous: boolean;
  reporterName?: string;
  createdAt: Date;
  updatedAt: Date;
  status: OccurrenceStatus;
  aiAnalysis?: AIAnalysis;
  technicalValidation?: TechnicalValidation;
}

export interface AIAnalysis {
  classification: AIClassification;
  suggestedCategory: OccurrenceCategory;
  riskLevel: RiskLevel;
  confidence: number;
  imageAnalysis: string[];
  isDuplicate: boolean;
  duplicateOf?: string;
  processedAt: Date;
}

export interface TechnicalValidation {
  validatedBy: string;
  isValid: boolean;
  finalRiskLevel: RiskLevel;
  recommendedDeadline: string;
  teamType: string;
  notes: string;
  validatedAt: Date;
}

export interface DenunciaFormData {
  category: OccurrenceCategory;
  description: string;
  photo: File | null;
  photoPreview: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  } | null;
  anonymous: boolean;
}

export const CATEGORY_LABELS: Record<OccurrenceCategory, string> = {
  fio_solto: "Fio Solto / Caído",
  ligacao_irregular: "Ligação Irregular (Gato)",
  poste_danificado: "Poste Danificado",
  risco_vida: "Risco Imediato à Vida",
  transformador_problema: "Transformador com Problema",
  arvore_rede: "Árvore na Rede Elétrica",
  iluminacao_publica: "Iluminação Pública",
  cabo_partido: "Cabo Partido / Rompido",
};

export const RISK_LABELS: Record<RiskLevel, string> = {
  baixo: "Baixo",
  medio: "Médio",
  alto: "Alto",
  critico: "Crítico",
};

export const STATUS_LABELS: Record<OccurrenceStatus, string> = {
  pendente_ia: "Pendente IA",
  validacao_tecnica: "Validação Técnica",
  em_atendimento: "Em Atendimento",
  resolvida: "Resolvida",
};

export const CATEGORY_ICONS: Record<OccurrenceCategory, string> = {
  fio_solto: "Zap",
  ligacao_irregular: "AlertTriangle",
  poste_danificado: "Construction",
  risco_vida: "ShieldAlert",
  transformador_problema: "CircuitBoard",
  arvore_rede: "TreePine",
  iluminacao_publica: "Lightbulb",
  cabo_partido: "Cable",
};
