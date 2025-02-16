import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserId, getUsers } from '../../apiService/userApi';
import CardsClients from '../../components/clients/cardsClients';
import '../Dashboard/dashboard.css'
import { authContext } from '../../components/context/authContext';
import { Input, message } from "antd";
import ModalClient from '../../components/clients/ModalClient';

const { Search } = Input;

const Clients = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [allClients, setAllClients] = useState([]);
    const [dummy, refresh] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userPic, setUserPic] = useState("")
    const [filtering, setFiltering] = useState([]);

    const navigate = useNavigate();
    const { userId } = useContext(authContext)

    const getUserLogged = async () => {
        if (userId) {
            const user = await getUserId(userId);
            setUserPic(user.profilePic)
        }
    };

    useEffect(() => {
        document.body.style.backgroundColor = "#031730";
        getAllClients();
        getUserLogged();
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

    const onSearch = (value, _e, info) => {
        console.log(info?.source, value);
        const newList = [...allClients]
        if (info) {
            const searchTerms = value.toLowerCase().split(" ");
            const filteredData = newList.filter(info => {
                return searchTerms.every(term =>
                    info.name.toLowerCase().includes(term) ||
                    info.lastname.toLowerCase().includes(term) ||
                    info.email.toLowerCase().includes(term) ||
                    info.plan.toLowerCase().includes(term) ||
                    info.status.toLowerCase() === term
                )
            })
            if (filteredData.length !== 0) return setFiltering(filteredData);
            if (filteredData.length === 0) {
                messageApi.open({
                    type: 'warning',
                    content: 'No data'
                })
            }
        }
        if (!info) allClients;
    }

    const onCancel = () => {
        setOpen(false)
    }

    return (
        <>
            {contextHolder}
            <div className="h-screen">
                <div className="flex justify-around items-center flex-wrap md:h-[130px] h-[100px] text-xl">
                    <div className="flex items-center">
                        <a>
                            <img onClick={handleHome} src="logoCompletoGris.png" alt="logoJoshua" className='m-6 h-20 w-20 cursor-pointer' />
                        </a>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <button onClick={() => setOpen(!open)}>New client</button>
                        <button onClick={handleDashboard}>Dashboard</button>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <img src={userPic} alt="profile-pic" className='rounded-full h-12 w-12 object-cover' />
                        <button onClick={handleProfile}>Profile</button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Search className="w-[320px]"
                        placeholder="Any campus"
                        allowClear
                        enterButton="Search"
                        onSearch={onSearch}
                    />
                </div>
                {loading ?
                    <div className='h-screen flex justify-center items-center'><div className='loader'></div></div>
                    :
                    <div className="flex flex-col">
                        <div className='m-10 flex flex-wrap justify-center flex-wrap gap-10'>
                            {(filtering.length > 0 ? filtering : allClients).map(client =>
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
            <ModalClient
                visible={open}
                onCancel={onCancel}
            />
        </>
    )
}

export default Clients