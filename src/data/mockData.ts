import { Occurrence, OccurrenceCategory, OccurrenceStatus, RiskLevel } from "./types";

const cities = [
  { city: "João Pessoa", lat: -7.115, lng: -34.861, addresses: ["Av. Epitácio Pessoa, 1200", "Rua das Trincheiras, 45", "Av. Dom Pedro II, 890", "Rua Rodrigues de Aquino, 300"] },
  { city: "Campina Grande", lat: -7.23, lng: -35.88, addresses: ["Rua Maciel Pinheiro, 150", "Av. Floriano Peixoto, 500", "Rua Venâncio Neiva, 78"] },
  { city: "Recife", lat: -8.054, lng: -34.871, addresses: ["Av. Boa Viagem, 3500", "Rua do Bom Jesus, 42", "Av. Conde da Boa Vista, 1100"] },
  { city: "Natal", lat: -5.795, lng: -35.209, addresses: ["Av. Engenheiro Roberto Freire, 2000", "Rua Potengi, 320", "Av. Salgado Filho, 1800"] },
  { city: "Maceió", lat: -9.666, lng: -35.735, addresses: ["Av. Fernandes Lima, 700", "Rua do Comércio, 55", "Av. da Paz, 1200"] },
  { city: "Aracaju", lat: -10.911, lng: -37.072, addresses: ["Av. Beira Mar, 800", "Rua São Cristóvão, 120"] },
  { city: "Teresina", lat: -5.089, lng: -42.802, addresses: ["Av. Frei Serafim, 1500", "Rua Álvaro Mendes, 200"] },
];

const categories: OccurrenceCategory[] = [
  "fio_solto", "ligacao_irregular", "poste_danificado", "risco_vida",
  "transformador_problema", "arvore_rede", "iluminacao_publica", "cabo_partido"
];

const descriptions: Record<OccurrenceCategory, string[]> = {
  fio_solto: [
    "Fio caído na calçada após ventania. Crianças brincam próximo ao local.",
    "Cabo solto pendurado na árvore, faiscando quando chove.",
    "Fio de alta tensão solto próximo à escola municipal.",
  ],
  ligacao_irregular: [
    "Várias ligações clandestinas no poste da esquina. Risco de sobrecarga.",
    "Gato de energia visível no poste, fios expostos sem isolamento.",
    "Ligação irregular em estabelecimento comercial, cabo diretamente no transformador.",
  ],
  poste_danificado: [
    "Poste inclinado após batida de caminhão. Parece que vai cair.",
    "Poste de madeira apodrecido na base, balançando com o vento.",
    "Poste com rachadura profunda, sustentando 3 transformadores.",
  ],
  risco_vida: [
    "Fio de alta tensão caído na poça d'água em rua movimentada.",
    "Transformador pegando fogo no poste, próximo a residências.",
    "Poste caído bloqueando rua, fios energizados no chão.",
  ],
  transformador_problema: [
    "Transformador fazendo barulho estranho e soltando fumaça.",
    "Vazamento de óleo no transformador, mancha no chão.",
    "Transformador queimado, bairro inteiro sem energia há 3 dias.",
  ],
  arvore_rede: [
    "Galhos grandes encostando nos fios, faíscas quando venta.",
    "Árvore cresceu e envolveu os cabos elétricos completamente.",
    "Mangueira antiga com galhos sobre a rede de alta tensão.",
  ],
  iluminacao_publica: [
    "Rua inteira sem iluminação há 2 semanas, assaltos frequentes.",
    "Lâmpada piscando constantemente, poste fazendo barulho.",
  ],
  cabo_partido: [
    "Cabo rompido na tempestade, pendurado a 2m do chão.",
    "Cabo partido após queda de árvore, bairro sem luz.",
  ],
};

const photoUrls = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&h=300&fit=crop",
];

const statuses: OccurrenceStatus[] = ["pendente_ia", "validacao_tecnica", "em_atendimento", "resolvida"];
const riskLevels: RiskLevel[] = ["baixo", "medio", "alto", "critico"];

