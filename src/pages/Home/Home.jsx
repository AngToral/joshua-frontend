import { useContext, useEffect, useState } from 'react';
import './home.css'
import { BsPersonArmsUp } from "react-icons/bs";
import { IoStar } from "react-icons/io5";
import { MdWorkspacePremium } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Modal, message } from 'antd';
import { useForm } from "react-hook-form";
import { sendContactEmail, sendNewAccountEmail } from '../../apiService/userApi';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../components/context/authContext';

const Home = () => {

    const [scrolling, setScrolling] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [registerSent, setRegisterSent] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth <= 766);

    const [messageApi, contextHolder] = message.useMessage();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: { errors: errors2 } } = useForm();

    const navigate = useNavigate();
    const { userId } = useContext(authContext)

    const onSubmit = async (data) => {
        const { subjectType, clientName, clientEmail, subject } = data
        console.log(subjectType, clientName, clientEmail, subject)
        setLoading(true)
        await sendContactEmail({ subjectType, clientName, clientEmail, subject })
        setLoading(false)
        messageApi.open({
            type: 'success',
            content: "Your message has been sent successfully",
        })
        reset()
    }

    const onSubmitSignIn = async (data) => {
        const { clientName, clientLastname, clientEmail, subjectType } = data
        console.log(clientName, clientLastname, clientEmail, subjectType)
        setLoading(true)
        await sendNewAccountEmail({ clientName, clientLastname, clientEmail, subjectType })
        setLoading(false)
        messageApi.open({
            type: 'success',
            content: "Your message has been sent successfully. Wait until Joshua contacts you",
        })
        reset2()
        setIsModalOpen(false)
        setRegisterSent(true)
    }

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

    const scrollToAboutMe = () => {
        document.getElementById('aboutMe').scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToServices = () => {
        document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToContact = () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToHome = () => {
        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function handleLogin() {
        navigate("/login")
    }

    const handleProfile = () => {
        navigate("/profile")
    }

    const handleDashboard = () => {
        navigate("/dashboard")
    }

    return (
        <>
            {contextHolder}
            <div>
                <div id='home' className='encabezado'>
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
                                        <li><a onClick={scrollToAboutMe} className=''>About me</a></li>
                                        <li><a onClick={scrollToServices}>Services</a></li>
                                        <li><a onClick={scrollToContact}>Contact</a></li>
                                        {userId ?
                                            <>
                                                <li><a onClick={handleProfile} className=''>
                                                    My profile
                                                </a></li>
                                                <li><a onClick={handleDashboard} className=''>
                                                    Dashboard
                                                </a></li>
                                            </>
                                            :
                                            <>
                                                <li><a onClick={showModal} className=''>Sign in!</a></li>
                                                <li>
                                                    <a onClick={handleProfile} className=''>
                                                        Login
                                                    </a>
                                                </li>
                                            </>
                                        }
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
                                    <img onClick={scrollToHome} src="guanteGris.png" alt="logoJoshua" className='h-12 w-8 cursor-pointer' />
                                </a>
                                <a onClick={scrollToAboutMe} className='link'>About me</a>
                                <a onClick={scrollToServices} className='link'>Services</a>
                                <a onClick={scrollToContact} className='link'>Contact</a>
                                {userId ?
                                    <>
                                        <a onClick={handleProfile} className='link'>
                                            My profile
                                        </a>
                                        <a onClick={handleDashboard} className='link'>
                                            Dashboard
                                        </a>
                                    </>
                                    :
                                    <>
                                        <a onClick={showModal} className='link'>Sign in!</a>
                                        <a onClick={handleLogin} className='link'>
                                            Login
                                        </a>
                                    </>
                                }
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
                        <button onClick={scrollToContact} className='buttonLink buttonCallToAction'>Start today!</button>
                    </div >
                </div>
                {/* about */}
                <div id='aboutMe' className="about-me bg-joshua-50 text-black">
                    <img className='image-me' src='./J3.jpg' />
                    <div className="flex flex-col px-10 text-about-me py-4">
                        <p className='pb-4 font-bold text-xl'>Meet Joshua, Your Guide to Fitness Success!</p>
                        <p className='pb-4'>A passionate personal trainer dedicated to helping you achieve your fitness goals. Whether you' re looking to lose weight, build strength, improve your overall health, or simply feel better in your own skin, I'm here to guide you every step of the way.</p>
                        <p className='pb-4'>I'm a family man who understands the importance of balance and prioritization in life.</p>
                        <p className='pb-4'>I'm known for my quickness and agility. They even call me "the plague" because I'm always one step ahead of my opponents!
                            I'm excited to share my knowledge and experience with you. Let's work together to achieve your fitness dreams!</p>
                    </div>
                </div>
                {/* servicios */}
                <div id='services' className="flex flex-col items-center text-lg max-h-[680px] bg-joshua-100 pb-10">
                    <p className='flex justify-center items-end md:h-[150px] md:text-4xl text-2xl md:m-0 m-5'>Services and plans</p>
                    <div className="flex justify-center flex-col md:flex-row items-center text-lg h-screen bg-joshua-100 gap-8 ">
                        <div className='flex flex-col gap-5'>
                            <div className='max-w-80 flex flex-col items-center justify-center'>
                                <BsPersonArmsUp className='md:h-16 md:w-16 h-8 w-8 md:mb-4' />
                                <p className='md:pb-4'>In-Person Training</p>
                                <p className='md:pb-4'>Experience the benefits of one-on-one coaching with me in my studio.</p>
                            </div>
                            <div className='max-w-80 flex flex-col items-center'>
                                <MdWorkspacePremium className='md:h-16 md:w-16 h-8 w-8 md:mb-4' />
                                <p className='md:pb-4'>Plus Pack</p>
                                <p className='md:pb-4'>You will have all the training videos and Nutritional recommendations.</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='max-w-80 flex flex-col items-center'>
                                <IoStar className='md:h-16 md:w-16 h-8 w-8 md:mb-4' />
                                <p className='md:pb-4'>Basic Plan</p>
                                <p className='md:pb-4'>You will have all my training videos wherever you want to work out.</p>
                            </div>
                            <div className='max-w-80 flex flex-col items-center'>
                                <FaTrophy className='md:h-16 md:w-16 h-8 w-8 md:mb-4' />
                                <p className='md:pb-4'>Pro Pack</p>
                                <p className='md:pb-4'>You will have all the training videos, nutritional recommendations, information about injuries and how to treat them, and stretching.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* contacto */}
                <div id='contact' className='flex md:flex-row flex-col h-[500px] bg-joshua-500 h-[850px] md:h-[550px]'>
                    <div className='contact-bg flex justify-center flex-col md:w-1/2'>
                        <p className='md:text-3xl text-2xl flex items-center ml-10 mt-10'>Contact me!</p>
                        <div className='flex flex-col ml-16 md:mb-10 h-[290px] justify-center gap-2'>
                            <a href="">
                                <div className='flex gap-2 items-center'>
                                    <FaInstagram className='h-6 w-6' />
                                    <p className='md:text-2xl text-xl flex items-center font-extralight'>@joshua</p>
                                </div>
                            </a>
                            <div className='flex gap-2 items-center'>
                                <AiOutlineMail className='h-6 w-6' />
                                <p className='md:text-2xl text-xl flex items-center font-extralight'>joshua@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-lg md:w-1/2 ">
                        <div className="flex md:justify-start justify-center items-center" >
                            <div className="flex flex-col justify-center items-center">

                                <p className="flex mt-5 mx-8 md:text-3xl text-xl font-extralight">
                                    Are you clear about it? Subscribe now:
                                </p>
                                {registerSent ?
                                    <p className="flex mt-5 mx-8 md:text-3xl text-green-600 text-xl font-extralight">Great! Joshua will contact you soon</p>
                                    :
                                    <button onClick={showModal} className="flex mt-5 mx-8 md:text-4xl text-2xl font-extralight link">Sign in!</button>
                                }
                                <Modal
                                    footer={[
                                        <button onClick={handleCancel}>
                                            Cancel
                                        </button>
                                    ]}
                                    title="Sign in" open={isModalOpen} onCancel={handleCancel}>
                                    <form onSubmit={handleSubmit2(onSubmitSignIn)} className='max-w-[300px]'>
                                        <div className="flex flex-col gap-4">

                                            <input placeholder='Name' {...register2("clientName", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light mt-5' />
                                            {errors.clientName && <span className='text-red-400'>This field is required</span>}
                                            <input placeholder='Lastname' {...register2("clientLastname", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                                            {errors.clientLastname && <span className='text-red-400'>This field is required</span>}
                                            <input placeholder='Email' {...register2("clientEmail", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                                            {errors.clientEmail && <span className='text-red-400'>This field is required</span>}

                                            <div className='flex'>
                                                <label className='font-extralight mr-3'>Select a contact type:</label>
                                                <select {...register2("subjectType")} className='bg-transparent font-extralight'>
                                                    <option value="Basic">Basic Plan</option>
                                                    <option value="Plus">Plus Pack</option>
                                                    <option value="Pro">Pro Pack</option>
                                                    <option value="Personal">Personal Training</option>
                                                </select>
                                            </div>
                                            <button type='submit'>
                                                {loading ? "Loading..." : "Ok"}
                                            </button>
                                        </div>
                                    </form>
                                </Modal>

                                <p type="text" className="flex mt-5 mx-8 md:text-3xl text-xl font-extralight">
                                    Or if you need more information, write to me using this form. I will be happy to answer you!
                                </p>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex flex-col gap-4">
                                        <div className='flex mt-6'>
                                            <label className='font-extralight mr-3'>Select a contact type:</label>
                                            <select {...register("subjectType")} className='bg-transparent font-extralight'>
                                                <option value="Info">Information</option>
                                                <option value="Basic">Basic Plan</option>
                                                <option value="Plus">Plus Pack</option>
                                                <option value="Pro">Pro Pack</option>
                                                <option value="Personal">Personal Training</option>
                                            </select>
                                        </div>
                                        <input placeholder='Name' {...register("clientName", { required: true })} className='bg-transparent border-transparent border-b-white border-[1px] font-light' />
                                        {errors.clientName && <span className='text-red-400'>This field is required</span>}
                                        <input placeholder='Email' {...register("clientEmail", { required: true })} className='bg-transparent border-transparent border-b-white border-[1px] font-light' />
                                        {errors.clientEmail && <span className='text-red-400'>This field is required</span>}
                                        <textarea placeholder='Message' {...register("subject", { required: true })} className='bg-transparent border-transparent border-b-white border-[1px] font-light' />
                                        {errors.subject && <span className='text-red-400'>This field is required</span>}
                                        <button type='submit'>{loading ? "Loading..." : "Send"}</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                {/* footer */}
                <footer className="text-lg bg-joshua-700">
                    <div className="flex md:flex-row flex-col justify-center md:justify-around items-center mb-5 gap-5 md:gap-0">
                        <a onClick={scrollToHome} >
                            <img src="./logoCompletoGris.png" alt="logo" className='h-36 w-36 mt-10 cursor-pointer' />
                        </a>
                        <div className='flex flex-col md:ml-16 justify-center gap-2'>
                            <a href="">
                                <div className='flex gap-2 items-center'>
                                    <FaInstagram className='h-4 w-4' />
                                    <p className='flex items-center font-extralight'>@joshua</p>
                                </div>
                            </a>
                            <div className='flex gap-2 items-center'>
                                <AiOutlineMail className='h-4 w-4' />
                                <p className='flex items-center font-extralight'>joshua@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center font-extralight pb-5 gap-2'>
                        <p>Website made by:</p>
                        <a href="https://angelatoral.es/" target='_blanck'>
                            <p >@AngToral</p>
                        </a>
                    </div>
                </footer>
            </div >
        </>
    )
}

export default Home