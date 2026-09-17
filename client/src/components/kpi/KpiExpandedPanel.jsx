import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, TrendingUp, CalendarCheck, Award, X, ArrowRight, CheckCircle2 } from 'lucide-react'

const icons = {
  students: Users,
  marks: TrendingUp,
  attendance: CalendarCheck,
  pass: Award,
}

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
}

function BreakdownRow({ label, value, max }) {
  const pct = Math.round((value / max) * 100)

  return (
    <motion.div variants={item} className="flex items-center gap-3">
      <span className="w-40 shrink-0 truncate text-sm text-slate-400">{label}</span>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>

      <span className="w-12 shrink-0 text-right text-sm font-medium text-white tabular-nums">
        {max === 100 ? `${value}%` : value.toLocaleString()}
      </span>
    </motion.div>
  )
}

function KpiExpandedPanel({ kpi, onClose }) {
  const Icon = icons[kpi.id] || Award

  return (
    <motion.div
      layoutId={`kpi-surface-${kpi.id}`}
      className="
        relative w-full sm:max-w-lg max-h-[88vh] sm:max-h-[85vh] overflow-y-auto
        border border-white/[0.1] bg-[#0d1120]/95 backdrop-blur-2xl
        p-6 shadow-2xl shadow-black/40
        rounded-t-[24px] sm:rounded-[24px]
      "
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
      >
        <X size={18} />
      </button>

      <motion.div layoutId={`kpi-header-${kpi.id}`} className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-400/10">
        <Icon size={21} className="text-indigo-400" strokeWidth={1.8} />
      </motion.div>

      <motion.p layoutId={`kpi-title-${kpi.id}`} className="mt-4 text-sm font-medium text-slate-400">
        {kpi.title}
      </motion.p>
      <p className="text-xs text-slate-500">{kpi.panelSubtitle}</p>

      <motion.h3 layoutId={`kpi-value-${kpi.id}`} className="mt-2 text-4xl font-bold tracking-tight text-white tabular-nums">
        {kpi.value}
      </motion.h3>

      {kpi.statusLabel && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400"
        >
          <CheckCircle2 size={13} />
          {kpi.statusLabel}
        </motion.p>
      )}

      <motion.div variants={stagger} initial="hidden" animate="show" className="mt-6 space-y-6">
        {/* Overview */}
        <motion.div variants={item}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Overview</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {kpi.overview.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                <p className="text-xs text-slate-500">{stat.label}</p>
                <p className={`mt-1 text-lg font-semibold tabular-nums ${stat.available === false ? 'text-slate-600' : 'text-white'}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Breakdown */}
        <motion.div variants={item} className="border-t border-white/[0.06] pt-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {kpi.breakdownTitle}
          </p>
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
            {kpi.breakdown.map((row) => (
              <BreakdownRow key={row.label} {...row} />
            ))}
          </motion.div>
        </motion.div>

        {/* Insight */}
        <motion.div variants={item} className="border-t border-white/[0.06] pt-6">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Insight</p>
          <p className={`text-sm leading-relaxed ${kpi.insightAvailable === false ? 'text-slate-500' : 'text-slate-300'}`}>
            {kpi.insight}
          </p>
        </motion.div>

        {/* Action */}
        <motion.div variants={item}>
          <Link
            to={kpi.action.to}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-2.5 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/15 hover:text-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            {kpi.action.label}
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default KpiExpandedPanel
