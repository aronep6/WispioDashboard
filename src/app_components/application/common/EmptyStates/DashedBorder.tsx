interface Props {
    icon: React.ReactNode;
    title: string;
}

export default function DashedBorder({
    icon,
    title,
}: Props) {
    return (
        <button
            onClick={() => { }}
            type="button"
            className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-indigo-600 hover:text-indigo-600 group focus:outline-none duration-150 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            <div className="max-w-max mx-auto group-hover:text-indigo-600">
                { icon }
            </div> 
            <span className="mt-2 block text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                { title }
            </span>
        </button>
    )
};