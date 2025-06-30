import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useState } from 'react'
import './../../App.scss'
import './../../pages/Dashboard/dashboard.css'
import { useForm } from 'react-hook-form';
import { addTraining, getTrainingId, updateTraining } from '../../apiService/trainingApi';
import { message } from 'antd';

const ModalVideo = ({ visible, onCancel, refresh, videoId }) => {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (videoId) {
            getTrainingData(videoId)
        }
    }, [videoId]);

    const getTrainingData = async (videoId) => {
        console.log(videoId)
        const data = await getTrainingId(videoId)
        console.log(data)
        //esta data la tengo que meter en el form
        setValue("url", data.url)
        setValue("tittle", data.tittle)
        setValue("description", data.description)
        setValue("category", data.category)
    }

    const onSubmitEditVideo = async (data) => {
        const { url, tittle, description, category } = data
        console.log(url, tittle, description, category)
        setLoading(true)
        if (videoId) {
            await updateTraining(videoId, { url, tittle, description, category })
            messageApi.open({
                type: 'success',
                content: "Video edited successfully",
            })
        } else {
            await addTraining({ url, tittle, description, category })
            messageApi.open({
                type: 'success',
                content: "Video created successfully",
            })
        }
        setLoading(false)
        reset()
        onCancel()
        refresh(prev => !prev)
    }

    const cancel = () => {
        onCancel();
        reset();
    }

    return (
        <>
            {contextHolder}
            <Modal
                title={videoId ? "Edit Video" : "New Video"}
                open={visible}
                onCancel={cancel}
                footer={[
                    <button onClick={cancel}>
                        Cancel
                    </button>
                ]}
            >
                <form onSubmit={handleSubmit(onSubmitEditVideo)} className='max-w-[300px]'>
                    {loading ? <div className='flex justify-center'><div className='loader'></div></div> :
                        <div className="flex flex-col gap-4">
                            <input placeholder='URL' {...register("url", { required: true })} className='text-white bg-transparent border-transparent border-b-black border-[1px] font-light mt-5' />
                            {errors.url && <span className='text-red-400'>This field is required</span>}
                            <input placeholder='Tittle' {...register("tittle", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                            {errors.tittle && <span className='text-red-400'>This field is required</span>}
                            <input placeholder='Description' {...register("description", { required: true })} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                            {errors.description && <span className='text-red-400'>This field is required</span>}
                            <div className='flex'>
                                <label className='font-light mr-3'>Select a category:</label>
                                <select {...register("category", { required: true })} className='bg-transparent font-extralight'>
                                    <option value="Private sessions">Private sessions</option>
                                    <option value="Small group">Small group</option>
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                    <option value="At home">At home</option>
                                </select>
                                {errors.category && <span className='text-red-400'>This field is required</span>}
                            </div>
                            <button type='submit'>
                                {videoId ? "Edit" : "Create"}
                            </button>
                        </div>
                    }
                </form>
            </Modal>
        </>
    )
}

export default ModalVideo