import { useContext, useState } from "react";
import "./login.css"
import { useNavigate } from 'react-router-dom';
import { message } from "antd";
import { useForm } from "react-hook-form";
import { forgotPasswordEmail, login } from "../../apiService/userApi";
import { authContext } from "../../components/context/authContext";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const Login = () => {

    const navigate = useNavigate();
    const [forgot, setForgot] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    function handleHome() {
        navigate("/")
    }

    const [messageApi, contextHolder] = message.useMessage();
    const { setLogIn } = useContext(authContext)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitLogin = async (data) => {
        console.log('Received values of form: ', data);
        const { email, password } = data
        if (data.email === "" || data.password === "") { }
        setLoading(true)
        const response = await login(email, password)
        console.log(response)
        setLoading(false)
        if (!response.msg) {
            setLogIn(response) //context
            navigate('/dashboard') //logeado
        }
        if (response.msg === "This email is not registered") {
            messageApi.open({
                type: 'warning',
                content: 'This email is not registered'
            })
        }
        if (response.msg === "Email is no longer active") {
            messageApi.open({
                type: 'warning',
                content: 'Email is no longer active'
            })
        }
        if (response.msg === "Wrong password") {
            messageApi.open({
                type: 'error',
                content: 'Wrong password'
            })
        }
    }

    const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: { errors: errors2 } } = useForm();

    const onSubmitForgot = async (data) => {
        const { email } = data
        console.log(email)
        setLoading(true)
        const response = await forgotPasswordEmail({ email })
        setLoading(false)
        if (!response.msg) {
            messageApi.open({
                type: 'success',
                content: "Your email has been sent successfully",
            })
            reset2()
            setForgot(false)
        }
        if (response.msg === "This email is not registered") {
            messageApi.open({
                type: 'error',
                content: "This email is not registered",
            })
        }
    }


    return (
        <>
            {contextHolder}
            <div className="h-screen">
                <div className="flex justify-between flex-wrap md:h-[130px] h-[100px]">
                    <div className="flex flex-wrap items-center text-xl">
                        <a>
                            <img onClick={handleHome} src="logoCompletoGris.png" alt="logoJoshua" className='m-6 h-20 w-20 cursor-pointer' />
                        </a>
                    </div>
                </div>
                <div className="flex justify-center md:flex-row flex-col-reverse items-center">
                    <img className='md:w-[450px] w-[300px] rounded-xl mb-6' src='./J4.jpeg' />
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
                                        {errors2.email && <span className='text-red-400'>This field is required</span>}

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

                                        <div className="flex gap-1 items-center">
                                            <input
                                                type={
                                                    showPassword ?
                                                        "text" :
                                                        "password"
                                                }
                                                placeholder='Password' {...register("password", { required: true })} className='w-11/12 bg-transparent border-transparent border-b-black border-[1px] font-light' />

                                            {showPassword ?
                                                <a onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                                    <IoEyeOutline color="#979ca2" />
                                                </a>
                                                :
                                                <a onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                                    <IoEyeOffOutline color="#979ca2" />
                                                </a>
                                            }
                                        </div>
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