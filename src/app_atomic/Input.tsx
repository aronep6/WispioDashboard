import { ChangeEventHandler, forwardRef, ReactNode } from "react";
import { CommonInputProps } from "./interfaces/common_interfaces";
import DashedBorder from "../app_components/application/common/EmptyStates/DashedBorder";

interface InputProps extends CommonInputProps<string> {
    value: string | number;
    type?: string;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    placeholder?: string;
    errorMessage?: string;
}

interface InputAreaPropsExtension {
    rows?: number;
    cols?: number;
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
    ...props
}: InputProps, 
ref: React.Ref<HTMLInputElement> | undefined
) => {
    return <section className="flex flex-col py-1 my-0.5 w-full">

        { label && <label className="text-slate-700 mb-1.5 ml-0.5 text-sm font-medium tracking-tight">{ label }</label> }

        <input
            ref={ref}
            className={`
                h-11 relative
                bg-white shadow-sm
                ${add}
                text-slate-900
                border-slate-300 border ${ error && "border-red-500" }
                border border-solid box-border
                focus:border-indigo-500 focus:shadow-outline-indigo
                focus:ring focus:ring-indigo-400 duration-100
                focus:outline-none
                rounded-lg
                placeholder:text-sm
                placeholder-slate-400
                disabled:bg-slate-100 disabled:text-slate-400 disabled:select-none
                ${disabled && "cursor-not-allowed"}
                text-base px-3`}
            type={type}
            value={value}
            spellCheck={false}
            onChange={onChange}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            {...props}
        />
        {
            error && <span className="text-red-500 text-xs font-medium mt-0.5">{ errorMessage }</span>
        }
    </section>
});

const InputBlockArea = forwardRef(({
    name,
    label,
    value,
    add="",
    required = false,
    onChange = () => {},
    disabled = false,
    placeholder = "Entrez une valeur",
    error = false,
    errorMessage = "Une erreur est survenue",
    rows = 4,
    ...props
}: InputProps & InputAreaPropsExtension,
ref: React.Ref<HTMLTextAreaElement> | undefined
) => {
    return <section className="flex flex-col py-1 my-0.5 w-full">

        { label && <label className="text-slate-700 mb-1.5 ml-0.5 text-sm font-medium tracking-tight">{ label }</label> }

        <textarea
            ref={ref}
            rows={rows}
            className={`
                relative
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
                placeholder-slate-400
                ${disabled && "cursor-not-allowed"}
                text-base p-3.5`}
            value={value}
            spellCheck={false}
            onChange={onChange}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            {...props}
        />
        {
            error && <span className="text-red-500 text-xs font-medium mt-0.5">{ errorMessage }</span>
        }
    </section>
});

type OptionType = any; // TODO: Make this more generic

interface SelectableOption<V, L> {
    value: V;
    label: L;
}
interface SelectableProps<V, L> extends CommonInputProps<L> {
    name: string;
    label: L;
    value: V;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    options: SelectableOption<OptionType, OptionType>[];
    add?: string;
    disabled?: boolean;
};

const SelectForm = ({
    name,
    label, 
    value, 
    onChange, 
    options, 
    error, 
    errorMessage,
    add = "",
    disabled = false,
    ...props
}: SelectableProps<OptionType, OptionType>) => {
    return (
        <div className="flex flex-col items-start w-full">

            { label && <label className="text-slate-700 mb-1.5 ml-0.5 text-sm font-medium tracking-tight">{ label }</label> }

            <select value={value}
                onChange={onChange}
                className={`
                    h-12 w-full relative
                    bg-white shadow-sm
                    ${add}
                    text-stone-900
                    border-stone-300 ${ error ? "border-red-500" : "border" }
                    border border-solid box-border
                    focus:border-scooter-500 focus:shadow-outline-scooter
                    focus:ring focus:ring-scooter-400 duration-100
                    focus:outline-none
                    rounded-lg
                    font-medium placeholder:text-sm
                    placeholder-gray-500
                    ${disabled && "cursor-not-allowed"}
                    text-base px-3.5`}
                disabled={disabled}
                {...props}
            >
                <option value="_NO_VALUE_">Sélectionnez une option</option>
                {
                    options.map((option, index) => <option key={index} value={option.value}>{option.label}</option> )
                }
            </select>
            {
                error && <span className="text-red-500 text-xs font-medium mt-0.5">{ errorMessage }</span>
            }
        </div>
    );
};
interface FileSelectorProps {
    icon: ReactNode,
    title: string,
}

const FileSelector = ({ icon, title }: FileSelectorProps) => {
    return <DashedBorder
        icon={icon}
        title={title}
    ></DashedBorder>
};

export { InputBlock, InputBlockArea, SelectForm, FileSelector };