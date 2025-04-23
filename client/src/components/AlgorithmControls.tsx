import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Type for Grover's algorithm parameters
export type GroverParameters = {
  numQubits: number;
  targetState: string;
};

// Type for QFT parameters
export type QFTParameters = {
  numQubits: number;
  inputState: string;
};

// Type for QPE parameters
export type QPEParameters = {
  precision: number;
  phaseValue: number;
};

interface GroverControlsProps {
  parameters: GroverParameters;
  onChange: (parameters: GroverParameters) => void;
  onSimulate: () => void;
}

export const GroverControls = ({ parameters, onChange, onSimulate }: GroverControlsProps) => {
  const [localParams, setLocalParams] = useState<GroverParameters>(parameters);
  
  useEffect(() => {
    onChange(localParams);
  }, [localParams, onChange]);

  // Generate possible target states based on num qubits with optimization for high-qubit counts
  const statesToShow = localParams.numQubits > 8 ? 16 : Math.min(2 ** localParams.numQubits, 64);
  const possibleStates = Array.from({ length: statesToShow }, (_, i) => {
    // For high qubit counts, select interesting states across the spectrum
    let stateIndex = i;
    if (localParams.numQubits > 8) {
      if (i < 4) {
        // First few states
        stateIndex = i;
      } else if (i < 8) {
        // Some states in the middle-low range
        const totalStates = 2 ** localParams.numQubits;
        stateIndex = Math.floor(totalStates * 0.25) + i - 4;
      } else if (i < 12) {
        // Some states in the middle-high range
        const totalStates = 2 ** localParams.numQubits;
        stateIndex = Math.floor(totalStates * 0.5) + i - 8;
      } else {
        // Last few states
        const totalStates = 2 ** localParams.numQubits;
        stateIndex = totalStates - (16 - i);
      }
    }
    
    // Create binary representation
    const binaryFull = stateIndex.toString(2).padStart(localParams.numQubits, '0');
    
    // Truncate display for very large qubit counts
    const displayBinary = localParams.numQubits > 20 ?
      binaryFull.substring(0, 8) + '...' + binaryFull.substring(binaryFull.length - 8) :
      binaryFull;
    
    return { value: binaryFull, label: `|${displayBinary}⟩` };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-dark mb-4">Algorithm Parameters</h3>
      
      <div className="mb-4">
        <label htmlFor="grover-qubits" className="block text-dark-light mb-2">Number of qubits:</label>
        <div className="flex items-center">
          <Slider
            id="grover-qubits"
            min={2}
            max={5000}
            step={localParams.numQubits < 100 ? 1 : localParams.numQubits < 1000 ? 10 : 100}
            value={[localParams.numQubits]}
            onValueChange={(values) => setLocalParams({ ...localParams, numQubits: values[0] })}
            className="w-full"
          />
          <span className="ml-4 text-dark-light">{localParams.numQubits}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="grover-target" className="block text-dark-light mb-2">Target state:</label>
        <Select
          value={localParams.targetState}
          onValueChange={(value) => setLocalParams({ ...localParams, targetState: value })}
        >
          <SelectTrigger id="grover-target">
            <SelectValue placeholder="Select target state" />
          </SelectTrigger>
          <SelectContent>
            {possibleStates.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button
        onClick={onSimulate}
        className="bg-primary hover:bg-primary/90 text-white font-medium"
      >
        Run Simulation
      </Button>
    </div>
  );
};

interface QFTControlsProps {
  parameters: QFTParameters;
  onChange: (parameters: QFTParameters) => void;
  onSimulate: () => void;
}

export const QFTControls = ({ parameters, onChange, onSimulate }: QFTControlsProps) => {
  const [localParams, setLocalParams] = useState<QFTParameters>(parameters);
  
  useEffect(() => {
    onChange(localParams);
  }, [localParams, onChange]);

  // Generate possible input states based on num qubits
  // Generate a more manageable number of states for large qubit counts
  const statesToShow = localParams.numQubits > 10 ? 16 : Math.min(2 ** localParams.numQubits, 64);
  const possibleStates = Array.from({ length: statesToShow }, (_, i) => {
    // For large qubit counts, select representative states across the spectrum
    let stateIndex = i;
    if (localParams.numQubits > 10) {
      const totalStates = 2 ** localParams.numQubits;
      stateIndex = Math.floor(i * (totalStates / statesToShow));
    }
    const binary = stateIndex.toString(2).padStart(
      Math.min(localParams.numQubits, 20), '0'
    );
    const displayBinary = localParams.numQubits > 20 ? 
      binary.substring(0, 10) + '...' + binary.substring(binary.length - 10) : 
      binary;
    
    return { value: stateIndex.toString(), label: `|${displayBinary}⟩` };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-dark mb-4">Algorithm Parameters</h3>
      
      <div className="mb-4">
        <label htmlFor="qft-qubits" className="block text-dark-light mb-2">Number of qubits:</label>
        <div className="flex items-center">
          <Slider
            id="qft-qubits"
            min={2}
            max={5000}
            step={localParams.numQubits < 100 ? 1 : localParams.numQubits < 1000 ? 10 : 100}
            value={[localParams.numQubits]}
            onValueChange={(values) => setLocalParams({ ...localParams, numQubits: values[0] })}
            className="w-full"
          />
          <span className="ml-4 text-dark-light">{localParams.numQubits}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="qft-input" className="block text-dark-light mb-2">Input state:</label>
        <Select
          value={localParams.inputState}
          onValueChange={(value) => setLocalParams({ ...localParams, inputState: value })}
        >
          <SelectTrigger id="qft-input">
            <SelectValue placeholder="Select input state" />
          </SelectTrigger>
          <SelectContent>
            {possibleStates.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button
        onClick={onSimulate}
        className="bg-primary hover:bg-primary/90 text-white font-medium"
      >
        Run Simulation
      </Button>
    </div>
  );
};

interface QPEControlsProps {
  parameters: QPEParameters;
  onChange: (parameters: QPEParameters) => void;
  onSimulate: () => void;
}

export const QPEControls = ({ parameters, onChange, onSimulate }: QPEControlsProps) => {
  const [localParams, setLocalParams] = useState<QPEParameters>(parameters);
  
  useEffect(() => {
    onChange(localParams);
  }, [localParams, onChange]);

  const formattedPhase = (localParams.phaseValue / 100).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-dark mb-4">Algorithm Parameters</h3>
      
      <div className="mb-4">
        <label htmlFor="qpe-precision" className="block text-dark-light mb-2">Precision qubits:</label>
        <div className="flex items-center">
          <Slider
            id="qpe-precision"
            min={3}
            max={5000}
            step={localParams.precision < 100 ? 1 : localParams.precision < 1000 ? 10 : 100}
            value={[localParams.precision]}
            onValueChange={(values) => setLocalParams({ ...localParams, precision: values[0] })}
            className="w-full"
          />
          <span className="ml-4 text-dark-light">{localParams.precision}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="qpe-phase" className="block text-dark-light mb-2">Target phase (θ):</label>
        <div className="flex items-center">
          <Slider
            id="qpe-phase"
            min={0}
            max={100}
            step={1}
            value={[localParams.phaseValue]}
            onValueChange={(values) => setLocalParams({ ...localParams, phaseValue: values[0] })}
            className="w-full"
          />
          <span className="ml-4 text-dark-light">{formattedPhase}π</span>
        </div>
      </div>
      
      <Button
        onClick={onSimulate}
        className="bg-primary hover:bg-primary/90 text-white font-medium"
      >
        Run Simulation
      </Button>
    </div>
  );
};
