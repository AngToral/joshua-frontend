import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../components/context/authContext';
import { getUserId } from '../../apiService/userApi';
import { useForm } from 'react-hook-form';
import '../../pages/Dashboard/dashboard.css'

const Profile = () => {

    useEffect(() => {
        document.body.style.backgroundColor = "#545b66"
        getUserLogged();
    }, []);

    const [userPic, setUserPic] = useState("")
    const [userLogged, setUserLogged] = useState([])
    const [inputAble, setInputAble] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { userId } = useContext(authContext)

    const getUserLogged = async () => {
        if (userId) {
            const user = await getUserId(userId);
            setUserPic(user.profilePic)
            setUserLogged(user);
        }
    };

    function handleHome() {
        navigate("/")
    }

    function handleDashboard() {
        navigate("/dashboard")
    }

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: userLogged.name,
            lastname: userLogged.lastname,
            email: userLogged.email,
            plan: userLogged.plan,
        }
    });


    const onSubmit = async (data) => {
        console.log(data)
        // setLoading(true)
        // setInputAble(!inputAble);
        // await updateUser(selectedClient, data)
        // message.success("Client edited successfully!")
        // setLoading(false)
    }

    return (
        <div className='h-screen'>
            <div className="flex justify-around items-center flex-wrap md:h-[130px] h-[100px] text-xl">
                <div className="flex items-center">
                    <a>
                        <img onClick={handleHome} src="logoCompletoNegro.png" alt="logoJoshua" className='m-6 h-20 w-20 cursor-pointer' />
                    </a>
                </div>
                <div className='flex flex-row gap-4 text-black'>
                    <button onClick={handleDashboard}>Dashboard</button>
                </div>
            </div>

            <div className='my-16 flex justify-around'>
                <img src={userPic} alt="profile-pic" className='rounded-full h-56 w-56 object-cover' />

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="flex flex-col">
                            <p><strong>Name: </strong>
                                <input disabled={inputAble} {...register("name", { required: true })} className={inputAble ? 'bg-transparent border-transparent border-[1px] font-light w-[200px]' : 'rounded-lg border-[1px] font-light px-2 w-[240px]'} />
                            </p>
                            <p><strong>Lastname: </strong>
                                <input disabled={inputAble} {...register("lastname", { required: true })} className={inputAble ? 'bg-transparent border-transparent border-[1px] font-light w-[200px]' : 'rounded-lg border-[1px] font-light px-2 w-[240px]'} />
                            </p>
                            <p><strong>Email: </strong>
                                <input disabled={inputAble} {...register("email", { required: true })} className={inputAble ? 'bg-transparent border-transparent border-[1px] font-light w-[200px]' : 'rounded-lg border-[1px] font-light px-2 w-[240px]'} />
                            </p>
                            <p><strong>Plan: </strong>
                                <input disabled={inputAble} {...register("plan", { required: true, validate: value => VALID_PLANS.includes(value) })} className={inputAble ? 'bg-transparent border-transparent border-[1px] font-light' : 'rounded-lg border-[1px] font-light px-2'} />
                                {errors.plan && <span className='text-red-400 flex flex-col'>Invalid typo. Most be "Basic", "Pro" or "Plus".</span>}
                            </p>
                            <p><strong>Status: </strong>
                                {userLogged.status === "active" ? "🟢 " : "🔴 "}
                                <input disabled value={" " + userLogged.status} {...register("status", { required: true })} className='bg-transparent border-transparent border-[1px] font-light' />
                            </p>
                            {loading ? <div className="flex justify-end"><div className="loader"></div></div> :
                                !inputAble &&
                                <button className="flex justify-end" type='submit'><FaRegCircleCheck className='h-5 w-5' /></button>
                            }
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Profile