import { useState } from "react";
import "./login.css"
import { useNavigate } from 'react-router-dom';
import { message } from "antd";
import { useForm } from "react-hook-form";
import { forgotPasswordEmail, login } from "../../apiService/userApi";

const Login = () => {

    const navigate = useNavigate();
    const [forgot, setForgot] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleHome() {
        navigate("/")
    }

    const [messageApi, contextHolder] = message.useMessage();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmitLogin = async (data) => {
        const { email, password } = data
        console.log(email, password)
        setLoading(true)
        await login({ email, password })
        setLoading(false)
        messageApi.open({
            type: 'success',
            content: "Welcome!",
        })
        reset()
        navigate("/")
    }

    const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: { errors: errors2 } } = useForm();

    const onSubmitForgot = async (data) => {
        const { email } = data
        console.log(email)
        setLoading(true)
        await forgotPasswordEmail({ email })
        setLoading(false)
        messageApi.open({
            type: 'success',
            content: "Your email has been sent successfully",
        })
        reset2()
    }


    return (
        <>
            {contextHolder}
            <div className="h-screen">
                <div className="flex justify-between flex-wrap h-[130px]">
                    <div className="flex flex-wrap items-center text-xl">
                        <a>
                            <img onClick={handleHome} src="logoCompletoGris.png" alt="logoJoshua" className='m-6 h-20 w-20 cursor-pointer' />
                        </a>
                    </div>
                </div>
                <div className="flex justify-center md:flex-row flex-col">
                    <img className='w-[450px] rounded-xl' src='./J4.jpeg' />
                    <div className="md:w-[550px] flex justify-center items-center login flex-col">
                        <div className="">
                            <p className='text-2xl mb-6'>Welcome back!</p>
                        </div>
                        {forgot ?
                            <>
                                <p className="text-xl">Enter your email to set new password</p>
                                <form onSubmit={handleSubmit2(onSubmitForgot)} className='w-[300px] mt-6'>
                                    <div className="flex flex-col gap-4">

                                        <input placeholder='Email' {...register2("email", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                                        {errors2.clientEmail && <span className='text-red-400'>This field is required</span>}

                                        <button type='submit' className="text-xl">
                                            {loading ? "Loading..." : "Send"}
                                        </button>
                                    </div>
                                </form>
                                <button onClick={e => setForgot(false)} className="text-sm mt-4">Login</button>
                            </>
                            :
                            <>
                                <form onSubmit={handleSubmit(onSubmitLogin)} className='w-[300px]'>
                                    <div className="flex flex-col gap-4">

                                        <input placeholder='Email' {...register("email", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                                        {errors.email && <span className='text-red-400'>This field is required</span>}
                                        <input type="password" placeholder='Password' {...register("password", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light mt-5' />
                                        {errors.password && <span className='text-red-400'>This field is required</span>}

                                        <button type='submit' className="text-xl">
                                            {loading ? "Loading..." : "Login"}
                                        </button>
                                    </div>
                                </form>
                                <button onClick={e => setForgot(true)} className="text-sm mt-4">Forgot password?</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login