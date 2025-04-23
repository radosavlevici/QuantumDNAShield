const ComplexityChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-medium text-dark mb-4">Complexity Visualization</h3>
      
      <div className="h-80">
        <div className="w-full h-full">
          <svg viewBox="0 0 800 400" width="100%" height="100%">
            {/* Axes */}
            <line x1="50" y1="350" x2="750" y2="350" stroke="#64748b" strokeWidth="2" />
            <line x1="50" y1="350" x2="50" y2="50" stroke="#64748b" strokeWidth="2" />
            
            {/* Axis labels */}
            <text x="400" y="390" fontFamily="sans-serif" fontSize="14" fill="#1e293b" textAnchor="middle">Problem Size (N)</text>
            <text x="20" y="200" fontFamily="sans-serif" fontSize="14" fill="#1e293b" textAnchor="middle" transform="rotate(-90, 20, 200)">Computational Complexity</text>
            
            {/* Grid lines */}
            <line x1="50" y1="280" x2="750" y2="280" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="50" y1="210" x2="750" y2="210" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="50" y1="140" x2="750" y2="140" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="50" y1="70" x2="750" y2="70" stroke="#e2e8f0" strokeWidth="1" />
            
            {/* Classical complexity (O(N)) */}
            <path d="M50,350 L120,280 L190,210 L260,140 L330,70 L400,50" fill="none" stroke="#ef4444" strokeWidth="3" />
            
            {/* Quantum complexity (O(√N)) */}
            <path d="M50,350 L190,320 L330,290 L470,260 L610,230 L750,200" fill="none" stroke="#3b82f6" strokeWidth="3" />
            
            {/* Labels */}
            <circle cx="400" cy="50" r="5" fill="#ef4444" />
            <text x="410" y="50" fontFamily="sans-serif" fontSize="12" fill="#ef4444">Classical O(N)</text>
            
            <circle cx="750" cy="200" r="5" fill="#3b82f6" />
            <text x="700" y="200" fontFamily="sans-serif" fontSize="12" fill="#3b82f6" textAnchor="end">Quantum O(√N)</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ComplexityChart;
