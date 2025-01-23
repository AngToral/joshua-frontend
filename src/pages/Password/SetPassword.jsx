import { message } from 'antd';
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../../apiService/userApi';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { authContext } from '../../components/context/authContext';

const SetPassword = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();

    const { userid } = useParams();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { setLogOut } = useContext(authContext)

    const onSubmitNew = async (data) => {
        console.log('Received datas of form: ', data.password);
        setLoading(true)
        const response = await updateUser(userid, { password: data.password })
        setLoading(false)
        if (!response.msg) {
            messageApi.open({
                type: 'success',
                content: 'Password changed successfully!'
            })
        }
        reset();
        setLogOut();
    }

    return (
        <>
            {contextHolder}
            <div className="flex justify-center items-center h-screen flex-col">
                <a onClick={() => navigate('/')} className='cursor-pointer'>
                    <img src="https://res.cloudinary.com/dqvce5mij/image/upload/v1735325545/Gris_ygutmf.png" alt="logo-joshua" className='h-80 mb-5' />
                </a>
                <div className="flex flex-col gap-2">
                    <p className="text-4xl mb-6 flex justify-center">Set new password!</p>
                    <form onSubmit={handleSubmit(onSubmitNew)} className='flex flex-col gap-3'
                    >
                        <div className="flex items-center flex-col">
                            <div className='flex gap-2 w-[330px] items-center'>
                                <input
                                    type={
                                        showPassword ?
                                            "text" :
                                            "password"
                                    }
                                    placeholder='Password'
                                    {...register("password", { required: true })}
                                    className='rounded-lg p-2 w-11/12'
                                />
                                {showPassword ?
                                    <a onClick={() => setShowPassword(!showPassword)}>
                                        <IoEyeOutline color="#979ca2" className='h-6 w-6 cursor-pointer' />
                                    </a>
                                    :
                                    <a onClick={() => setShowPassword(!showPassword)}>
                                        <IoEyeOffOutline color="#979ca2" className='h-6 w-6 cursor-pointer' />
                                    </a>
                                }
                            </div>
                            {errors.password && <span className='text-red-400'>This field is required</span>}
                        </div>
                        <button type='submit' className='text-2xl'>
                            {loading ? "Loading..." : 'Set new'}
                        </button>
                    </form>
                    <button onClick={() => navigate('/login')}>
                        Go to Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default SetPassword