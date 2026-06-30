// ─────────────────────────────────────────────────────────────
// BURN INDUSTRY FITNESS — CREED PROTOCOL
// Science refs: Schoenfeld 2016, Krieger 2010, Israetel MEV/MAV/MRV,
// Helms et al. 2014, Corey Calliet methodology
// ─────────────────────────────────────────────────────────────

export const PHASES = [
  { id: 'cut', label: 'THE CUT', dates: 'Jun–Sep 2026', color: '#E8192C', gymType: 'full' },
  { id: 'bulk', label: 'LEAN BULK', dates: 'Oct 2026–Mar 2027', color: '#1E90FF', gymType: 'full' },
  { id: 'final-cut', label: 'FINAL CUT', dates: 'Apr–Jul 2027', color: '#00C853', gymType: 'full' },
  { id: 'tour-mode', label: 'TOUR MODE', dates: 'On The Road', color: '#FF6B00', gymType: 'hotel' },
]

// ─── RPE GUIDE ────────────────────────────────────────────────
// RPE 7 = 3 reps left in the tank. Challenging but smooth.
// RPE 8 = 2 reps left. Hard. Form still perfect.
// RPE 9 = 1 rep left. Very hard. Last rep is a grind.
// RPE 10 = Absolute max. Form breakdown imminent.
// Cut phase: RPE 7–8. Bulk phase: RPE 8–9. Never chase failure on deficit.

// ─── DELOAD PROTOCOL ─────────────────────────────────────────
// Every 4th week: 50% volume, 70% intensity. Same exercises. Half the sets.
// Signs you need a deload early: persistent joint ache, sleep disruption,
// strength dropping 2+ sessions in a row, motivation collapse.

// ─── WARM-UP PROTOCOLS ───────────────────────────────────────
export const WARMUPS = {
  upper_push: [
    { n: 'Band Pull-Apart', s: '2×20', note: 'Activate rear delts and external rotators. Every upper session.' },
    { n: 'Shoulder CARs', s: '5/side', note: 'Full controlled articular rotation. Slow. Own the range.' },
    { n: 'Push-Up', s: '2×10', note: 'Bodyweight. Feel the chest. Prime the pattern.' },
    { n: 'Incline DB Press (50% work weight)', s: '1×15', note: 'Warm up to working weight. Never go straight to heavy.' },
  ],
  upper_pull: [
    { n: 'Band Pull-Apart', s: '2×20', note: 'Rear delt activation. Non-negotiable.' },
    { n: 'Dead Hang', s: '2×30s', note: 'Decompress the spine. Prime the lats.' },
    { n: 'Scapular Pull-Up', s: '2×10', note: 'No elbow bend. Just retract and depress. Teaches lat engagement.' },
    { n: 'Lat Pulldown (50% work weight)', s: '1×15', note: 'Feel the lats before loading them.' },
  ],
  lower_power: [
    { n: 'Hip 90/90 Stretch', s: '90s/side', note: 'Open the hips before loading them. Non-negotiable.' },
    { n: 'Ankle Dorsiflexion', s: '60s/side', note: 'Wall stretch. More ankle range = deeper squat.' },
    { n: 'Glute Bridge', s: '2×15', note: 'Activate glutes before squatting. Protect the lower back.' },
    { n: 'Goblet Squat (light)', s: '2×10', note: 'Prime the squat pattern. Feel depth.' },
    { n: 'Jump Protocol', s: '10 min', note: 'Hip flexors → ankles → deep squat hold → 10 approach jumps → 5 max verticals.' },
  ],
  lower_athletic: [
    { n: 'Hip 90/90 Stretch', s: '90s/side', note: 'Open hips for lateral movement.' },
    { n: 'Lateral Band Walk', s: '2×15/side', note: 'Glute medius. Prevents knee cave on cuts.' },
    { n: 'A-Skip', s: '2×20m', note: 'Prime the sprint pattern. High knees, drive the arm.' },
    { n: 'Approach Jumps', s: '10 reps', note: 'Basketball first step + dunk training.' },
  ],
  upper_hyp: [
    { n: 'Band Pull-Apart', s: '2×20', note: 'Rear delt activation.' },
    { n: 'Face Pull (light)', s: '2×20', note: 'Shoulder health. Warm up the rotator cuff.' },
    { n: 'Push-Up', s: '2×15', note: 'Prime chest before volume work.' },
    { n: 'Bodyweight Row', s: '2×15', note: 'Prime back before volume work.' },
  ],
}

