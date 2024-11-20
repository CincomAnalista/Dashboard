import { Sidebar } from '../components/sidebar';
import { Route, Routes} from 'react-router-dom';
import { Home, Commissions, Databases } from '../pages/dashboard';

export function DashboardLayout() {
  return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="w-full h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/Databases" element={<Databases />} />
          </Routes>
        </main>
      </div>
  );
}
