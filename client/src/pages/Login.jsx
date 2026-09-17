import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { GraduationCap, Mail, Lock } from 'lucide-react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault()

  const data = await api.post('/auth/login', {
      email,
      password,
    })

    console.log('Login response', data)
    localStorage.setItem('token', data.token)
    console.log('token saved:', localStorage.getItem('token'))   
    navigate('/Dashboard') 

  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">EduPulse</h1>
            <p className="text-[11px] text-slate-500">Academic Intelligence</p>
          </div>
        </div>

        <p className="mb-6 text-sm text-slate-400">Sign in to your workspace.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 h-11">
            <Mail size={16} className="text-slate-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 h-11">
            <Lock size={16} className="text-slate-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="h-11 w-full rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            Sign in
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
