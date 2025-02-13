import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useState } from 'react'
import './../../App.scss'
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

    return (
        <>
            {contextHolder}
            <Modal
                title="New/edit Video"
                open={visible}
                onCancel={onCancel}
                footer={[
                    <button onClick={onCancel}>
                        Cancel
                    </button>
                ]}
            >
                <form onSubmit={handleSubmit(onSubmitEditVideo)} className='max-w-[300px]'>
                    <div className="flex flex-col gap-4">
                        <input placeholder='URL' {...register("url")} className='text-white bg-transparent border-transparent border-b-black border-[1px] font-light mt-5' />
                        <input placeholder='Tittle' {...register("tittle")} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                        <input placeholder='Description' {...register("description")} className='bg-transparent border-transparent border-b-black border-[1px] font-light' />
                        <div className='flex'>
                            <label className='font-light mr-3'>Select a category:</label>
                            <select {...register("category")} className='bg-transparent font-extralight'>
                                <option value="Cardio">Cardio</option>
                                <option value="Boxing">Boxing</option>
                                <option value="Nutrition">Nutrition</option>
                                <option value="Injuries">Injuries</option>
                                <option value="Stretching">Stretching</option>
                            </select>
                        </div>
                        <button type='submit'>
                            {loading ? "Loading..." : "Ok"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default ModalVideo