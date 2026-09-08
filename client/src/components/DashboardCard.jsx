function DashboardCard({ title, value, description }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold text-gray-900">
        {value}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </div>
  )
}

export default DashboardCard