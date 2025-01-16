import { useEffect, useState } from 'react';
import './home.css'
import { BsPersonArmsUp } from "react-icons/bs";
import { IoStar } from "react-icons/io5";
import { MdWorkspacePremium } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";

const Home = () => {

    const [scrolling, setScrolling] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth <= 766);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 767);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    return (
        <>
            <div>
                <div className='encabezado'>
                    <video className="myVideo" autoPlay loop muted>
                        <source src="hero-joshua-home.mp4" type="video/mp4" />
                    </video>
                    <div className="fixed top-0 left-0 right-0 z-50">
                        {mobile ?
                            <nav className={isMenuOpen && `nav-menu`}>
                                <div className="navbar-toggle text-3xl pl-4 pt-4 cursor-pointer" onClick={mobile ? toggleMenu : null}>
                                    {isMenuOpen ? (
                                        <span className="">&times;</span>
                                    ) : (
                                        <span className="">&#9776;</span>
                                    )}
                                </div>
                                {isMenuOpen &&
                                    <ul className="nav-links pl-10 pb-4 rounded-b-lg text-xl absolute nav-menu">
                                        <li><a href="#" className=''>About me</a></li>
                                        <li><a href="#" className=''>Services</a></li>
                                        <li><a href="#" className=''>Contact</a></li>
                                        <li><a href="#" className=''>Let's start</a></li>
                                        <li><a href="#" className=''>Login</a></li>
                                    </ul>
                                }
                            </nav>
                            :
                            <div className={
                                scrolling ?
                                    "headerOnScroll flex flex-wrap justify-around h-[70px] items-center text-xl" :
                                    "header flex flex-wrap justify-around h-[70px] items-center text-xl"
                            }>
                                <a>
                                    <img src="guanteGris.png" alt="logoJoshua" className='h-12 w-8 cursor-pointer' />
                                </a>
                                <a className='link'>About me</a>
                                <a className='link'>Services</a>
                                <a className='link'>Contact</a>
                                <a className='link'>Let's start</a>
                                <a className='link'>Login</a>
                            </div>
                        }
                    </div >
                    <div className="flex flex-col justify-center homePosition mx-8">
                        {mobile &&
                            <img src="logoCompletoGris.png" alt="logoJoshua" className='h-48 w-48 mt-20 mb-10' />
                        }
                        <p className='font-bold md:text-6xl text-4xl lg:mb-6 mb-4'>Your best version awaits you!</p>
                        <h1 className='font-bold md:text-4xl text-2xl md:mb-6 mb-4'>I'm Joshua, a professional boxer and personal trainer</h1>
                        <p className='md:text-2xl text-lg md:mb-6 mb-4'>Discover effective workouts to achieve your fitness goals. Start your transformation today!</p>
                        <button className='buttonLink buttonCallToAction'>Start today!</button>
                    </div >
                </div>
                <div className="about-me bg-joshua-50 text-black">
                    <img className='image-me' src='./J5.png' />
                    <div className="flex flex-col px-10 text-about-me py-4">
                        <p className='pb-4 font-bold text-xl'>Meet Joshua, Your Guide to Fitness Success!</p>
                        <p className='pb-4'>A passionate personal trainer dedicated to helping you achieve your fitness goals. Whether you' re looking to lose weight, build strength, improve your overall health, or simply feel better in your own skin, I'm here to guide you every step of the way.</p>
                        <p className='pb-4'>I'm a family man who understands the importance of balance and prioritization in life.</p>
                        <p className='pb-4'>I'm known for my quickness and agility. They even call me "the plague" because I'm always one step ahead of my opponents!
                            I'm excited to share my knowledge and experience with you. Let's work together to achieve your fitness dreams!</p>
                    </div>
                </div>
                <div className="flex flex-col items-center text-lg max-h-[680px] bg-joshua-100">
                    <p className='flex justify-center items-end md:h-[150px] md:text-4xl text-2xl md:m-0 m-5'>Services and plans</p>
                    <div className="flex justify-center flex-col md:flex-row items-center text-lg h-screen bg-joshua-100 md:gap-16 gap-5">
                        <div className='flex flex-col md:gap-10 gap-5'>
                            <div className='max-w-80 flex flex-col items-center justify-center'>
                                <BsPersonArmsUp className='md:h-16 md:w-16 h-8 w-8 md:mb-4' />
                                <p className='md:pb-4'>In-Person Training</p>
                                <p className='md:pb-4'>Experience the benefits of one-on-one coaching with me in my studio.</p>
                            </div>
                            <div className='max-w-80 flex flex-col items-center'>
                                <MdWorkspacePremium className='h-16 md:w-16 h-8 w-8 md:mb-4' />
                                <p className='md:pb-4'>Plus Pack</p>
                                <p className='md:pb-4'>You will have all the training videos and Nutritional recommendations.</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:gap-10 gap-5'>
                            <div className='max-w-80 flex flex-col items-center'>
                                <IoStar className='h-16 md:w-16 h-8 w-8 md:mb-4' />
                                <p className='md:pb-4'>Basic Plan</p>
                                <p className='md:pb-4'>You will have all my training videos wherever you want to work out.</p>
                            </div>
                            <div className='max-w-80 flex flex-col items-center'>
                                <FaTrophy className='h-16 md:w-16 h-8 w-8 md:mb-4' />
                                <p className='md:pb-4'>Pro Pack</p>
                                <p className='md:pb-4'>You will have all the training videos, nutritional recommendations, information about injuries and how to treat them, and stretching.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center text-lg h-[500px] bg-joshua-500">
                    <p className='md:text-4xl text-2xl h-[100px] flex items-center'>Contact</p>
                    <div className="flex md:justify-start justify-center items-center" >
                        <div className="flex">
                            <form
                                className="form"
                            >
                                <p type="text" className="flex justify-center m-4 md:text-4xl text-2xl font-extralight">
                                    Háblame
                                </p>
                                <div className="flex flex-col font-display gap-4">
                                    <input className='bg-joshua-50 rounded-lg' />
                                    <input className='bg-joshua-50 rounded-lg' />
                                    <textarea className='bg-joshua-50 rounded-lg' />
                                </div>
                                <div className='flex justify-center'>
                                    <button className="md:text-lg font-bold p-3 mt-3 contact-button">
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <footer className="flex justify-center items-center text-lg h-[300px] bg-joshua-700">
                    <p>Footer</p>
                </footer>
            </div >
        </>
    )
}

export default Home