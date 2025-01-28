import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../components/context/authContext';
import { getUserId } from '../../apiService/userApi';
import { getTrainings } from '../../apiService/trainingApi';
import CardsTrainings from '../../components/training/cardsTrainings';

const Dashboard = () => {
    const [userPic, setUserPic] = useState("")
    const [allTrainings, setAllTrainings] = useState([]);

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { setLogOut, userId } = useContext(authContext)

    useEffect(() => {
        getUserLogged();
        getAllVideos();
    }, []);

    function handleHome() {
        navigate("/")
    }

    function handleProfile() {
        navigate("/profile")
    }

    const getUserLogged = async () => {
        if (userId) {
            const user = await getUserId(userId);
            setUserPic(user.profilePic)
        }
    };

    const getAllVideos = async () => {
        // setLoading(true)
        const response = await getTrainings();
        const notRemoved = response.filter((training) => !training.removeAt);
        if (response.length) setAllTrainings(notRemoved);
        // setLoading(false);
    };

    return (
        <div className="h-screen">
            <div className="flex justify-around items-center flex-wrap md:h-[130px] h-[100px] text-xl">
                <div className="flex items-center">
                    <a>
                        <img onClick={handleHome} src="logoCompletoGris.png" alt="logoJoshua" className='m-6 h-20 w-20 cursor-pointer' />
                    </a>
                </div>
                <div className='flex flex-row gap-4'>
                    {/* si eres Joshua */}
                    <p className='cursor-pointer'>Upload video</p>
                    <p className='cursor-pointer'>Clients</p>
                </div>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <img src={userPic} alt="profile-pic" className='rounded-full h-12 w-12 object-cover' />
                    <a onClick={handleProfile}>Profile</a>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className='m-10 flex flex-wrap gap-4'>
                    {allTrainings.map(video =>
                        <CardsTrainings
                            key={video._id}
                            video={video}
                        />
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard