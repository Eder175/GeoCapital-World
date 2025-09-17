'use client';
import { useDebts } from '@/hooks/useDebts';
import DebtWidget from '@/components/widgets/DebtWidget';

export default function DebtMode() {
  const { debts, loading } = useDebts();

  if (loading) {
    return <div className="p-6 text-white">Carregando dívidas...</div>;
  }

  return (
    <div className="p-6">
      <DebtWidget debts={debts} />
    </div>
  );
}
