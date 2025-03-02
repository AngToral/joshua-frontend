import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../components/context/authContext';
import { getUserId, sendChangePassword, updatePhoto, updateUser } from '../../apiService/userApi';
import { useForm } from 'react-hook-form';
import '../../pages/Dashboard/dashboard.css'
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import { ImCancelCircle } from "react-icons/im";
import { message } from 'antd';
import { IoLockClosed } from "react-icons/io5";

const Profile = () => {

    useEffect(() => {
        document.body.style.backgroundColor = "#16375f"
        getUserLogged();
    }, []);

    const [userPic, setUserPic] = useState("")
    const [userLogged, setUserLogged] = useState({})
    const [inputAble, setInputAble] = useState(true);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();
    const { userId } = useContext(authContext)

    const getUserLogged = async () => {
        if (userId) {
            const user = await getUserId(userId);
            console.log(user)
            setUserPic(user.profilePic)
            setUserLogged(user);
            setValue("name", user.name);
            setValue("lastname", user.lastname);
            setValue("email", user.email);
            setValue("plan", user.plan);
            setValue("status", user.status);
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
        setLoading(true)
        await updateUser(userId, data)
        message.success("Data edited successfully!")
        setInputAble(!inputAble);
        setLoading(false)
    }

    const handleChangeImage = () => {
        // Activar el input de archivo oculto
        fileInputRef.current.click();
    }

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            message.error("Please select an image file");
            return;
        }

        try {
            setUploadingImage(true);

            // Crear FormData para enviar el archivo
            const formData = new FormData();
            formData.append('profilePic', file);

            // Llamar a la función de actualización de foto
            await updatePhoto(userId, formData);

            // En lugar de intentar extraer la URL de la respuesta,
            // simplemente refrescamos todos los datos del usuario
            await getUserLogged();

            message.success("Profile picture updated successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            message.error("Failed to update profile picture");
        } finally {
            setUploadingImage(false);
        }
    }

    const newPassword = async () => {
        setLoading(true)
        await sendChangePassword(userLogged.email)
        setLoading(false)
        message.success("An email has been sent successfully");
    }

    return (
        <div className='h-screen'>
            <div className="flex justify-around items-center flex-wrap md:h-[130px] h-[100px] text-xl">
                <div className="flex items-center">
                    <a>
                        <img onClick={handleHome} src="logoCompletoGris.png" alt="logoJoshua" className='m-6 h-20 w-20 cursor-pointer' />
                    </a>
                </div>
                <div className='flex flex-row gap-4'>
                    <button onClick={handleDashboard}>Dashboard</button>
                </div>
            </div>

            <div className='my-16 flex justify-center gap-12'>
                <div className='flex flex-col justify-center gap-5'>
                    <img src={userPic} alt="profile-pic" className='rounded-full h-56 w-56 object-cover' />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={handleChangeImage}
                        disabled={uploadingImage}
                        className={uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        {uploadingImage ? 'Uploading...' : 'Change image'}
                    </button>
                </div>
                <div className='w-[400px]'>
                    <div className='flex justify-between gap-5 mb-5'>
                        {!inputAble ? <button onClick={() => setInputAble(!inputAble)}><ImCancelCircle className='h-5 w-5' /></button> :
                            <button onClick={() => setInputAble(!inputAble)}><FaRegEdit className='h-5 w-5' /></button>}
                        <button onClick={newPassword} className='flex gap-2 items-center'><IoLockClosed className='h-5 w-5' />Change password</button>
                    </div>

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
                                <input disabled {...register("plan")} className='bg-transparent border-transparent border-[1px] font-light' />
                            </p>
                            <p><strong>Status: </strong>
                                {userLogged.status === "active" ? " 🟢 " : " 🔴 "}
                                <input disabled {...register("status")} className='bg-transparent border-transparent border-[1px] font-light' />
                            </p>
                            {loading ? <div className='flex justify-center'><div className="loader"></div></div> :
                                !inputAble &&
                                <button className="flex justify-end" type='submit'><FaRegCircleCheck className='h-6 w-6' /></button>
                            }
                        </div>
                    </form>
                </div>
            </div>

        </div >
    )
}

export default Profile