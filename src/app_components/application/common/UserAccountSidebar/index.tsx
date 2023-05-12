import { Fragment, type FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../../app_common/interfaces/AppRoutes';
import useUserSession from '../../../../app_hooks/contexts_hooks/useUserSession';
import PopoverButton from './components/PopoverButton';
import { Popover, Transition } from '@headlessui/react';
import PopoverContent from './components/PopoverContent';

// <Link to={AppRoutes.AccountSettings} className="flex-shrink-0 w-full group block">

const UserAccountSidebar: FC = () => {
  const user = useUserSession();

  return <Popover className="relative">
      {
        ({ open }) => (
          <Fragment>
            <Popover.Button className={`flex w-full focus:ring-0 focus:outline-none duration-150 ${open ? 'bg-gray-900' : 'bg-slate-900'}`}>
              <PopoverButton isOpened={open} photoURL={user?.photoURL} displayName={user?.displayName} />
            </Popover.Button>
            <Popover.Panel>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute bottom-10 left-1/2 z-20 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                  <PopoverContent />
                </Popover.Panel>
              </Transition>
            </Popover.Panel>
          </Fragment>
        )
      }
    </Popover>

}

export default UserAccountSidebar;