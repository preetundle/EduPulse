// Mock data layer for the dashboard KPIs.
//
// The client project has no backend endpoints wired up yet (no /api routes
// exist in this codebase). Rather than inventing numbers that look like
// real analytics, every value here either reuses a number that already
// appears elsewhere in the app (e.g. the at-risk students list) or is
// explicitly marked `available: false` so the UI can say so honestly.
// Swap this module for real API calls once /api/analytics/* exists.

export const riskStudents = [
  { id: 1, name: 'Rahul Sharma', department: 'CSE', attendance: 58, marks: 36, risk: 'High' },
  { id: 2, name: 'Priya Verma', department: 'ECE', attendance: 64, marks: 42, risk: 'Medium' },
  { id: 3, name: 'Aman Patel', department: 'CSE', attendance: 52, marks: 31, risk: 'High' },
  { id: 4, name: 'Sneha Gupta', department: 'ME', attendance: 69, marks: 48, risk: 'Medium' },
]

const ATTENDANCE_THRESHOLD = 75

export const kpiDefs = {
  students: {
    id: 'students',
    title: 'Total Students',
    value: '1,250',
    trend: '+4.2%',
    description: 'Currently enrolled',
    panelSubtitle: 'Student population overview',
    overview: [
      { label: 'Active students', value: '1,180' },
      { label: 'New this term', value: '42' },
      { label: 'Needing attention', value: String(riskStudents.length) },
    ],
    breakdownTitle: 'Department distribution',
    breakdown: [
      { label: 'CSE', value: 460, max: 1250 },
      { label: 'ECE', value: 340, max: 1250 },
      { label: 'ME', value: 260, max: 1250 },
      { label: 'CIVIL', value: 190, max: 1250 },
    ],
    insight: 'CSE accounts for the largest share of enrollment this term.',
    action: { label: 'View all students', to: '/Students' },
  },
  marks: {
    id: 'marks',
    title: 'Average Marks',
    value: '72.4%',
    trend: '+1.8%',
    description: 'Across all subjects',
    panelSubtitle: 'Academic performance overview',
    overview: [
      { label: 'Strongest subject', value: 'Database Mgmt Systems' },
      { label: 'Weakest subject', value: 'Computer Networks' },
    ],
    breakdownTitle: 'Subject performance',
    breakdown: [
      { label: 'Database Management Systems', value: 85, max: 100 },
      { label: 'Operating Systems', value: 75, max: 100 },
      { label: 'Data Structures', value: 70, max: 100 },
      { label: 'Computer Networks', value: 68, max: 100 },
    ],
    insight: 'Systems-heavy subjects are outperforming networking this term.',
    action: { label: 'View analytics', to: '/Analytics' },
  },
  attendance: {
    id: 'attendance',
    title: 'Attendance',
    value: '81.6%',
    trend: '+0.6%',
    description: 'Overall attendance',
    panelSubtitle: 'Attendance health overview',
    statusLabel: 'Above required threshold',
    overview: [
      { label: 'Required threshold', value: `${ATTENDANCE_THRESHOLD}%` },
      {
        label: 'Students below threshold',
        value: String(riskStudents.filter((s) => s.attendance < ATTENDANCE_THRESHOLD).length),
      },
    ],
    breakdownTitle: 'Subject attendance',
    breakdown: [
      { label: 'Database Management Systems', value: 85, max: 100 },
      { label: 'Operating Systems', value: 78, max: 100 },
      { label: 'Data Structures', value: 80, max: 100 },
      { label: 'Computer Networks', value: 74, max: 100 },
    ],
    insight: `${riskStudents.filter((s) => s.attendance < ATTENDANCE_THRESHOLD).length} students are currently below the ${ATTENDANCE_THRESHOLD}% threshold and worth a check-in.`,
    action: { label: 'View attendance', to: '/Attendance' },
  },
  pass: {
    id: 'pass',
    title: 'Pass Percentage',
    value: '87.2%',
    trend: '+2.1%',
    description: 'Current semester',
    panelSubtitle: 'Academic outcome overview',
    overview: [
      { label: 'Passed', value: '87.2%' },
      { label: 'Failed', value: '—', available: false },
      { label: 'At risk', value: '—', available: false },
    ],
    breakdownTitle: 'Subject outcomes',
    breakdown: [
      { label: 'Database Management Systems', value: 85, max: 100 },
      { label: 'Operating Systems', value: 75, max: 100 },
    ],
    insight: 'Subject-level performance is available. A pass/fail breakdown needs an outcomes endpoint that doesn\u2019t exist yet.',
    insightAvailable: false,
    action: { label: 'View analytics', to: '/Analytics' },
  },
}

export const kpiOrder = ['students', 'marks', 'attendance', 'pass']
