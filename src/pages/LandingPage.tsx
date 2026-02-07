import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, ArrowRight, Camera, Brain, CheckCircle, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/data/mockData";
import { useEffect, useState } from "react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString("pt-BR")}{suffix}</span>;
};

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: AlertTriangle, label: "Denúncias registradas", value: dashboardStats.totalDenuncias, color: "text-vigia-amber" },
    { icon: Shield, label: "Riscos prevenidos", value: dashboardStats.riscosPrevenidos, color: "text-vigia-green" },
    { icon: BarChart3, label: "Tempo médio de resposta", value: dashboardStats.tempoMedioResposta, isText: true, color: "text-primary" },
  ];

  const steps = [
    { icon: Camera, title: "1. Denúncia Cidadã", desc: "O cidadão reporta a ocorrência com foto, localização e categoria. Rápido, simples e pode ser anônimo." },
    { icon: Brain, title: "2. Triagem por IA", desc: "Inteligência artificial analisa a imagem, classifica o risco e verifica duplicatas automaticamente." },
    { icon: CheckCircle, title: "3. Validação Técnica", desc: "Especialista valida, prioriza e direciona a equipe adequada para resolução ágil." },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-vigia opacity-[0.03]" />
        <div className="absolute top-20 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              Plataforma Inteligente de Vigilância Elétrica
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              VIG<span className="text-gradient-vigia">IA</span>
            </h1>
            
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              Conectando cidadãos, inteligência artificial e especialistas técnicos para proteger vidas 
              e prevenir acidentes na rede elétrica em tempo real.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/denuncia")}
                className="gradient-vigia shadow-vigia text-primary-foreground px-8 py-6 text-base font-semibold hover:opacity-90 transition-opacity"
              >
                <Camera className="mr-2 h-5 w-5" />
                Fazer Denúncia
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/painel")}
                className="px-8 py-6 text-base font-semibold border-primary/20 hover:bg-primary/5"
              >
                <Eye className="mr-2 h-5 w-5" />
                Painel Técnico
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-muted/30">
        <div className="container mx-auto grid gap-6 px-4 py-12 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <Card className="border-none bg-transparent shadow-none text-center">
                <CardContent className="pt-6">
                  <stat.icon className={`mx-auto mb-3 h-8 w-8 ${stat.color}`} />
                  <div className="text-3xl font-bold text-foreground md:text-4xl">
                    {stat.isText ? stat.value : <AnimatedCounter target={stat.value as number} />}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flow Steps */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Como funciona?</h2>
          <p className="mt-3 text-muted-foreground">Um fluxo inteligente em 3 passos para proteger sua comunidade</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="group relative h-full overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-vigia">
                <div className="absolute top-0 left-0 h-1 w-full gradient-vigia opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="pt-8 pb-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-vigia">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="mb-4 text-2xl font-bold text-primary-foreground md:text-3xl">
            Viu algo perigoso na rede elétrica?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Sua denúncia pode salvar vidas. Reporte agora de forma rápida e segura.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/denuncia")}
            className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-base font-semibold"
          >
            Reportar Ocorrência
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
