function Navbar() {
  return (
    <header className="h-20 bg-black border-b border-grey-200 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-white">
        EduPulse
      </h1>

      <div className="flex items-center gap-4">
        <button className="text-gray-300 hover:text-white">
          🔔
        </button>

        <div className="flex items-center gap-5">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
            A
          </div>

          <span className="text-sm font-medium text-gray-200">
            Admin
          </span>
        </div>
      </div>
    </header>
  )
}

export default Navbar