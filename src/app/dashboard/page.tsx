'use client';

import React from 'react';
import { useDebts } from '@/hooks/useDebts';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import DebtChart from '@/components/dashboard/DebtChart';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { formatCurrency } from '@/utils/formatCurrency';

export default function DashboardPage() {
  const { debts, loading, error } = useDebts();

  // Calcular totais e médias
  const totalDebt = debts.reduce((acc, d) => acc + d.currentAmount, 0);
  const averageDebt = debts.length ? totalDebt / debts.length : 0;
  const maxDebt = debts.length ? Math.max(...debts.map(d => d.currentAmount)) : 0;
  const minDebt = debts.length ? Math.min(...debts.map(d => d.currentAmount)) : 0;

  // Dados simulados para o gráfico (pode ser substituído por dados reais)
  const chartData = [
    { mes: 'Jan', valor: 1200 },
    { mes: 'Fev', valor: 1500 },
    { mes: 'Mar', valor: 1100 },
    { mes: 'Abr', valor: 1800 },
    { mes: 'Mai', valor: 1600 },
    { mes: 'Jun', valor: 1400 },
  ];

  if (loading) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-red-500">
        <p className="text-center text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6">Dashboard</h1>
      <p className="text-gray-400 mb-8">Resumo financeiro do usuário aparecerá aqui.</p>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Total de Dívidas</h2>
          <p className="text-2xl">{formatCurrency(totalDebt)}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Média por Dívida</h2>
          <p className="text-2xl">{formatCurrency(averageDebt)}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Maior Dívida</h2>
          <p className="text-2xl">{formatCurrency(maxDebt)}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-2">Menor Dívida</h2>
          <p className="text-2xl">{formatCurrency(minDebt)}</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Evolução das Dívidas</h3>
        <div className="bg-gray-800 rounded-lg p-4 shadow">
          <DebtChart data={chartData} />
        </div>
      </section>
    </div>
  );
}