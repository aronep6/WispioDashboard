import { Fragment, useCallback, useState } from "react";
import { ChevronDown, Loader } from "react-feather";
import UserPicture from "../components/UserPicture";

// Flatpick for DateSelector
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import { French } from "flatpickr/dist/l10n/fr.js";

const InputUserSelector = ({
    isLoading,
    isError,
    label,
    values = [],
    disabled = false,
    onChange = () => {},
    placeholder = "Sélectionnez un utilisateur",
}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedUser, setSelectedUser ] = useState(undefined);

    const handleToogle = () => {
        if (isLoading || isError || disabled) return;
        setIsOpen((prev) => !prev);
    };

    return <section className="flex flex-col py-1 my-2.5 max-w-md mx-auto">

        { label && <label className="text-slate-600 mb-1 text-base font-normal">{ label }</label> }

        <section className="relative">
            <div onClick={ handleToogle }
                className="
                h-11 relative
                bg-white
                border border-solid border-slate-300 box-border
                focus:border-blue-500
                rounded
                font-medium
                cursor-pointer
                text-base px-3"
            >
                { !isLoading ?
                    <div className="flex h-full flex-row items-center">
                        { !!selectedUser ? 
                            <Fragment>
                                <div className="h-8 w-8">
                                    <UserPicture displayName={selectedUser.displayName} photoURL={selectedUser.photoURL} />
                                </div>
                                <span className="ml-2.5 text-slate-700 text-base group-hover:text-white">{selectedUser.displayName}</span>
                            </Fragment>
                        : 
                            <Fragment>
                                <div className="h-5 w-5 text-slate-600">
                                    <ChevronDown className="h-full w-full" />
                                </div>
                                <span className="ml-3 text-slate-600 font-normal text-sm">{ placeholder }</span> 
                            </Fragment>
                        }
                    </div>
                    :
                    <div className="flex h-full flex-row items-center text-gray-400">
                        <div className="h-8 w-8">
                            <Loader className="h-full w-full animate-spin" />
                        </div>
                        <span className="ml-2.5 text-sm">Chargement...</span>
                    </div>
                }
            </div>

            <div style={{ display: isOpen ? "flex" : "none" }}
                className="border-x border-b border-gray-200 border-solid shadow-sm
                absolute inset-x-0 flex-col -mt-1 bg-white h-64 overflow-y-auto rounded-b z-20"
            >
                { 
                    values.map((user) => {
                        return <div key={user.uid}
                                className="flex flex-row px-3 items-center h-16 group hover:bg-indigo-600 cursor-pointer"
                                onClick={() => {
                                    setSelectedUser(user);
                                    setIsOpen(false);
                                    onChange(user);
                                }}
                            >
                            <div className="h-8 w-8">
                                <UserPicture displayName={user.displayName} photoURL={user.photoURL} />
                            </div>
                            <div className="flex flex-col ml-2.5">
                                <span className="text-sm font-bold group-hover:text-white">{user.displayName}</span>
                                <span className="text-xs group-hover:text-indigo-200">{user.email}</span>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>



    </section>
};

const InputServiceSelector = ({
    isLoading,
    isError,
    label,
    values = [],
    disabled = false,
    onChange = () => {},
    placeholder = "Aucun service ne peut être sélectionné",
}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedUser, setSelectedUser ] = useState(undefined);

    const handleToogle = () => {
        if (isLoading || isError || disabled) return;
        setIsOpen((prev) => !prev);
    };

    return <section className="flex flex-col py-1 my-2.5 max-w-md mx-auto">

        { label && <label className="text-slate-600 mb-1 text-base font-normal">{ label }</label> }

        <section className="relative">
            <div onClick={ handleToogle }
                className={`
                h-11 relative
                bg-white
                border border-solid border-slate-300 box-border
                focus:border-blue-500
                rounded 
                font-medium
                ${ disabled ? "cursor-not-allowed" : "cursor-pointer" }
                text-base px-3`}
            >
                { !isLoading ?
                    <div className="flex h-full flex-row items-center">
                        { !!selectedUser ? 
                            <Fragment>
                                <div className="h-8 w-8">
                                    <UserPicture displayName={selectedUser.displayName} photoURL={selectedUser.photoURL} />
                                </div>
                                <span className="ml-2.5 text-base group-hover:text-white">{selectedUser.displayName}</span>
                            </Fragment>
                        : 
                            <Fragment>
                                <div className="h-5 w-5 text-slate-600">
                                    <ChevronDown className="h-full w-full" />
                                </div>
                                <span className="ml-3 text-slate-600 font-normal text-sm">{ placeholder }</span> 
                            </Fragment>
                        }
                    </div>
                    :
                    <div className="flex h-full flex-row items-center text-gray-400">
                        <div className="h-8 w-8">
                            <Loader className="h-full w-full animate-spin" />
                        </div>
                        <span className="ml-2.5 text-sm">Chargement...</span>
                    </div>
                }
            </div>

            <div style={{ display: isOpen ? "flex" : "none" }}
                className="border-x border-b border-gray-200 border-solid shadow-sm
                absolute inset-x-0 flex-col -mt-1 bg-white h-64 overflow-y-auto rounded-b z-20"
            >
                { 
                    values.map((user) => {
                        return <div key={user.uid}
                                className="flex flex-row px-3 items-center h-16 group hover:bg-indigo-600 cursor-pointer"
                                onClick={() => {
                                    setSelectedUser(user);
                                    setIsOpen(false);
                                    onChange(user);
                                }}
                            >
                            <div className="h-8 w-8">
                                <UserPicture displayName={user.displayName} photoURL={user.photoURL} />
                            </div>
                            <div className="flex flex-col ml-2.5">
                                <span className="text-sm font-bold group-hover:text-white">{user.displayName}</span>
                                <span className="text-xs group-hover:text-indigo-200">{user.email}</span>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>



    </section>
};

const DateSelector = ({
    label,
    value,
    onChange = () => {},
    withTime = true,
    disabled = false,
}) => {
    return <section className="flex flex-col py-1 my-2 max-w-md mx-auto">

        { label && <label className="text-slate-600 mb-1 text-base font-normal">{ label }</label> }
        
        <section className="relative">
            <div
                className={`
                relative
                box-border
                focus:border-blue-500
                rounded
                font-medium
                ${ disabled ? "cursor-not-allowed" : "cursor-pointer" }
                text-base`}
            >
                <Flatpickr
                    style={{ backgroundColor: "transparent" }}
                    data-enable-time={withTime}
                    value={value}
                    onChange={([date]) => {
                        onChange(date);
                    }}
                    options={{
                        enableTime: withTime,
                        dateFormat: "Z",
                        altFormat: "Le d/m/Y à H:i",
                        altInput: true,
                        locale: French,
                        minDate: "today",
                        maxDate: new Date().fp_incr(4 * 30), // 4 mois max. environ
                        minTime: "08:00", // to build
                        maxTime: "17:00", // to build
                        minuteIncrement: 15,
                        defaultDate: value,
                        time_24hr: true,
                    }}
                />

            </div>
        </section>
    </section>
};

export { InputUserSelector, InputServiceSelector, DateSelector };

{/* <div className="flex h-full flex-row items-center">
<div className="h-5 w-5 text-slate-600">
    <ChevronDown className="h-full w-full" />
</div>
<span className="ml-3 text-slate-600 font-normal text-sm">{value ? value.toLocaleDateString() : "Aucune date sélectionnée"}</span>
</div> */}