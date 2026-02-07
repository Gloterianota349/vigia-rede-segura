import { create } from "zustand";
import { Occurrence, DenunciaFormData, AIAnalysis, OccurrenceCategory } from "./types";
import { mockOccurrences } from "./mockData";

interface VigiStore {
  occurrences: Occurrence[];
  currentDenuncia: DenunciaFormData | null;
  lastSubmittedOccurrence: Occurrence | null;
  addOccurrence: (data: DenunciaFormData) => Occurrence;
  updateOccurrenceStatus: (id: string, status: Occurrence["status"]) => void;
  setCurrentDenuncia: (data: DenunciaFormData | null) => void;
}

function simulateAI(category: OccurrenceCategory, description: string): AIAnalysis {
  const riskMap: Record<OccurrenceCategory, string> = {
    risco_vida: "critico",
    fio_solto: "alto",
    cabo_partido: "alto",
    transformador_problema: "alto",
    poste_danificado: "medio",
    ligacao_irregular: "medio",
    arvore_rede: "medio",
    iluminacao_publica: "baixo",
  };

  const analysisMap: Record<OccurrenceCategory, string[]> = {
    fio_solto: ["Cabo elétrico detectado fora de posição", "Possível risco de contato", "Análise de distância ao solo realizada"],
    ligacao_irregular: ["Padrão de conexão não autorizada detectado", "Múltiplos pontos de derivação identificados"],
    poste_danificado: ["Inclinação estrutural detectada", "Análise de integridade concluída"],
    risco_vida: ["ALERTA CRÍTICO: Risco imediato detectado", "Condutor em área de risco", "Protocolo de emergência recomendado"],
    transformador_problema: ["Anomalia térmica detectada na imagem", "Sinais de degradação identificados"],
    arvore_rede: ["Vegetação em contato com rede detectada", "Risco de curto-circuito avaliado"],
    iluminacao_publica: ["Ponto de iluminação inoperante", "Componente com falha identificado"],
    cabo_partido: ["Ruptura de condutor confirmada", "Área de perigo delimitada"],
  };

  const urgentWords = ["fogo", "pegando fogo", "caiu", "caído", "criança", "perigo", "urgente", "choque"];
  const hasUrgentWords = urgentWords.some(w => description.toLowerCase().includes(w));
  
  const risk = hasUrgentWords ? "critico" : riskMap[category] as any;

  return {
    classification: risk === "critico" || risk === "alto" ? "valida" : "provavelmente_valida",
    suggestedCategory: category,
    riskLevel: risk,
    confidence: 0.82 + Math.random() * 0.15,
    imageAnalysis: analysisMap[category] || ["Análise visual concluída"],
    isDuplicate: false,
    processedAt: new Date(),
  };
}

export const useVigiStore = create<VigiStore>((set, get) => ({
  occurrences: [...mockOccurrences],
  currentDenuncia: null,
  lastSubmittedOccurrence: null,

  addOccurrence: (data) => {
    const aiAnalysis = simulateAI(data.category, data.description);
    const newOccurrence: Occurrence = {
      id: `OCC-${String(get().occurrences.length + 1).padStart(4, "0")}`,
      category: data.category,
      description: data.description,
      photoUrl: data.photoPreview || "/placeholder.svg",
      location: data.location || { lat: -7.115, lng: -34.861, address: "Localização não informada", city: "João Pessoa" },
      anonymous: data.anonymous,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "validacao_tecnica",
      aiAnalysis,
    };
    set((state) => ({
      occurrences: [newOccurrence, ...state.occurrences],
      lastSubmittedOccurrence: newOccurrence,
    }));
    return newOccurrence;
  },

  updateOccurrenceStatus: (id, status) => {
    set((state) => ({
      occurrences: state.occurrences.map((o) =>
        o.id === id ? { ...o, status, updatedAt: new Date() } : o
      ),
    }));
  },

  setCurrentDenuncia: (data) => set({ currentDenuncia: data }),
}));
