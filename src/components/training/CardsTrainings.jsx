import './cardsTrainings.css'

const CardsTrainings = ({ video }) => {



    return (
        <>
            <div className='card flex flex-col gap-1'>
                <iframe className='rounded-xl' width="400" height="200" src={video.url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <p className='text-xl font-bold mt-2'>{video.tittle}</p>
                <p>Category: {video.category}</p>
                <p>{video.description}</p>
            </div>
        </>
    )
}

export default CardsTrainings