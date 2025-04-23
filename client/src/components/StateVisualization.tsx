import { QFTParameters } from "./AlgorithmControls";

interface StateVisualizationProps {
  parameters: QFTParameters;
}

const StateVisualization = ({ parameters }: StateVisualizationProps) => {
  const numQubits = parameters.numQubits;
  const inputState = parseInt(parameters.inputState);
  
  // Calculate the number of states to display (limit to 8 for clarity)
  const numStates = Math.min(8, 2 ** numQubits);
  
  // Generate state visualizations for QFT
  const renderStates = () => {
    const stateCircles = [];
    
    for (let i = 0; i < numStates; i++) {
      const x = 100 + i * 150;
      const y = 100;
      const radius = 80;
      
      // Calculate angle for this state based on input state and QFT transformation
      // In a real QFT, the phase would be calculated more precisely
      // This is a simplified visual representation
      let angle = 0;
      if (inputState > 0) {
        // Simulate phase relationships in QFT
        angle = (i * inputState * 2 * Math.PI) / (2 ** numQubits);
      }
      
      // Determine endpoint of vector
      const endX = x + Math.cos(angle) * radius * 0.6;
      const endY = y - Math.sin(angle) * radius * 0.6;
      
      // Binary representation of state
      const binary = i.toString(2).padStart(numQubits, '0');
      
      // Determine if this is the input state
      const isInputState = i === inputState;
      
      stateCircles.push(
        <g key={`state-${i}`}>
          {/* Complex plane */}
          <circle cx={x} cy={y} r={radius} fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
          <line x1={x - radius} y1={y} x2={x + radius} y2={y} stroke="#64748b" strokeWidth="1" />
          <line x1={x} y1={y - radius} x2={x} y2={y + radius} stroke="#64748b" strokeWidth="1" />
          
          {/* Vector */}
          <circle cx={endX} cy={endY} r="6" fill={isInputState ? "#3b82f6" : "#64748b"} />
          <line x1={x} y1={y} x2={endX} y2={endY} stroke={isInputState ? "#3b82f6" : "#64748b"} strokeWidth="2" />
          
          {/* Label */}
          <text x={x} y={y + radius + 20} fontFamily="monospace" fontSize="14" fill="#1e293b" textAnchor="middle">
            |{binary}⟩
          </text>
        </g>
      );
    }
    
    return stateCircles;
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-medium text-dark mb-4">State Visualization</h3>
      <p className="text-dark-light mb-4">
        The QFT transforms a computational basis state into a superposition with specific phase relationships.
      </p>
      
      <div className="h-64 mb-4">
        <div className="w-full h-full">
          <svg width="100%" height="100%" viewBox={`0 0 ${Math.min(numStates, 5) * 150 + 50} 200`}>
            {renderStates()}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StateVisualization;
