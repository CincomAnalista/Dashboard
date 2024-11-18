import { useState } from 'react';
import { Link } from 'react-router-dom';

const sidebar_items = [
  { id: 1, name: 'Dashboard', path: '/', icon: 'fa-solid fa-home' },
  {
    id: 2,
    name: 'Comisiones',
    path: '/commissions',
    icon: 'fa-solid fa-sack-dollar '
  },
  { id: 3, name: 'Datos', path: '/databases', icon: 'fa-solid fa-database' }
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`relative z-10 bg-gray-200 transition-all duration-500 ease-in-out flex flex-shrink-0 shadow-lg 
        ${isOpen ? 'w-60' : 'w-20'}
      `}>
      <div className="h-full backdrop-blur-sm p-4 flex flex-col">
        <button
          className="p-4 rounded-full text-sm hover:bg-black/10 max-w-fit"
          onClick={() => setIsOpen(!isOpen)}>
          <i className="fa-solid fa-bars fa-xl"></i>
        </button>

        <nav className="mt-4 flex-grow">
          {sidebar_items.map((item) => (
            <Link key={item.id} to={item.path}>
              <div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-slate-400 transition-colors mb-2">
                <i className={`${item.icon} min-w-[20px]`}></i>
                {isOpen && (
                  <span
                    className={`ml-4 whitespace-nowrap transition-all duration-500 ease-in-out
                      ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                    `}>
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
