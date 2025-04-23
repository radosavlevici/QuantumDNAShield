import { GroverParameters, QPEParameters } from "@/components/AlgorithmControls";

// Grover's Algorithm Simulation

export const calculateGroverResults = (params: GroverParameters) => {
  const { numQubits, targetState } = params;
  const numStates = 2 ** numQubits;
  
  // Calculate the probability distribution after Grover's algorithm
  // In a real implementation, this would be calculated using quantum mechanics
  
  // Convert target state to decimal for easier comparison
  const targetDecimal = parseInt(targetState, 2);
  
  // Create an array of states and their probabilities
  const results = Array.from({ length: numStates }, (_, i) => {
    const binary = i.toString(2).padStart(numQubits, '0');
    
    // Target state has high probability, others have low probability
    const probability = i === targetDecimal ? 0.9 : 0.1 / (numStates - 1);
    
    return {
      state: binary,
      probability,
    };
  });
  
  return results;
};

export const calculateOptimalIterations = (params: GroverParameters) => {
  const { numQubits } = params;
  const N = 2 ** numQubits;
  
  // Optimal number of iterations is approximately π/4 * sqrt(N)
  const optimalIterations = Math.round(Math.PI / 4 * Math.sqrt(N));
  
  return optimalIterations;
};

// QPE Algorithm Simulation

export const calculateQPEResults = (params: QPEParameters) => {
  const { precision, phaseValue } = params;
  
  // True phase as a fraction of π
  const truePhase = phaseValue / 100;
  
  // Calculate best estimate with given precision
  // This would be the closest fraction with denominator 2^precision
  const fractionDenominator = 2 ** precision;
  const closestFraction = Math.round(truePhase * fractionDenominator) / fractionDenominator;
  
  // Binary representation of the numerator
  const numerator = Math.round(truePhase * fractionDenominator);
  const binaryRepresentation = numerator.toString(2).padStart(precision, '0');
  
  // Calculate error between true and estimated phase
  const error = Math.abs(truePhase - closestFraction);
  
  // Simulate measurement frequency - higher precision means better frequency
  // In a real QPE, this would depend on how close the true phase is to a binary fraction
  const frequency = 100 - (error * 100) - (20 / precision);
  
  return {
    estimatedPhase: closestFraction.toFixed(2),
    binaryRepresentation,
    decimalValue: `${numerator}/${fractionDenominator} = ${closestFraction}`,
    error,
    frequency: Math.max(0, Math.min(100, Math.round(frequency))),
  };
};
