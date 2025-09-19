import { useState, useEffect, useRef } from 'react';
import { Debt } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  const fetchDebts = async () => {
    try {
      const token = localStorage.getItem('geo-token');
      if (!token) throw new Error('Token não encontrado');

      const response = await fetch(`${API_URL}/api/debts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 403) {
        throw new Error('Acesso negado. Token inválido ou expirado.');
      }

      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }

      const rawData = await response.json();

      const adapted: Debt[] = rawData.map((item: any) => ({
        id: String(item.id),
        name: item.descricao,
        currentAmount: item.valor,
        minimumPayment: 0,
        interestRate: 0,
      }));

      setDebts(adapted);
      setError(null);
    } catch (err: any) {
      console.error('Erro ao buscar dívidas:', err);
      setError(err.message || 'Não foi possível carregar as dívidas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebts();

    const token = localStorage.getItem('geo-token');
    if (!token) {
      setError('Token não encontrado. Faça login.');
      setLoading(false);
      return;
    }

    // Conectar WebSocket com token no query string
    ws.current = new WebSocket(`ws://localhost:4000?token=${token}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'debtsUpdate') {
        const adapted: Debt[] = data.debts.map((item: any) => ({
          id: String(item.id),
          name: item.descricao,
          currentAmount: item.valor,
          minimumPayment: 0,
          interestRate: 0,
        }));
        setDebts(adapted);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket fechado');
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return { debts, loading, error };
};