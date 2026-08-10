export default function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-transparent rounded-xl p-5 border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${color}15` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <p className="font-mono text-2xl font-semibold text-gray-900">{value}</p>
        <p className="font-body text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
