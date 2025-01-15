import { useEffect, useState } from 'react';
import './home.css'
import { IconButton, Navbar, Collapse } from '@material-tailwind/react';


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
            <div className='encabezado'>
                <video className="myVideo" autoPlay loop muted>
                    <source src="hero-joshua-home.mp4" type="video/mp4" />
                </video>
                <div className="sticky top-0 z-50">
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
                                    <li><a href="#" className=''>Sobre mí</a></li>
                                    <li><a href="#" className=''>Servicios</a></li>
                                    <li><a href="#" className=''>Contacto</a></li>
                                    <li><a href="#" className=''>Quiero mi plaza</a></li>
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
                            <a className='link'>Sobre mí</a>
                            <a className='link'>Servicios</a>
                            <a className='link'>Contacto</a>
                            <a className='link'>Quiero mi plaza</a>
                            <a className='link'>Login</a>
                        </div>
                    }
                </div >
                <div className="flex flex-col justify-center homePosition mx-8">
                    {mobile &&
                        <img src="logoCompletoGris.png" alt="logoJoshua" className='h-48 w-48' />
                    }
                    <p className='font-bold md:text-6xl text-4xl md:mb-6 mb-4'>¡Tu mejor versión te espera!</p>
                    <h1 className='font-bold md:text-4xl text-2xl md:mb-6 mb-4'>Soy Joshua, boxeador y entrenador personal profesional</h1>
                    <p className='md:text-2xl text-lg md:mb-6 mb-4'>Descubre entrenamientos efectivos para alcanzar tus objetivos de fitness. ¡Comienza tu transformación hoy mismo!</p>
                    <button className='buttonLink buttonCallToAction'>¡Empieza ya!</button>
                </div>
            </div >
            <div className="flex justify-center items-center text-lg">
                <p>Sección 2</p>
            </div>
        </>
    )
}

export default Home