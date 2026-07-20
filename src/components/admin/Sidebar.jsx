import { LayoutDashboard, Package, LogOut, ShoppingBag } from 'lucide-react';

const links = [
  { name: 'Dashboard', icon: LayoutDashboard, tab: 'dashboard' },
  { name: 'Products', icon: Package, tab: 'products' },
  { name: 'Orders', icon: ShoppingBag, tab: 'orders' },
];

export default function Sidebar({ activeTab, onTabChange, onLogout }) {
  return (
    <aside className="w-64 bg-transparent min-h-screen flex flex-col">
      <div className="p-6 border-b border-bone/10">
        <div className="flex items-center gap-2">
          <img src="/logo1.png" alt="Glam AURA" className="h-16 w-auto" />
        </div>
        <p className="font-mono text-xs text-bone/30 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <button
            key={link.tab}
            onClick={() => onTabChange(link.tab)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-colors ${
              activeTab === link.tab
                ? 'bg-bone/10 text-bone font-semibold'
                : 'text-bone/50 hover:text-bone hover:bg-bone/5'
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
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm text-bone/50 hover:text-bone hover:bg-bone/5 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
