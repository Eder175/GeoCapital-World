'use client';

import ProtectedLayout from '@/layouts/ProtectedLayout';
import { useDebts } from '@/hooks/useDebts';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import DebtChart from '@/components/dashboard/DebtChart';

export default function DashboardPage() {
  const { debts, loading } = useDebts();

  const chartData = [
    { mes: 'Jan', valor: 1200 },
    { mes: 'Fev', valor: 1500 },
    { mes: 'Mar', valor: 1100 },
    { mes: 'Abr', valor: 1800 },
    { mes: 'Mai', valor: 1600 },
    { mes: 'Jun', valor: 1400 },
  ];

  return (
    <ProtectedLayout>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mb-2">Resumo financeiro do usuário aparecerá aqui.</p>
      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : (
        <>
          <FinancialSummary debts={debts} />
          <DebtChart data={chartData} />
        </>
      )}
    </ProtectedLayout>
  );
}
