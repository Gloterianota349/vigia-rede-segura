import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Filter, Eye, EyeOff, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useVigiStore } from "@/data/store";
import { CATEGORY_LABELS, RISK_LABELS, STATUS_LABELS, OccurrenceCategory, RiskLevel, OccurrenceStatus } from "@/data/types";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const riskColors: Record<string, string> = {
  baixo: "#38a169",
  medio: "#eab308",
  alto: "#f97316",
  critico: "#ef4444",
};

const riskBadgeColors: Record<string, string> = {
  baixo: "bg-risk-low/10 text-risk-low border-risk-low/30",
  medio: "bg-risk-medium/10 text-risk-medium border-risk-medium/30",
  alto: "bg-risk-high/10 text-risk-high border-risk-high/30",
  critico: "bg-risk-critical/10 text-risk-critical border-risk-critical/30",
};

const MapaPage = () => {
  const { occurrences } = useVigiStore();
  const [filterRisk, setFilterRisk] = useState<string>("todos");
  const [filterCategory, setFilterCategory] = useState<string>("todos");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [publicView, setPublicView] = useState(false);

  const filtered = occurrences.filter((o) => {
    if (filterRisk !== "todos" && o.aiAnalysis?.riskLevel !== filterRisk) return false;
    if (filterCategory !== "todos" && o.category !== filterCategory) return false;
    if (filterStatus !== "todos" && o.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Filters bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex flex-wrap items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Filter className="h-4 w-4" />
            Filtros:
          </div>

          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Risco" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os riscos</SelectItem>
              <SelectItem value="critico">Crítico</SelectItem>
              <SelectItem value="alto">Alto</SelectItem>
              <SelectItem value="medio">Médio</SelectItem>
              <SelectItem value="baixo">Baixo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todas categorias</SelectItem>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos status</SelectItem>
              {Object.entries(STATUS_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-2">
            <Label className="text-xs text-muted-foreground cursor-pointer flex items-center gap-1.5">
              {publicView ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              {publicView ? "Visão Pública" : "Visão Interna"}
            </Label>
            <Switch checked={publicView} onCheckedChange={setPublicView} />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative flex-1">
        <MapContainer
          center={[-7.5, -35.5]}
          zoom={7}
          style={{ height: "100%", width: "100%", minHeight: "500px" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((occ) => {
            const risk = occ.aiAnalysis?.riskLevel || "baixo";
            const color = riskColors[risk];
            const radius = risk === "critico" ? 12 : risk === "alto" ? 10 : risk === "medio" ? 8 : 6;

            return (
              <CircleMarker
                key={occ.id}
                center={[occ.location.lat, occ.location.lng]}
                radius={radius}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.6,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="min-w-[200px] p-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold">{occ.id}</span>
                    </div>
                    <p className="mb-1 text-sm font-semibold">{CATEGORY_LABELS[occ.category]}</p>
                    {!publicView && (
                      <>
                        <p className="mb-1 text-xs text-gray-600">{occ.description}</p>
                        <p className="text-xs"><strong>Risco:</strong> {RISK_LABELS[risk as RiskLevel]}</p>
                        <p className="text-xs"><strong>Status:</strong> {STATUS_LABELS[occ.status]}</p>
                      </>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      <MapPin className="mr-1 inline h-3 w-3" />
                      {occ.location.address}, {occ.location.city}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[1000]">
          <Card className="bg-background/95 backdrop-blur-sm">
            <CardContent className="p-3">
              <p className="mb-2 text-xs font-semibold text-foreground">Nível de Risco</p>
              <div className="space-y-1">
                {Object.entries(RISK_LABELS).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2 text-xs">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: riskColors[key] }}
                    />
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">{filtered.length} ocorrências</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapaPage;
