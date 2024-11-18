import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  children?: React.ReactNode;
}

export function SearchForm({ onSearch, children }: SearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className='flex items-center max-w-sm mx-auto'>
      <form
        className="flex items-center mx-auto"
        onSubmit={handleSubmit}>
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <i className="fa-solid fa-receipt w-auto h-4 text-gray-500 "></i>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full ps-10 p-2.5"
            placeholder="Escribe una factura..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <i className="fa-solid fa-magnifying-glass w-auto h-4"></i>
          <span className="sr-only">Search</span>
        </button>
      </form>
      {children}
    </div>
  );
}
