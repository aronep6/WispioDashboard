// import React from "react";
import { Loader } from "react-feather";

interface CardProps {
    children: JSX.Element | JSX.Element[];
    border?: boolean;
    add?: string;
    isLoading?: boolean;
    background?: string;
    modal?: boolean;
}

const Card = ({ 
    border, 
    children, 
    add, 
    isLoading,
    modal,
}: CardProps) => {
    return <div className={`relative overflow-hidden rounded-md bg-white shadow-sm p-3 md:p-4 ${!modal && "shadow-md shadow-slate-200 border"} ${ border && "border" } border-solid ${add}`}>
        { isLoading && <div className="absolute cursor-wait duration-150 opacity-75 over-all h-full w-full inset-0 flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin"/>
        </div> }
        {children}
    </div>
}

const CardFilled = ({ 
    children, 
    add, 
    background
}: CardProps) => {
    return <div className={`rounded-md shadow-md p-3 md:p-4 ${add} ${background}`}>
        {children}
    </div>
}

export { Card, CardFilled };