// import React from "react";
import { HelpCircle, Loader } from "react-feather";
import { Paragraph } from "./Paragraph";
import { SecondaryTitle } from "./Title";

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

const InformativeCard = ({ 
    title, 
    description,
}: {
    title: string;
    description: string;
}) => {
    return <CardFilled background="bg-indigo-50 border border-indigo-500 text-indigo-700">
        <div className="flex flex-row gap-3">
            <HelpCircle className="h-6 w-6 text-scooter-500 my-0.5 shrink-0"></HelpCircle>

            <div className="flex flex-col items-start text-left gap-1">
                <SecondaryTitle add="text-indigo-800">
                    {title}
                </SecondaryTitle>
                <Paragraph>
                    { description }
                </Paragraph>
            </div>
        </div>
    </CardFilled>
}

export { Card, CardFilled, InformativeCard };