interface cardProps {
  title: string;
  icon?: string;
  content?: string;
  children?: React.ReactNode;
}

export function Card({ title, icon = "fa-solid fa-server", content, children }: cardProps) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex justify-center mt-4">
        <div className="relative">
          <div className="flex items-center justify-center w-16 h-16 bg-slate-600 rounded-full">
            <i className={`${icon} text-white`} ></i>
          </div>
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></span>
        </div>
      </div>
      <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">{title}</h1>
      <p className="my-4 text-center text-sm text-gray-500">{content}</p>
      <div className="space-x-4 bg-gray-100 py-4 text-center">{children}</div>
    </div>
  );
}