// ─── CORE FINISHERS (appended to every session) ──────────────
const CORE_PUSH = [
  { n: '— CORE FIRST (earn the session) —', s: '', note: 'Do not skip. Abs respond to frequency. This is 5× per week.' },
  { n: 'Ab Wheel Rollout', s: '4×10', note: 'Slow out. Pause. Controlled return. No hips sagging. RPE 8.' },
  { n: 'Hanging Leg Raise', s: '4×12', note: 'Dead hang. Legs straight. Posterior pelvic tilt at top. No swing.' },
  { n: 'Pallof Press', s: '3×12/side', note: 'Anti-rotation. Stand sideways to cable. Press out, hold 2 sec. Best functional core move.' },
  { n: 'Hollow Body Hold', s: '3×30s', note: 'Build to 45s. Lower back FLAT. If you feel your back arch — stop and reset.' },
]
const CORE_PULL = [
  { n: '— CORE FIRST (earn the session) —', s: '', note: 'Every session. No exceptions. Controlled, quality reps.' },
  { n: 'Pallof Press', s: '3×12/side', note: 'Anti-rotation. Stand sideways to cable. Press out, hold 2 sec. The functional core staple.' },
  { n: 'Dead Bug', s: '4×8/side', note: 'Slow. Lower back pinned. Opposite arm + leg. Feel the deep core.' },
  { n: 'Copenhagen Plank', s: '3×20s/side', note: 'Top leg on bench. Adductor + oblique. Direct basketball carryover.' },
  { n: 'Cable Woodchop (high to low)', s: '3×12/side', note: 'Rotational power. Transfers directly to court and explosiveness.' },
  { n: 'Suitcase Carry', s: '3×30m/side', note: 'Heavy DB. Walk tall. Anti-lateral flexion. Deep core stability.' },
]
const CORE_LOWER = [
  { n: '— CORE FIRST (light — protect your brace) —', s: '', note: 'Heavy squats/deadlifts after this. Keep it ACTIVATION level, not a burnout, so your trunk can brace safely.' },
  { n: 'Pallof Press', s: '2×12/side', note: 'Anti-rotation. Light. Primes the core to brace under the bar.' },
  { n: 'Hollow Body Hold', s: '2×20s', note: 'Activation only. Lower back FLAT.' },
  { n: 'Dead Bug', s: '2×8/side', note: 'Back pinned. Slow. Wakes up the deep core without fatiguing it.' },
]
const CORE_ATHLETIC = [
  { n: '— CORE FIRST (earn the session) —', s: '', note: 'Athletic core = rotational power and lateral stability.' },
  { n: 'Pallof Press', s: '3×12/side', note: 'Anti-rotation. The basketball core move.' },
  { n: 'Side Plank + Hip Dip', s: '3×15/side', note: 'Obliques. Lateral stability for defence and cuts.' },
  { n: 'Cable Woodchop', s: '3×12/side', note: 'Rotational power. First step explosion starts here.' },
]
const CORE_DEDICATED = [
  { n: '— 20 MIN DEDICATED ABS — DO NOT RUSH THIS —', s: '', note: 'This is the Creed six-pack session. Every rep intentional.' },
  { n: 'Ab Wheel Rollout', s: '4×12', note: 'Full extension. Pause at bottom. Pull back with lats not hips. RPE 8.' },
  { n: 'Hanging Leg Raise', s: '4×15', note: 'Dead hang. Legs straight. Tilt pelvis at top. Squeeze for 1 sec.' },
  { n: 'Pallof Press', s: '4×12/side', note: 'Anti-rotation. 2-sec hold at extension every rep.' },
  { n: 'Hollow Body Hold', s: '4×30s', note: 'Build toward 60s over the weeks. Non-negotiable.' },
  { n: 'Bicycle Crunch', s: '3×20/side', note: 'SLOW. 2 sec each side. Elbows wide. Feel oblique fully contract.' },
  { n: 'Cable Woodchop', s: '3×12/side', note: 'High to low. Rotate through thoracic spine not just arms.' },
  { n: 'Dead Bug', s: '3×10/side', note: 'Finisher. Back flat. Slow. Last set to failure.' },
]

// ─── THE FULL PROGRAM ─────────────────────────────────────────
// 5-Day Upper/Lower Split
// Day 1: Upper A — Push Focus (Chest + Shoulders + Tris)
// Day 2: Lower A — Power + Vertical (Squats + Deadlifts + Dunk)
// Day 3: Upper B — Pull Focus (Back + Chest secondary)
// Day 4: Lower B — Athletic + Court (Explosive + Basketball)
// Day 5: Upper C — Hypertrophy + Dedicated Abs
//
// PROGRESSION MODEL:
// Hit top of rep range for 2 consecutive sessions → add 5 lb next session
// If you fail to hit bottom of rep range → keep weight, focus on form
// Deload Week 4: 50% sets, 70% of working weight, same exercises

