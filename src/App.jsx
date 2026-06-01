import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { PHASES, FULL_GYM_WORKOUTS, HOTEL_WORKOUTS, JUMP_PROTOCOL, NUTRITION_PHASES, SUPPLEMENTS } from './data'

const C = {
  bg: '#060608', card: '#0e0e14', card2: '#121218', border: '#1a1a26',
  red: '#E8192C', gold: '#D4A017', blue: '#1E90FF', green: '#00C853',
  orange: '#FF6B00', purple: '#9B5DE5', text: '#f0ece4', muted: '#777', dim: '#333',
}
const S = {
  bebas: { fontFamily: "'Bebas Neue', sans-serif" },
  ibm: { fontFamily: "'IBM Plex Sans', sans-serif" },
}

export default function App() {
  const [tab, setTab] = useState('today')
  const [currentPhase, setCurrentPhase] = useState('home-june')
  const [gymMode, setGymMode] = useState('full')
  const [activeWorkout, setActiveWorkout] = useState(null)
  const [activeHotelIdx, setActiveHotelIdx] = useState(0)
  const [completedSets, setCompletedSets] = useState({})
  const [jumpDone, setJumpDone] = useState(false)
  const [workoutDone, setWorkoutDone] = useState(false)
  const [stats, setStats] = useState({ weight: 189, bf: 27.5 })
  const [streak, setStreak] = useState(0)
  const [totalWorkouts, setTotalWorkouts] = useState(0)
  const [workoutHistory, setWorkoutHistory] = useState([])
  const [statHistory, setStatHistory] = useState([])
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showJumpLog, setShowJumpLog] = useState(false)
  const [newWeight, setNewWeight] = useState('')
  const [newBF, setNewBF] = useState('')
  const [newReach, setNewReach] = useState('')
  const [expandedJumpStep, setExpandedJumpStep] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const today = new Date().toISOString().split('T')[0]
  const phase = PHASES.find(p => p.id === currentPhase) || PHASES[0]
  const workoutsForPhase = FULL_GYM_WORKOUTS[currentPhase] || FULL_GYM_WORKOUTS['sep-ignition']

  // ── SHOW TOAST ──────────────────────────────────────────
  const showToast = (msg, color = C.green) => {
    setToast({ msg, color })
    setTimeout(() => setToast(null), 2500)
  }

  // ── LOAD DATA ────────────────────────────────────────────
  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    setLoading(true)
    try {
      // Latest stats
      const { data: statsData } = await supabase
        .from('fitness_stats')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(20)
      if (statsData?.length) {
        const latest = statsData[0]
        setStats({ weight: latest.weight_lb, bf: latest.body_fat_pct })
        setStatHistory(statsData)
      }

      // Today's log
      const { data: dailyData } = await supabase
        .from('fitness_daily_log')
        .select('*')
        .eq('log_date', today)
        .single()
      if (dailyData) {
        setJumpDone(dailyData.jump_done)
        setWorkoutDone(dailyData.workout_done)
        setCurrentPhase(dailyData.current_phase || 'home-june')
      }

      // Workout history
      const { data: workoutData } = await supabase
        .from('fitness_workouts')
        .select('*')
        .order('logged_at', { ascending: false })
        .limit(30)
      if (workoutData) {
        setWorkoutHistory(workoutData)
        setTotalWorkouts(workoutData.length)
        // Calculate streak
        const dates = [...new Set(workoutData.map(w => w.logged_at.split('T')[0]))].sort().reverse()
        let s = 0
        let check = new Date()
        for (const d of dates) {
          const diff = Math.floor((check - new Date(d)) / 86400000)
          if (diff <= 1) { s++; check = new Date(d) }
          else break
        }
        setStreak(s)
      }
    } catch (e) {
      console.error('Load error', e)
    }
    setLoading(false)
  }

  // ── SAVE DAILY LOG ───────────────────────────────────────
  const saveDailyLog = async (jumpDoneVal, workoutDoneVal, phaseVal) => {
    await supabase.from('fitness_daily_log').upsert({
      log_date: today,
      jump_done: jumpDoneVal,
      workout_done: workoutDoneVal,
      current_phase: phaseVal || currentPhase,
    }, { onConflict: 'log_date' })
  }

  // ── MARK JUMP DONE ───────────────────────────────────────
  const markJumpDone = async () => {
    setJumpDone(true)
    await saveDailyLog(true, workoutDone)
    showToast('⚡ Jump protocol logged!')
  }

  // ── MARK WORKOUT COMPLETE ────────────────────────────────
  const markWorkoutComplete = async () => {
    if (!activeWorkout) return
    setSaving(true)
    try {
      await supabase.from('fitness_workouts').insert({
        workout_id: activeWorkout.id,
        workout_name: activeWorkout.name,
        phase_id: currentPhase,
        gym_mode: gymMode,
        completed_sets: completedSets,
        duration_min: null,
      })
      setWorkoutDone(true)
      setTotalWorkouts(prev => prev + 1)
      await saveDailyLog(jumpDone, true)
      const updated = [{ logged_at: new Date().toISOString(), workout_name: activeWorkout.name, phase_id: currentPhase }, ...workoutHistory]
      setWorkoutHistory(updated)
      showToast('✓ Workout logged to Supabase!')
      setActiveWorkout(null)
      setCompletedSets({})
    } catch (e) {
      showToast('Save failed — check connection', C.red)
    }
    setSaving(false)
  }

  // ── SAVE STATS ───────────────────────────────────────────
  const saveStats = async () => {
    const w = parseFloat(newWeight) || stats.weight
    const b = parseFloat(newBF) || stats.bf
    setSaving(true)
    try {
      await supabase.from('fitness_stats').insert({ weight_lb: w, body_fat_pct: b })
      setStats({ weight: w, bf: b })
      setStatHistory(prev => [{ weight_lb: w, body_fat_pct: b, recorded_at: new Date().toISOString() }, ...prev])
      showToast('Stats saved!')
      setShowStatsModal(false)
      setNewWeight(''); setNewBF('')
    } catch (e) {
      showToast('Save failed', C.red)
    }
    setSaving(false)
  }

  // ── SAVE JUMP REACH ──────────────────────────────────────
  const saveJumpReach = async () => {
    if (!newReach) return
    await supabase.from('fitness_jump_log').insert({ max_reach_inches: parseFloat(newReach) })
    showToast(`🏀 ${newReach}" logged!`)
    setNewReach('')
    setShowJumpLog(false)
  }

  // ── CHANGE PHASE ─────────────────────────────────────────
  const changePhase = async (pid) => {
    setCurrentPhase(pid)
    await saveDailyLog(jumpDone, workoutDone, pid)
  }

  const toggleSet = (eIdx, sIdx) => {
    const k = `${eIdx}-${sIdx}`
    setCompletedSets(prev => ({ ...prev, [k]: !prev[k] }))
  }

  const fatLost = Math.max(0, 189 - stats.weight).toFixed(1)
  const recompPct = Math.min(100, (fatLost / 28) * 100).toFixed(0)

  // ── ACTIVE WORKOUT OVERLAY ───────────────────────────────
  if (activeWorkout) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingBottom: 100 }}>
        <div style={{ background: `linear-gradient(135deg,${activeWorkout.color}22,transparent)`, borderBottom: `1px solid ${activeWorkout.color}44`, padding: '20px 20px 16px' }}>
          <button onClick={() => { setActiveWorkout(null); setCompletedSets({}) }}
            style={{ ...S.ibm, background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 11, letterSpacing: 2, marginBottom: 12, padding: 0 }}>
            ← BACK
          </button>
          <div style={{ fontSize: 9, color: activeWorkout.color, letterSpacing: 3, marginBottom: 4, ...S.ibm, fontWeight: 700 }}>{activeWorkout.day} · LIVE SESSION</div>
          <div style={{ fontSize: 28, ...S.bebas, letterSpacing: 1 }}>{activeWorkout.name}</div>
          {activeWorkout.tag && <div style={{ fontSize: 11, color: C.muted, marginTop: 4, ...S.ibm }}>{activeWorkout.tag}</div>}
        </div>
        <div style={{ padding: 16 }}>
          {activeWorkout.exercises.map((ex, eIdx) => {
            const sCount = parseInt(ex.s?.split('×')[0]) || 3
            const sets = isNaN(sCount) || sCount > 6 ? [] : Array.from({ length: sCount }, (_, i) => i)
            const allDone = sets.length > 0 && sets.every(i => completedSets[`${eIdx}-${i}`])
            return (
              <div key={eIdx} style={{ background: C.card, border: `1px solid ${allDone ? activeWorkout.color + '66' : C.border}`, borderRadius: 10, padding: 14, marginBottom: 10, transition: 'border-color 0.2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: sets.length > 0 ? 10 : 0 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', ...S.ibm, marginBottom: 3 }}>{ex.n}</div>
                    <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.5, ...S.ibm }}>{ex.note}</div>
                  </div>
                  {ex.s && (
                    <div style={{ background: allDone ? activeWorkout.color : C.card2, border: `1px solid ${C.border}`, borderRadius: 4, padding: '5px 9px', fontSize: 10, fontWeight: 700, color: allDone ? '#fff' : activeWorkout.color, flexShrink: 0, marginLeft: 10, transition: 'all 0.2s', ...S.ibm }}>
                      {ex.s}
                    </div>
                  )}
                </div>
                {sets.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {sets.map(i => {
                      const done = completedSets[`${eIdx}-${i}`]
                      return (
                        <button key={i} onClick={() => toggleSet(eIdx, i)} style={{
                          width: 40, height: 40, borderRadius: '50%',
                          border: `2px solid ${done ? activeWorkout.color : C.border}`,
                          background: done ? activeWorkout.color : 'none',
                          color: done ? '#fff' : C.muted,
                          cursor: 'pointer', fontSize: 12, fontWeight: 700,
                          transition: 'all 0.15s', ...S.ibm,
                        }}>{i + 1}</button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
          <button onClick={markWorkoutComplete} disabled={saving}
            style={{ width: '100%', padding: 18, background: `linear-gradient(135deg,${activeWorkout.color},${activeWorkout.color}cc)`, border: 'none', borderRadius: 12, color: '#fff', cursor: 'pointer', fontSize: 13, letterSpacing: 3, fontWeight: 800, marginTop: 8, opacity: saving ? 0.7 : 1, ...S.ibm }}>
            {saving ? 'SAVING...' : '✓ MARK COMPLETE + LOG'}
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 36, ...S.bebas, color: C.gold, letterSpacing: 2 }}>CREED</div>
        <div style={{ fontSize: 10, color: C.muted, letterSpacing: 4, ...S.ibm }}>LOADING...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingBottom: 80 }}>

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: toast.color, color: '#fff', padding: '10px 20px', borderRadius: 8, zIndex: 200, fontSize: 11, letterSpacing: 2, fontWeight: 700, ...S.ibm, whiteSpace: 'nowrap' }}>
          {toast.msg}
        </div>
      )}

      {/* STATS MODAL */}
      {showStatsModal && (
        <div style={{ position: 'fixed', inset: 0, background: '#000c', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: C.card, border: `1px solid ${C.gold}44`, borderRadius: 14, padding: 24, width: '100%', maxWidth: 320 }}>
            <div style={{ fontSize: 20, ...S.bebas, letterSpacing: 1, marginBottom: 20, color: C.gold }}>UPDATE STATS</div>
            {[['WEIGHT (LB)', newWeight, setNewWeight, stats.weight], ['BODY FAT %', newBF, setNewBF, stats.bf]].map(([label, val, setter, placeholder]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9, color: C.muted, letterSpacing: 2, marginBottom: 6, ...S.ibm }}>{label}</div>
                <input value={val} onChange={e => setter(e.target.value)} placeholder={String(placeholder)} type="number" step="0.1"
                  style={{ width: '100%', background: C.card2, border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', color: C.text, fontSize: 18, fontWeight: 700, outline: 'none', ...S.ibm }} />
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={() => setShowStatsModal(false)} style={{ flex: 1, padding: 13, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 8, color: C.muted, cursor: 'pointer', fontSize: 10, letterSpacing: 2, ...S.ibm }}>CANCEL</button>
              <button onClick={saveStats} disabled={saving} style={{ flex: 2, padding: 13, background: C.gold, border: 'none', borderRadius: 8, color: '#000', cursor: 'pointer', fontSize: 11, letterSpacing: 2, fontWeight: 800, ...S.ibm }}>
                {saving ? 'SAVING...' : 'SAVE TO SUPABASE'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JUMP LOG MODAL */}
      {showJumpLog && (
        <div style={{ position: 'fixed', inset: 0, background: '#000c', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: C.card, border: `1px solid ${C.red}44`, borderRadius: 14, padding: 24, width: '100%', maxWidth: 300 }}>
            <div style={{ fontSize: 20, ...S.bebas, letterSpacing: 1, marginBottom: 6, color: C.red }}>LOG VERTICAL</div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 20, ...S.ibm }}>Max reach in inches (measure from floor)</div>
            <input value={newReach} onChange={e => setNewReach(e.target.value)} placeholder="e.g. 96" type="number"
              style={{ width: '100%', background: C.card2, border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', color: C.text, fontSize: 22, fontWeight: 700, outline: 'none', marginBottom: 14, ...S.ibm }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowJumpLog(false)} style={{ flex: 1, padding: 13, background: C.card2, border: `1px solid ${C.border}`, borderRadius: 8, color: C.muted, cursor: 'pointer', fontSize: 10, letterSpacing: 2, ...S.ibm }}>CANCEL</button>
              <button onClick={saveJumpReach} style={{ flex: 2, padding: 13, background: C.red, border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 11, letterSpacing: 2, fontWeight: 800, ...S.ibm }}>LOG IT</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(180deg,#0e0005 0%,#060608 100%)', padding: '24px 20px 18px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 5, color: C.red, marginBottom: 2, ...S.ibm, fontWeight: 700 }}>BURN INDUSTRY</div>
            <div style={{ fontSize: 44, ...S.bebas, letterSpacing: 2, lineHeight: 1, color: C.text }}>CREED</div>
            <div style={{ fontSize: 10, color: C.gold, letterSpacing: 4, ...S.ibm }}>18-MONTH RECOMPOSITION</div>
          </div>
          <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => setShowStatsModal(true)}>
            <div style={{ fontSize: 26, fontWeight: 900, color: C.gold, ...S.ibm }}>{stats.weight} lb</div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1, ...S.ibm }}>{stats.bf}% BF</div>
            <div style={{ fontSize: 9, color: C.green, marginTop: 3, letterSpacing: 1, ...S.ibm }}>🔥 {streak} STREAK</div>
            <div style={{ fontSize: 8, color: C.dim, marginTop: 2, letterSpacing: 1, ...S.ibm }}>TAP TO UPDATE</div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 8, color: C.muted, letterSpacing: 1, ...S.ibm }}>RECOMP PROGRESS — 189→185 lb / 27%→12% BF</span>
            <span style={{ fontSize: 8, color: C.gold, letterSpacing: 1, ...S.ibm }}>{recompPct}%</span>
          </div>
          <div style={{ background: C.card, borderRadius: 4, height: 6, overflow: 'hidden' }}>
            <div style={{ width: `${recompPct}%`, height: '100%', background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <div style={{ fontSize: 8, color: C.green, marginTop: 3, ...S.ibm }}>{fatLost} lb fat lost · {(28 - fatLost).toFixed(1)} lb to goal</div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, overflowX: 'auto', position: 'sticky', top: 0, background: C.bg, zIndex: 10 }}>
        {[['today', 'TODAY'], ['workouts', 'TRAIN'], ['jump', 'JUMP'], ['nutrition', 'EAT'], ['progress', 'STATS']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: '0 0 auto', padding: '13px 18px', background: 'none', border: 'none',
            borderBottom: tab === k ? `2px solid ${C.gold}` : '2px solid transparent',
            color: tab === k ? C.text : C.dim, cursor: 'pointer', fontSize: 8, letterSpacing: 2, fontWeight: 700, ...S.ibm,
          }}>{l}</button>
        ))}
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px' }}>

        {/* ── TODAY ── */}
        {tab === 'today' && (
          <div style={{ paddingTop: 16 }}>
            {/* Phase selector */}
            <Label text="CURRENT PHASE" color={C.muted} />
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
              {PHASES.map(p => (
                <button key={p.id} onClick={() => changePhase(p.id)} style={{
                  flexShrink: 0, padding: '8px 12px', background: currentPhase === p.id ? p.color : C.card,
                  border: `1px solid ${currentPhase === p.id ? p.color : C.border}`, borderRadius: 6,
                  color: currentPhase === p.id ? '#000' : C.muted, cursor: 'pointer', fontSize: 8, letterSpacing: 1, fontWeight: 700, ...S.ibm,
                }}>{p.dates}</button>
              ))}
            </div>

            {/* Today status cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div style={{ background: jumpDone ? C.green + '22' : C.card, border: `1px solid ${jumpDone ? C.green + '55' : C.border}`, borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{jumpDone ? '✅' : '⚡'}</div>
                <div style={{ fontSize: 12, fontWeight: 700, ...S.ibm }}>JUMP PROTOCOL</div>
                <div style={{ fontSize: 9, color: jumpDone ? C.green : C.muted, marginTop: 2, ...S.ibm }}>{jumpDone ? 'DONE TODAY' : '10 MIN · DAILY'}</div>
              </div>
              <div style={{ background: workoutDone ? C.green + '22' : C.card, border: `1px solid ${workoutDone ? C.green + '55' : C.border}`, borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{workoutDone ? '✅' : '🏋'}</div>
                <div style={{ fontSize: 12, fontWeight: 700, ...S.ibm }}>WORKOUT</div>
                <div style={{ fontSize: 9, color: workoutDone ? C.green : C.muted, marginTop: 2, ...S.ibm }}>{workoutDone ? 'DONE TODAY' : `${totalWorkouts} TOTAL LOGGED`}</div>
              </div>
            </div>

            {/* Jump CTA */}
            {!jumpDone && (
              <button onClick={() => setTab('jump')} style={{ width: '100%', padding: 16, background: `linear-gradient(135deg,${C.red}22,${C.red}11)`, border: `1px solid ${C.red}44`, borderRadius: 10, color: C.text, cursor: 'pointer', textAlign: 'left', marginBottom: 12 }}>
                <div style={{ fontSize: 8, color: C.red, letterSpacing: 3, marginBottom: 4, ...S.ibm, fontWeight: 700 }}>NON-NEGOTIABLE · EVERY DAY</div>
                <div style={{ fontSize: 16, fontWeight: 800, ...S.ibm }}>⚡ Do Your Jump Protocol →</div>
              </button>
            )}

            {/* Gym mode toggle */}
            <div style={{ display: 'flex', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', marginBottom: 14 }}>
              {[['full', '🏋 FULL GYM'], ['hotel', '🏨 HOTEL GYM'], ['bw', '💪 BODYWEIGHT']].map(([k, l]) => (
                <button key={k} onClick={() => setGymMode(k)} style={{ flex: 1, padding: '11px 4px', background: gymMode === k ? C.gold : 'none', border: 'none', color: gymMode === k ? '#000' : C.dim, cursor: 'pointer', fontSize: 8, letterSpacing: 1, fontWeight: 800, ...S.ibm }}>{l}</button>
              ))}
            </div>

            {/* Workouts */}
            <Label text={phase.label + ' — TODAY\'S SESSIONS'} color={phase.color} />
            {gymMode === 'full' ? (
              workoutsForPhase.map(w => (
                <WorkoutCard key={w.id} w={w} onClick={() => setActiveWorkout(w)} />
              ))
            ) : (
              HOTEL_WORKOUTS.map((w, i) => (
                <WorkoutCard key={w.id} w={{ ...w, name: w.label, day: w.tag, exercises: gymMode === 'bw' ? w.bw : w.gym }} onClick={() => setActiveWorkout({ ...w, name: w.label, day: w.tag, exercises: gymMode === 'bw' ? w.bw : w.gym })} />
              ))
            )}

            {/* Nutrition snapshot */}
            <div style={{ marginTop: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
              <Label text="TODAY'S MACRO TARGETS" color={C.gold} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                {[['2,350', 'KCAL', C.gold], ['200g', 'PROTEIN', C.red], ['230g', 'CARBS', C.blue], ['65g', 'FAT', C.orange]].map(([v, l, col]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 15, fontWeight: 900, color: col, ...S.ibm }}>{v}</div>
                    <div style={{ fontSize: 7, color: C.dim, letterSpacing: 1, marginTop: 2, ...S.ibm }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TRAIN ── */}
        {tab === 'workouts' && (
          <div style={{ paddingTop: 16 }}>
            <div style={{ display: 'flex', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
              {[['full', '🏋 FULL GYM'], ['hotel', '🏨 HOTEL GYM'], ['bw', '💪 BODYWEIGHT']].map(([k, l]) => (
                <button key={k} onClick={() => setGymMode(k)} style={{ flex: 1, padding: '11px 4px', background: gymMode === k ? C.gold : 'none', border: 'none', color: gymMode === k ? '#000' : C.dim, cursor: 'pointer', fontSize: 8, letterSpacing: 1, fontWeight: 800, ...S.ibm }}>{l}</button>
              ))}
            </div>

            {gymMode === 'full' && (
              <>
                <Label text="SELECT PHASE" color={C.muted} />
                <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 16, paddingBottom: 4 }}>
                  {Object.keys(FULL_GYM_WORKOUTS).map(pid => {
                    const p = PHASES.find(x => x.id === pid)
                    return p ? (
                      <button key={pid} onClick={() => setCurrentPhase(pid)} style={{ flexShrink: 0, padding: '8px 12px', background: currentPhase === pid ? p.color : C.card, border: `1px solid ${currentPhase === pid ? p.color : C.border}`, borderRadius: 6, color: currentPhase === pid ? '#000' : C.muted, cursor: 'pointer', fontSize: 8, letterSpacing: 1, fontWeight: 700, ...S.ibm }}>{p.label}</button>
                    ) : null
                  })}
                </div>
                {workoutsForPhase.map(w => <WorkoutCard key={w.id} w={w} onClick={() => setActiveWorkout(w)} />)}
              </>
            )}

            {(gymMode === 'hotel' || gymMode === 'bw') && (
              <>
                <div style={{ background: C.card2, border: `1px solid ${gymMode === 'bw' ? C.gold + '33' : C.blue + '33'}`, borderRadius: 8, padding: '12px 14px', marginBottom: 14 }}>
                  <div style={{ fontSize: 9, color: gymMode === 'bw' ? C.gold : C.blue, letterSpacing: 2, marginBottom: 4, ...S.ibm, fontWeight: 700 }}>{gymMode === 'bw' ? 'ZERO EQUIPMENT NEEDED' : 'HOTEL GYM — DUMBBELLS + CARDIO'}</div>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6, ...S.ibm }}>{gymMode === 'bw' ? 'Floor space, a chair or bed, and outside for sprints.' : 'Heaviest DBs available. Standard hotel gym.'}</div>
                </div>
                {HOTEL_WORKOUTS.map(w => {
                  const exs = gymMode === 'bw' ? w.bw : w.gym
                  return <WorkoutCard key={w.id} w={{ ...w, name: w.label, day: w.tag, exercises: exs }} onClick={() => setActiveWorkout({ ...w, name: w.label, day: w.tag, exercises: exs })} />
                })}
              </>
            )}
          </div>
        )}

        {/* ── JUMP ── */}
        {tab === 'jump' && (
          <div style={{ paddingTop: 16 }}>
            <div style={{ background: `linear-gradient(135deg,${C.red}18,transparent)`, border: `1px solid ${C.red}44`, borderRadius: 10, padding: 18, marginBottom: 16 }}>
              <Label text="DAILY · 10 MINUTES · NO EXCUSES" color={C.red} />
              <div style={{ fontSize: 30, ...S.bebas, letterSpacing: 1, marginBottom: 8 }}>Jump Protocol</div>
              <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.7, ...S.ibm }}>Every single day — show day, travel day, rest day. Losing weight adds 4 free inches. This protocol adds 6–8 more.</div>
            </div>

            {JUMP_PROTOCOL.map((step, i) => (
              <div key={i} onClick={() => setExpandedJumpStep(expandedJumpStep === i ? null : i)}
                style={{ background: expandedJumpStep === i ? C.red + '11' : C.card, border: `1px solid ${expandedJumpStep === i ? C.red + '55' : C.border}`, borderRadius: 10, padding: 16, marginBottom: 8, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.red + '22', border: `1px solid ${C.red}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: C.red, ...S.ibm }}>{step.step}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', ...S.ibm }}>{step.name}</div>
                    <div style={{ fontSize: 9, color: C.gold, letterSpacing: 1, marginTop: 2, ...S.ibm }}>{step.duration}</div>
                    {expandedJumpStep === i && <div style={{ fontSize: 11, color: '#aaa', lineHeight: 1.7, marginTop: 8, ...S.ibm }}>{step.cue}</div>}
                  </div>
                  <div style={{ color: C.muted, fontSize: 18 }}>{expandedJumpStep === i ? '−' : '+'}</div>
                </div>
              </div>
            ))}

            {/* Vertical projection */}
            <div style={{ background: '#0d0d00', border: `1px solid ${C.gold}44`, borderRadius: 10, padding: 18, margin: '16px 0' }}>
              <Label text="VERTICAL GAIN PROJECTION" color={C.gold} />
              {[['Lose 15+ lb of fat', '+4 in'], ['Daily plyometric protocol', '+4 in'], ['Hip + ankle mobility', '+2 in'], ['Leg strength gains', '+2 in']].map(([c, e], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>
                  <span style={{ fontSize: 11, color: C.muted, ...S.ibm }}>{c}</span>
                  <span style={{ fontSize: 12, fontWeight: 900, color: C.gold, ...S.ibm }}>{e}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, ...S.ibm }}>Total projected</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: C.red, ...S.ibm }}>10–12 inches</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {!jumpDone ? (
                <button onClick={markJumpDone} style={{ flex: 2, padding: 18, background: `linear-gradient(135deg,${C.red},${C.red}cc)`, border: 'none', borderRadius: 12, color: '#fff', cursor: 'pointer', fontSize: 12, letterSpacing: 3, fontWeight: 800, ...S.ibm }}>
                  ✓ DONE — MARK COMPLETE
                </button>
              ) : (
                <div style={{ flex: 2, padding: 18, background: C.green + '22', border: `1px solid ${C.green}44`, borderRadius: 12, textAlign: 'center', fontSize: 11, letterSpacing: 3, color: C.green, fontWeight: 800, ...S.ibm }}>
                  ✓ COMPLETE TODAY
                </div>
              )}
              <button onClick={() => setShowJumpLog(true)} style={{ flex: 1, padding: 18, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, color: C.gold, cursor: 'pointer', fontSize: 10, letterSpacing: 2, fontWeight: 700, ...S.ibm }}>
                📏 LOG REACH
              </button>
            </div>
          </div>
        )}

        {/* ── EAT ── */}
        {tab === 'nutrition' && (
          <div style={{ paddingTop: 16 }}>
            <div style={{ background: C.card, border: `1px solid ${C.gold}33`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <Label text="RECOMPOSITION NUTRITION" color={C.gold} />
              <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.7, ...S.ibm }}>185 lb at 12% BF = losing 28 lb of fat AND building 24 lb of muscle. High protein makes both happen at the same time.</div>
            </div>

            <Label text="CALORIES BY PHASE" color={C.muted} />
            {NUTRITION_PHASES.map((p, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: C.gold, letterSpacing: 2, marginBottom: 10, fontWeight: 700, ...S.ibm }}>{p.phase.toUpperCase()}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 8 }}>
                  {[['KCAL', p.cal, C.gold], ['PROTEIN', p.p + 'g', C.red], ['CARBS', p.c + 'g', C.blue], ['FAT', p.f + 'g', C.orange]].map(([l, v, col]) => (
                    <div key={l} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 900, color: col, ...S.ibm }}>{v}</div>
                      <div style={{ fontSize: 7, color: C.dim, letterSpacing: 1, marginTop: 2, ...S.ibm }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.5, ...S.ibm }}>{p.note}</div>
              </div>
            ))}

            <Label text="NON-NEGOTIABLES" color={C.red} />
            {['200g+ protein every single day — no exceptions', 'Eat within 1 hour of waking', '50g protein + 60g carbs within 45 min post-workout', '1 gallon of water daily', 'No alcohol — kills testosterone, sleep, and recovery', 'Track everything for the first 8 weeks'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ color: C.red, fontWeight: 700, flexShrink: 0, ...S.ibm }}>{i + 1}.</span>
                <span style={{ fontSize: 12, color: '#999', lineHeight: 1.5, ...S.ibm }}>{r}</span>
              </div>
            ))}

            <Label text="SUPPLEMENT STACK" color={C.blue} />
            {SUPPLEMENTS.map(s => (
              <div key={s.name} style={{ display: 'flex', gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', ...S.ibm }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2, ...S.ibm }}>{s.when}</div>
                </div>
                <div style={{ background: C.blue + '22', border: `1px solid ${C.blue}44`, borderRadius: 4, padding: '5px 9px', fontSize: 9, color: C.blue, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0, ...S.ibm }}>{s.dose}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── STATS ── */}
        {tab === 'progress' && (
          <div style={{ paddingTop: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                ['CURRENT WEIGHT', stats.weight + ' lb', C.text],
                ['BODY FAT', stats.bf + '%', stats.bf > 20 ? C.red : stats.bf > 15 ? C.orange : C.green],
                ['WORKOUTS LOGGED', totalWorkouts, C.gold],
                ['CURRENT STREAK', streak + ' days', C.green],
                ['FAT LOST', (Math.max(0, 189 - stats.weight)).toFixed(1) + ' lb', C.green],
                ['BF REDUCED', (Math.max(0, 27.5 - stats.bf)).toFixed(1) + '%', C.blue],
              ].map(([l, v, col]) => (
                <div key={l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: col, ...S.ibm }}>{v}</div>
                  <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1, marginTop: 3, ...S.ibm }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Progress bars */}
            <div style={{ background: C.card, border: `1px solid ${C.gold}33`, borderRadius: 10, padding: 18, marginBottom: 16 }}>
              <Label text="CREED STANDARD PROGRESS" color={C.gold} />
              {[['Weight', stats.weight, 185, 189, 'lb', C.gold], ['Body Fat', stats.bf, 12, 27.5, '%', C.red]].map(([label, cur, target, start, unit, col]) => {
                const pct = Math.min(100, Math.max(0, ((start - cur) / (start - target)) * 100))
                return (
                  <div key={label} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 10, color: C.muted, ...S.ibm }}>{label}</span>
                      <span style={{ fontSize: 10, color: C.text, ...S.ibm }}>{cur}{unit} → {target}{unit}</span>
                    </div>
                    <div style={{ background: C.card2, borderRadius: 4, height: 8, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg,${col},${col}88)`, borderRadius: 4, transition: 'width 0.5s' }} />
                    </div>
                    <div style={{ fontSize: 8, color: col, marginTop: 3, letterSpacing: 1, ...S.ibm }}>{pct.toFixed(0)}% TO GOAL</div>
                  </div>
                )
              })}
            </div>

            {/* Stat history */}
            {statHistory.length > 1 && (
              <>
                <Label text="WEIGHT HISTORY" color={C.muted} />
                {statHistory.slice(0, 8).map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '11px 14px', marginBottom: 6 }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.gold, ...S.ibm }}>{s.weight_lb} lb</span>
                      <span style={{ fontSize: 13, color: C.muted, ...S.ibm }}>{s.body_fat_pct}% BF</span>
                    </div>
                    <div style={{ fontSize: 9, color: C.dim, ...S.ibm }}>{new Date(s.recorded_at).toLocaleDateString()}</div>
                  </div>
                ))}
              </>
            )}

            {/* Workout history */}
            <Label text="RECENT WORKOUTS" color={C.muted} />
            {workoutHistory.length === 0 ? (
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, textAlign: 'center', color: C.muted, fontSize: 12, ...S.ibm }}>No workouts logged yet. Start one today.</div>
            ) : (
              workoutHistory.slice(0, 8).map((w, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '11px 14px', marginBottom: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', ...S.ibm }}>{w.workout_name}</div>
                  <div style={{ fontSize: 9, color: C.muted, ...S.ibm }}>{new Date(w.logged_at).toLocaleDateString()}</div>
                </div>
              ))
            )}

            <button onClick={() => setShowStatsModal(true)} style={{ width: '100%', padding: 16, background: C.gold + '22', border: `1px solid ${C.gold}44`, borderRadius: 10, color: C.gold, cursor: 'pointer', fontSize: 10, letterSpacing: 3, fontWeight: 800, marginTop: 8, ...S.ibm }}>
              + UPDATE WEIGHT & BODY FAT
            </button>
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.card, borderTop: `1px solid ${C.border}`, display: 'flex', zIndex: 20 }}>
        {[['today', 'TODAY', '🏠'], ['workouts', 'TRAIN', '🏋'], ['jump', 'JUMP', '⚡'], ['nutrition', 'EAT', '🥩'], ['progress', 'STATS', '📊']].map(([k, l, icon]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            flex: 1, padding: '12px 4px 10px', background: 'none', border: 'none',
            color: tab === k ? C.gold : C.dim, cursor: 'pointer', fontSize: 7,
            letterSpacing: 1.5, fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, ...S.ibm,
          }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}

function WorkoutCard({ w, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
      padding: 16, marginBottom: 8, cursor: 'pointer', textAlign: 'left',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div>
        <div style={{ fontSize: 8, color: w.color, letterSpacing: 2, marginBottom: 3, fontWeight: 700, ...S.ibm }}>{w.day}</div>
        <div style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', ...S.ibm }}>{w.name}</div>
        {w.tag && <div style={{ fontSize: 9, color: C.muted, marginTop: 3, ...S.ibm }}>{w.tag}</div>}
      </div>
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: w.color + '22', border: `1px solid ${w.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: w.color, fontSize: 16, flexShrink: 0 }}>→</div>
    </button>
  )
}

function Label({ text, color }) {
  return <div style={{ fontSize: 8, letterSpacing: 4, color, marginBottom: 10, fontWeight: 700, ...S.ibm }}>{text}</div>
}

