import {SubmitHandler, useForm} from "react-hook-form";

type LoginInputs = {
    username: string,
    password: string
}


const LoginModal = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInputs>();
    const onSubmit: SubmitHandler<LoginInputs> = async data => {
        console.log(data)
        const auth = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })

        let json = await auth.json()

        console.log(json)
    };


    return (
        <div className={'p-4 flex flex-col'}>
            <h1 className={'text-center font-semibold'}>Login</h1>
            <form className={'flex flex-col space-y-2'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'flex flex-col'}>
                    <label htmlFor={"username"} className={'font-semibold'}>Username</label>
                    <input type="email" {...register('username', {required:true} )} className={'p-2 rounded-md outline-none focus:outline-none ring-0 focus:ring-0 border-none bg-gray-200 dark:bg-gray-600/60'}/>
                </div>
                <div className={'flex flex-col'}>
                    <label htmlFor={"password"} className={'font-semibold'}>Password</label>
                    <input type="password" {...register('password', {required:true} )} className={'p-2 rounded-md outline-none focus:outline-none ring-0 focus:ring-0 border-none bg-gray-200 dark:bg-gray-600/60'}/>
                </div>

                {(errors.password || errors.username) && <span className={"text-red-500"}>Some required fields are empty</span>}

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