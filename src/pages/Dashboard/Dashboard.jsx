import { Select, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../components/context/authContext';
import { getUserId } from '../../apiService/userApi';
import { getTrainings } from '../../apiService/trainingApi';
import CardsTrainings from '../../components/training/CardsTrainings';
import { useForm } from 'react-hook-form';
import './dashboard.css'
import '../Home/home.css'
import ModalVideo from '../../components/video/ModalVideo';
import { IoIosLogOut } from 'react-icons/io';
import Footer from '../../components/Footer/Footer';

const Dashboard = () => {
    const [userPic, setUserPic] = useState("")
    const [userPlan, setUserPlan] = useState("")
    const [userType, setUserType] = useState("")
    const [allTrainings, setAllTrainings] = useState([]);
    const [filtering, setFiltering] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dummy, refresh] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { userId, setLogOut } = useContext(authContext)

    useEffect(() => {
        getUserLogged();
        document.body.style.backgroundColor = "black"
    }, []);

    useEffect(() => {
        if (userPlan || userType) {
            getAllVideos();
        }
    }, [userPlan, userType, dummy]);

    function handleHome() {
        navigate("/")
    }

    function handleProfile() {
        navigate("/profile")
    }

    function handleClients() {
        navigate("/clients")
    }

    const getUserLogged = async () => {
        if (userId) {
            const user = await getUserId(userId);
            setUserPic(user.profilePic)
            setUserPlan(user.plan)
            setUserType(user.profileType)
        }
    };

    const onCancel = () => {
        setOpen(false)
        setSelectedVideo(null)
    }

    const getAllVideos = async () => {
        setLoading(true)
        const response = await getTrainings();
        const notRemoved = response.filter((training) => !training.removeAt);
        const planFiltered = notRemoved.filter((training) => {
            if (userPlan === "Basic") {
                return ["Cardio", "Boxing", "GYM"].includes(training.category);
            }
            if (userPlan === "Plus") {
                return ["Cardio", "Boxing", "GYM", "Nutrition"].includes(training.category);
            }
            if (userPlan === "Pro" || userType === "admin") {
                return ["Cardio", "Boxing", "GYM", "Nutrition", "Injuries", "Stretching"].includes(training.category);
            }
            return false;
        });
        if (response.length) setAllTrainings(planFiltered);
        setLoading(false);
    };

    const onSubmitSearch = (data) => {
        console.log(data)
        const newList = [...allTrainings];
        if (data.categorySearch === "All") {
            setFiltering([]);
            setLoading(false);
            return;
        }
        if (data) {
            setLoading(true)
            const filteredList = newList.filter((video) => video.category === data.categorySearch);
            if (filteredList.length) {
                setFiltering(filteredList);
            }
            else {
                messageApi.error("No videos found");
                setFiltering([]);
                getAllVideos();
            }
            setLoading(false);
        }
    }

    const logout = () => {
        setLogOut()
        navigate("/login")
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
                    {userType === "admin" &&
                        <div className='flex flex-row gap-4'>
                            {/* si eres Joshua */}
                            <button className='link' onClick={() => setOpen(!open)}>Upload video</button>
                            <button onClick={handleClients} className='link'>Clients</button>
                        </div>
                    }
                    <div className='flex items-center gap-2'>
                        <a onClick={handleProfile} className='cursor-pointer flex items-center gap-3'>
                            <img src={userPic} alt="profile-pic" className='rounded-full h-12 w-12 object-cover' />
                            Profile
                        </a>
                        <button variant="text" className="flex items-center link2 font-display text-foto-200 m-4 md:text-xl font-bold" onClick={logout}>
                            <IoIosLogOut className="mr-2" /> Logout
                        </button>
                    </div>
                </div>
                {
                    loading ?
                        <div className='h-screen flex justify-center items-center'><div className='loader'></div></div>
                        :
                        <form className='flex justify-center' onChange={handleSubmit(onSubmitSearch)}>
                            <select name="Categories" className='h-10 w-40 p-2 rounded-lg bg-gray-800' {...register("categorySearch")} >
                                <option value="All">All</option>
                                <option value="Cardio">Cardio</option>
                                <option value="Boxing">Boxing</option>
                                <option value="GYM">GYM</option>
                                <option value="Nutrition">Nutrition</option>
                                <option value="Injuries">Injuries</option>
                                <option value="Stretching">Stretching</option>
                            </select>
                        </form>}
                <div className="flex flex-col items-center">
                    <div className='m-10 flex justify-center flex-wrap gap-4'>
                        {allTrainings.length === 0 ? <img src='./empty.png' className='h-52 w-52' /> :
                            (loading ? <div className="loader"></div> :
                                (filtering.length > 0 ? filtering : allTrainings)
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map(video =>
                                        <CardsTrainings
                                            key={video._id}
                                            video={video}
                                            refresh={refresh}
                                            userType={userType}
                                            visible={setOpen}
                                            videoId={setSelectedVideo}
                                        />
                                    ))
                        }
                    </div>
                </div>
                {/* modal de upload/editar video */}
                <ModalVideo
                    visible={open}
                    onCancel={onCancel}
                    refresh={refresh}
                    videoId={selectedVideo}
                />
                <Footer />
            </div>
        </>
    )
}

export default Dashboard