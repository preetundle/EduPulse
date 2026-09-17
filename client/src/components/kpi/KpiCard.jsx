import { motion } from 'framer-motion'
import { Users, TrendingUp, CalendarCheck, Award, ArrowUpRight } from 'lucide-react'

const icons = {
  students: Users,
  marks: TrendingUp,
  attendance: CalendarCheck,
  pass: Award,
}

function KpiCard({ kpi, onOpen }) {
  const Icon = icons[kpi.id] || Award

  return (
    <motion.button
      layoutId={`kpi-surface-${kpi.id}`}
      layout
      onClick={() => onOpen(kpi.id)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="
        group relative overflow-hidden text-left rounded-[20px]
        border border-white/[0.08] bg-white/[0.04]
        p-5 backdrop-blur-xl
        transition-colors duration-300
        hover:border-indigo-400/25 hover:bg-white/[0.06]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60
      "
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-150" />

      <motion.div layoutId={`kpi-header-${kpi.id}`} className="relative flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-400/10">
          <Icon size={19} className="text-indigo-400" strokeWidth={1.8} />
        </div>

        <span className="flex items-center gap-1 text-xs text-emerald-400">
          {kpi.trend}
          <ArrowUpRight
            size={13}
            className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
          />
        </span>
      </motion.div>

      <div className="relative mt-5">
        <motion.p layoutId={`kpi-title-${kpi.id}`} className="text-sm font-medium text-slate-400">
          {kpi.title}
        </motion.p>

        <motion.h3
          layoutId={`kpi-value-${kpi.id}`}
          className="mt-1 text-3xl font-bold tracking-tight text-white tabular-nums"
        >
          {kpi.value}
        </motion.h3>

        <p className="mt-1 text-xs text-slate-500">{kpi.description}</p>
      </div>
    </motion.button>
  )
}

export default KpiCard
