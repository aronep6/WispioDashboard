interface ParagraphProps {
    children: JSX.Element | JSX.Element[] | string;
    add?: string;
    small?: boolean;
}

const Paragraph = ({ children, add, small }: ParagraphProps) => {
    return <p className={`inter font-normal leading-4 max-w-max ${ small ? "text-xs" : "text-sm"} md:text-base ${add}`}>
        {children}
    </p>
}

const ParagraphMedium = ({ children, add }: ParagraphProps) => {
    return <p className={`inter font-medium px-2.5 py-2 leading-6 max-w-max text-sm md:text-base ${add}`}>
        {children}
    </p>
}

export { Paragraph, ParagraphMedium };