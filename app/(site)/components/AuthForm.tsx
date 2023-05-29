'use client';

import { useCallback, useState } from 'react'

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm=()=>{
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(()=>{
        variant=='LOGIN' ? setVariant('REGISTER') : setVariant('LOGIN')
    },[variant])

    return (
        <div>Auth form </div>
    )
}

export default AuthForm;