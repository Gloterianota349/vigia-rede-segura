import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, Clock, CheckCircle, Eye, Brain, BarChart3, Shield, Users,
  ChevronRight, X, Zap, MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useVigiStore } from "@/data/store";
import { dashboardStats } from "@/data/mockData";
import {
  Occurrence, OccurrenceStatus, CATEGORY_LABELS, RISK_LABELS, STATUS_LABELS, RiskLevel,
} from "@/data/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const riskBadgeColors: Record<string, string> = {
  baixo: "bg-risk-low/10 text-risk-low border-risk-low/30",
  medio: "bg-risk-medium/10 text-risk-medium border-risk-medium/30",
  alto: "bg-risk-high/10 text-risk-high border-risk-high/30",
  critico: "bg-risk-critical/10 text-risk-critical border-risk-critical/30",
};

const statusColumns: { status: OccurrenceStatus; label: string; icon: any; color: string }[] = [
  { status: "pendente_ia", label: "Pendente IA", icon: Brain, color: "border-t-vigia-amber" },
  { status: "validacao_tecnica", label: "Validação Técnica", icon: Eye, color: "border-t-primary" },
  { status: "em_atendimento", label: "Em Atendimento", icon: Users, color: "border-t-vigia-orange" },
  { status: "resolvida", label: "Resolvida", icon: CheckCircle, color: "border-t-vigia-green" },
];

