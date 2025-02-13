import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBinLine } from "react-icons/ri"
import './cardsClients.css'

const CardsClients = ({ client }) => {
    return (
        <>
            <div className="cardClient">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-4 mt-4 items-center">
                        <img className="rounded-full md:h-28 md:w-28 h-[85px] w-[85px] object-cover border-grey-500 border-2" src={client.profilePic} />
                        <div className="flex gap-4">
                            <button><FaRegEdit className='h-5 w-5' /></button>
                            <button><RiDeleteBinLine className='h-5 w-5' /></button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p><strong>Name: </strong>{client.name}</p>
                        <p><strong>Lastname: </strong>{client.lastname}</p>
                        <p><strong>Email: </strong>{client.email}</p>
                        <p><strong>Plan: </strong>{client.plan}</p>
                        <p><strong>Status: </strong>{client.status}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsClients