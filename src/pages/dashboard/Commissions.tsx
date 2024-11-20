import { useState } from 'react';
// import { fetchAlertLoader } from '../../utils/fetchAlertLoader';
import { Table, Header, SearchForm, Popup, Loader } from '../../components';
import { fetchAlertLoader } from '../../utils/fetchAlertLoader';

const baseUrl = `${import.meta.env.VITE_API_URL}/commissions/new-cost`;

export function Commissions() {
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    const url = `${baseUrl}?invoice_number=${query}`;
    try {
      const data = await fetchAlertLoader(
        url,
        {},
        setIsLoading,
        'Datos actualizados',
        'Error al acutializar los datos',
        1
      );
      setTableData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdate = async () => {
    const url = `${baseUrl}`;
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
        'Datos actualizados',
        'Error al acutializar los datos'
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (newPrice: number) => {
    if (selectedItem) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...(typeof selectedItem === 'object' && selectedItem !== null
            ? selectedItem
            : {}),
          cost_list: newPrice
        })
      };
      try {
        await fetchAlertLoader(
          baseUrl,
          options,
          setIsLoading,
          'Datos guardados',
          'Error al guardar los datos'
        );
        setIsPopupOpen(false);;
      } catch (error) {
        console.error(error);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditClick = (item: any) => {
    setIsPopupOpen(true);
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Header title="Comisiones">
        <div>
          <SearchForm onSearch={handleSearch}>
            <button
              onClick={handleUpdate}
              className="ml-4 px-4 py-2 bg-[#00861f] rounded-md text-white">
              Actualizar
            </button>
          </SearchForm>
          <div className="mt-9">
            <Table data={tableData} onEditClick={handleEditClick} />
          </div>
        </div>
      </Header>
      {isPopupOpen && (
        <Popup
          title="Editar Producto"
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          item={selectedItem}
          onSave={handleSave}
        />
      )}
      {isLoading && (
        <Loader />
      )}
    </>
  );
}
