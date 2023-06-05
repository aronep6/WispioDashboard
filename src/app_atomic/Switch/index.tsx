import type { SwitchProps } from './interfaces'
import { Switch as HeadlessUiSwitch } from '@headlessui/react'

const Switch = ({
    name,
    label,
    add="",
    checked,
    onChange = () => {},
    error,
    errorMessage,
    checkedBackgroundClass = 'bg-teal-900',
    uncheckedBackgroundClass = 'bg-gray-400',
    disabled = false,
    ...props
}: SwitchProps) => {
  return <section className="flex flex-col py-1 my-0.5 w-full"
    title={ checked ? `'${label}' est activé` : `'${label}' est désactivé` }
  >
    <div className='flex flex-row gap-2.5 items-center'>
      <HeadlessUiSwitch
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={`${checked ? checkedBackgroundClass : uncheckedBackgroundClass}
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75
          ${add}`}
        {
            ...props
        }
      >
        <span
          aria-hidden="true"
          className={`${checked ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
      </HeadlessUiSwitch>
      { label && <label className="text-slate-700 text-sm font-medium tracking-tight">{ label }</label> }
    </div>
      {
        error && <span className="text-red-500 text-xs font-medium mt-0.5">{ errorMessage }</span>
      }
  </section>
};

export default Switch;