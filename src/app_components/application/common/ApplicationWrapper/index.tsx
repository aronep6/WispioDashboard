import { Fragment, useMemo, useState } from 'react';
import type { NavigationLink } from './interfaces';

// Icons & UI
import { Dialog, Transition } from '@headlessui/react'
import { NavLink, Outlet } from 'react-router-dom';
import { Grid, Box, List, Folder, X, Menu, Bell, Settings } from 'react-feather';

// Notifications
import { NotificationsServiceProvider } from '../../../../app_contexts/NotificationsService';
import { NotificationsProvider } from '../../../../app_contexts/Notifications';
import useNotifications from '../../../../app_hooks/contexts_hooks/useNotifications';

import UserAccountSidebar from '../UserAccountSidebar';
// import _logo_ from '../../../../assets/wispio_logo.webp';
import _logo_ from '../../../../assets/wispio_logo_white_invisible_bkg.png';

const ApplicationWrapper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { unReadedNotificationsCount } = useNotifications();

  const navigation: NavigationLink[] = useMemo(() => [
    { name: 'Tableau de bord', link: '/', icon: Grid, badgeCount: null },
    { name: 'Éditeur', link: '/editor', icon: Box, badgeCount: null },
    { name: 'Tâches', link: '/tasks', icon: List, badgeCount: null },
    { name: 'Fichiers', link: '/files', icon: Folder, badgeCount: null },
    { name: 'Notifications', link: '/notifications', icon: Bell, badgeCount: unReadedNotificationsCount === 0 ? null : unReadedNotificationsCount },
    { name: 'Mes paramètres', link: '/account-settings', icon: Settings, badgeCount: null },
  ]
  , [unReadedNotificationsCount]);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-slate-100">
        <body class="h-full">
        ```
      */}
      <div className="inter">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-slate-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Fermer la barre latérale</span>
                      <X className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto inter">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src={_logo_}
                      alt="Wispio AI"
                    />
                  </div>
                  <nav className="mt-5 px-2 space-y-1 relative">
                    {navigation.map((item, index) => (
                      <NavLink
                        to={item.link}
                        key={index}
                        className={
                          ({ isActive }) => isActive ?
                            "bg-slate-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            :
                            "text-slate-300 hover:bg-slate-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        }
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6"
                          aria-hidden="true"
                          strokeWidth={1.5}
                        />
                        {item.name}
                        {item.badgeCount && <div className='bg-indigo-700 text-white font-bold flex items-center h-7 w-7 text-xs rounded-full absolute right-2 justify-center'>
                          {item.badgeCount}
                        </div>}
                      </NavLink>
                    ))}
                  </nav>
                </div>

                <UserAccountSidebar />

              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 inter">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 gap-4 text-white tracking-tighter font-bold">
                <img
                  className="h-8 w-auto rounded"
                  src={_logo_}
                  alt="Wispio AI"
                />
                Wispio Dashboard
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item, index) => (
                  <NavLink
                    to={item.link}
                    key={index}
                    className={
                      ({ isActive }) => isActive ?
                        "bg-slate-900 relative text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        :
                        "text-slate-300 relative hover:bg-slate-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    }
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    {item.name}
                    {item.badgeCount && <div className='bg-indigo-700 text-white font-bold flex items-center h-7 w-7 text-xs rounded-full absolute right-2 justify-center'>
                      {item.badgeCount}
                    </div>}
                  </NavLink>
                ))}
              </nav>
            </div>

            <UserAccountSidebar />

          </div>
        </div>
        <div className="md:pl-60 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-slate-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Ouvrir la barre latérale</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <main className="flex-1">
            <Outlet />
          </main>

        </div>
      </div>
    </>
  )
};

export default function index() {
  return <NotificationsServiceProvider>
    <NotificationsProvider>
      <ApplicationWrapper />
    </NotificationsProvider>
  </NotificationsServiceProvider>
};