const PainelPage = () => {
  const { occurrences, updateOccurrenceStatus } = useVigiStore();
  const [selectedOcc, setSelectedOcc] = useState<Occurrence | null>(null);

  const riskDistribution = [
    { name: "Crítico", value: occurrences.filter((o) => o.aiAnalysis?.riskLevel === "critico").length, fill: "hsl(0, 84%, 60%)" },
    { name: "Alto", value: occurrences.filter((o) => o.aiAnalysis?.riskLevel === "alto").length, fill: "hsl(25, 95%, 53%)" },
    { name: "Médio", value: occurrences.filter((o) => o.aiAnalysis?.riskLevel === "medio").length, fill: "hsl(38, 92%, 50%)" },
    { name: "Baixo", value: occurrences.filter((o) => o.aiAnalysis?.riskLevel === "baixo" || !o.aiAnalysis).length, fill: "hsl(152, 60%, 42%)" },
  ];

  const metricCards = [
    { label: "Pendentes", value: dashboardStats.pendentes, icon: Clock, color: "text-vigia-amber" },
    { label: "Em Atendimento", value: dashboardStats.emAtendimento, icon: Users, color: "text-vigia-orange" },
    { label: "Resolvidas", value: dashboardStats.resolvidas, icon: CheckCircle, color: "text-vigia-green" },
    { label: "Tempo Médio", value: dashboardStats.tempoMedioResposta, icon: BarChart3, color: "text-primary", isText: true },
  ];

  const timeAgo = (d: Date) => {
    const diff = Date.now() - d.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "< 1h";
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Painel Técnico</h1>
          <p className="text-sm text-muted-foreground">Gestão e validação de ocorrências</p>
        </div>

        {/* Metrics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {metricCards.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <m.icon className={`h-8 w-8 ${m.color}`} />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{m.value}</p>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Risk chart */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="h-full">
              <CardContent className="flex items-center gap-2 p-4">
                <div className="h-20 w-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={riskDistribution} innerRadius={20} outerRadius={35} paddingAngle={3} dataKey="value">
                        {riskDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs space-y-0.5">
                  <p className="font-semibold text-foreground text-sm">Risco</p>
                  {riskDistribution.map((r) => (
                    <div key={r.name} className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: r.fill }} />
                      <span className="text-muted-foreground">{r.name}: {r.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Kanban */}
        <div className="grid gap-4 lg:grid-cols-4">
          {statusColumns.map((col) => {
            const items = occurrences.filter((o) => o.status === col.status);
            return (
              <div key={col.status}>
                <div className="mb-3 flex items-center gap-2">
                  <col.icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">{col.label}</h3>
                  <Badge variant="secondary" className="ml-auto text-xs">{items.length}</Badge>
                </div>
                <div className="space-y-3">
                  <AnimatePresence>
                    {items.slice(0, 6).map((occ) => (
                      <motion.div
                        key={occ.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <Card
                          className={`cursor-pointer border-t-2 ${col.color} transition-all hover:shadow-md`}
                          onClick={() => setSelectedOcc(occ)}
                        >
                          <CardContent className="p-3">
                            <div className="mb-2 flex items-start justify-between">
                              <span className="text-xs font-mono text-muted-foreground">{occ.id}</span>
                              {occ.aiAnalysis && (
                                <Badge variant="outline" className={`text-[10px] ${riskBadgeColors[occ.aiAnalysis.riskLevel]}`}>
                                  {RISK_LABELS[occ.aiAnalysis.riskLevel]}
                                </Badge>
                              )}
                            </div>
                            <p className="mb-2 text-xs font-medium text-foreground line-clamp-2">{CATEGORY_LABELS[occ.category]}</p>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{occ.location.city}</span>
                              <span className="ml-auto flex items-center gap-0.5">
                                <Clock className="h-3 w-3" />
                                {timeAgo(occ.createdAt)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {items.length > 6 && (
                    <p className="text-center text-xs text-muted-foreground">+{items.length - 6} mais</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Validation Modal */}
      <ValidationModal
        occurrence={selectedOcc}
        onClose={() => setSelectedOcc(null)}
        onUpdateStatus={updateOccurrenceStatus}
      />
    </div>
  );
};

interface ValidationModalProps {
  occurrence: Occurrence | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: OccurrenceStatus) => void;
}

const ValidationModal = ({ occurrence, onClose, onUpdateStatus }: ValidationModalProps) => {
  const [finalRisk, setFinalRisk] = useState<RiskLevel>("medio");
  const [notes, setNotes] = useState("");

  if (!occurrence) return null;

  const ai = occurrence.aiAnalysis;

  const handleValidate = () => {
    onUpdateStatus(occurrence.id, "em_atendimento");
    onClose();
  };

  const handleReject = () => {
    onUpdateStatus(occurrence.id, "resolvida");
    onClose();
  };

  return (
    <Dialog open={!!occurrence} onOpenChange={() => onClose()}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Validação Técnica – {occurrence.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Photo */}
          <div className="overflow-hidden rounded-lg">
            <img src={occurrence.photoUrl} alt="Ocorrência" className="h-48 w-full object-cover" />
          </div>

          {/* Details grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Categoria</p>
              <p className="text-sm font-medium text-foreground">{CATEGORY_LABELS[occurrence.category]}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Localização</p>
              <p className="text-sm font-medium text-foreground">{occurrence.location.address}</p>
              <p className="text-xs text-muted-foreground">{occurrence.location.city}</p>
            </div>
          </div>

          {/* AI analysis */}
          {ai && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Brain className="h-4 w-4 text-primary" />
                Avaliação da IA
              </h4>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Classificação</span>
                  <span className="font-medium text-foreground">
                    {ai.classification === "valida" ? "Válida" : ai.classification === "provavelmente_valida" ? "Provavelmente Válida" : "Inválida"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risco IA</span>
                  <Badge variant="outline" className={riskBadgeColors[ai.riskLevel]}>{RISK_LABELS[ai.riskLevel]}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confiança</span>
                  <span className="font-medium text-foreground">{Math.round(ai.confidence * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duplicata?</span>
                  <span className="font-medium text-foreground">{ai.isDuplicate ? "Sim" : "Não"}</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="mb-1 text-xs text-muted-foreground">Detecções na imagem:</p>
                <div className="flex flex-wrap gap-1.5">
                  {ai.imageAnalysis.map((item, i) => (
                    <span key={i} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Descrição do cidadão</p>
            <p className="text-sm text-foreground">{occurrence.description}</p>
          </div>

          {/* Technical fields */}
          <div className="space-y-3 rounded-lg border border-border p-4">
            <h4 className="text-sm font-semibold text-foreground">Validação do Técnico</h4>
            <div>
              <Label className="text-xs">Classificação final de risco</Label>
              <Select value={finalRisk} onValueChange={(v) => setFinalRisk(v as RiskLevel)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixo">Baixo</SelectItem>
                  <SelectItem value="medio">Médio</SelectItem>
                  <SelectItem value="alto">Alto</SelectItem>
                  <SelectItem value="critico">Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Observações</Label>
              <Textarea
                className="mt-1"
                placeholder="Notas técnicas..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleReject} variant="outline" className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/5">
              Rejeitar
            </Button>
            <Button onClick={handleValidate} className="flex-1 gradient-vigia text-primary-foreground hover:opacity-90">
              Confirmar e Atender
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PainelPage;
