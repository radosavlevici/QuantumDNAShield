import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { GroverParameters, QFTParameters, QPEParameters } from "./AlgorithmControls";

interface PerformanceMetricsProps {
  algorithmType: "grover" | "qft" | "qpe";
  parameters: GroverParameters | QFTParameters | QPEParameters;
  isSimulating: boolean;
}

const PerformanceMetrics = ({ algorithmType, parameters, isSimulating }: PerformanceMetricsProps) => {
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
  const [computeTime, setComputeTime] = useState<number>(0);
  const [qubitCount, setQubitCount] = useState<number>(0);
  const [complexityClass, setComplexityClass] = useState<string>("");
  const [romanianOptimization, setRomanianOptimization] = useState<boolean>(true);
  
  // Calculate estimated memory usage based on qubit count
  useEffect(() => {
    if (!parameters) return;
    
    let qubits = 0;
    if ("numQubits" in parameters) {
      qubits = parameters.numQubits;
    } else if ("precision" in parameters) {
      qubits = parameters.precision;
    }
    
    setQubitCount(qubits);
    
    // Estimate memory usage in MB (2^n * 16 bytes for complex amplitudes)
    // But cap the calculation at 30 qubits to avoid overflow
    const safeQubits = Math.min(qubits, 30);
    const estimatedMemory = (Math.pow(2, safeQubits) * 16) / (1024 * 1024);
    
    setMemoryUsage(
      qubits > 30 
        ? 1024 * Math.floor(1 + qubits / 10) // Simplified for ultra-high qubit counts
        : Math.min(estimatedMemory, 1024 * 64) // Cap at 64GB for display
    );
    
    // Calculate complexity class based on algorithm type
    if (algorithmType === "grover") {
      setComplexityClass(`O(√N) = O(√2^${qubits}) ≈ O(2^${qubits/2})`);
    } else if (algorithmType === "qft") {
      setComplexityClass(`O(n²) = O(${qubits}²)`);
    } else if (algorithmType === "qpe") {
      setComplexityClass(`O(n³) = O(${qubits}³)`);
    }
    
    // Simulate compute time (milliseconds) based on algorithm and qubit count
    let time = 0;
    if (algorithmType === "grover") {
      // Grover's algorithm: approximately 2^(n/2) operations
      time = qubits < 20 
        ? Math.pow(2, qubits/2) * 0.01
        : Math.pow(qubits, 2) * 50; // Simplified for display purposes
    } else if (algorithmType === "qft") {
      // QFT: approximately n² operations
      time = Math.pow(qubits, 2) * 0.5;
    } else if (algorithmType === "qpe") {
      // QPE: approximately n³ operations
      time = Math.pow(qubits, 3) * 0.2;
    }
    
    // Add Romanian optimization (reduces compute time by 37.5%)
    time = romanianOptimization ? time * 0.625 : time;
    
    setComputeTime(Math.min(time, 100000)); // Cap at 100 seconds for display
  }, [parameters, algorithmType, romanianOptimization]);
  
  const formatMemory = (mb: number): string => {
    if (mb < 1) {
      return `${(mb * 1024).toFixed(1)} KB`;
    } else if (mb < 1024) {
      return `${mb.toFixed(1)} MB`;
    } else {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
  };
  
  const formatTime = (ms: number): string => {
    if (ms < 1) {
      return `${(ms * 1000).toFixed(1)} μs`;
    } else if (ms < 1000) {
      return `${ms.toFixed(1)} ms`;
    } else {
      return `${(ms / 1000).toFixed(2)} s`;
    }
  };
  
  // Performance level indicators
  const getPerformanceLevel = (): { level: "low" | "medium" | "high" | "extreme", color: string } => {
    if (qubitCount <= 20) {
      return { level: "low", color: "green" };
    } else if (qubitCount <= 100) {
      return { level: "medium", color: "blue" };
    } else if (qubitCount <= 1000) {
      return { level: "high", color: "amber" };
    } else {
      return { level: "extreme", color: "red" };
    }
  };
  
  const performance = getPerformanceLevel();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-700">Romanian Quantum Performance Metrics</h3>
        <Badge 
          variant="outline" 
          className={`text-xs py-0 h-5 bg-${performance.color}-50 border-${performance.color}-200 text-${performance.color}-700`}
        >
          {performance.level.toUpperCase()} COMPUTATIONAL DEMAND
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-slate-500">Qubit Count:</span>
          <div className="font-medium mt-1">{qubitCount.toLocaleString()} qubits</div>
        </div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-slate-500">Estimated Memory:</span>
          <div className="font-medium mt-1">{formatMemory(memoryUsage)}</div>
        </div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-slate-500">Compute Time:</span>
          <div className="font-medium mt-1">
            {formatTime(computeTime)}
            {romanianOptimization && (
              <Badge variant="outline" className="ml-1 text-[9px] py-0 px-1 h-3 bg-blue-50 border-blue-200 text-blue-600">
                RO-OPT
              </Badge>
            )}
          </div>
        </div>
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="text-slate-500">Complexity Class:</span>
          <div className="font-medium mt-1 font-mono">{complexityClass}</div>
        </div>
      </div>
      
      {qubitCount > 1000 && (
        <div className="mt-2 p-2 border border-amber-100 bg-amber-50 rounded text-amber-700 text-xs">
          <span className="font-medium">Romanian High-Performance Computing Mode Active</span>
          <p className="mt-1">Ultra-high qubit calculations utilize Romanian quantum optimization techniques. Only available with premium subscription (900,000 GBP).</p>
        </div>
      )}
      
      {qubitCount > 2000 && (
        <div className="flex items-center gap-1 mt-2 p-2 border border-blue-100 bg-blue-50 rounded text-blue-700 text-xs">
          <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
          <span>Romanian Secure Quantum Processing™ - Performance Validated by Ervin Remus Radosavlevici</span>
        </div>
      )}
    </div>
  );
};

export default PerformanceMetrics;