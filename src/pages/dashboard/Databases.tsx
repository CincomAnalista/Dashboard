import { useState } from 'react';
import { Card, Header, Loader } from '../../components';
import { fetchAlertLoader } from '../../utils/fetchAlertLoader';

const databases = [
  {
    name: 'PYG',
    update: '/pyg/update',
    delete: '',
    message: 'Datos actualizados',
    errMessage: 'Error al actualizar los datos',
    DeleMessage: 'Error al actualizar los datos',
    DeleErrMessage: 'Error al actualizar los datos'

  },
  {
    name: 'Comisiones',
    update: '/commissions/update',
    delete: ''
  },
  {
    name: 'Balance',
    update: '/balance/update',
    delete: ''
  }
];

const baseUrl = 'http://localhost:3000';

export function Databases() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (parcialUrl: string, message:string, errMessage: string) => {
    const url = `${baseUrl}${parcialUrl}`;
    try {
      await fetchAlertLoader(
        url,
        {},
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
        {},
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
        <div className="flex justify-center items-center gap-8">
          {databases.map((d) => (
            <Card title={d.name}>
              <button
                className="shadow-[0_4px_14px_0_rgb(0,133,30,39%)] hover:shadow-[0_6px_20px_rgba(0,133,30,23%)] hover:bg-[rgba(0,133,30,0.9)] px-8 py-2 bg-[#00851e] rounded-md text-white font-light transition duration-200 ease-linear"
                onClick={() => handleUpdate(d.update, 'hola', 'hola')}>
                Actualizar
              </button>

              <button
                className="shadow-[0_4px_14px_0_rgb(255,0,0,39%)] hover:shadow-[0_6px_20px_rgba(255,0,0,23%)] hover:bg-[rgba(255,0,0,0.9)] px-8 py-2 bg-[#ff0000] rounded-md text-white font-light transition duration-200 ease-linear"
                onClick={() => handleDelete(d.delete, 'hola', 'hola')}>
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
