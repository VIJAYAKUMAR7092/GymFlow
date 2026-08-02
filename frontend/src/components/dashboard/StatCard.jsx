export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className={`${color} rounded-3xl p-6 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer`}
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-white/80 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div className="bg-white/20 p-5 rounded-2xl text-4xl">
          {icon}
        </div>

      </div>
    </div>
  );
}