export const FULL_GYM_WORKOUTS = {

  // ═══════════════════════════════════════════════════════════
  // CUT PHASE — Jun to Sep 2026
  // Goal: Lose fat, preserve muscle. RPE 7-8. Never train to failure.
  // Calories 2,150. Protein 200g. Expect 1-1.25 lb/week fat loss.
  // ═══════════════════════════════════════════════════════════
  cut: [
    {
      id: 'cut-d1', day: 'DAY 1', name: 'UPPER A — CHEST + SHOULDERS',
      color: '#E8192C',
      tag: 'Chest leads fresh. Shoulder caps built here. V-taper starts from the top.',
      rpe: 'RPE 7–8. On a deficit — never grind to failure.',
      warmup: 'upper_push',
      exercises: [
        ...CORE_PUSH,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: 'DB Bench Press (your primary)', s: '4×8', note: 'START AT 70 lb DBs. No spotter needed — just drop them if you fail. This is your safe heavy press. Hit 8 on all sets → go to 75s. RPE 8.' },
        { n: 'Barbell Bench (rack + pins ONLY)', s: '3×8', note: 'Set safety pins at chest height so you CANNOT get pinned. Fear gone = real weight. START AT 150 lb. Hit 8 on all → add 5 lb. RPE 8.' },
        { n: 'Incline DB Press', s: '3×10', note: 'Upper chest — the Creed fullness. START AT 50 lb DBs. 45° incline. Elbows at 45° to torso. Full range. RPE 7.' },
        { n: 'Weighted Dip', s: '3×10', note: 'Lean forward 30°. Chest emphasis. Lower until elbows at 90°. Explosive up. RPE 8.' },
        { n: 'Cable Fly (low to high)', s: '3×12', note: 'Lower chest sweep. Arms slightly bent. Squeeze hard at top for 1 sec. Feel the stretch at bottom. RPE 7.' },
        { n: 'Overhead Press (Strict)', s: '4×8', note: 'Shoulder cap width. No leg drive. Bar in front. Lock out at top. 2-sec descent. RPE 8.' },
        { n: 'DB Lateral Raise', s: '4×15', note: 'The most underrated exercise for the Creed look. 2-sec up / 3-sec down. Stop at shoulder height. No swinging. RPE 7.' },
        { n: 'Face Pull', s: '3×20', note: 'Rope to forehead. External rotation at end range. Shoulder health. Never skip.' },
        { n: 'Tricep Rope Pushdown superset Overhead Extension', s: '3×12 each', note: 'Minimal rest between pairs. Tricep mass = bigger arms at shirt-off.' },]
    },
    {
      id: 'cut-d2', day: 'DAY 2', name: 'LOWER A — POWER + VERTICAL',
      color: '#D4A017',
      tag: 'Squat and deadlift when CNS is fully recovered. Dunk training opens this session.',
      rpe: 'RPE 8 on compounds. Explosive work is max effort always.',
      warmup: 'lower_power',
      exercises: [
        ...CORE_LOWER,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: '⚡ JUMP PROTOCOL FIRST', s: '10 min', note: 'Non-negotiable before any loading. Hip flexors → ankles → squat hold → 10 approach jumps → 5 max verticals. Track your highest reach weekly.' },
        { n: 'Back Squat', s: '4×8', note: 'Hip crease below knee. Brace hard. Controlled down, drive up — NORMAL tempo, no counting seconds while you rebuild the pattern. START AT 225 lb (rebuilding from a layoff — 255 will come back fast). Hit 8 on all sets for 2 sessions → add 10 lb. RPE 8.' },
        { n: 'Romanian Deadlift', s: '4×10', note: 'Hip hinge. Soft knee. Bar drags down the leg. Feel the hamstring load at bottom. 3-sec eccentric. RPE 7.' },
        { n: 'Leg Press', s: '3×12', note: 'High and wide foot placement = glutes and hamstrings. Full range — don\'t short rep this. 90s rest.' },
        { n: 'Nordic Hamstring Curl', s: '3×6', note: 'Lower as slowly as possible. Partner holds feet or feet under pad. Prevents hamstring tears. Builds vertical jump directly.' },
        { n: 'Depth Jump', s: '4×5', note: 'Step off 12in box. Land soft — immediately max jump up. Reactive strength. The most direct dunk training you can do.' },
        { n: 'Single-Leg Calf Raise', s: '4×20/leg', note: 'Off a step. Pause at top 1 sec. Full range. Ankle strength = 2 free vertical inches.' },]
    },
    {
      id: 'cut-d3', day: 'DAY 3', name: 'UPPER B — BACK + CHEST',
      color: '#1E90FF',
      tag: 'Back gets maximum fresh stimulus. V-taper is built here. Chest gets second hit.',
      rpe: 'RPE 8 on pull-ups and rows. RPE 7 on chest secondary.',
      warmup: 'upper_pull',
      exercises: [
        ...CORE_PULL,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: 'Weighted Pull-Up', s: '5×6', note: 'You do 15 bodyweight — time to load it. START AT +15 lb (dip belt or DB between feet). Dead hang, chest to bar. Hit 6 on all sets → add 5 lb. This turns 15 reps into a thick wide back. RPE 8.' },
        { n: 'Barbell Row', s: '4×8', note: 'Pull to lower chest. Elbows close to body. 2-sec hold at top. Control the negative. Back thickness is built here. RPE 8.' },
        { n: 'Cable Row (wide grip)', s: '3×10', note: 'Different angle from barbell row. Full stretch — let shoulders protract. Pull to upper chest. Lat width.' },
        { n: 'Lat Pulldown (wide grip)', s: '3×12', note: 'Full stretch at top. Pull elbows to hips. Lean back 15° only. Back width.' },
        { n: 'Incline DB Press', s: '3×10', note: 'Chest second hit. Upper chest priority. Elbows 45°. Full range. Controlled. RPE 7.' },
        { n: 'Cable Fly (high to low)', s: '3×12', note: 'Upper chest sweep. Arms slightly bent. Squeeze at bottom. RPE 7.' },
        { n: 'Face Pull', s: '4×20', note: 'Shoulder health. Every upper session. Never optional.' },
        { n: 'Barbell Curl superset Hammer Curl', s: '3×12 each', note: 'Full supination on barbell curl. Neutral on hammer. Bicep peak + thickness.' },]
    },
    {
      id: 'cut-d4', day: 'DAY 4', name: 'LOWER B — ATHLETIC + COURT',
      color: '#FF6B00',
      tag: 'Explosive power, first step, defensive movement. You become a different player here.',
      rpe: 'Explosive work = max effort. Strength work RPE 7.',
      warmup: 'lower_athletic',
      exercises: [
        ...CORE_ATHLETIC,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: '⚡ Lateral Bound', s: '4×8/side', note: 'Opens every athletic session. Land soft on single leg. Hold 1 sec. Hip abductor + glute power = defensive first step.' },
        { n: '⚡ Broad Jump', s: '4×6', note: 'Max distance every rep. Full reset between. Horizontal explosive power.' },
        { n: 'Front Squat', s: '4×8', note: 'Upright torso. Elbows high. Quad dominant. Safer on knees than back squat second leg day. RPE 7.' },
        { n: 'Bulgarian Split Squat', s: '3×10/leg', note: 'Rear foot elevated. Deep. Weighted DBs. Single-leg strength for basketball cuts and landing. RPE 8.' },
        { n: 'Single-Leg RDL', s: '3×10/leg', note: 'Balance + hamstring. Control the wobble — that instability is the point. Landing mechanics.' },
        { n: 'Sprint', s: '8×40m', note: 'Walk back = full rest. Every rep max speed. This is your first step. This is your defence. This is your dunk approach.' },
        { n: 'T-Drill', s: '6 rounds', note: 'Time every round. Write it down. Beat it next week. Agility is trainable.' },
        { n: '5-10-5 Shuttle', s: '6 rounds', note: 'Change of direction speed. Basketball in a nutshell.' },]
    },
    {
      id: 'cut-d5', day: 'DAY 5', name: 'UPPER C — HYPERTROPHY + DEDICATED ABS',
      color: '#9B5DE5',
      tag: 'Higher reps. Both chest and back. Then 20 minutes of real ab work.',
      rpe: 'RPE 7 throughout. Volume day. Feel every rep.',
      warmup: 'upper_hyp',
      exercises: [
        ...CORE_DEDICATED,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: 'Weighted Chin-Up', s: '4×10', note: 'Supinated grip. Chest to bar. Back 3rd hit this week. Bicep bonus. RPE 7.' },
        { n: 'Incline Barbell Press', s: '4×10', note: 'Chest 3rd hit. Upper chest. Full range. 3-sec descent. RPE 7.' },
        { n: 'DB Row (single arm)', s: '4×12/side', note: 'Heavy. Brace on bench. Pull elbow to hip. Back thickness.' },
        { n: 'Cable Fly (low to high)', s: '4×15', note: 'Chest definition. Full stretch. Squeeze hard. Feel the pec.' },
        { n: 'Lat Pulldown (close grip)', s: '3×15', note: 'Different angle. Full range. Lower back to target lower lats.' },
        { n: 'DB Lateral Raise', s: '4×15', note: 'Shoulder caps. Same as Day 1. Accumulate the volume.' },
        { n: 'Rear Delt Fly', s: '4×15', note: 'Bent over. Light weight. Full range. Rear delt development = 3D shoulder look.' },]
    },
  ],

  // ═══════════════════════════════════════════════════════════
  // LEAN BULK PHASE — Oct 2026 to Mar 2027
  // Goal: Build 10-14 lb lean muscle. RPE 8-9. Push harder.
  // Calories 2,900. Protein 215g. 1 lb/week scale gain target.
  // Basketball season: reduce Lower B volume on game days.
  // ═══════════════════════════════════════════════════════════
  bulk: [
    {
      id: 'bulk-d1', day: 'DAY 1', name: 'UPPER A — CHEST + SHOULDERS',
      color: '#1E90FF',
      tag: 'Heavier than cut phase. Progressive overload is the entire point of this phase.',
      rpe: 'RPE 8–9. You are in surplus. Push harder than you ever have.',
      warmup: 'upper_push',
      exercises: [
        ...CORE_PUSH,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: 'Barbell Bench Press', s: '5×6', note: 'Heavier than cut phase. Strength + size. 3-sec descent. Pause at chest. Explosive up. Target: 205–225 lb by end of bulk. RPE 9.' },
        { n: 'Incline DB Press', s: '4×10', note: 'Upper chest mass. Heavier DBs than cut. Full range. RPE 8.' },
        { n: 'Weighted Dip', s: '4×10', note: 'Add weight every week. Lean forward. Chest emphasis. RPE 8.' },
        { n: 'Cable Fly (low to high)', s: '4×15', note: 'Chest pump and stretch. Full range. Squeeze hard. RPE 7.' },
        { n: 'Overhead Press', s: '5×6', note: 'Shoulder strength. Heavier than cut. 3-sec descent. No leg drive. RPE 9.' },
        { n: 'DB Lateral Raise', s: '5×15', note: 'One extra set. More volume in bulk. Shoulder caps. Slow and controlled. RPE 7.' },
        { n: 'Face Pull', s: '4×20', note: 'Shoulder health. Non-negotiable every upper session.' },
        { n: 'Tricep Rope Pushdown superset Overhead Extension', s: '4×12 each', note: 'More sets than cut. Arms grow in bulk. Use it.' },]
    },
    {
      id: 'bulk-d2', day: 'DAY 2', name: 'LOWER A — POWER + VERTICAL',
      color: '#D4A017',
      tag: 'Heaviest squats of your life. Eat enough to recover from this session.',
      rpe: 'RPE 8–9. This is where the strength that builds the dunk comes from.',
      warmup: 'lower_power',
      exercises: [
        ...CORE_LOWER,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: '⚡ JUMP PROTOCOL FIRST', s: '10 min', note: 'Even in bulk. Maintain athleticism. Hip flexors → ankles → approach jumps → max verticals. Track weekly.' },
        { n: 'Back Squat', s: '5×5', note: 'The bulk exercise. Add 5 lb every week you hit all reps. Target 275–315 lb by March. RPE 9.' },
        { n: 'Conventional Deadlift', s: '4×5', note: 'Explosive off floor. 3 min rest. The most total muscle mass builder in existence. RPE 9.' },
        { n: 'Leg Press', s: '4×12', note: 'Volume after heavy work. High foot placement. 90s rest.' },
        { n: 'Nordic Hamstring Curl', s: '3×8', note: 'Getting stronger here directly increases your vertical. Never skip.' },
        { n: 'Depth Jump', s: '4×6', note: '18in box now. Higher box = more reactive demand.' },
        { n: 'Calf Raises', s: '5×15', note: 'Heavy. Pause at top. Ankle strength for jumping.' },]
    },
    {
      id: 'bulk-d3', day: 'DAY 3', name: 'UPPER B — BACK + CHEST',
      color: '#1E90FF',
      tag: 'Heaviest pull-ups of your life. Back width is built here every week.',
      rpe: 'RPE 9 on pull-ups and rows. This is the hardest upper session.',
      warmup: 'upper_pull',
      exercises: [
        ...CORE_PULL,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: 'Weighted Pull-Up', s: '5×6', note: 'Add weight every week. This is the signature Creed exercise. Dead hang. Chest to bar. RPE 9.' },
        { n: 'Barbell Row', s: '5×6', note: 'Heavier than cut. Pull to lower chest. Hold 1 sec at top. RPE 9.' },
        { n: 'Cable Row (wide grip)', s: '4×10', note: 'Full stretch. Pull to upper chest. Lat width.' },
        { n: 'Lat Pulldown', s: '4×12', note: 'Wide grip. Full range. Feel the lat at full stretch.' },
        { n: 'Barbell Bench Press', s: '4×8', note: 'Chest second hit. Still heavy. 3-sec descent. RPE 8.' },
        { n: 'Incline DB Press', s: '3×10', note: 'Upper chest volume. RPE 7.' },
        { n: 'Face Pull', s: '4×20', note: 'Shoulder health. Always.' },
        { n: 'Barbell Curl superset Hammer Curl', s: '4×10 each', note: 'More volume in bulk. Arms grow here.' },]
    },
    {
      id: 'bulk-d4', day: 'DAY 4', name: 'LOWER B — ATHLETIC + COURT',
      color: '#FF6B00',
      tag: 'Basketball season. Reduce volume on game days — 2 main exercises only.',
      rpe: 'Explosive = max effort. Strength work RPE 7–8.',
      warmup: 'lower_athletic',
      note: '🏀 BASKETBALL SEASON ADJUSTMENT: On game days replace this entire session with: Jump Protocol + 3×8 Front Squat + 3×8 Single-Leg RDL + Sprint 4×40m. Save energy for the court.',
      exercises: [
        ...CORE_ATHLETIC,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: '⚡ Lateral Bound', s: '4×8/side', note: 'You are faster now. Land and hold. Hip power.' },
        { n: '⚡ Depth Jump to Broad Jump', s: '4×5', note: 'Step off box, land, immediately broad jump max distance. Complex training = maximum power output.' },
        { n: 'Front Squat', s: '4×8', note: 'Heavier than cut. Upright torso. Quad development. RPE 8.' },
        { n: 'Bulgarian Split Squat', s: '4×10/leg', note: 'Heavier DBs. Single leg strength. Basketball cuts. RPE 8.' },
        { n: 'Sled Push', s: '4×20m', note: 'Heavy load. Drive through the floor. 2 min rest. Pure power.' },
        { n: 'Sprint', s: '8×40m', note: 'Walk back = rest. You are the fastest person on that court.' },
        { n: 'T-Drill + 5-10-5', s: '6 rounds each', note: 'Time every run. PRs only.' },]
    },
    {
      id: 'bulk-d5', day: 'DAY 5', name: 'UPPER C — HYPERTROPHY + DEDICATED ABS',
      color: '#9B5DE5',
      tag: 'Volume day. Both chest and back third hit. 20 min real ab work. Creed physique is assembled here.',
      rpe: 'RPE 7–8. Pump and feel. Volume accumulation.',
      warmup: 'upper_hyp',
      exercises: [
        ...CORE_DEDICATED,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: 'Weighted Chin-Up', s: '5×10', note: 'More volume than cut. Back 3× this week. Bicep thickness in bulk.' },
        { n: 'Incline Barbell Press', s: '5×8', note: 'Chest 3× this week. Heavier than cut. Upper chest mass.' },
        { n: 'DB Row (single arm)', s: '4×12/side', note: 'Heavy. Back thickness.' },
        { n: 'Cable Fly', s: '4×15', note: 'Chest definition and pump.' },
        { n: 'Lat Pulldown (close grip)', s: '4×15', note: 'Lower lat sweep. Different angle.' },
        { n: 'DB Lateral Raise', s: '4×15', note: 'Shoulder caps. Volume accumulation.' },
        { n: 'Rear Delt Fly', s: '4×15', note: '3D shoulder look. Don\'t skip this.' },]
    },
  ],

  // ═══════════════════════════════════════════════════════════
  // FINAL CUT — Apr to Jul 2027
  // Goal: Reveal the muscle. 12-13% BF. 180-183 lb. Creed standard.
  // Calories 2,200. Protein 210g. Strength stays, volume drops.
  // ═══════════════════════════════════════════════════════════
  'final-cut': [
    {
      id: 'fc-d1', day: 'DAY 1', name: 'UPPER A — CHEST + SHOULDERS',
      color: '#00C853',
      tag: 'Strength focus. Protect every lb of muscle built in winter.',
      rpe: 'RPE 8. Same weight as bulk — protect what you built.',
      warmup: 'upper_push',
      exercises: [
        ...CORE_PUSH,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: 'Barbell Bench Press', s: '4×6', note: 'SAME WEIGHT AS BULK. On a cut your job is to keep the weight on the bar. This protects the muscle. RPE 8.' },
        { n: 'Incline DB Press', s: '3×10', note: 'Upper chest. Controlled. The cut is revealing what you built.' },
        { n: 'Weighted Dip', s: '3×8', note: 'Maintain strength. Add weight only if it feels light.' },
        { n: 'Cable Fly', s: '3×12', note: 'Definition work. Squeeze hard. Feel the separation.' },
        { n: 'Overhead Press', s: '4×6', note: 'Strength. Same weight as bulk end. Protect the shoulder gains.' },
        { n: 'DB Lateral Raise', s: '4×15', note: 'Shoulder caps stay. These maintain on cut.' },
        { n: 'Face Pull', s: '3×20', note: 'Shoulder health. Always.' },
        { n: 'Tricep Superset', s: '3×12 each', note: 'Maintain arm detail.' },]
    },
    {
      id: 'fc-d2', day: 'DAY 2', name: 'LOWER A — POWER + VERTICAL',
      color: '#D4A017',
      tag: 'Lighter bodyweight = faster. Higher vertical. You are becoming Creed.',
      rpe: 'RPE 8. Protect the squat strength.',
      warmup: 'lower_power',
      exercises: [
        ...CORE_LOWER,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: '⚡ JUMP PROTOCOL FIRST', s: '10 min', note: 'You are lighter now. This translates directly to more vertical. Track it. You should be touching rim consistently.' },
        { n: 'Back Squat', s: '4×5', note: 'SAME WEIGHT AS BULK. Strength maintenance on cut. Non-negotiable. RPE 8.' },
        { n: 'Romanian DL', s: '4×8', note: 'Hamstring maintenance. 3-sec eccentric.' },
        { n: 'Bulgarian Split Squat', s: '3×10/leg', note: 'Single leg strength for basketball.' },
        { n: 'Nordic Hamstring Curl', s: '3×8', note: 'Vertical jump maintenance.' },
        { n: 'Depth Jump', s: '4×6', note: 'You are lighter. Same box. More height. Track your max reach.' },
        { n: 'Single-Leg Calf Raise', s: '4×20/leg', note: 'Ankle strength. Always.' },]
    },
    {
      id: 'fc-d3', day: 'DAY 3', name: 'UPPER B — BACK + CHEST',
      color: '#00C853',
      tag: 'Strength on pull-ups. The V-taper is being revealed as fat drops.',
      rpe: 'RPE 8. Keep the weight. Drop volume before intensity.',
      warmup: 'upper_pull',
      exercises: [
        ...CORE_PULL,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: 'Weighted Pull-Up', s: '4×6', note: 'Same weight as bulk. Protect the back gains. The V-taper is being revealed right now as fat drops. RPE 8.' },
        { n: 'Barbell Row', s: '4×8', note: 'Strength maintenance. Same weight. Pull to lower chest.' },
        { n: 'Cable Row', s: '3×10', note: 'Volume drops slightly vs bulk. Quality over quantity.' },
        { n: 'Lat Pulldown', s: '3×12', note: 'Full range. Back width maintained.' },
        { n: 'Barbell Bench Press', s: '3×8', note: 'Chest second hit. Strength focus. RPE 8.' },
        { n: 'Incline DB Press', s: '3×10', note: 'Upper chest. Definition emerging.' },
        { n: 'Face Pull', s: '3×20', note: 'Always.' },
        { n: 'Barbell Curl superset Hammer Curl', s: '3×12 each', note: 'Maintain arm size on cut.' },]
    },
    {
      id: 'fc-d4', day: 'DAY 4', name: 'LOWER B — ATHLETIC + 10K',
      color: '#FF6B00',
      tag: 'Lighter = faster. 10K training lives here. You are an athlete.',
      rpe: 'Explosive = max effort. Runs at comfortable hard pace.',
      warmup: 'lower_athletic',
      exercises: [
        ...CORE_ATHLETIC,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: '⚡ Approach Jump Attempts', s: '10 reps', note: 'Go for the dunk. You have lost 15+ lb. The vertical is there. Attempt it every session.' },
        { n: '⚡ Lateral Bound', s: '5×8/side', note: 'More volume. You are lighter. Use it.' },
        { n: 'Jump Squat', s: '4×8 @30%BW', note: 'Speed-strength. Light and fast. Dunk training.' },
        { n: 'Front Squat', s: '3×8', note: 'Maintain leg strength on cut.' },
        { n: 'Single-Leg RDL', s: '3×10/leg', note: 'Balance. Hamstring.' },
        { n: 'Sprint', s: '8×40m', note: 'Fastest you have ever been. Walk back = rest.' },
        { n: '10K Run', s: '30–45 min', note: 'WED/SAT/SUN: Tempo runs + long run + easy recovery. Build to race-ready by June.' },]
    },
    {
      id: 'fc-d5', day: 'DAY 5', name: 'UPPER C — HYPERTROPHY + DEDICATED ABS',
      color: '#9B5DE5',
      tag: 'Volume drops vs bulk but abs are being revealed. This session shows you the Creed physique emerging.',
      rpe: 'RPE 7. Feel every rep. Definition day.',
      warmup: 'upper_hyp',
      exercises: [
        ...CORE_DEDICATED,
        { n: '— REST 2 MIN, THEN TRAIN —', s: '', note: 'Core done. You earned the session. Now the main work.' },
        { n: 'Weighted Chin-Up', s: '4×10', note: 'Back third hit. Maintain the width.' },
        { n: 'Incline Barbell Press', s: '4×10', note: 'Chest third hit. Definition emerging.' },
        { n: 'DB Row', s: '3×12/side', note: 'Back thickness.' },
        { n: 'Cable Fly', s: '4×15', note: 'Chest definition. Squeeze and hold.' },
        { n: 'Lat Pulldown', s: '3×12', note: 'Width maintenance.' },
        { n: 'DB Lateral Raise', s: '4×15', note: 'Shoulder caps. These stay full on cut.' },
        { n: 'Rear Delt Fly', s: '3×15', note: '3D shoulder look.' },]
    },
  ],
}

