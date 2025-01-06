import ApplicationLogo from '@/Components/ApplicationLogo'
import { RedirectContainer } from '@/Components/RedirectContainer'
import { Link } from '@inertiajs/react'
import { ReactNode } from 'react'

interface GuestProps {
  children: ReactNode
  showRedirectContainer?: boolean
}

export default function Guest({ children, showRedirectContainer = false }: GuestProps) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0 dark:bg-background-primary">
      <div>
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
        </Link>
      </div>

      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg dark:bg-background-secondary">
        {children}
      </div>
      
      {showRedirectContainer && (
        <RedirectContainer
          redirectLink="/register"
          text="Sign up here"
          title="Don't have an account?"
          buttonContent="Access Acount"
        />
      )}
    </div>
  )
}
