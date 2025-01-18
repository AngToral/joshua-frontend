import { useState } from "react";
import "./login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [forgot, setForgot] = useState(false)

    function handleHome() {
        navigate("/")
    }


    return (
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
                        <p className='text-2xl'>Welcome back!</p>
                    </div>
                    {forgot ? "Forgot" : "Login"}
                </div>
            </div>
        </div>
    )
}

export default Login