
import './cardsTrainings.css'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import { FaExclamationTriangle } from "react-icons/fa";
import { deleteTraining } from '../../apiService/trainingApi';
import { message } from 'antd';



const CardsTrainings = ({ video, refresh, userType }) => {



    const onDelete = async (id) => {
        console.log("elimino id: ", id)
        await deleteTraining(id)
        refresh(prev => !prev);
        message.success("Video deleted!")
    }

    return (
        <>
            <div className='card flex flex-col gap-1'>
                <iframe className='rounded-xl' width="400" height="200" src={video.url} frameborder="0" allow="fullscreen"></iframe>
                <p className='text-xl font-bold mt-2'>{video.tittle}</p>
                <p>Category: {video.category}</p>
                <p>{video.description}</p>
                {userType === "admin" ?
                    <div className='flex justify-end gap-4'>
                        <button ><FaRegEdit className='h-5 w-5' /> </button>
                        <Popover>
                            <PopoverHandler>
                                <button ><RiDeleteBinLine className='h-5 w-5' /></button>
                            </PopoverHandler>
                            <PopoverContent className="flex flex-col bg-joshua-50 p-3">
                                <div className="flex text-black gap-2 items-center">
                                    <FaExclamationTriangle className='h-5 w-5 text-red-600' /> Are you sure you want to delete this?
                                </div>
                                <button className="text-black mt-3 font-bold" onClick={() => onDelete(video._id)}>Yes!</button>
                            </PopoverContent>
                        </Popover>
                    </div>
                    : null
                }
            </div>
        </>
    )
}

export default CardsTrainings