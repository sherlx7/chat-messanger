'use client';

import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
//@ts-ignore
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import {BsGithub, BsGoogle} from "react-icons/bs";
import axios from "axios";
import {toast} from "react-hot-toast";
import {signIn} from "next-auth/react";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    //single function that encapsulates the logic of toggling the variant state
    //use Callback:memoizes functions in fc, returns a memoized version of the function 
    //that only changes if its dependencies have changed.
    const toggleVariant = useCallback(() => {
        variant == 'LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')
    }, [variant])

    //invokes useForm hook, which returns an object with the 
    //register and handleSubmit functions
    //register: handle form inputs | handlssubmit: used as form submission event handler
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    //onsubmit is a function of type submithandler that is called when form submitted
    //data parameter represents the form values collected by react-hook-form
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            axios.post('/api/register',data)
            .catch(()=>toast.error('Something went wrong'))
            .finally(()=>setIsLoading(false))
        }

        if (variant === 'LOGIN') {
        //https://next-auth.js.org/getting-started/client#signin
            signIn('credentials', {
              ...data,
              redirect: false
            })
            .then((callback) => {
              if (callback?.error) {
                toast.error('Invalid credentials!');
              }
              if (callback?.ok && !callback?.error){
                toast.success('Logged in')
              }
            })
            .finally(()=>setIsLoading(false));
          }
        }

    const socialAction = (action: string) => {
        setIsLoading(true);
        signIn(action)
        //when you chain then() to a Promise,the resolved value of the Promise is 
        //automatically passed as an arg to the callback function defined within the then() method.

        //(callback)=>:this code defines the callback function and passes it into .then() as args 
        //you can also define callback function separetely
        .then((callback)=>{
            if (callback?.error){
                toast.error('Invalid Credentials')
            }
            if (callback?.ok && !callback?.error){
                toast.success('Logged In')
            } 
        })
        .finally(()=>setIsLoading(false))
    
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" >
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                {/* set up form element with onSubmit event handler
                when form is submitted,handleSubmit validates form inputs, collect form data etc
                if no validation errors,it calls onSubmit callback function and passes in form data as argument 
                syntax: onSubmit is passed as arguments to handleSubmit in the onSubmit prop of the <form> element
                */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === "REGISTER" && (
                        <Input label="name" id="name"
                            register={register} errors={errors} disabled={isLoading} />
                    )}
                    <Input label="Email address" type="email" id="email"
                        register={register} errors={errors} disabled={isLoading}/>
                    <Input label="Password" type="password" id="password"
                        register={register} errors={errors} disabled={isLoading}/>

                    <div >
                        {/* NOTE: button is inside form tag, so when button is clicked, 
                        the onSubmit of form will be triggered, so dont need
                        separate onSubmit funciton for button */}
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGithub} onClick={()=>socialAction('github')}/>
                        <AuthSocialButton icon={BsGoogle} onClick={()=>socialAction('google')}/>
                    </div>
                </div>

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant==="LOGIN"? "New to Messanger?" : "Already have an account?"}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant==="LOGIN"?"Create an account":"Login"}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthForm;