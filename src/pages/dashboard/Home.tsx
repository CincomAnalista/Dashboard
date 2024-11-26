import { useEffect, useState } from 'react';
import { Header, Loader } from '../../components';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { fetchAlertLoader } from '../../utils/fetchAlertLoader';

const baseUrl = `${import.meta.env.VITE_API_URL}/commissions`;

interface InvoiceDataProps {
  salesman: string;
  total_subtotal: number;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);

  const handleSearch = async () => {
    const url = `${baseUrl}/base?limit=1000`;
    try {
      const data = await fetchAlertLoader(
        url,
        {},
        setIsLoading,
        'Datos actualizados',
        'Error al actualizar los datos',
        1
      );

      const dataFormatted = data.reduce(
        (
          acc: Record<string, { salesman: string; total: number }>,
          item: InvoiceDataProps
        ) => {
          const { salesman, total_subtotal } = item;

          if (!acc[salesman]) {
            acc[salesman] = { salesman, total: 0 };
          }

          acc[salesman].total += total_subtotal;

          return acc;
        },
        {}
      );
      setInvoiceData(Object.values(dataFormatted));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Header title="Home">
      <div className="grid grid-cols-2 gap-5 mb-8 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={invoiceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="salesman" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              tooltipType="none"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={invoiceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="salesman" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {isLoading && <Loader />}
    </Header>
  );
}
