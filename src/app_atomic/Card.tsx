// import React from "react";
import { HelpCircle, Loader } from "react-feather";
import { Paragraph } from "./Paragraph";
import { SecondaryTitle, TertiaryTitle } from "./Title";

interface CardProps {
    children: JSX.Element | JSX.Element[];
    border?: boolean;
    add?: string;
    isLoading?: boolean;
    background?: string;
    modal?: boolean;
    useShadow?: boolean;
}

const Card = ({ 
    border, 
    children, 
    add, 
    isLoading,
    modal,
}: CardProps) => {
    return <div className={`relative overflow-hidden rounded-md bg-white shadow-sm p-3 md:p-4 ${!modal && "shadow-md shadow-slate-200 border"} ${ border && "border" } border-solid ${add}`}>
        { isLoading && <div 
            title='Chargement des données...'
            className="absolute z-20 bg-white cursor-wait duration-150 opacity-75 over-all h-full w-full inset-0 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin border-b-2 border-indigo-600 rounded-full">
            </div>
        </div> }
        {children}
    </div>
}

const CardFilled = ({ 
    children, 
    add, 
    background,
    useShadow = true,
}: CardProps) => {
    return <div className={`rounded-md ${ useShadow && "shadow-md" } p-3 md:p-4 ${add} ${background}`}>
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
    return <CardFilled 
        useShadow={false}
        background="bg-indigo-50 border border-indigo-400 text-indigo-700 h-full">
        <div className="flex flex-row gap-3">
            <HelpCircle className="h-6 w-6 text-scooter-500 my-0.5 shrink-0"></HelpCircle>

            <div className="flex flex-col items-start text-indigo-700 text-left gap-1">
                <h4 className="font-bold">
                    {title}
                </h4>
                <p className="text-sm">
                    {description}
                </p>
            </div>
        </div>
    </CardFilled>
}

export { Card, CardFilled, InformativeCard };