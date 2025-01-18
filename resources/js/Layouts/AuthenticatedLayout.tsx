import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { Link, usePage } from '@inertiajs/react'
import { PropsWithChildren, ReactNode, useState } from 'react'

export default function Authenticated({
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false)

  function isActive(href: string): boolean {
    const url = usePage().url

    return (
      url === href || url.startsWith(`${href}/`) || url.startsWith(`${href}?`)
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <nav className="w-full border-b border-b-zinc-800 bg-background-secondary">
        <div className="px-4 py-1 mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-16">
              <div className="flex items-center shrink-0">
                <Link href="/">
                  <ApplicationLogo />
                </Link>
              </div>

              <div className="items-center hidden gap-4 md:flex">
                <NavLink href="/">Campaings</NavLink>
                <NavLink href="/lists">Lists</NavLink>
                <NavLink href="/templates">Templates</NavLink>
              </div>
            </div>

            <div className="hidden md:ms-6 md:flex md:items-center">
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 font-medium leading-4 transition duration-150 ease-in-out bg-transparent border border-transparent rounded-md text-large focus:outline-none text-content hover:text-gray-300"
                    >
                      {user.name}
                      <svg
                        className="-me-0.5 ms-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                  <Dropdown.Link href={route('profile.edit')}>
                    Profile
                  </Dropdown.Link>
                  <Dropdown.Link
                    href={route('logout')}
                    method="post"
                    as="button"
                  >
                    Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>

            <div className="flex items-center -me-2 md:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown((prevState) => !prevState)
                }
                className="inline-flex items-center justify-center p-2 text-gray-500 transition duration-150 ease-in-out rounded-md focus:outline-none hover:bg-transparent hover:text-gray-400 focus:text-gray-400"
              >
                <svg
                  className="w-6 h-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${
            showingNavigationDropdown ? 'block' : 'hidden'
          } md:hidden bg-background-secondary border-t border-gray-600`}
        >
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href="/">
              Campaings
            </ResponsiveNavLink>
            <ResponsiveNavLink href="/lists">
              Lists
            </ResponsiveNavLink>
            <ResponsiveNavLink
              href="/templates"
            >
              Templates
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-600">
            <div className="px-4">
              <div className="text-base font-medium text-gray-200">
                {user.name}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {user.email}
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route('profile.edit')}>
                Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                href={route('logout')}
                method="post"
                as="button"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex items-start justify-center flex-grow">
        {children}
      </main>
    </div>
  )
}
