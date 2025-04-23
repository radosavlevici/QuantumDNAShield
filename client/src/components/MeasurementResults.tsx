import { GroverParameters, QPEParameters } from "./AlgorithmControls";
import { 
  calculateGroverResults, 
  calculateOptimalIterations,
  calculateQPEResults
} from "@/lib/algorithms";

interface GroverResultsProps {
  parameters: GroverParameters;
}

export const GroverResults = ({ parameters }: GroverResultsProps) => {
  const { targetState } = parameters;
  const results = calculateGroverResults(parameters);
  const optimalIterations = calculateOptimalIterations(parameters);
  
  // Number of states to display (if there are too many, we'll only show a subset)
  const displayLimit = Math.min(10, results.length);
  const displayResults = results.slice(0, displayLimit);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-medium text-dark mb-4">Measurement Results</h3>
      <p className="text-dark-light mb-4">
        After running Grover's algorithm, the target state |{targetState}⟩ has been amplified to have the highest probability of measurement.
      </p>
      
      <div className="h-64 mb-4">
        <div className="w-full h-full flex items-end justify-around">
          {displayResults.map((result) => (
            <div key={result.state} className="flex flex-col items-center">
              <div 
                className={`w-16 mb-1 ${result.state === targetState ? 'bg-primary' : 'bg-gray-200'}`} 
                style={{ height: `${result.probability * 180}px` }}
              ></div>
              <div className={`text-xs ${result.state === targetState ? 'font-semibold text-primary' : 'text-dark-light'}`}>
                |{result.state}⟩
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-dark-light">
        <p className="font-medium">Optimal number of iterations: <span className="text-primary">{optimalIterations}</span></p>
      </div>
    </div>
  );
};

interface QPEResultsProps {
  parameters: QPEParameters;
}

export const QPEResults = ({ parameters }: QPEResultsProps) => {
  const { precision, phaseValue } = parameters;
  const formattedPhaseTrue = (phaseValue / 100).toFixed(2);
  
  // Calculate QPE results
  const { estimatedPhase, binaryRepresentation, decimalValue, error, frequency } = calculateQPEResults(parameters);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-medium text-dark mb-4">Estimated Phase</h3>
      <p className="text-dark-light mb-4">
        With {precision} qubits, QPE can estimate the phase with precision of approximately {(1 / (2 ** precision)).toFixed(5)}.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-6 border border-gray-200 rounded-lg p-4">
            <div className="text-center">
              <span className="text-4xl font-semibold text-primary">{formattedPhaseTrue}</span>
              <span className="text-xl text-dark-light">π</span>
            </div>
            <div className="text-sm text-center text-dark-light mt-2">True Phase</div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-center">
              <span className="text-4xl font-semibold text-secondary">{estimatedPhase}</span>
              <span className="text-xl text-dark-light">π</span>
            </div>
            <div className="text-sm text-center text-dark-light mt-2">Estimated Phase</div>
          </div>
        </div>
        
        <div>
          <div className="text-dark-light mb-4">
            <p>Binary representation: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{binaryRepresentation}</span></p>
            <p>Decimal value: <span className="font-semibold">{decimalValue}</span></p>
            <p>Error: <span className={`font-semibold ${error === 0 ? 'text-success' : 'text-warning'}`}>±{error.toFixed(5)}</span></p>
          </div>
          
          <div className="mb-3">
            <div className="font-medium text-dark-light mb-1">Measurement frequency:</div>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <div className="bg-secondary h-5 rounded-full" style={{ width: `${frequency}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-dark-light mt-1">
              <span>|{binaryRepresentation}⟩: {frequency}%</span>
              <span>Others: {100 - frequency}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
