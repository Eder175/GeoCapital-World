import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface DebtChartProps {
  data: { mes: string; valor: number }[];
}

const DebtChart = ({ data }: DebtChartProps) => {
  if (data.length === 0) {
    return <p className="text-gray-500">Sem dados para exibir.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Evolução das Dívidas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="valor" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DebtChart;
