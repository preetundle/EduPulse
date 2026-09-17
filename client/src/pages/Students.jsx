import DashboardLayout from '../layouts/DashboardLayout'
import { Users } from 'lucide-react'

function Students() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Students</h2>
        <p className="mt-1 text-slate-400">Browse and manage enrolled students.</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] py-24 text-center backdrop-blur-xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-400/10">
          <Users size={22} className="text-indigo-400" strokeWidth={1.8} />
        </div>
        <p className="text-sm font-medium text-white">Student directory not built yet</p>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          This page will list every enrolled student once /api/students is wired up.
        </p>
      </div>
    </DashboardLayout>
  )
}

export default Students
