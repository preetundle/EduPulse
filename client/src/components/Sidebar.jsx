import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  BarChart3,
  Sparkles,
  Settings,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  {
    name: 'Dashboard',
    path: '/Dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Students',
    path: '/Students',
    icon: Users,
  },
  {
    name: 'Subjects',
    path: '/Subjects',
    icon: BookOpen,
  },
  {
    name: 'Marks',
    path: '/Marks',
    icon: GraduationCap,
  },
  {
    name: 'Attendance',
    path: '/Attendance',
    icon: CalendarCheck,
  },
  {
    name: 'Analytics',
    path: '/Analytics',
    icon: BarChart3,
  },
  {
    name: 'AI Insights',
    path: '/AIInsights',
    icon: Sparkles,
  },
]

function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 h-screen flex-col border-r border-white/10 bg-[#0b0f1a]/95 backdrop-blur-xl">

      {/* Logo */}
      <div className="h-20 px-6 flex items-center border-b border-white/10">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <GraduationCap size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              EduPulse
            </h1>

            <p className="text-[11px] text-slate-500">
              Academic Intelligence
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">

        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
          Workspace
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className="relative block"
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      relative flex items-center gap-3 px-3 py-3 rounded-xl
                      text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? 'text-white bg-white/[0.07]'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      }
                    `}
                  >

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-violet-500"
                      />
                    )}

                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2.3 : 1.8}
                      className={
                        isActive
                          ? 'text-indigo-400'
                          : 'text-slate-500'
                      }
                    />

                    <span>{item.name}</span>

                    {item.name === 'AI Insights' && (
                      <span className="ml-auto text-[9px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-400/10">
                        AI
                      </span>
                    )}

                  </motion.div>
                )}
              </NavLink>
            )
          })}

        </div>

        {/* Management */}
        <p className="px-3 mt-8 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
          System
        </p>

        <NavLink
          to="/Settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'text-white bg-white/[0.07]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`
          }
        >
          <Settings size={19} strokeWidth={1.8} />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* User card */}
      <div className="p-4 border-t border-white/10">

        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">

          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-sm font-semibold text-white">
            A
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Admin
            </p>

            <p className="text-xs text-slate-500 truncate">
              Administrator
            </p>
          </div>

          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />

        </div>

      </div>

    </aside>
  )
}

export default Sidebar