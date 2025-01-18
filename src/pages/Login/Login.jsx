import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    function handleHome() {
        navigate("/")
    }


    return (
        <div className="header flex flex-wrap h-[70px] items-center text-xl">
            <a>
                <img onClick={handleHome} src="logoCompletoGris.png" alt="logoJoshua" className='m-6 h-20 w-20 cursor-pointer' />
            </a>
        </div>
    )
}

export default Login