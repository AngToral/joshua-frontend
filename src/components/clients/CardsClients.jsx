import { FaExclamationTriangle, FaRegEdit } from "react-icons/fa"
import { RiDeleteBinLine } from "react-icons/ri"
import './cardsClients.css'
import { deleteUser, updateUser } from "../../apiService/userApi"
import { message } from "antd"
import { Popover, PopoverContent, PopoverHandler, button } from "@material-tailwind/react"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

const VALID_PLANS = ['Plus', 'Pro', 'Basic'];

const CardsClients = ({ client, refresh, clientId, visible }) => {

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: client.name,
            lastname: client.lastname,
            email: client.email,
            plan: client.plan,
        }
    });

    useEffect(() => {
        reset({
            name: client.name,
            lastname: client.lastname,
            email: client.email,
            plan: client.plan,
            status: client.status
        });
    }, [client, reset]);

    const [inputAble, setInputAble] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const onDelete = async (id) => {
        console.log("elimino id: ", id)
        await deleteUser(id)
        refresh(prev => !prev);
        message.success("Client deleted successfully!")
    }

    const onEdit = (id) => {
        console.log("edito id: ", id)
        setInputAble(!inputAble);
        setSelectedClient(id);
    }

    const onSubmit = async (data) => {
        console.log(data)
        setInputAble(!inputAble);
        await updateUser(selectedClient, data)
        message.success("Client edited successfully!")
    }

    return (
        <>
            <div className="cardClient">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-4 mt-4 items-center">
                        <img className="rounded-full md:h-28 md:w-28 h-[85px] w-[85px] object-cover border-grey-500 border-2" src={client.profilePic} />
                        <div className="flex gap-4">
                            <button onClick={() => onEdit(client._id)}>
                                {!inputAble ? <IoMdArrowRoundBack className='h-5 w-5' /> : <FaRegEdit className='h-5 w-5' />}
                            </button>
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
                                {client.status === "active" ? "🟢 " : "🔴 "}
                                <input disabled value={" " + client.status} {...register("status", { required: true })} className='bg-transparent border-transparent border-[1px] font-light' />
                            </p>
                            {!inputAble &&
                                <button className="flex justify-end" type='submit'><FaRegCircleCheck className='h-5 w-5' /></button>
                            }
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default CardsClients