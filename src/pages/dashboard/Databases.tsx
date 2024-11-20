import { useState } from 'react';
import { Card, Header, Loader } from '../../components';
import { fetchAlertLoader } from '../../utils/fetchAlertLoader';

const baseUrl = import.meta.env.VITE_API_URL;
const databases = [
  {
    name: 'PYG',
    url: '/pyg',
    message: 'Datos actualizados',
    errMessage: 'Error al actualizar los datos',
    DeleMessage: 'Error al actualizar los datos',
    DeleErrMessage: 'Error al actualizar los datos'

  },
  {
    name: 'Comisiones',
    url: '/commissions',
  },
  {
    name: 'Balance',
    url: '/balance',
  },
  {
    name: 'Nuevos costos',
    url: '/commissions/new-cost',
  }
];

export function Databases() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (parcialUrl: string, message:string, errMessage: string) => {
    const url = `${baseUrl}${parcialUrl}`;
    console.log(url);
    try {
      await fetchAlertLoader(
        url,
        {
          method: 'PUT',
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

  const handleDelete = async (parcialUrl: string, message:string, errMessage: string) => {
    const url = `${baseUrl}${parcialUrl}`;
    try {
      await fetchAlertLoader(
        url,
        {
          method: 'DELETE',
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
                onClick={() => handleUpdate(d.url, 'hola', 'hola')}>
                Actualizar
              </button>

              <button
                className="shadow-[0_4px_14px_0_rgb(255,0,0,39%)] hover:shadow-[0_6px_20px_rgba(255,0,0,23%)] hover:bg-[rgba(255,0,0,0.9)] px-8 py-2 bg-[#ff0000] rounded-md text-white font-light transition duration-200 ease-linear"
                onClick={() => handleDelete(d.url, 'hola', 'hola')}>
                Eliminar
              </button>
            </Card>
          ))}
        </div>
      </Header>
      {isLoading && (
        <Loader />
      )}
    </>
  );
}