// ─── HOTEL / TOUR WORKOUTS ────────────────────────────────────
export const HOTEL_WORKOUTS = [
  {
    id: 'hotel-upper-a', label: 'UPPER A', tag: 'Chest + Shoulders', color: '#E8192C',
    gym: [
      { n: 'DB Bench Press', s: '4×10', note: 'Heaviest DBs. 3-sec eccentric. Chest leads.' },
      { n: 'DB Incline Press', s: '3×10', note: 'Upper chest. Pillow under back if no incline.' },
      { n: 'DB Shoulder Press', s: '4×10', note: 'Seated or standing. Full lockout.' },
      { n: 'DB Lateral Raise', s: '4×15', note: '3-sec down. No swinging.' },
      { n: 'DB Tricep Overhead Extension', s: '3×15', note: 'Both hands. Full stretch at bottom.' },
      { n: 'Treadmill HIIT', s: '10 rounds', note: '30s sprint / 30s walk. Fat burning on tour.' },
    ],
    bw: [
      { n: 'Push-Up Pyramid', s: '5 rounds', note: '10→8→6→8→10. 3-sec eccentric each rep.' },
      { n: 'Wide Push-Up', s: '4×15', note: 'Hands wider. Chest stretch at bottom.' },
      { n: 'Pike Push-Up', s: '4×12', note: 'Hips high. Shoulder press alternative.' },
      { n: 'Tricep Dip (chair)', s: '4×15', note: 'Full extension at top.' },
      { n: 'Decline Push-Up', s: '3×12', note: 'Feet on bed. Upper chest and front delts.' },
      { n: 'Sprint / Stairs', s: '8 rounds', note: '30s all-out / 30s walk. Outside or stairs.' },
    ]
  },
  {
    id: 'hotel-lower-a', label: 'LOWER A', tag: 'Power + Vertical', color: '#D4A017',
    gym: [
      { n: '⚡ Jump Protocol', s: '10 min', note: 'Mandatory first. Every day regardless.' },
      { n: 'DB Goblet Squat', s: '4×12', note: 'Heaviest DB. Elbows inside knees.' },
      { n: 'DB Bulgarian Split Squat', s: '4×12/leg', note: 'Rear foot elevated. Deep.' },
      { n: 'DB Romanian DL', s: '4×12', note: 'Hip hinge. Feel the hamstrings.' },
      { n: 'Jump Squat', s: '4×10', note: 'Max height. Dunk training.' },
      { n: 'Single-Leg Calf Raise', s: '4×20/leg', note: 'Off step. Pause at top.' },
    ],
    bw: [
      { n: '⚡ Jump Protocol', s: '10 min', note: 'First. Always.' },
      { n: 'Jump Squat', s: '5×10', note: 'Max height. Land soft. Dunk training.' },
      { n: 'Bulgarian Split Squat BW', s: '4×15/leg', note: 'Rear foot on bed. Go deep.' },
      { n: 'Broad Jump', s: '4×8', note: 'Max distance. Full reset.' },
      { n: 'Nordic Hamstring Curl', s: '3×6', note: 'Feet under bed. Lower as slow as possible.' },
      { n: 'Single-Leg Calf Raise', s: '4×20/leg', note: 'Off any step. Pause at top.' },
    ]
  },
  {
    id: 'hotel-upper-b', label: 'UPPER B', tag: 'Back + Biceps', color: '#1E90FF',
    gym: [
      { n: 'DB Row (single arm)', s: '4×12/side', note: 'Heavy. Pull elbow to hip.' },
      { n: 'DB Incline Row', s: '3×12', note: 'Chest on incline bench. Pull to hips. Lat isolation.' },
      { n: 'DB Rear Delt Fly', s: '4×20', note: 'Bent over. Light. Full range.' },
      { n: 'DB Bicep Curl superset Hammer Curl', s: '3×12 each', note: 'Peak + thickness.' },
      { n: 'Inverted Row (table)', s: '4×Max', note: 'Under sturdy table. Pull chest to edge.' },
      { n: 'Treadmill Run', s: '20 min', note: 'Easy pace. 10K base building.' },
    ],
    bw: [
      { n: 'Inverted Row (table)', s: '4×Max', note: 'Under table. Pull chest to edge. Best back move with no equipment.' },
      { n: 'Towel Row (door)', s: '4×12', note: 'Towel around handle. Sit back and row. Anti-rotation core bonus.' },
      { n: 'Rear Delt Fly BW', s: '3×20', note: 'Bend over. Extend arms out to sides. Light and controlled.' },
      { n: 'Chin-Up (bar if available)', s: '4×Max', note: 'Any bar. Full hang. Chest to bar.' },
      { n: 'Bicep Curl with luggage', s: '3×15/side', note: 'Packed gear bag. Curl it. Works.' },
      { n: 'Outdoor Run', s: '20 min', note: 'Easy. 10K base.' },
    ]
  },
  {
    id: 'hotel-core', label: 'CORE', tag: 'Every Day If Possible', color: '#9B5DE5',
    gym: [
      { n: 'Ab Wheel Rollout', s: '4×10', note: 'Slow out. Controlled back.' },
      { n: 'Hanging Leg Raise', s: '4×15', note: 'Dead hang. No swing.' },
      { n: 'Pallof Press (cable)', s: '3×12/side', note: 'Anti-rotation. Best core move.' },
      { n: 'Hollow Body Hold', s: '4×30s', note: 'Lower back flat. Non-negotiable.' },
      { n: 'Cable Woodchop', s: '3×12/side', note: 'Rotational power.' },
      { n: 'Suitcase Carry', s: '3×30m/side', note: 'Heavy DB. Deep core.' },
    ],
    bw: [
      { n: 'Hollow Body Hold', s: '4×30s', note: 'Build to 45s. Lower back FLAT.' },
      { n: 'Dead Bug', s: '4×10/side', note: 'Back pinned. Slow.' },
      { n: 'Plank Shoulder Tap', s: '4×20 taps', note: 'High plank. Resist rotating.' },
      { n: 'Bicycle Crunch', s: '4×20/side', note: 'SLOW. Feel the oblique.' },
      { n: 'V-Up', s: '3×15', note: 'Full range.' },
      { n: 'Towel Pallof Press', s: '3×12/side', note: 'Towel on door handle. Anti-rotation.' },
    ]
  },
  {
    id: 'hotel-lower-b', label: 'LOWER B', tag: 'Athletic + Power', color: '#00C853',
    gym: [
      { n: '⚡ Jump Protocol', s: '10 min', note: 'First. Always.' },
      { n: 'DB Sumo Squat', s: '4×15', note: 'Wide. Glute and inner thigh.' },
      { n: 'DB Single-Leg RDL', s: '4×10/leg', note: 'Balance + hamstring.' },
      { n: 'DB Hip Thrust', s: '4×15', note: 'DB on hips. Drive through heels.' },
      { n: 'Lateral Bound', s: '4×8/side', note: 'Land and hold. Hip power.' },
      { n: 'Sprint', s: '10 rounds', note: '20s all-out / 40s walk.' },
    ],
    bw: [
      { n: '⚡ Jump Protocol', s: '10 min', note: 'First. Always.' },
      { n: 'Lateral Bound', s: '4×10/side', note: 'Land and hold. Hip stability.' },
      { n: 'Single-Leg RDL BW', s: '4×12/leg', note: 'Balance. Hamstring.' },
      { n: 'Glute Bridge Single Leg', s: '4×15/leg', note: 'Drive heel down. Squeeze.' },
      { n: 'Sumo Squat Jump', s: '4×12', note: 'Wide. Explode. Land soft.' },
      { n: 'Sprint', s: '10 rounds', note: '20s / 40s. Car park works.' },
    ]
  },
]

