import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xdoimdmulvfzapkdsebq.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Flag the app can check — true only when a real key is present
export const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

// Never let a missing key crash the whole app. If the key is absent,
// export a safe stub whose calls resolve to empty results instead of throwing.
function makeStub() {
  const result = Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
  const chain = {
    select: () => chain,
    insert: () => result,
    upsert: () => result,
    update: () => chain,
    delete: () => chain,
    eq: () => chain,
    order: () => chain,
    limit: () => result,
    single: () => result,
    then: (resolve) => result.then(resolve),
  }
  return { from: () => chain }
}

export const supabase = supabaseReady
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : makeStub()
