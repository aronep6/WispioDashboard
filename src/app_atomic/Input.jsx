import { PrimaryButton } from "./Button";
import { Fragment, useRef } from "react";

const InputBlock = ({
    type,
    name,
    maxlenght,
    spellCheck,
    required,
    onChange,
    value,
    placeholder,
}) => {
    return <div className="input-block">
        <input type={type} name={name} maxlenght={maxlenght} spellCheck={spellCheck} required={required}
        onChange={(e) => { onChange(e.target.value) }} value={value}/>
        <span className="placeholderForm">{placeholder}</span>
    </div>
};

const InputBlockWhite = ({
    type,
    name,
    maxlenght,
    spellCheck,
    required,
    onChange,
    value,
    placeholder,
}) => {
    return <div className="input-block bg-white text-black">
        <input type={type} name={name} maxlenght={maxlenght} spellCheck={spellCheck} required={required}
        onChange={(e) => { onChange(e.target.value) }} value={value}/>
        <span className="placeholderForm">{placeholder}</span>
    </div>
};

const InputAsSelector = ({
    label,
    value,
    add="",
    type = "text",
    required = false,
    onChange = () => {},
    disabled = false,
    placeholder = "Entrez une valeur",
    error = false,
    errorMessage = "Une erreur est survenue",
}) => {
    return <section className="flex flex-col py-1 my-0.5 w-full">

        { label && <label className="text-slate-700 mb-1.5 ml-0.5 text-sm font-medium tracking-tight">{ label }</label> }

        <input
            className={`
                h-12 relative
                bg-white shadow-sm
                ${add}
                text-stone-900
                border-stone-300 ${ error ? "border-red-500" : "border" }
                border border-solid box-border
                focus:border-indigo-500 focus:shadow-outline-indigo
                focus:ring focus:ring-indigo-400 duration-100
                focus:outline-none
                rounded-lg
                font-medium placeholder:text-sm
                placeholder-gray-500
                ${disabled && "cursor-not-allowed"}
                text-base px-3.5`}
            type={type}
            value={value}
            spellCheck={false}
            onChange={(e) => { onChange(e.target.value) }}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
        />
        {
            error && <span className="text-red-500 text-xs font-medium mt-0.5">{ errorMessage }</span>
        }
    </section>
};

// Remove me if you find all deps in the code !!! IM IN "TITLE" NOW !!!
const Hint = ({ children }) => {
    return <span className="text-xs text-gray-600 dark:text-gray-400 mx-0.5">{ children }</span>;
};

// The default max size is arround 5MB
const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024;

const FileSelector = ({ 
    handleFile, 
    allowedExtensions = ["text/html", "text/plain"], 
    maxSize = DEFAULT_MAX_FILE_SIZE
}) => {
    const hiddenFileInput = useRef(null);

    const handleClick = e => {
        hiddenFileInput.current.click();
    };
    const handleChange = e => {
        const fileUploaded = e.target.files[0];
        const type = fileUploaded.type;

        if (allowedExtensions.includes(type) && fileUploaded.size <= maxSize) {
            handleFile(fileUploaded);
        } else {
            alert("Le format du fichier importé n'est pas supporté, ou il est trop volumineux.");
        }
    };
    return <Fragment>
        <PrimaryButton action={ handleClick }>
            Importer un fichier compatible
        </PrimaryButton>
        <input type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: 'none' }}
        />
    </Fragment>
};

export { InputBlock, InputBlockWhite, InputAsSelector, Hint, FileSelector };