import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import AlgorithmTabs, { TabItem } from "@/components/AlgorithmTabs";
import CircuitDiagram from "@/components/CircuitDiagram";
import StateVisualization from "@/components/StateVisualization";
import { GroverControls, QFTControls, QPEControls } from "@/components/AlgorithmControls";
import { GroverResults, QPEResults } from "@/components/MeasurementResults";
import CodeBlock from "@/components/CodeBlock";
import ComplexityTable from "@/components/ComplexityTable";
import ComplexityChart from "@/components/ComplexityChart";
import ApplicationDomains from "@/components/ApplicationDomains";

import type { 
  GroverParameters, 
  QFTParameters, 
  QPEParameters 
} from "@/components/AlgorithmControls";

const QuantumAlgorithms = () => {
  // Grover's algorithm state
  const [groverParams, setGroverParams] = useState<GroverParameters>({
    numQubits: 4,
    targetState: "0110",
  });
  const [groverSimulated, setGroverSimulated] = useState(false);

  // QFT state
  const [qftParams, setQftParams] = useState<QFTParameters>({
    numQubits: 3,
    inputState: "0",
  });
  const [qftSimulated, setQftSimulated] = useState(false);

  // QPE state
  const [qpeParams, setQpeParams] = useState<QPEParameters>({
    precision: 5,
    phaseValue: 25, // 0.25π
  });
  const [qpeSimulated, setQpeSimulated] = useState(false);

  // Handlers for running simulations
  const runGroverSimulation = useCallback(() => {
    setGroverSimulated(true);
  }, []);

  const runQFTSimulation = useCallback(() => {
    setQftSimulated(true);
  }, []);

  const runQPESimulation = useCallback(() => {
    setQpeSimulated(true);
  }, []);

  // Code blocks for each algorithm
  const groverCode = `# Simplified Grover implementation
def create_grover_circuit(marked_state, n_qubits):
    # Create circuit with n qubits
    qc = QuantumCircuit(n_qubits)
    
    # Apply H-gates to put qubits in superposition
    for qubit in range(n_qubits):
        qc.h(qubit)
    
    # Number of Grover iterations
    iterations = int(np.pi/4 * np.sqrt(2**n_qubits))
    
    for _ in range(iterations):
        # Oracle - marks the target state
        qc.append(create_oracle(marked_state, n_qubits), range(n_qubits))
        
        # Diffusion operator - amplifies marked state
        qc.append(create_diffusion(n_qubits), range(n_qubits))
    
    # Measure all qubits
    qc.measure_all()
    
    return qc`;

  const qftCode = `# Simplified QFT implementation
def create_qft_circuit(n_qubits):
    # Create a quantum circuit with n qubits
    qc = QuantumCircuit(n_qubits)
    
    # Implement QFT
    for i in range(n_qubits):
        qc.h(i)
        
        for j in range(i+1, n_qubits):
            # Apply controlled phase rotation
            qc.cp(2*np.pi/2**(j-i+1), j, i)
    
    # Reverse the order of qubits
    for i in range(n_qubits//2):
        qc.swap(i, n_qubits-i-1)
        
    return qc`;

  const qpeCode = `# Simplified QPE implementation
def quantum_phase_estimation(unitary, n_precision, target_state):
    # Create circuit with precision qubits + 1 target qubit
    qc = QuantumCircuit(n_precision + 1, n_precision)
    
    # Prepare the target state
    qc.initialize(target_state, n_precision)
    
    # Put precision qubits in superposition
    for i in range(n_precision):
        qc.h(i)
    
    # Apply controlled unitary operations
    for i in range(n_precision):
        # Apply unitary 2^i times controlled on the i-th qubit
        qc.append(controlled_unitary(unitary, 2**i), 
                 [i] + [n_precision])
    
    # Apply inverse QFT to precision qubits
    qc.append(inverse_qft(n_precision), range(n_precision))
    
    # Measure precision qubits
    qc.measure(range(n_precision), range(n_precision))
    
    return qc`;

  // Define tab content
  const groverTabContent = (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-dark mb-4">Grover's Search Algorithm</h2>
      <p className="text-dark-light mb-8">
        Grover's algorithm provides a quadratic speedup for unstructured search problems, finding a marked item in an unsorted database of N items 
        in approximately √N steps instead of the N steps required by classical algorithms.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Parameter Controls */}
        <GroverControls 
          parameters={groverParams} 
          onChange={setGroverParams} 
          onSimulate={runGroverSimulation}
        />

        {/* Circuit Diagram */}
        <CircuitDiagram type="grover" parameters={groverParams} />
      </div>

      {/* Results Section - only show if simulation has been run */}
      {groverSimulated && (
        <GroverResults parameters={groverParams} />
      )}

      {/* Implementation Section */}
      <CodeBlock
        title="Technical Implementation Details"
        code={groverCode}
        language="python"
      />
    </section>
  );

  const qftTabContent = (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-dark mb-4">Quantum Fourier Transform</h2>
      <p className="text-dark-light mb-8">
        The Quantum Fourier Transform (QFT) is a fundamental building block for many quantum algorithms, including Shor's algorithm 
        and quantum phase estimation. It performs a Fourier transform on quantum amplitudes exponentially faster than classical Fast Fourier Transform.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Parameter Controls */}
        <QFTControls 
          parameters={qftParams} 
          onChange={setQftParams} 
          onSimulate={runQFTSimulation} 
        />

        {/* Circuit Diagram */}
        <CircuitDiagram type="qft" parameters={qftParams} />
      </div>

      {/* State Visualization - only show if simulation has been run */}
      {qftSimulated && (
        <StateVisualization parameters={qftParams} />
      )}

      {/* Implementation Section */}
      <CodeBlock
        title="Technical Implementation Details"
        code={qftCode}
        language="python"
      />
    </section>
  );

  const qpeTabContent = (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-dark mb-4">Quantum Phase Estimation</h2>
      <p className="text-dark-light mb-8">
        Quantum Phase Estimation (QPE) determines the eigenphase of a unitary operator, with applications in quantum chemistry, optimization, and factoring algorithms.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Parameter Controls */}
        <QPEControls 
          parameters={qpeParams} 
          onChange={setQpeParams} 
          onSimulate={runQPESimulation} 
        />

        {/* Circuit Diagram */}
        <CircuitDiagram type="qpe" parameters={qpeParams} />
      </div>

      {/* Results Section - only show if simulation has been run */}
      {qpeSimulated && (
        <QPEResults parameters={qpeParams} />
      )}

      {/* Implementation Section */}
      <CodeBlock
        title="Technical Implementation Details"
        code={qpeCode}
        language="python"
      />
    </section>
  );

  const comparisonTabContent = (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-dark mb-4">Quantum vs. Classical Complexity</h2>
      <p className="text-dark-light mb-8">
        Quantum algorithms can provide significant computational advantages over classical algorithms for specific problems. 
        Here's a comparison of the computational complexity for various problems.
      </p>

      <ComplexityTable />
      <ComplexityChart />
      <ApplicationDomains />
    </section>
  );

  // Define the tabs
  const tabs: TabItem[] = [
    {
      id: "grover",
      label: "Grover's Search Algorithm",
      content: groverTabContent,
    },
    {
      id: "qft",
      label: "Quantum Fourier Transform",
      content: qftTabContent,
    },
    {
      id: "qpe",
      label: "Quantum Phase Estimation",
      content: qpeTabContent,
    },
    {
      id: "comparison",
      label: "Quantum vs. Classical",
      content: comparisonTabContent,
    },
  ];

  return (
    <div>
      <HeroSection
        title="Quantum Algorithms"
        subtitle="Explore powerful quantum algorithms that provide computational advantages"
        description={[
          "Quantum algorithms leverage the principles of quantum mechanics to solve certain problems more efficiently than classical algorithms. These algorithms can provide exponential speedups for specific computational tasks.",
          "Our platform features interactive demonstrations of key quantum algorithms, including Grover's search algorithm, Shor's factoring algorithm, and quantum phase estimation."
        ]}
      />
      
      <AlgorithmTabs tabs={tabs} />
    </div>
  );
};

export default QuantumAlgorithms;
