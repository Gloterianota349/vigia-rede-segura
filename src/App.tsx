import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import DenunciaPage from "./pages/DenunciaPage";
import ResultadoPage from "./pages/ResultadoPage";
import PainelPage from "./pages/PainelPage";
import MapaPage from "./pages/MapaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/denuncia" element={<DenunciaPage />} />
          <Route path="/denuncia/resultado" element={<ResultadoPage />} />
          <Route path="/painel" element={<PainelPage />} />
          <Route path="/mapa" element={<MapaPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
