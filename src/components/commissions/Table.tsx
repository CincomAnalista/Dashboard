import { useState } from 'react';

interface itemProps {
  move_name: string;
  product: string;
  quantity: number;
  cost_list: number;
}

interface TableProps {
  data: Array<{
    move_name: string;
    product: string;
    quantity: number;
    cost_list: number;
  }>;
  onEditClick: (item: itemProps) => void;
}

export function Table({ data, onEditClick }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="overflow-auto shadow-md sm:rounded-lg transition-all duration-300 ease-in-out">
      <div className="max-h-96 overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 font-bold uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Factura
              </th>
              <th scope="col" className="px-6 py-3">
                Producto
              </th>
              <th scope="col" className="px-6 py-3">
                Costo Lista
              </th>
              <th scope="col" className="px-6 py-3">
                Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="text-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.move_name}
                </th>
                <td className="px-6 py-4">{item.product}</td>
                <td className="px-6 py-4">
                  {item.cost_list
                    .toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP'
                    })
                    .replace('COP', '')
                    .trim()}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-700 "
                    onClick={() => onEditClick(item)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span className=""> Editar</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginacion */}
      <div className="flex justify-between items-center px-32 py-3">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-800 disabled:opacity-50">
          {`<`}
        </button>
        <div>
          <span>
            Página {currentPage} de {totalPages}
          </span>
        </div>

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-800 disabled:opacity-50">
          {`>`}
        </button>
      </div>
    </div>
  );
}
