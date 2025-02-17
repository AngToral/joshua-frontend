import { Modal, message } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import '../../pages/Dashboard/dashboard.css'
import { addUser } from '../../apiService/userApi';

const ModalClient = ({ visible, onCancel, refresh }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmitAddUser = async (data) => {
        console.log(data)
        const response = await addUser(data)
        if (response.msg === "This email already exist") {
            return message.error("This email already exist")
        }
        setLoading(true)
        if (!response.msg) {
            message.success("Client created successfully!")
        }
        setLoading(false)
        reset()
        onCancel()
        refresh(prev => !prev)
    }

    const closeModal = () => {
        onCancel();
        reset();
    }

    return (
        <Modal
            title="New Client"
            open={visible}
            onCancel={closeModal}
            footer={[
                <button onClick={closeModal}>
                    Cancel
                </button>
            ]}>
            <form onSubmit={handleSubmit(onSubmitAddUser)} className='max-w-[300px]'>
                {loading ? <div className='flex justify-center'><div className='loader'></div></div> :
                    <div className="flex flex-col gap-4">
                        <input placeholder='Email' {...register("email", { required: true })} className='text-white bg-transparent border-transparent border-b-black border-[1px] font-light mt-5' />
                        {errors.email && <span className='text-red-400'>This field is required</span>}
                        <input placeholder='Password' {...register("password", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                        {errors.password && <span className='text-red-400'>This field is required</span>}
                        <input placeholder='Name' {...register("name", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                        {errors.name && <span className='text-red-400'>This field is required</span>}
                        <input placeholder='Lastname' {...register("lastname", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                        {errors.lastname && <span className='text-red-400'>This field is required</span>}
                        <div className='flex'>
                            <label className='font-light mr-3'>Select a plan:</label>
                            <select {...register("plan", { required: true })} className='bg-transparent font-extralight'>
                                <option value="Basic">Basic</option>
                                <option value="Pro">Pro</option>
                                <option value="Plus">Plus</option>
                            </select>
                            {errors.plan && <span className='text-red-400'>This field is required</span>}
                        </div>
                        <div className='justify-center flex'>
                            <button type='submit' className='w-20'>
                                Create
                            </button>
                        </div>
                    </div>
                }
            </form>
        </Modal>
    )
}

export default ModalClient