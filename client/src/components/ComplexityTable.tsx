interface ComplexityRow {
  problem: string;
  classical: string;
  quantum: string;
  speedup: string;
}

const ComplexityTable = () => {
  const complexityData: ComplexityRow[] = [
    {
      problem: "Unstructured Search",
      classical: "O(N)",
      quantum: "O(√N) (Grover)",
      speedup: "Quadratic",
    },
    {
      problem: "Integer Factorization",
      classical: "O(e^(log N)^(1/3))",
      quantum: "O((log N)^3) (Shor)",
      speedup: "Exponential",
    },
    {
      problem: "Discrete Logarithm",
      classical: "O(√N)",
      quantum: "O((log N)^3) (Shor)",
      speedup: "Exponential",
    },
    {
      problem: "Quantum Simulation",
      classical: "O(2^N)",
      quantum: "O(N^k)",
      speedup: "Exponential",
    },
    {
      problem: "Linear Systems",
      classical: "O(N^3)",
      quantum: "O(log N) (HHL)",
      speedup: "Exponential",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-10">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-dark">
          <thead className="text-xs font-medium text-dark uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Problem</th>
              <th scope="col" className="px-6 py-3">Classical Complexity</th>
              <th scope="col" className="px-6 py-3">Quantum Complexity</th>
              <th scope="col" className="px-6 py-3">Speedup</th>
            </tr>
          </thead>
          <tbody>
            {complexityData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white border-b" : "bg-gray-50 border-b"}>
                <th scope="row" className="px-6 py-4 font-medium">{row.problem}</th>
                <td className="px-6 py-4">{row.classical}</td>
                <td className="px-6 py-4 text-primary">{row.quantum}</td>
                <td className="px-6 py-4">{row.speedup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplexityTable;
