const Paragraph = ({children, add, small}) => {
    return <p className={`inter font-normal leading-4 max-w-max ${ small ? "text-xs" : "text-sm"} md:text-base ${add}`}> {/* text-slate-600*/}
        {children}
    </p>
}

const ParagraphMedium = ({children, add}) => {
    return <p className={`inter font-medium px-2.5 py-2 leading-6 max-w-max text-sm md:text-base ${add}`}>
        {children}
    </p>
}

export { Paragraph, ParagraphMedium };