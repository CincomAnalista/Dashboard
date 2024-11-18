import { useState, useEffect } from 'react';

interface ItemProps {
  id_line: number;
  move_name: string;
  product: string;
  cost_list: number;
}

interface PopupProps {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (newPrice: number) => void;
  item?: ItemProps | null;
}

export function Popup({ title, isOpen, item, onClose, onSave }: PopupProps) {
  const [price, setPrice] = useState<string>(formatCurrency(item?.cost_list || 0));

  // Sincroniza el estado del precio cuando el elemento cambia
  useEffect(() => {
    setPrice(formatCurrency(item?.cost_list || 0));
  }, [item]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Solo números
    const numericValue = parseInt(value, 10) || 0;
    setPrice(formatCurrency(numericValue));
  };

  const handleSave = () => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""), 10); // Convertir a número puro

    if (onSave && numericPrice > 0) {
      onSave(numericPrice);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  // Formatear números como moneda en pesos colombianos
  function formatCurrency(value: number) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
      onClick={handleOverlayClick} // Detectar clics fuera del popup
    >
      <div
        className="bg-white w-5/12 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // Evitar cierre al hacer clic dentro del popup
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-xmark w-4 h-4"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
        <div>
            <label className="block text-sm font-bold text-gray-700">Factura:</label>
            <p className="text-gray-900">{item?.move_name}</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Producto:</label>
            <p className="text-gray-900">{item?.product}</p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Precio actual:</label>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
