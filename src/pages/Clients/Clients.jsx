import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../apiService/userApi';
import CardsClients from '../../components/clients/cardsClients';
import '../Dashboard/dashboard.css'

const Clients = () => {

    const [allClients, setAllClients] = useState([]);
    const [dummy, refresh] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = "#031730";
        getAllClients();
    }, [dummy]);

    function handleHome() {
        navigate("/")
    }

    function handleDashboard() {
        navigate("/dashboard")
    }

    function handleProfile() {
        navigate("/profile")
    }

    const getAllClients = async () => {
        setLoading(true)
        const response = await getUsers();
        const notRemoved = response.filter((client) => !client.removeAt);
        const notAdmin = notRemoved.filter((client) => client.profileType !== "admin");
        if (response.length) setAllClients(notAdmin);
        setLoading(false)
    }

    return (
        <>
            <div className="h-screen">
                <div className="flex justify-around items-center flex-wrap md:h-[130px] h-[100px] text-xl">
                    <div className="flex items-center">
                        <a>
                            <img onClick={handleHome} src="logoCompletoGris.png" alt="logoJoshua" className='m-6 h-20 w-20 cursor-pointer' />
                        </a>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <button onClick={handleDashboard}>New client</button>
                        <button onClick={handleDashboard}>Dashboard</button>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <button onClick={handleProfile}>Profile</button>
                    </div>
                </div>
                {loading ?
                    <div className='h-screen flex justify-center items-center'><div className='loader'></div></div>
                    :
                    <div className="flex flex-col">
                        <div className='m-10 flex flex-wrap justify-center flex-wrap gap-10'>
                            {allClients.map(client =>
                                <CardsClients
                                    key={client._id}
                                    client={client}
                                    refresh={refresh}
                                    clientId={selectedClient}
                                    visible={open}
                                />
                            )}
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default Clients