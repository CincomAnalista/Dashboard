import { useState } from 'react';
import { Card, Header, Loader } from '../../components';
import { fetchAlertLoader } from '../../utils/fetchAlertLoader';

const baseUrl = import.meta.env.VITE_API_URL;
const databases = [
  {
    name: 'PYG',
    url: '/pyg',
    updateMessage: 'Datos actualizados',
    updateErrMessage: 'Error al actualizar los datos',
    deleteMessage: 'Datos eliminados',
    deleteErrMessage: 'Error al eliminar los datos',
    buton: false
  },
  {
    name: 'Comisiones',
    url: '/commissions',
    updateMessage: 'Datos actualizados',
    updateErrMessage: 'Error al actualizar los datos',
    deleteMessage: 'Datos eliminados',
    deleteErrMessage: 'Error al eliminar los datos',
    buton: true
  },
  {
    name: 'Balance',
    url: '/balance',
    updateMessage: 'Datos actualizados',
    updateErrMessage: 'Error al actualizar los datos',
    deleteMessage: 'Datos eliminados',
    deleteErrMessage: 'Error al eliminar los datos',
    buton: true
  },
  {
    name: 'Nuevos costos',
    url: '/commissions/new-cost',
    updateMessage: 'Datos actualizados',
    updateErrMessage: 'Error al actualizar los datos',
    deleteMessage: 'Datos eliminados',
    deleteErrMessage: 'Error al eliminar los datos',
    buton: true
  }
];

export function Databases() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDate = async (
    parcialUrl: string,
    message: string,
    errMessage: string,
    method: 'PUT' | 'GET' | 'POST' | 'DELETE'
  ) => {
    const url = `${baseUrl}${parcialUrl}`;
    try {
      await fetchAlertLoader(
        url,
        {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        setIsLoading,
        message,
        errMessage,
        2500
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Header title="Bases de datos">
        <div className="text-center mb-14">
          <p>
            En este apartado se pueden actualizar las bases de datos de forma
            manual
          </p>
        </div>
        <div className="grid grid-cols-3 justify-center items-center gap-8">
          {databases.map((d, index) => (
            <Card title={d.name} key={index}>
              <button
                className="shadow-[0_4px_14px_0_rgb(0,133,30,39%)] hover:shadow-[0_6px_20px_rgba(0,133,30,23%)] hover:bg-[rgba(0,133,30,0.9)] px-8 py-2 bg-[#00851e] rounded-md text-white font-light transition duration-200 ease-linear"
                onClick={() =>
                  handleDate(d.url, d.updateMessage, d.updateErrMessage, 'PUT')
                }>
                Actualizar
              </button>

              {d.buton && (
                <button
                  className="shadow-[0_4px_14px_0_rgb(255,0,0,39%)] hover:shadow-[0_6px_20px_rgba(255,0,0,23%)] hover:bg-[rgba(255,0,0,0.9)] px-8 py-2 bg-[#ff0000] rounded-md text-white font-light transition duration-200 ease-linear"
                  onClick={() =>
                    handleDate(
                      d.url,
                      d.deleteMessage,
                      d.deleteErrMessage,
                      'DELETE'
                    )
                  }>
                  Eliminar
                </button>
              )}
            </Card>
          ))}
        </div>
      </Header>
      {isLoading && <Loader />}
    </>
  );
}
