-- Run this in your Supabase SQL editor
-- Project: burn-industry-fitness

-- Body stats tracking
create table if not exists fitness_stats (
  id uuid default gen_random_uuid() primary key,
  recorded_at timestamptz default now(),
  weight_lb numeric(5,1),
  body_fat_pct numeric(4,1),
  notes text
);

-- Workout log
create table if not exists fitness_workouts (
  id uuid default gen_random_uuid() primary key,
  logged_at timestamptz default now(),
  workout_id text not null,
  workout_name text not null,
  phase_id text not null,
  gym_mode text default 'full',
  completed_sets jsonb default '{}',
  duration_min integer
);

-- Daily protocol tracking
create table if not exists fitness_daily_log (
  id uuid default gen_random_uuid() primary key,
  log_date date default current_date unique,
  jump_done boolean default false,
  workout_done boolean default false,
  current_phase text default 'home-june'
);

-- Vertical jump tracking
create table if not exists fitness_jump_log (
  id uuid default gen_random_uuid() primary key,
  logged_at timestamptz default now(),
  max_reach_inches numeric(4,1),
  notes text
);

-- Enable RLS but allow all for now (add auth later)
alter table fitness_stats enable row level security;
alter table fitness_workouts enable row level security;
alter table fitness_daily_log enable row level security;
alter table fitness_jump_log enable row level security;

create policy "Allow all" on fitness_stats for all using (true) with check (true);
create policy "Allow all" on fitness_workouts for all using (true) with check (true);
create policy "Allow all" on fitness_daily_log for all using (true) with check (true);
create policy "Allow all" on fitness_jump_log for all using (true) with check (true);
