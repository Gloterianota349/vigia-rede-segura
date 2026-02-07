import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, MapPin, ShieldOff, Upload, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVigiStore } from "@/data/store";
import { CATEGORY_LABELS, OccurrenceCategory, DenunciaFormData } from "@/data/types";
import { useToast } from "@/hooks/use-toast";

const defaultLocation = { lat: -7.1195, lng: -34.8450, address: "Av. Epitácio Pessoa, 1200", city: "João Pessoa" };

const DenunciaPage = () => {
  const navigate = useNavigate();
  const { addOccurrence } = useVigiStore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<DenunciaFormData>({
    category: "" as OccurrenceCategory,
    description: "",
    photo: null,
    photoPreview: "",
    location: defaultLocation,
    anonymous: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({ ...f, photo: file, photoPreview: ev.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setForm((f) => ({ ...f, photo: null, photoPreview: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.category) {
      toast({ title: "Selecione a categoria", description: "Por favor, selecione o tipo de ocorrência.", variant: "destructive" });
      return;
    }
    if (!form.description.trim()) {
      toast({ title: "Descreva o problema", description: "Adicione uma descrição da ocorrência.", variant: "destructive" });
      return;
    }
    if (!form.photoPreview) {
      toast({ title: "Foto obrigatória", description: "Tire ou selecione uma foto da ocorrência.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    
    // Simulate AI processing delay
    await new Promise((r) => setTimeout(r, 3000));
    
    addOccurrence(form);
    setSubmitting(false);
    navigate("/denuncia/resultado");
  };

  if (submitting) {
    return <AIProcessingScreen />;
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Fazer Denúncia</h1>
          <p className="mt-2 text-muted-foreground">Reporte ocorrências na rede elétrica de forma rápida e segura</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Categoria da Ocorrência</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v as OccurrenceCategory }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de problema..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Descrição do Problema</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Descreva o que você observou com o máximo de detalhes possível..."
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="min-h-[120px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Photo */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Camera className="h-4 w-4" />
                Foto da Ocorrência
                <span className="text-xs font-normal text-destructive">*obrigatório</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {form.photoPreview ? (
                <div className="relative overflow-hidden rounded-lg">
                  <img src={form.photoPreview} alt="Preview" className="h-48 w-full object-cover" />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-2 right-2 rounded-full bg-background/80 p-1.5 backdrop-blur-sm hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center gap-3 rounded-lg border-2 border-dashed border-border py-10 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Clique para selecionar uma foto</span>
                </button>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4" />
                Localização
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{form.location?.address}</p>
                    <p className="text-xs text-muted-foreground">{form.location?.city} • GPS simulado</p>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Localização obtida automaticamente via GPS (simulado para demo)
              </p>
            </CardContent>
          </Card>

          {/* Anonymous toggle */}
          <Card>
            <CardContent className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-3">
                <ShieldOff className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">Denúncia Anônima</Label>
                  <p className="text-xs text-muted-foreground">Sua identidade será protegida</p>
                </div>
              </div>
              <Switch checked={form.anonymous} onCheckedChange={(v) => setForm((f) => ({ ...f, anonymous: v }))} />
            </CardContent>
          </Card>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full gradient-vigia text-primary-foreground py-6 text-base font-semibold hover:opacity-90 transition-opacity shadow-vigia"
          >
            Enviar Denúncia
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

const AIProcessingScreen = () => (
  <div className="flex min-h-[70vh] items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="relative mx-auto mb-8 h-32 w-32">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary"
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-2 border-accent/20 border-t-accent"
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
                <circle cx="12" cy="6" r="1" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      <h2 className="mb-2 text-xl font-bold text-foreground">Processando com IA...</h2>
      <p className="text-muted-foreground">Analisando imagem e classificando a ocorrência</p>

      <div className="mx-auto mt-6 max-w-xs space-y-2">
        {["Analisando imagem...", "Classificando risco...", "Verificando duplicatas..."].map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.8 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              className="h-2 w-2 rounded-full bg-primary"
            />
            {step}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default DenunciaPage;
