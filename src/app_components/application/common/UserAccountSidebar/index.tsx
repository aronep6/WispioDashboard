import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../../app_common/interfaces/AppRoutes';
import useUserSession from '../../../../app_hooks/contexts_hooks/useUserSession';

const UserAccountSidebar = () => {
  const user = useUserSession();

  return <div className="flex-shrink-0 flex bg-slate-700 p-4 inter">
    <Link to={AppRoutes.AccountSettings} className="flex-shrink-0 w-full group block">
      <div className="flex items-center">
        <div className="ml-1">
          <p className="text-xs font-medium text-slate-300 group-hover:text-slate-200">Connecté en tant que 🔒</p>
          <p className="text-xs font-medium text-white">
            {
              user?.displayName ? user.displayName : user?.email
            }
          </p>
        </div>
      </div>
    </Link>
  </div>
}

export default UserAccountSidebar;