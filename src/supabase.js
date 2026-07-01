import { createClient } from '@supabase/supabase-js'

// Correct Supabase project (cfaizrsxwrqijhuuvdxe) with the fitness_ tables.
// URL + anon key are baked in as defaults so the app works with zero config.
// (The anon key is public-safe by design — Row Level Security protects the data.)
// Environment variables still override these if ever set.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://cfaizrsxwrqijhuuvdxe.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmYWl6cnN4d3JxaWpodXV2ZHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3ODMwMjQsImV4cCI6MjA5ODM1OTAyNH0.BKNMFZJNKd37xcjHTBssxKILURzA8DgP7qEw9tJV71c'

export const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

// Safety net: if anything is ever missing, the app still loads instead of crashing.
function makeStub() {
  const result = Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
  const chain = {
    select: () => chain, insert: () => result, upsert: () => result,
    update: () => chain, delete: () => chain, eq: () => chain,
    order: () => chain, limit: () => result, single: () => result,
    then: (resolve) => result.then(resolve),
  }
  return { from: () => chain }
}

export const supabase = supabaseReady
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : makeStub()
