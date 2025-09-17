'use client';
import { Debt, DebtStatus } from '@/types';

interface DebtWidgetProps {
  debts: Debt[];
  status?: DebtStatus;
  insights?: { type: string; message: string }[];
}

export default function DebtWidget({ debts, status, insights }: DebtWidgetProps) {
  return (
    <div className="p-6 bg-gray-800 rounded shadow text-white">
      <h2 className="text-2xl font-bold mb-4">Dívidas</h2>

      {debts.length === 0 ? (
        <p className="text-gray-400">Nenhuma dívida encontrada.</p>
      ) : (
        <ul className="space-y-4">
          {debts.map((debt) => (
            <li key={debt.id} className="border-b border-gray-700 pb-4">
              <h3 className="text-xl font-semibold">{debt.name ?? 'Sem nome'}</h3>
              <p>💰 Valor atual: R$ {debt.currentAmount.toFixed(2)}</p>
              <p>📉 Pagamento mínimo: R$ {debt.minimumPayment.toFixed(2)}</p>
              <p>📈 Taxa de juros: {debt.interestRate.toFixed(2)}%</p>
              {status && <p className="mt-2 text-sm italic text-gray-300">Status: {status}</p>}
            </li>
          ))}
        </ul>
      )}

      {insights && insights.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">🔍 Insights</h3>
          <ul className="list-disc list-inside text-gray-300">
            {insights.map((insight, index) => (
              <li key={index}>{insight.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
