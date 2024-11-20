import { useState } from 'react';
import { Link } from 'react-router-dom';

const sidebar_items = [
  { id: 1, name: 'Dashboard', path: '/', icon: 'fa-solid fa-home' },
  { id: 2, name: 'Comisiones', path: '/commissions', icon: 'fa-solid fa-sack-dollar' },
  { id: 3, name: 'Datos', path: '/databases', icon: 'fa-solid fa-database' }
];

function ToggleButton({ OnClick }: { OnClick: () => void }) {
  return (
    <button
      className="p-4 rounded-full text-sm hover:bg-black/10 max-w-fit"
      onClick={OnClick}>
      <i className="fa-solid fa-bars fa-xl"/>
    </button>
  );
}

function SidebarItem({ item, isOpen }: { item: typeof sidebar_items[0], isOpen: boolean}){
  return (
    <Link key={item.id} to={item.path} className='w-full'>
      <div
      className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-slate-400 transition-colors mb-2 w-full
        ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <i className={`${item.icon} min-w-[20px]`}/>
          {isOpen && <span className='ml-2'>{item.name}</span>}
      </div>
    </Link>
  )
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`relative z-10 bg-gray-100 transition-all duration-500 ease-in-out flex flex-shrink-0 shadow-lg 
        ${isOpen ? 'w-56' : 'w-16'}
      `}>
      <div className="backdrop-blur-sm w-full flex flex-col">
        <ToggleButton  OnClick={() => setIsOpen(!isOpen)} />
        <nav
          className={`mt-4 w-full flex-grow flex ${
            isOpen ? 'items-start' : 'items-center'
          } flex-col`}>
          {sidebar_items.map((item) => (
            <SidebarItem item={item} isOpen={isOpen} />
          ))}
        </nav>
      </div>
    </div>
  );
}
