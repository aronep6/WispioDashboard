import { forwardRef } from "react";
import { FieldError } from "react-hook-form/dist/types";

interface InputProps {
    name: string;
    label?: string;
    value: string;
    add?: string;
    type?: string;
    required?: boolean;
    onChange?: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
    error?: FieldError | boolean;
    errorMessage?: string;
}

const InputBlock = forwardRef(({
    name,
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
}: InputProps, 
ref: React.Ref<HTMLInputElement> | undefined
) => {
    return <section className="flex flex-col py-1 my-0.5 w-full">

        { label && <label className="text-slate-700 mb-1.5 ml-0.5 text-sm font-medium tracking-tight">{ label }</label> }

        <input
            ref={ref}
            className={`
                h-12 relative
                bg-white shadow-sm
                ${add}
                text-slate-900
                border-slate-300 ${ error ? "border-red-500" : "border" }
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
});

export { InputBlock };