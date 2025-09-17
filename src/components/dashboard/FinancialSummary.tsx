import { Debt } from '@/types';

interface FinancialSummaryProps {
  debts: Debt[];
}

const FinancialSummary = ({ debts }: FinancialSummaryProps) => {
  if (debts.length === 0) {
    return <p className="text-gray-500">Nenhuma dívida registrada.</p>;
  }

  const total = debts.reduce((sum, debt) => sum + (debt.currentAmount || 0), 0);
  const average = total / debts.length;
  const highest = Math.max(...debts.map(d => d.currentAmount || 0));
  const lowest = Math.min(...debts.map(d => d.currentAmount || 0));

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800">Total de Dívidas</h3>
        <p className="text-2xl text-red-600">€{total.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800">Média por Dívida</h3>
        <p className="text-2xl text-blue-600">€{average.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800">Maior Dívida</h3>
        <p className="text-2xl text-orange-600">€{highest.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800">Menor Dívida</h3>
        <p className="text-2xl text-green-600">€{lowest.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FinancialSummary;
