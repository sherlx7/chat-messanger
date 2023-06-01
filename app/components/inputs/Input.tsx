'use client'

import clsx from 'clsx';
import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister } from 'react-hook-form';

interface InputProps {
    label: string,
    id: string,
    //?: means its optional
    type?:string
    required?:boolean,
    register:UseFormRegister<FieldValues>,
    errors:FieldErrors,
    disabled?:boolean
}

//React.FC<InputProps>:syntac:delcares that Input component is a functional component
//that accepts 'InputProps' as its props.
//Purpose:allow TypeScript to enforce type checking for component props
const Input:React.FC<InputProps>=({
    label,id,type,required,register,errors,disabled
})=> {
    return(
        <div>
            <label
                className="
                block 
                text-sm 
                font-medium 
                leading-6 
                text-gray-900
                "
                htmlFor={id} 
            >
                {label}
            </label>
            
            <div className="mt-2">
                <input
                  id={id}
                  type={type}
                //browser enables autocomplete suggestions for input field based on id
                //in this case, id is email
                  autoComplete={id}
                //whether to disable input field
                  disabled={disabled}

                //spread operator spreads properties returned by register function onto <input> element
                //syntax[id:is an input name]:"name" is name of form input being registered(usually a unique identifier for the input field)
                //syntax[required:is boolean,indicates whether input must have value before form can be submitted]
                  {...register(id, { required })}

                //form-input can be used ONLY bc tailwindcss is installed
                //and added to tailwind.config.js plugins
                //syntax:clsx:used to condiitonally apply the className
                  className={clsx(`
                    form-input
                    block 
                    w-full 
                    rounded-md 
                    border-0 
                    py-1.5 
                    text-gray-900 
                    shadow-sm 
                    ring-1
                    ring-inset 
                    ring-gray-300 
                    placeholder:text-gray-400 
                    focus:ring-2 
                    focus:ring-inset 
                    focus:ring-sky-600 
                    sm:text-sm 
                    sm:leading-6`,
                    //errors and disabled are condiitonally & dynmically applied
                    errors[id] && 'focus:ring-rose-500',
                    disabled && 'opacity-50 cursor-default'
                  )}
                >
                </input>
            </div>
        </div>
    )
}

export default Input;