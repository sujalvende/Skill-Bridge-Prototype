import { supabase } from './supabase'

export async function isCurrentUserAdmin(): Promise<boolean> {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return false

  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  return !error && Boolean(data)
}
