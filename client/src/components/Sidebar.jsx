function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <nav className="space-y-2">
        <p className="px-4 py-2 rounded-lg bg-gray-800">
          Dashboard
        </p>

        <p className="px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          Students
        </p>

        <p className="px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          Marks
        </p>

        <p className="px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          Attendance
        </p>

        <p className="px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          Analytics
        </p>

        <p className="px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          AI Insights
        </p>
      </nav>
    </aside>
  )
}

export default Sidebar