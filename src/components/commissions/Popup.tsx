import { useState, useEffect } from "react";

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
  const [price, setPrice] = useState<string>(String(item?.cost_list || ""));

  // Sincroniza el estado del precio cuando el elemento cambia
  useEffect(() => {
    setPrice(String(item?.cost_list || ""));
  }, [item]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Permitir solo números, puntos decimales y vacío
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleSave = () => {
    const numericPrice = parseFloat(price);
    if (onSave && !isNaN(numericPrice) && numericPrice >= 0) {
      onSave(numericPrice);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };


  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white w-5/12 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
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
              placeholder="Ingresa el precio"
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
