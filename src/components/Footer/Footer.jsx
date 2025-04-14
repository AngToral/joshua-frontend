import React from 'react'
import { AiOutlineMail } from 'react-icons/ai';
import { FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

    const handlePrivacy = () => {
        navigate("/privacy-policy")
        window.scrollTo(0, 0);
    }

    const handleDashboard = () => {
        navigate("/dashboard")
        window.scrollTo(0, 0);
    }

    const scrollToHome = () => {
        navigate("/")
        window.scrollTo(0, 0);
    };

    return (
        <footer className="text-lg bg-joshua-700">
            <div className="flex md:flex-row flex-col justify-center md:justify-around md:items-end items-center mb-5 gap-5 md:gap-0">
                <a onClick={scrollToHome} >
                    <img src="./logoCompletoGris.png" alt="logo" className='h-36 w-36 mt-10 cursor-pointer' />
                </a>
                <div className='flex flex-col md:ml-16 justify-center gap-2'>
                    {/* <a href="">
                        <div className='flex gap-2 items-center'>
                            <FaInstagram className='h-4 w-4' />
                            <p className='flex items-center font-extralight'>@joshua</p>
                        </div>
                    </a>
                    <div className='flex gap-2 items-center'>
                        <AiOutlineMail className='h-4 w-4' />
                        <p className='flex items-center font-extralight'>joshua@gmail.com</p>
                    </div> */}
                </div>
                <div className='flex flex-col md:items-start items-center'>
                    <button className='font-extralight' onClick={handlePrivacy}>Privacy Policy</button>
                    <button className='font-extralight' onClick={handleDashboard}>Dashboard</button>
                </div>
            </div>
            <div className='flex justify-center items-center font-extralight pb-5 gap-2'>
                <p>Website made by:</p>
                <a href="https://angelatoral.es/" target='_blanck'>
                    <p >@AngToral</p>
                </a>
            </div>
        </footer>
    )
}

export default Footer