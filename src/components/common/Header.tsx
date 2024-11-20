interface headerProps {
  title: string;
  children: React.ReactNode;
}
export function Header({ title, children }: headerProps) {
  return (
    <div className="flex-1 relative overflow-auto z-10 h-full">
      <header className="backdrop-blur-md shadow-lg border-b">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        {children}
      </main>
    </div>
  );
}
