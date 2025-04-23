import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import QuantumBasics from "@/pages/QuantumBasics";
import QuantumAlgorithms from "@/pages/QuantumAlgorithms";
import DnaSecurity from "@/pages/DnaSecurity";
import QuantumMl from "@/pages/QuantumMl";
import Resources from "@/pages/Resources";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quantum-basics" component={QuantumBasics} />
      <Route path="/quantum-algorithms" component={QuantumAlgorithms} />
      <Route path="/dna-security" component={DnaSecurity} />
      <Route path="/quantum-ml" component={QuantumMl} />
      <Route path="/resources" component={Resources} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Toaster />
          <Router />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
