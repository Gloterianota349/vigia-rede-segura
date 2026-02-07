import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Brain, Shield, Copy, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVigiStore } from "@/data/store";
import { CATEGORY_LABELS, RISK_LABELS } from "@/data/types";

const riskColors = {
  baixo: "bg-risk-low/10 text-risk-low border-risk-low/30",
  medio: "bg-risk-medium/10 text-risk-medium border-risk-medium/30",
  alto: "bg-risk-high/10 text-risk-high border-risk-high/30",
  critico: "bg-risk-critical/10 text-risk-critical border-risk-critical/30",
};

const classificationLabels = {
  valida: { label: "Válida", icon: CheckCircle, color: "text-vigia-green" },
  provavelmente_valida: { label: "Provavelmente Válida", icon: Eye, color: "text-vigia-amber" },
  invalida: { label: "Inválida", icon: AlertTriangle, color: "text-destructive" },
};

const ResultadoPage = () => {
  const navigate = useNavigate();
  const { lastSubmittedOccurrence } = useVigiStore();

  if (!lastSubmittedOccurrence || !lastSubmittedOccurrence.aiAnalysis) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-4 text-xl font-bold text-foreground">Nenhuma denúncia recente</h2>
          <p className="mb-6 text-muted-foreground">Faça uma denúncia para ver o resultado da triagem por IA.</p>
          <Button onClick={() => navigate("/denuncia")} className="gradient-vigia text-primary-foreground">
            Fazer Denúncia
          </Button>
        </div>
      </div>
    );
  }

  const occ = lastSubmittedOccurrence;
  const ai = occ.aiAnalysis;
  const classInfo = classificationLabels[ai.classification];
  const ClassIcon = classInfo.icon;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Success header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
          >
            <CheckCircle className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">Denúncia Registrada!</h1>
          <p className="mt-2 text-muted-foreground">
            Protocolo: <span className="font-mono font-semibold text-foreground">{occ.id}</span>
          </p>
        </div>

        {/* AI Classification */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="h-5 w-5 text-primary" />
                Resultado da Triagem por IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Classification */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Classificação</span>
                <div className={`flex items-center gap-1.5 font-semibold ${classInfo.color}`}>
                  <ClassIcon className="h-4 w-4" />
                  {classInfo.label}
                </div>
              </div>

              {/* Suggested category */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tipo detectado</span>
                <span className="text-sm font-medium text-foreground">{CATEGORY_LABELS[ai.suggestedCategory]}</span>
              </div>

              {/* Risk level */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Nível de risco</span>
                <Badge variant="outline" className={riskColors[ai.riskLevel]}>
                  {RISK_LABELS[ai.riskLevel]}
                </Badge>
              </div>

              {/* Confidence */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Confiança da IA</span>
                  <span className="text-sm font-medium text-foreground">{Math.round(ai.confidence * 100)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ai.confidence * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full gradient-vigia"
                  />
                </div>
              </div>

              {/* Image analysis */}
              <div>
                <span className="mb-2 block text-sm text-muted-foreground">Análise da imagem</span>
                <div className="space-y-1.5">
                  {ai.imageAnalysis.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Duplicate check */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Duplicatas</span>
                <div className="flex items-center gap-1.5 text-sm">
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-foreground">
                    {ai.isDuplicate ? `Possível duplicata de ${ai.duplicateOf}` : "Nova ocorrência"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Photo preview */}
        {occ.photoUrl && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardContent className="p-0">
                <img src={occ.photoUrl} alt="Ocorrência" className="h-48 w-full rounded-lg object-cover" />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Feedback message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-primary/10 bg-primary/5">
            <CardContent className="flex items-start gap-3 pt-6">
              <Shield className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Sua denúncia está sendo analisada</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Especialistas técnicos da Energisa irão validar esta ocorrência e tomar as providências necessárias. 
                  Acompanhe pelo protocolo {occ.id}.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => navigate("/denuncia")} variant="outline" className="flex-1">
            Nova Denúncia
          </Button>
          <Button onClick={() => navigate("/painel")} className="flex-1 gradient-vigia text-primary-foreground hover:opacity-90">
            Ver Painel Técnico
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultadoPage;
