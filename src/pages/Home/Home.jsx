import { useEffect, useState } from 'react';
import './home.css'

const Home = () => {

    const [scrolling, setScrolling] = useState(false);
    // const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        // window.addEventListener(
        //     "resize",
        //     () => window.innerWidth >= 960 && setOpenNav(false),
        // ),
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                <div className="sticky top-0 z-50">
                    <div className={
                        scrolling ?
                            "headerOnScroll flex flex-wrap justify-around h-[70px] items-center text-xl" :
                            "header flex flex-wrap justify-around h-[70px] items-center text-xl"
                    }>
                        <a>
                            <img src="guanteGris.png" alt="logoJoshua" className='h-14 w-10 cursor-pointer' />
                        </a>
                        <a className='link'>Sobre mí</a>
                        <a className='link'>Servicios</a>
                        <a className='link'>Contacto</a>
                        <a className='link'>Quiero mi plaza</a>
                        <a className='link'>Login</a>
                    </div>
                </div >
                <div className="flex flex-col justify-center items-start h-screen ml-16 mt-32">
                    <p className='font-bold text-6xl mb-6'>¡Tu mejor versión te espera!</p>
                    <h1 className='font-bold text-4xl mb-6'>Soy Joshua, boxeador y entrenador personal profesional</h1>
                    <p className='text-2xl  mb-6'>Descubre entrenamientos efectivos para alcanzar tus objetivos de fitness. ¡Comienza tu transformación hoy mismo!</p>
                    <button className='buttonLink buttonCallToAction'>¡Empieza ya!</button>
                </div>
            </div>
            <div className="flex justify-center items-center text-lg">
                <p>Sección 2</p>
            </div>
        </>
    )
}

export default Home