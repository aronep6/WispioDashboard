import React from "react";
import { Link } from "react-router-dom";

const PrimaryTitle = ({ children, add = "" }: { children: React.ReactNode | string, add?: string }) => {
    return <h1 className={`grotesk dark:text-white tracking-tighter py-2.5 px-0.5 leading-6 font-bold text-xl md:text-2xl ${add}`}> {/*text-slate-900*/}
        {children}
    </h1>
};

const SecondaryTitle = ({ children, add = "" }: { children: React.ReactNode | string, add?: string }) => {
    return <h2 className={`grotesk dark:text-white flex flex-row items-center tracking-tighter py-2.5 px-0.5 leading-6 font-medium text-lg md:text-xl ${add}`}> {/*text-slate-600*/}
        {children}
    </h2>
};

const TertiaryTitle = ({ children, add = "" }: { children: React.ReactNode | string, add?: string }) => {
    return <h3 className={`grotesk dark:text-white tracking-tighter py-1.5 px-0.5 leading-5 font-semibold text-base md:text-lg ${add}`}> {/* text-slate-600 */}
        {children}
    </h3>
};

const FloatingTitle = ({ title, add = "" }: { title: string, add?: string }) => {
    return <div className={`floating-title absolute grotesk hidden bg-zinc-800 text-zinc-100 py-1.5 text-sm px-3 rounded-md group-hover:flex ${add}`}>
        <p className="whitespace-nowrap">{title}</p>
    </div>
}; 

const UserAt = ({ add, userId }: { add: string, userId: string }) => {
    return <Link to={`/app/profile/${userId}`} 
        className={`text-blue-600 dark:text-blue-400 text-sm inter font-bold px-0.5 ${add}`}>
        @{ userId }
    </Link>
};

const BigTitle = ({ children, add = "" }: { children: React.ReactNode | string, add?: string }) => {
    return <h1 className={`dark:text-white tracking-tighter py-2.5 px-0.5 leading-6 font-bold text-3xl md:text-4xl ${add}`}> {/*text-slate-900*/}
        {children}
    </h1>
};

const Hint = ({ children, add = "" }: { children: React.ReactNode | string, add?: string }) => {
    return <span className={`text-xs text-gray-600 dark:text-gray-400 leading-snug mx-0.5 ${ add }`}>{ children }</span>;
};

export { PrimaryTitle, SecondaryTitle, TertiaryTitle, FloatingTitle, UserAt, BigTitle, Hint };