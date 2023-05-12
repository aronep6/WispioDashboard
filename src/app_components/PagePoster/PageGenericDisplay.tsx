import type { Icon, IconProps } from "react-feather";
import classNames from "../application/common/functions/joinClassNames";

interface DefaultIconProps extends IconProps {
    strokeWidth: number;
    tailwindColor: string;
}

const defaultIconProps: DefaultIconProps = {
    size: 60,
    strokeWidth: 0.8,
    color: "currentColor",
    tailwindColor: "text-slate-600",
};

function PageGenericPoster({ 
    icon,
    title,
    message
}: { 
    icon: {
        type: Icon,
        props?: Partial<DefaultIconProps>
    }
    title: string, 
    message? : string | JSX.Element
}) {
    return (
        <div className="z-30 bg-slate-100 inter
            absolute inset-0 flex items-center justify-center min-w-screen">
            <div className="flex flex-col items-center justify-center w-full pb-10 gap-4">
                <div className={
                    classNames(
                        icon.props?.tailwindColor ? icon.props?.tailwindColor : defaultIconProps.tailwindColor,
                        ""
                    )
                }>
                    <icon.type { ...defaultIconProps } { ...icon.props } />
                </div>
                <h1 className="text-xl font-bold text-slate-900 select-none">
                    { title }
                </h1>
                <p className="text-slate-600 text-center max-w-lg">
                    {
                        message
                    }
                </p>
            </div>
        </div>
    );
}

export default PageGenericPoster;