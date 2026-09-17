import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import KpiCard from './KpiCard'
import KpiExpandedPanel from './KpiExpandedPanel'
import { kpiDefs, kpiOrder } from './kpiData'

function KpiGrid( {overview} ) {

const realKpiValues = {
  students: overview?.totalStudents,
  marks: overview?.averageMarks,
  attendance: overview?.averageAttendance,
}


  const [activeId, setActiveId] = useState(null)

  const close = useCallback(() => setActiveId(null), [])

  useEffect(() => {
    if (!activeId) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeId, close])

  const activeKpi = activeId
  ? {
      ...kpiDefs[activeId],
      ...(realKpiValues[activeId] !== undefined && {
        value: realKpiValues[activeId],
      }),
    }
  : null

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpiOrder.map((id) => {
            const kpi = kpiDefs[id]

          const updatedKpi = {
          ...kpi,
          ...(realKpiValues[id] !== undefined && {
            value: realKpiValues[id],
          }),
      }

  return (
    <KpiCard
      key={id}
      kpi={updatedKpi}
      onOpen={setActiveId}
    />
  )
})}
      </div>

      <AnimatePresence>
        {activeKpi && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
            initial={{ backgroundColor: 'rgba(5,7,12,0)', backdropFilter: 'blur(0px)' }}
            animate={{ backgroundColor: 'rgba(5,7,12,0.55)', backdropFilter: 'blur(10px)' }}
            exit={{ backgroundColor: 'rgba(5,7,12,0)', backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={close}
          >
            <KpiExpandedPanel kpi={activeKpi} onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default KpiGrid
