import { forwardRef, type Ref } from "react";
import { ControlledSearchBarProps } from "./interfaces";
import { Search } from "react-feather";

const ControlledSearchBar = forwardRef(({
    placeholder,
    controller,
}: ControlledSearchBarProps,
forwardedRef: Ref<HTMLInputElement> | undefined
) => {
    return <section className="flex flex-col py-1 my-0.5 w-full max-w-sm relative group">
        <div className="absolute top-0 left-0 h-full w-12 flex items-center justify-center z-10">
            <Search className="text-slate-400 h-5 w-5" />
        </div>
        <input
            ref={forwardedRef}
            className={`
                h-12 relative
                bg-white shadow-sm
                text-slate-900
                border border-solid border-slate-400 box-border
                focus:border-indigo-500 focus:shadow-outline-indigo
                focus:ring focus:ring-indigo-400 duration-100
                focus:outline-none
                rounded-full
                w-full
                font-medium placeholder:text-sm
                placeholder-slate-400
                ${controller.isDisabled && "cursor-not-allowed"}
                text-base pl-12 pr-5`}
            type='search'
            value={controller.query}
            spellCheck={false}
            onChange={(e) => controller.setQuery(e.target.value) }
            disabled={controller.isDisabled}
            placeholder={placeholder}
        />
    </section>
});

export default ControlledSearchBar;