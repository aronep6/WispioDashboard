import { type FC } from 'react';
import { Package, User } from 'react-feather';
import { Link } from 'react-router-dom';
// import { ChevronUp } from 'react-feather';

interface PopoverContentProps {

}

const options = [
    {
        name: 'Mon compte',
        description: 'Accéder aux paramètres',
        href: '#',
        icon: User,
    },
    {
        name: 'Licences',
        description: 'Consulter les licences',
        href: '#',
        icon: Package,
    },
];

const PopoverContent: FC<PopoverContentProps> = ({ }) => {
    return <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
            {options.map((option, index) => (
                <Link
                    key={index}
                    to={option.href}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                        <option.icon aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                            {option.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            {option.description}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
};

export default PopoverContent;