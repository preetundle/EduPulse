import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  CalendarCheck,
  Award,
} from 'lucide-react'

const icons = {
  'Total Students': Users,
  'Average Marks': TrendingUp,
  Attendance: CalendarCheck,
  'Pass Percentage': Award,
}

function DashboardCard({ title, value, description }) {
  const Icon = icons[title] || Award

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="
        relative overflow-hidden
        rounded-2xl
        border border-white/[0.08]
        bg-white/[0.04]
        p-5
        backdrop-blur-xl
        transition-colors duration-300
        hover:border-indigo-400/20
        hover:bg-white/[0.06]
      "
    >
      {/* Ambient glow */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />

      <div className="relative">

        {/* Top row */}
        <div className="flex items-center justify-between">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-400/10">
            <Icon
              size={19}
              className="text-indigo-400"
              strokeWidth={1.8}
            />
          </div>

          <span className="text-xs text-emerald-400">
            +4.2%
          </span>

        </div>

        {/* Value */}
        <div className="mt-5">

          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h3 className="mt-1 text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>

        </div>

      </div>
    </motion.div>
  )
}

export default DashboardCard