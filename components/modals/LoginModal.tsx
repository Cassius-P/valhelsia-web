import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {useUI} from "@/contexts/UIContext";
import {useUser} from "@/contexts/UserContext";

type LoginInputs = {
    email: string,
    password: string
}


const LoginModal = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInputs>();
    const {closeModal} = useUI()
    const {fetchUserFromCookie} = useUser()

    const [authError, setAuthError] = useState(false)
    const onSubmit: SubmitHandler<LoginInputs> = async data => {
        console.log(data)

        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(async res => {

            if(!res.ok) return setAuthError(true)

            let json = await res.json()
            console.log(json)

            if(json.success){
                fetchUserFromCookie()
                closeModal()
            }


        })
        .catch(err => {
            setAuthError(true)
        })
    };


    return (
        <div className={'p-4 flex flex-col'}>
            <h1 className={'text-center font-semibold'}>Login</h1>
            <form className={'flex flex-col space-y-2'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'flex flex-col'}>
                    <label htmlFor={"email"} className={'font-semibold'}>Email</label>
                    <input type="email" {...register('email', {required:true} )} className={'p-2 rounded-md outline-none focus:outline-none ring-0 focus:ring-0 border-none bg-gray-200 dark:bg-gray-600/60'}/>
                </div>
                <div className={'flex flex-col'}>
                    <label htmlFor={"password"} className={'font-semibold'}>Password</label>
                    <input type="password" {...register('password', {required:true} )} className={'p-2 rounded-md outline-none focus:outline-none ring-0 focus:ring-0 border-none bg-gray-200 dark:bg-gray-600/60'}/>
                </div>



                {(errors.password || errors.email) && <span className={"text-red-500 font-semibold text-center"}>Some required fields are empty</span>}
                {authError && <span className={"text-red-500 font-semibold text-center"}>Invalid credentials</span>}

                <div className={'w-full pt-4'}>
                    <button type={"submit"} className={"w-full rounded-md p-2 bg-green-500 font-semibold"}>
                        Login
                    </button>
                </div>

            </form>
        </div>
    )
}

export default LoginModal