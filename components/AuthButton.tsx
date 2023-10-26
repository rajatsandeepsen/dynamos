import { supabase } from '@/utils/supabase/client'
import Link from 'next/link'
import useSWR from 'swr'

export default function AuthButton() {
  const {data, error} = useSWR('user', () => supabase.auth.getUser())

  function handleLogout() {
    supabase.auth.signOut()
  }
  

  return data?.data.user ? (
    <div className="flex items-center gap-4">
      Hey, {data.data.user.email}!
        <button onClick={handleLogout} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}
