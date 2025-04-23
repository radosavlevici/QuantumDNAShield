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
    
    // For high qubit counts, implement a more efficient visualization
    const maxVisibleQubits = 20; // Maximum number of qubits to show fully
    const displayedQubits = numQubits > maxVisibleQubits ? maxVisibleQubits : numQubits;
    
    // Adjust height for efficient rendering of high qubit counts
    const height = displayedQubits * 40 + 40;
    const width = 500;
    
    return (
      <div>
        {numQubits > maxVisibleQubits && (
          <div className="mb-3 p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-sm">
            <p className="font-medium">High Qubit Count ({numQubits} qubits)</p>
            <p className="text-xs mt-1">Showing simplified visualization with {maxVisibleQubits} representative qubits.</p>
          </div>
        )}
        
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Qubit lines and labels */}
          {Array.from({ length: displayedQubits }).map((_, i) => {
            // For high qubit counts, show representative qubits (first few, middle few, and last few)
            let qubitIndex = i;
            let qubitLabel = `q${i}`;
            
            if (numQubits > maxVisibleQubits) {
              if (i < 5) {
                // Show first few qubits
                qubitIndex = i;
                qubitLabel = `q${i}`;
              } else if (i < 10) {
                // Show some middle qubits
                const middleStart = Math.floor(numQubits / 2) - 2;
                qubitIndex = middleStart + (i - 5);
                qubitLabel = `q${qubitIndex}`;
              } else if (i === 10) {
                // Add ellipsis to indicate skipped qubits
                qubitIndex = i;
                qubitLabel = `...`;
              } else {
                // Show last few qubits
                qubitIndex = numQubits - (displayedQubits - i);
                qubitLabel = `q${qubitIndex}`;
              }
            }
            
            const y = 40 + i * 40;
            return (
              <g key={`qubit-${i}`}>
                {renderQubitLine(y, width)}
                <text x="30" y={y + 5} fontFamily="monospace" fontSize="14" fill="#1e293b">
                  {qubitLabel}
                </text>
              </g>
            );
          })}
        
          {/* Hadamard gates */}
          {Array.from({ length: displayedQubits }).map((_, i) => {
            const y = 40 + i * 40;
            return <g key={`h-${i}`}>{renderHGate(85, y)}</g>;
          })}
        
          {/* Oracle */}
          <rect 
            x="160" 
            y="25" 
            width="80" 
            height={displayedQubits * 40 - 10} 
            fill="#8b5cf6" 
            rx="2" 
          />
          <text 
            x="200" 
            y={displayedQubits * 20 + 15} 
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
            height={displayedQubits * 40 - 10} 
            fill="#10b981" 
            rx="2" 
          />
          <text 
            x="340" 
            y={displayedQubits * 20 + 15} 
            fontFamily="monospace" 
            fontSize="14" 
            fill="white" 
            textAnchor="middle"
          >
            Diffusion
          </text>
        
          {/* Measurements */}
          {Array.from({ length: displayedQubits }).map((_, i) => {
            const y = 40 + i * 40;
            return <g key={`m-${i}`}>{renderMeasurement(420, y)}</g>;
          })}
        </svg>
      </div>
    );
  };

  const renderQFTCircuit = (params: QFTParameters) => {
    const numQubits = params.numQubits;
    
    // For high qubit counts, implement a more efficient visualization
    const maxVisibleQubits = 15; // Maximum number of qubits to show fully
    const displayedQubits = numQubits > maxVisibleQubits ? maxVisibleQubits : numQubits;
    
    // Adjust height for efficient rendering of high qubit counts
    const height = displayedQubits * 40 + 40;
    const width = 500;
    
    return (
      <div>
        {numQubits > maxVisibleQubits && (
          <div className="mb-3 p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-sm">
            <p className="font-medium">High Qubit Count ({numQubits} qubits)</p>
            <p className="text-xs mt-1">Showing simplified visualization with {maxVisibleQubits} representative qubits.</p>
          </div>
        )}
        
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Qubit lines and labels */}
          {Array.from({ length: displayedQubits }).map((_, i) => {
            // For high qubit counts, show representative qubits
            let qubitIndex = i;
            let qubitLabel = `q${i}`;
            
            if (numQubits > maxVisibleQubits) {
              if (i < 5) {
                // First few qubits
                qubitIndex = i;
              } else if (i === 5) {
                // Add ellipsis
                qubitLabel = "...";
              } else {
                // Last few qubits
                qubitIndex = numQubits - (displayedQubits - i);
                qubitLabel = `q${qubitIndex}`;
              }
            }
            
            const y = 40 + i * 40;
            return (
              <g key={`qubit-${i}`}>
                {renderQubitLine(y, width)}
                <text x="30" y={y + 5} fontFamily="monospace" fontSize="14" fill="#1e293b">
                  {qubitLabel}
                </text>
              </g>
            );
          })}

          {/* QFT Circuit Elements */}
          {Array.from({ length: displayedQubits }).map((_, i) => {
            const y = 40 + i * 40;
            
            return (
              <g key={`qft-row-${i}`}>
                {/* Hadamard gate for each qubit */}
                {renderHGate(85 + i * 20, y)}
                
                {/* Controlled rotation gates - simplified for high qubit counts */}
                {i < displayedQubits - 1 && (
                  <g>
                    <line 
                      x1={140 + i * 20} 
                      y1={y} 
                      x2={140 + i * 20} 
                      y2={y + 40} 
                      stroke="#64748b" 
                      strokeWidth="2" 
                    />
                    <circle cx={140 + i * 20} cy={y + 40} r="5" fill="black" />
                    <rect 
                      x={140 + i * 20 - 15} 
                      y={y - 15} 
                      width="30" 
                      height="30" 
                      fill="#8b5cf6" 
                      rx="2" 
                    />
                    <text 
                      x={140 + i * 20} 
                      y={y + 5} 
                      fontFamily="monospace" 
                      fontSize="12" 
                      fill="white" 
                      textAnchor="middle"
                    >
                      R{i+2}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderQPECircuit = (params: QPEParameters) => {
    const precision = params.precision;
    
    // For high precision counts, implement a more efficient visualization
    const maxVisibleQubits = 15; // Maximum number of qubits to show fully
    const displayedQubits = precision > maxVisibleQubits ? maxVisibleQubits : precision;
    
    // Adjust height for efficient rendering of high qubit counts
    const height = (displayedQubits + 1) * 40 + 40;
    const width = 500;
    
    return (
      <div>
        {precision > maxVisibleQubits && (
          <div className="mb-3 p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-sm">
            <p className="font-medium">High Precision Qubit Count ({precision} qubits)</p>
            <p className="text-xs mt-1">Showing simplified visualization with {maxVisibleQubits} representative precision qubits.</p>
          </div>
        )}
        
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Qubit lines */}
          {Array.from({ length: displayedQubits + 1 }).map((_, i) => {
            const y = 40 + i * 40;
            let label = "t"; // Default for target qubit
            
            if (i < displayedQubits) {
              // For precision qubits
              if (precision > maxVisibleQubits) {
                if (i < 5) {
                  // First few qubits
                  label = `p${i}`;
                } else if (i === 5) {
                  // Add ellipsis
                  label = "...";
                } else {
                  // Last few qubits
                  const qubitIndex = precision - (displayedQubits - i);
                  label = `p${qubitIndex}`;
                }
              } else {
                label = `p${i}`;
              }
            }
            
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
            y={40 + displayedQubits * 40 - 15} 
            width="30" 
            height="30" 
            fill="#64748b" 
            rx="2" 
          />
          <text 
            x="85" 
            y={40 + displayedQubits * 40 + 5} 
            fontFamily="monospace" 
            fontSize="14" 
            fill="white" 
            textAnchor="middle"
          >
            |ψ⟩
          </text>
          
          {/* Hadamard gates on precision qubits */}
          {Array.from({ length: displayedQubits }).map((_, i) => {
            const y = 40 + i * 40;
            return <g key={`h-${i}`}>{renderHGate(120, y)}</g>;
          })}
          
          {/* Controlled-U gates - simplified for high qubit counts */}
          {Array.from({ length: Math.min(displayedQubits, 8) }).map((_, i) => {
            const controlY = 40 + i * 40;
            const targetY = 40 + displayedQubits * 40;
            const x = 180 + i * 20;
            const power = i === 5 ? "..." : (i < 5 ? 2 ** i : 2 ** (precision - (8 - i)));
            
            return (
              <g key={`cu-${i}`}>
                <line x1={x} y1={controlY} x2={x} y2={targetY} stroke="#64748b" strokeWidth="2" />
                <circle cx={x} cy={controlY} r="5" fill="black" />
                <rect x={x - 15} y={targetY - 15} width="30" height="30" fill="#8b5cf6" rx="2" />
                <text 
                  x={x} 
                  y={targetY + 5} 
                  fontFamily="monospace" 
                  fontSize={power === "..." ? "14" : "12"} 
                  fill="white" 
                  textAnchor="middle"
                >
                  {power === "..." ? "..." : `U${power > 1 ? power : ""}`}
                </text>
              </g>
            );
          })}
          
          {/* Inverse QFT */}
          <rect 
            x="340" 
            y="25" 
            width="60" 
            height={displayedQubits * 40 - 10} 
            fill="#10b981" 
            rx="2" 
          />
          <text 
            x="370" 
            y={displayedQubits * 20 + 15} 
            fontFamily="monospace" 
            fontSize="14" 
            fill="white" 
            textAnchor="middle"
          >
            QFT⁻¹
          </text>
          
          {/* Measurements on precision qubits */}
          {Array.from({ length: displayedQubits }).map((_, i) => {
            const y = 40 + i * 40;
            return <g key={`m-${i}`}>{renderMeasurement(420, y)}</g>;
          })}
        </svg>
      </div>
    );
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
      <div className={`border border-gray-200 rounded-lg p-4 ${type === "qpe" ? "h-56" : "h-64"} bg-slate-50 overflow-auto`}>
        {type === "grover" && renderGroverCircuit(parameters as GroverParameters)}
        {type === "qft" && renderQFTCircuit(parameters as QFTParameters)}
        {type === "qpe" && renderQPECircuit(parameters as QPEParameters)}
      </div>
    </div>
  );
};

export default CircuitDiagram;