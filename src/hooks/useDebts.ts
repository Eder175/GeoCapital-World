import { useState, useEffect } from 'react';
import { Debt } from '@/types';

export const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/debts');
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const rawData = await response.json();

        // Adaptar os dados para o tipo esperado
        const adapted: Debt[] = rawData.map((item: any) => ({
          id: String(item.id),
          name: item.descricao,
          currentAmount: item.valor,
          minimumPayment: 0,
          interestRate: 0,
        }));

        setDebts(adapted);
      } catch (err) {
        console.error('Erro ao buscar dívidas:', err);
        setError('Não foi possível carregar as dívidas.');
      } finally {
        setLoading(false);
      }
    };

    fetchDebts();
  }, []);

  return { debts, loading, error };
};
