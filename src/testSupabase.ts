import { supabase } from './lib/supabaseClient'

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('products').select('*')
    if (error) {
      console.error('Supabase error:', error)
      return
    }
    console.log('✅ Supabase connected successfully!')
    console.log('Products data:', data)
  } catch (err) {
    console.error('Connection failed:', err)
  }
}
