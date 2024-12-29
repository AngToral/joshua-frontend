import './home.css'

const Home = () => {
    return (
        <>
            <div className="sticky top-0 z-50">
                <div className="navbar flex flex-wrap justify-around h-[70px] items-center text-xl">
                    <a>
                        <img src="Gris.png" alt="logo" className='h-16 w-16' />
                    </a>
                    <a>Sobre mí</a>
                    <a>Servicios</a>
                    <a>Contacto</a>
                    <a>Quiero mi plaza</a>
                    <a>Login</a>
                </div>
            </div >
            <div className="flex justify-center items-center text-lg encabezado">
                <p>Home</p>
            </div>
        </>
    )
}

export default Home