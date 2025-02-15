import { FaExclamationTriangle, FaRegEdit } from "react-icons/fa"
import { RiDeleteBinLine } from "react-icons/ri"
import './cardsClients.css'
import { deleteUser } from "../../apiService/userApi"
import { message } from "antd"
import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react"
import { useForm } from "react-hook-form"

const CardsClients = ({ client, refresh, clientId, visible }) => {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const onDelete = async (id) => {
        console.log("elimino id: ", id)
        await deleteUser(id)
        refresh(prev => !prev);
        message.success("Client deleted!")
    }

    const onEdit = async (id) => {
        console.log("edito id: ", id)
        clientId(prev => id)
        visible(prev => !prev);
    }

    return (
        <>
            <div className="cardClient">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-4 mt-4 items-center">
                        <img className="rounded-full md:h-28 md:w-28 h-[85px] w-[85px] object-cover border-grey-500 border-2" src={client.profilePic} />
                        <div className="flex gap-4">
                            <button onClick={() => onEdit(client._id)}><FaRegEdit className='h-5 w-5' /></button>
                            <Popover>
                                <PopoverHandler>
                                    <button><RiDeleteBinLine className='h-5 w-5' /></button>
                                </PopoverHandler>
                                <PopoverContent className="flex flex-col bg-joshua-50 p-3">
                                    <div className="flex text-black gap-2 items-center">
                                        <FaExclamationTriangle className='h-5 w-5 text-red-600' /> Are you sure you want to delete this?
                                    </div>
                                    <button className="text-black mt-3 font-bold" onClick={() => onDelete(client._id)}>Yes!</button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <form>
                            <p><strong>Name: </strong>
                                <input disabled value={" " + client.name} {...register("name", { required: true })} className='bg-transparent border-transparent border-[1px] font-light' />
                            </p>
                            <p><strong>Lastname: </strong>
                                <input disabled value={" " + client.lastname} {...register("lastname", { required: true })} className='bg-transparent border-transparent border-[1px] font-light' />
                            </p>
                            <p><strong>Email: </strong>
                                <input disabled value={" " + client.email} {...register("email", { required: true })} className='bg-transparent border-transparent border-[1px] font-light' />
                            </p>
                            <p><strong>Plan: </strong>
                                <input disabled value={" " + client.plan} {...register("plan", { required: true })} className='bg-transparent border-transparent border-[1px] font-light' />
                            </p>
                            <p><strong>Status: </strong>
                                {client.status === "active" ? "🟢" : "🔴"}
                                <input disabled value={" " + client.status} {...register("status", { required: true })} className='bg-transparent border-transparent border-[1px] font-light' />
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsClients