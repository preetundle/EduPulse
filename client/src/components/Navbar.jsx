import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
} from 'lucide-react'

function Navbar() {

    const navigate = useNavigate()

    function handleLogout() {
      localStorage.removeItem('token')
      navigate('/')
    }



  return (
    <header className="h-20 border-b border-white/10 bg-[#0b0f1a]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">

      {/* Left side */}
      <div className="flex items-center gap-4">

        {/* Mobile menu */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
        >
          <Menu size={20} />
        </motion.button>

        <div>
          <p className="text-xs text-slate-500">
            Workspace
          </p>

          <h2 className="text-sm font-semibold text-white">
            Academic Dashboard
          </h2>
        </div>

      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="hidden md:flex items-center w-64 h-10 px-3 gap-2 rounded-xl border border-white/10 bg-white/[0.04]">

          <Search
            size={17}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none text-sm text-white placeholder:text-slate-600"
          />

          <span className="text-[10px] text-slate-600 border border-white/10 rounded px-1.5 py-0.5">
            /
          </span>

        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
        >
          <Bell size={19} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-400 ring-2 ring-[#0b0f1a]" />
        </motion.button>

        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-white/10" />

        {/* Profile */}
        <motion.button
          whileHover={{ y: -1 }}
          onClick={handleLogout}
          className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-white/[0.05] transition"
        >

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/10">
            A
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-white">
              Admin
            </p>

            <p className="text-[11px] text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden sm:block text-slate-500"
          />

        </motion.button>

      </div>

    </header>
  )
}

export default Navbar