import { Fragment } from "react";
import type { ErrorFieldProps } from "../../../../app_atomic/interfaces/common_interfaces";

interface DashedBorderProps extends ErrorFieldProps {
    icon: React.ReactNode;
    title: string;
    description?: string | null;
}

export default function DashedBorder({
    icon,
    title,
    error = false,
    description = null,
    errorMessage = "",
}: DashedBorderProps) {
    return <Fragment>
        <button
            type="button"
            className={`relative block w-full border-2 ${ !error ? "border-gray-300 hover:border-indigo-600 hover:text-indigo-600 focus:ring-indigo-500" : "border-red-300 hover:border-red-600 hover:text-red-600 " } border-dashed rounded-lg p-12 text-center group focus:outline-none duration-150 focus:ring-2 focus:ring-offset-2`}
        >
            <div className="max-w-max mx-auto group-hover:text-indigo-600">
                { icon }
            </div> 
            <span className="mt-2 block text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                { title }
            </span>
            {
                description && <p className="mt-1 text-xs text-gray-500 group-hover:text-indigo-600">
                    { description }
                </p>
            }
        </button>
        {
            error && <span className="text-red-500 text-xs font-medium mt-0.5">{ errorMessage }</span>
        }
    </Fragment>
};