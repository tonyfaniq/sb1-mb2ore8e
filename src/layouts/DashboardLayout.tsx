import { LayoutDashboard, Users2, Film, PlaySquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Campaign Explorer', href: '/', icon: LayoutDashboard },
  { name: 'Demographics', href: '/demographics', icon: Users2 },
  { name: 'Video Library', href: '/videos', icon: Film },
  { name: 'Ad Library', href: '/ads', icon: PlaySquare },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex h-16 items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold">Campaign Explorer</h1>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}