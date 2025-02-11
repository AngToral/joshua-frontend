import { Select, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../components/context/authContext';
import { getUserId } from '../../apiService/userApi';
import { getTrainings } from '../../apiService/trainingApi';
import CardsTrainings from '../../components/training/cardsTrainings';
import { useForm } from 'react-hook-form';
import './dashboard.css'

const Dashboard = () => {
    const [userPic, setUserPic] = useState("")
    const [userPlan, setUserPlan] = useState("")
    const [userType, setUserType] = useState("")
    const [allTrainings, setAllTrainings] = useState([]);
    const [filtering, setFiltering] = useState([]);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const { userId } = useContext(authContext)

    useEffect(() => {
        getUserLogged();
        document.body.style.backgroundColor = "black"
    }, []);

    useEffect(() => {
        if (userPlan || userType) {
            getAllVideos();
        }
    }, [userPlan, userType]);

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
            setUserPlan(user.plan)
            setUserType(user.profileType)
        }
    };

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
        }
        if (data) {
            setLoading(true)
            const filteredList = newList.filter((video) => video.category === data.categorySearch);
            if (filteredList.length) {
                setFiltering(filteredList);
            }
            if (filteredList.length === 0) {
                messageApi.error("No videos found");
                getAllVideos();
            }
            setLoading(false);
        }
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
                        {/* si eres Joshua */}
                        <p className='cursor-pointer'>Upload video</p>
                        <p className='cursor-pointer'>Clients</p>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <img src={userPic} alt="profile-pic" className='rounded-full h-12 w-12 object-cover' />
                        <a onClick={handleProfile}>Profile</a>
                    </div>
                </div>
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
                </form>
                <div className="flex flex-col items-center">
                    <div className='m-10 flex justify-center flex-wrap gap-4'>
                        {allTrainings.length === 0 ? <img src='./empty.png' className='h-52 w-52' /> :
                            (loading ? <div class="loader"></div> :
                                (filtering.length > 0 ? filtering : allTrainings).map(video =>
                                    <CardsTrainings
                                        key={video._id}
                                        video={video}
                                    />
                                ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard