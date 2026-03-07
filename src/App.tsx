import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import RankLookup from "./pages/RankLookup";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import Wiki from "./pages/Wiki";
import MoreRules from "./pages/MoreRules";
import Forms from "./pages/Forms";
import ExtraMiniGames from "./pages/ExtraMiniGames";
import RankApplications from "./pages/RankApplications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rank-lookup" element={<RankLookup />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/more-rules" element={<MoreRules />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/extra-mini-games" element={<ExtraMiniGames />} />
          <Route path="/rank-applications" element={<RankApplications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
