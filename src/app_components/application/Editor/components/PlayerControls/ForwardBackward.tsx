import { SkipBack, SkipForward } from "react-feather";

enum PlayerStateTitles {
    ForwardTenSeconds = "Avancer de 10 secondes",
    BackwardTenSeconds = "Reculer de 10 secondes",
}

const iconProps = {
    size: 19,
    fill: "currentColor",
};

const ForwardBackwardWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return <button className="
        hover:bg-indigo-100
        flex items-center justify-center w-9 h-9 rounded-full duration-150 text-indigo-600"
        title={title}
    >
        {
            children
        }
    </button>
};

const Forward = () => {
    return <ForwardBackwardWrapper title={PlayerStateTitles.ForwardTenSeconds}>
        <SkipForward { ...iconProps } />
    </ForwardBackwardWrapper>
}

const Backward = () => {
    return <ForwardBackwardWrapper title={PlayerStateTitles.BackwardTenSeconds}>
        <SkipBack { ...iconProps } />
    </ForwardBackwardWrapper>
};

export { Forward, Backward };