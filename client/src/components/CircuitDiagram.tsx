import { GroverParameters, QFTParameters, QPEParameters } from "./AlgorithmControls";

interface CircuitDiagramProps {
  type: "grover" | "qft" | "qpe";
  parameters: GroverParameters | QFTParameters | QPEParameters;
}

const CircuitDiagram = ({ type, parameters }: CircuitDiagramProps) => {
  // Common rendering elements
  const renderQubitLine = (y: number, width: number) => (
    <line x1="50" y1={y} x2={width - 50} y2={y} stroke="#64748b" strokeWidth="2" />
  );

  const renderQubitLabel = (index: number, y: number) => (
    <text x="30" y={y + 5} fontFamily="monospace" fontSize="14" fill="#1e293b">
      q{index}
    </text>
  );

  const renderHGate = (x: number, y: number) => (
    <>
      <rect x={x - 15} y={y - 15} width="30" height="30" fill="#3b82f6" rx="2" />
      <text x={x} y={y + 5} fontFamily="monospace" fontSize="14" fill="white" textAnchor="middle">
        H
      </text>
    </>
  );

  const renderMeasurement = (x: number, y: number) => (
    <>
      <rect x={x - 15} y={y - 15} width="30" height="30" fill="#64748b" rx="2" />
      <text x={x} y={y + 5} fontFamily="monospace" fontSize="14" fill="white" textAnchor="middle">
        M
      </text>
    </>
  );

  // Render different circuit diagrams based on the algorithm type
  const renderGroverCircuit = (params: GroverParameters) => {
    const numQubits = params.numQubits;
    const height = numQubits * 40 + 20;
    const width = 500;
    
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        {/* Qubit lines and labels */}
        {Array.from({ length: numQubits }).map((_, i) => {
          const y = 40 + i * 40;
          return (
            <g key={`qubit-${i}`}>
              {renderQubitLine(y, width)}
              {renderQubitLabel(i, y)}
            </g>
          );
        })}
        
        {/* Hadamard gates */}
        {Array.from({ length: numQubits }).map((_, i) => {
          const y = 40 + i * 40;
          return <g key={`h-${i}`}>{renderHGate(85, y)}</g>;
        })}
        
        {/* Oracle */}
        <rect 
          x="160" 
          y="25" 
          width="80" 
          height={numQubits * 40 - 10} 
          fill="#8b5cf6" 
          rx="2" 
        />
        <text 
          x="200" 
          y={numQubits * 20 + 15} 
          fontFamily="monospace" 
          fontSize="14" 
          fill="white" 
          textAnchor="middle"
        >
          Oracle
        </text>
        
        {/* Diffusion */}
        <rect 
          x="300" 
          y="25" 
          width="80" 
          height={numQubits * 40 - 10} 
          fill="#10b981" 
          rx="2" 
        />
        <text 
          x="340" 
          y={numQubits * 20 + 15} 
          fontFamily="monospace" 
          fontSize="14" 
          fill="white" 
          textAnchor="middle"
        >
          Diffusion
        </text>
        
        {/* Measurements */}
        {Array.from({ length: numQubits }).map((_, i) => {
          const y = 40 + i * 40;
          return <g key={`m-${i}`}>{renderMeasurement(420, y)}</g>;
        })}
      </svg>
    );
  };

  const renderQFTCircuit = (params: QFTParameters) => {
    const numQubits = params.numQubits;
    const height = numQubits * 40 + 20;
    const width = 500;
    
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        {/* Qubit lines and labels */}
        {Array.from({ length: numQubits }).map((_, i) => {
          const y = 40 + i * 40;
          return (
            <g key={`qubit-${i}`}>
              {renderQubitLine(y, width)}
              {renderQubitLabel(i, y)}
            </g>
          );
        })}

        {/* QFT Circuit Elements */}
        {Array.from({ length: numQubits }).map((_, i) => {
          const y = 40 + i * 40;
          
          return (
            <g key={`qft-row-${i}`}>
              {/* Hadamard gate for each qubit */}
              {renderHGate(85 + i * 50, y)}
              
              {/* Controlled rotation gates */}
              {Array.from({ length: numQubits - i - 1 }).map((_, j) => {
                const targetY = 40 + (i + j + 1) * 40;
                const x = 140 + i * 50 + j * 30;
                
                return (
                  <g key={`cr-${i}-${j}`}>
                    <line x1={x} y1={y} x2={x} y2={targetY} stroke="#64748b" strokeWidth="2" />
                    <circle cx={x} cy={targetY} r="5" fill="black" />
                    <rect x={x - 15} y={y - 15} width="30" height="30" fill="#8b5cf6" rx="2" />
                    <text 
                      x={x} 
                      y={y + 5} 
                      fontFamily="monospace" 
                      fontSize="14" 
                      fill="white" 
                      textAnchor="middle"
                    >
                      R{j+2}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  };

  const renderQPECircuit = (params: QPEParameters) => {
    const precision = (params as QPEParameters).precision;
    const height = (precision + 1) * 40 + 20;
    const width = 500;
    
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        {/* Qubit lines */}
        {Array.from({ length: precision + 1 }).map((_, i) => {
          const y = 40 + i * 40;
          const label = i < precision ? `p${i}` : 't';
          
          return (
            <g key={`qubit-${i}`}>
              {renderQubitLine(y, width)}
              <text x="30" y={y + 5} fontFamily="monospace" fontSize="14" fill="#1e293b">
                {label}
              </text>
            </g>
          );
        })}
        
        {/* Initialize target qubit */}
        <rect 
          x="70" 
          y={40 + precision * 40 - 15} 
          width="30" 
          height="30" 
          fill="#64748b" 
          rx="2" 
        />
        <text 
          x="85" 
          y={40 + precision * 40 + 5} 
          fontFamily="monospace" 
          fontSize="14" 
          fill="white" 
          textAnchor="middle"
        >
          |ψ⟩
        </text>
        
        {/* Hadamard gates on precision qubits */}
        {Array.from({ length: precision }).map((_, i) => {
          const y = 40 + i * 40;
          return <g key={`h-${i}`}>{renderHGate(120, y)}</g>;
        })}
        
        {/* Controlled-U gates */}
        {Array.from({ length: precision }).map((_, i) => {
          const controlY = 40 + i * 40;
          const targetY = 40 + precision * 40;
          const x = 180 + i * 50;
          const power = 2 ** i;
          
          return (
            <g key={`cu-${i}`}>
              <line x1={x} y1={controlY} x2={x} y2={targetY} stroke="#64748b" strokeWidth="2" />
              <circle cx={x} cy={controlY} r="5" fill="black" />
              <rect x={x - 15} y={targetY - 15} width="30" height="30" fill="#8b5cf6" rx="2" />
              <text 
                x={x} 
                y={targetY + 5} 
                fontFamily="monospace" 
                fontSize="14" 
                fill="white" 
                textAnchor="middle"
              >
                U{power > 1 ? power : ''}
              </text>
            </g>
          );
        })}
        
        {/* Inverse QFT */}
        <rect 
          x="340" 
          y="25" 
          width="60" 
          height={precision * 40 - 10} 
          fill="#10b981" 
          rx="2" 
        />
        <text 
          x="370" 
          y={precision * 20 + 15} 
          fontFamily="monospace" 
          fontSize="14" 
          fill="white" 
          textAnchor="middle"
        >
          QFT⁻¹
        </text>
        
        {/* Measurements on precision qubits */}
        {Array.from({ length: precision }).map((_, i) => {
          const y = 40 + i * 40;
          return <g key={`m-${i}`}>{renderMeasurement(420, y)}</g>;
        })}
      </svg>
    );
  };

  const renderCircuit = () => {
    if (type === "grover") {
      return renderGroverCircuit(parameters as GroverParameters);
    } else if (type === "qft") {
      return renderQFTCircuit(parameters as QFTParameters);
    } else if (type === "qpe") {
      return renderQPECircuit(parameters as QPEParameters);
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-dark mb-4">
        {type === "grover" ? "Circuit Diagram" : 
         type === "qft" ? "QFT Circuit" :
         "QPE Circuit"}
      </h3>
      {type !== "grover" && (
        <p className="text-dark-light mb-4">
          {type === "qft" 
            ? "The Quantum Fourier Transform applies Hadamard gates followed by controlled rotation gates, with a final bit reversal."
            : "Quantum Phase Estimation applies controlled-U operations to the target qubit, followed by an inverse QFT on the precision qubits."}
        </p>
      )}
      <div className={`border border-gray-200 rounded-lg p-4 ${type === "qpe" ? "h-48" : "h-56"} bg-slate-50`}>
        {renderCircuit()}
      </div>
    </div>
  );
};

export default CircuitDiagram;