// ─── JUMP PROTOCOL ───────────────────────────────────────────
export const JUMP_PROTOCOL = [
  { step: '1', name: 'Hip Flexor Stretch', duration: '90s each side', cue: 'Kneeling lunge. Anterior pelvic tilt from tight hip flexors kills 3-4 inches of vertical. This is the most important stretch.' },
  { step: '2', name: 'Ankle Dorsiflexion', duration: '60s each side', cue: 'Knee forward over toe against wall. More ankle range = deeper crouch = more power off the floor. Non-negotiable.' },
  { step: '3', name: 'Deep Squat Hold', duration: '60s', cue: 'Feet flat. Elbows on knees. Opens hips and grooves the jump crouch pattern. Breathe.' },
  { step: '4', name: 'Approach Jumps', duration: '10 reps', cue: '2-step approach. The penultimate step is your brake — it converts horizontal speed into vertical force. Drive the knee explosively at take-off.' },
  { step: '5', name: 'Max Vertical Attempts', duration: '5 reps', cue: 'YOU ARE 4–6 INCHES FROM A TWO-HAND DUNK. You already grab the rim comfortably. Full effort every rep. Touch the rim, then aim to get your wrists over it. This is close — likely this summer as you lean out, not September.' },
]

// ─── NUTRITION BY PHASE ───────────────────────────────────────
export const NUTRITION_PHASES = [
  { phase: 'CUT — Jun to Sep 2026', cal: 2150, p: 200, c: 195, f: 58, note: 'Deficit of ~500 kcal/day. Lose 1–1.25 lb/week. Protein is the priority — it preserves every lb of lean mass. Never go below 180 lb.' },
  { phase: 'LEAN BULK — Oct 2026 to Mar 2027', cal: 2900, p: 215, c: 325, f: 80, note: 'Surplus of ~300 kcal. Gain 1 lb/week. Mostly muscle at your new body fat level. Game days: +200 kcal carbs 2 hrs before tip-off.' },
  { phase: 'FINAL CUT — Apr to Jul 2027', cal: 2200, p: 210, c: 210, f: 62, note: 'Deficit of ~400 kcal. Slow and controlled. Protect the muscle built in winter. 10K race week: carb load 3 days out.' },
  { phase: 'TOUR MODE', cal: 2150, p: 200, c: 195, f: 58, note: 'Same as cut. Protein shakes are non-negotiable on the road. Show days: +100 kcal carbs before performing.' },
]

// ─── SUPPLEMENTS ──────────────────────────────────────────────
export const SUPPLEMENTS = [
  { name: 'Creatine Monohydrate', dose: '5g daily', when: 'Any time. Consistency matters more than timing. Take it every day including rest days.' },
  { name: 'Whey Protein', dose: '2 scoops/day', when: 'Within 45 min post-workout. Second scoop pre-sleep if protein target not hit.' },
  { name: 'Vitamin D3 + K2', dose: '4,000 IU D3 / 100mcg K2', when: 'Morning with food. Critical for testosterone production and immune function.' },
  { name: 'Magnesium Glycinate', dose: '400mg', when: 'Before bed. Improves sleep quality and recovery. Most people are deficient.' },
  { name: 'Omega-3 Fish Oil', dose: '3g EPA/DHA combined', when: 'With meals. Reduces muscle soreness and systemic inflammation.' },
  { name: 'Caffeine', dose: '200mg', when: 'Pre-workout only. Not after 2pm — it will wreck your sleep and sleep is when you grow.' },
]
