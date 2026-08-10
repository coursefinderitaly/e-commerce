import { LayoutDashboard, Package, LogOut, ShoppingBag } from 'lucide-react';

const links = [
  { name: 'Dashboard', icon: LayoutDashboard, tab: 'dashboard' },
  { name: 'Products', icon: Package, tab: 'products' },
  { name: 'Orders', icon: ShoppingBag, tab: 'orders' },
];

export default function Sidebar({ activeTab, onTabChange, onLogout }) {
  return (
    <aside className="w-64 bg-transparent h-screen sticky top-0 flex flex-col border-r border-bone/10">
      <div className="p-6 border-b border-bone/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 px-3 bg-gradient-to-br from-slate-900 via-gray-950 to-black rounded-xl border border-gray-800 shadow-sm flex items-center justify-center">
            <img src="/logo1.png" alt="Glam AURA" className="h-10 w-auto object-contain filter brightness-105 contrast-110" decoding="async" />
          </div>
        </div>
        <p className="font-mono text-xs text-gray-900/30 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <button
            key={link.tab}
            onClick={() => onTabChange(link.tab)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-colors ${
              activeTab === link.tab
                ? 'bg-gray-100/10 text-gray-900 font-semibold'
                : 'text-gray-900/50 hover:text-gray-900 hover:bg-gray-100/5'
            }`}
          >
            <link.icon size={18} />
            {link.name}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-bone/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm text-gray-900/50 hover:text-gray-900 hover:bg-gray-100/5 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
