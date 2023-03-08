import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../../app_common/interfaces/AppRoutes';
import useUserSession from '../../../../app_hooks/contexts_hooks/useUserSession';

const UserAccountSidebar = () => {
  const user = useUserSession();

  return <div className="flex-shrink-0 flex bg-slate-700 p-4 inter">
    <Link to={AppRoutes.AccountSettings} className="flex-shrink-0 w-full group block">
      <div className="flex items-center">
        <div>
          <img
            className="inline-block h-6 w-6 rounded-full bg-slate-900"
            src={user?.photoURL ? user.photoURL : undefined}
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-xs font-medium text-white">
            {
              user?.displayName ? user.displayName : user?.email
            }
          </p>
          <p className="text-xs font-medium text-slate-300 group-hover:text-slate-200">Accéder à mon profil</p>
        </div>
      </div>
    </Link>
  </div>
}

export default UserAccountSidebar;