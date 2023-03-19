import { NavLink } from 'react-router-dom';
import { accountSettingsLinks } from '../../common/account-settings-links';

const AccountSettingsNavigation = () => {
    return <div className="flex flex-col max-w-sm w-72 h-full bg-white border-r border-gray-200 shrink-0">
        <div className="flex flex-col w-full h-full border-t">
            {
                accountSettingsLinks.map((link, index) => {
                    return <NavLink
                        to={link.link}
                        key={index}
                        className={
                            ({ isActive }) => isActive ?
                                "flex gap-3 flex-row items-center w-full py-4 px-6 border-b bg-slate-200 text-gray-700 hover:bg-slate-300 hover:text-gray-900"
                                :
                                "flex gap-3 flex-row items-center w-full py-4 px-6 border-b text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }
                    >
                        <link.icon className="w-5 h-5" />
                        <div className='flex flex-col'>
                            <span className="text-sm font-medium">{link.name}</span>
                            { !link.isAvailable && <span className="text-xs text-gray-500">Indisponible pour le moment</span> }
                        </div>
                    </NavLink>
                })
            }
        </div>
    </div>
};

export default AccountSettingsNavigation;