const aiImageAnalysis: Record<OccurrenceCategory, string[]> = {
  fio_solto: ["Cabo elétrico detectado no solo", "Ausência de isolamento identificada", "Proximidade com área de pedestres"],
  ligacao_irregular: ["Múltiplas conexões não padronizadas detectadas", "Fios sem isolamento identificados", "Padrão irregular de fiação"],
  poste_danificado: ["Inclinação estrutural de 15° detectada", "Dano na base do poste identificado", "Risco de queda avaliado"],
  risco_vida: ["Condutor energizado em superfície úmida", "Risco crítico de eletrocussão", "Área de perigo imediato demarcada"],
  transformador_problema: ["Sinais de superaquecimento detectados", "Vazamento de fluido isolante", "Deformação na carcaça"],
  arvore_rede: ["Vegetação em contato com condutores", "Risco de curto-circuito por galhos", "Poda urgente recomendada"],
  iluminacao_publica: ["Luminária sem funcionamento", "Componente danificado identificado"],
  cabo_partido: ["Ruptura de condutor detectada", "Cabo pendente a baixa altura", "Risco de contato acidental"],
};

function randomDate(daysAgo: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo));
  d.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return d;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOccurrence(index: number): Occurrence {
  const category = categories[index % categories.length];
  const cityData = cities[index % cities.length];
  const address = cityData.addresses[index % cityData.addresses.length];
  const status = statuses[Math.min(Math.floor(index / 7), 3)];
  const riskLevel = index < 4 ? "critico" : index < 10 ? "alto" : index < 18 ? "medio" : "baixo";
  const createdAt = randomDate(30);
  const desc = descriptions[category];

  const occurrence: Occurrence = {
    id: `OCC-${String(index + 1).padStart(4, "0")}`,
    category,
    description: desc[index % desc.length],
    photoUrl: photoUrls[index % photoUrls.length],
    location: {
      lat: cityData.lat + (Math.random() - 0.5) * 0.05,
      lng: cityData.lng + (Math.random() - 0.5) * 0.05,
      address,
      city: cityData.city,
    },
    anonymous: index % 5 === 0,
    reporterName: index % 5 === 0 ? undefined : `Cidadão ${index + 1}`,
    createdAt,
    updatedAt: new Date(createdAt.getTime() + Math.random() * 86400000 * 3),
    status,
    aiAnalysis: status !== "pendente_ia" ? {
      classification: riskLevel === "critico" || riskLevel === "alto" ? "valida" : index % 7 === 0 ? "invalida" : "provavelmente_valida",
      suggestedCategory: category,
      riskLevel: riskLevel as any,
      confidence: 0.7 + Math.random() * 0.28,
      imageAnalysis: aiImageAnalysis[category],
      isDuplicate: index === 15,
      duplicateOf: index === 15 ? "OCC-0003" : undefined,
      processedAt: new Date(createdAt.getTime() + 30000 + Math.random() * 120000),
    } : undefined,
    technicalValidation: status === "em_atendimento" || status === "resolvida" ? {
      validatedBy: pickRandom(["Eng. Carlos Silva", "Téc. Maria Santos", "Eng. Roberto Oliveira", "Téc. Ana Paula"]),
      isValid: true,
      finalRiskLevel: riskLevel as any,
      recommendedDeadline: riskLevel === "critico" ? "Imediato" : riskLevel === "alto" ? "24 horas" : riskLevel === "medio" ? "72 horas" : "7 dias",
      teamType: pickRandom(["Equipe de Linha Viva", "Manutenção Preventiva", "Emergência", "Equipe de Poda", "Equipe de Iluminação"]),
      notes: "Ocorrência validada conforme procedimento técnico.",
      validatedAt: new Date(createdAt.getTime() + 3600000 + Math.random() * 86400000),
    } : undefined,
  };

  return occurrence;
}

export const mockOccurrences: Occurrence[] = Array.from({ length: 25 }, (_, i) => generateOccurrence(i));

export const dashboardStats = {
  totalDenuncias: 1247,
  riscosPrevenidos: 892,
  tempoMedioResposta: "2.4h",
  resolvidasMes: 156,
  pendentes: mockOccurrences.filter(o => o.status === "pendente_ia" || o.status === "validacao_tecnica").length,
  emAtendimento: mockOccurrences.filter(o => o.status === "em_atendimento").length,
  resolvidas: mockOccurrences.filter(o => o.status === "resolvida").length,
};
