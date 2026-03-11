export default function StatCard({ title, value, icon: Icon, gradient }) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Icon size={32} className="opacity-80" />
      </div>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}
