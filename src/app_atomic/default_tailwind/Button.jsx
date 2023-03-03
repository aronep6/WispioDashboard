/*  Correspondance atomiques non-connues (depuis Title.jsx)
    text-xl             : font-size: 1.25rem; => 20px
    font-semibold       : font-weight: 600;
    tracking-tighter    : letter-spacing: -0.05em;
    leading-6           : line-height: 1.5rem; => 24px
    p-2.5               : padding: 0.625rem; => 10px
*/

const PrimaryButton = ({ children, add, action, disabled, useMargin = true }) => {
    return <button onClick={ action } disabled={disabled}
        className={`rounded-md grotesk tracking-tighter py-2.5 px-4 font-semibold border-solid border-2 border-indigo-600 dark:border-indigo-500 text-white text-sm md:text-base disabled:opacity-25 disabled:text-indigo-100
        bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark-hover:bg-indigo-700 duration-100 focus:ring focus:ring-indigo-300 ${ useMargin && "m-1" } disabled:cursor-not-allowed ${add}`}>
        {children}
    </button>
};

const SubmitPrimaryButton = ({ children, add, disabled, useMargin = true }) => {
    return <input type="submit" disabled={disabled} value={children}
        className={`rounded-md grotesk tracking-tighter py-2.5 px-4 font-semibold  border-solid border-2 border-indigo-600 dark:border-indigo-500 text-white text-sm md:text-base disabled:opacity-25 disabled:text-indigo-100 cursor-pointer
        bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark-hover:bg-indigo-700 duration-100 focus:ring focus:ring-indigo-300 ${ useMargin && "m-1" } disabled:cursor-not-allowed ${add}`}>
    </input>
};

const SecondaryButton = ({ children, add, action, disabled, useMargin = true }) => {
    return <button onClick={ action } disabled={disabled}
        className={`rounded-md grotesk tracking-tighter py-2.5 px-4 font-semibold border-solid border-2 border-indigo-600 text-sm md:text-base disabled:opacity-25
        text-indigo-600 hover:bg-indigo-200 duration-100 focus:ring focus:ring-indigo-300 ${ useMargin && "m-1" } max-w-max ${add}`}>
        {children}
    </button>
};

const TertiaryButton = ({ children, add, action, disabled }) => {
    return <button onClick={ action } disabled={disabled}
        className={`rounded-md grotesk tracking-tighter py-2.5 px-4 font-semibold text-white-600 text-sm md:text-base hover:text-indigo-600
        duration-100 focus:outline-none outline-none mx-1 disabled:cursor-not-allowed ${add}`}>
        {children}
    </button>
};

const DangerPrimaryButton = ({ children, add, action, disabled, useMargin = true }) => {
    return <button onClick={ action } disabled={disabled}
        className={`rounded-md grotesk tracking-tighter py-2.5 px-4 font-semibold  text-normal text-white text-sm md:text-base
        bg-red-600 hover:bg-red-700 duration-100 focus:ring focus:ring-red-300 ${ useMargin && "m-1" } max-w-max ${add}`}>
        {children}
    </button>
};

const DangerSecondaryButton = ({ children, add, action, disabled, useMargin = true }) => {
    return <button onClick={ action } disabled={disabled}
        className={`rounded-md grotesk tracking-tighter py-2.5 px-4 font-semibold text-normal bg-red-100 text-sm md:text-base
        text-red-600 hover:bg-red-200 duration-100 focus:ring focus:ring-red-300 ${ useMargin && "m-1" } max-w-max ${add}`}>
        { children }
    </button>
};

const ReturnButton = ({ icon }) => {
    return <div 
        title="Retour"
        className='flex group border hover:border-indigo-600 max-w-max flex-row items-center justify-center text-gray-600 hover:text-indigo-600
        bg-gray-50 hover:bg-indigo-200 p-2.5 rounded-full duration-150 cursor-pointer'>
        <div className="h-5 w-5 mr flex items-center"> { icon } </div>
    </div>
};

export { PrimaryButton, SecondaryButton, TertiaryButton, DangerPrimaryButton, DangerSecondaryButton, SubmitPrimaryButton, ReturnButton };