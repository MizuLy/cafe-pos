export default function StatCard({ title, value, icon: Icon, borderColor }) {
  return (
    <div
      className={`bg-white border-l-4 ${borderColor} rounded-xl shadow-lg p-6 hover:shadow-xl transition-all`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Icon
          size={32}
          className={`${borderColor.replace("border-", "text-")} opacity-70`}
        />
      </div>
      <p className="text-4xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
