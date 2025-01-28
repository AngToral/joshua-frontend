import './cardsTrainings.css'

const CardsTrainings = ({ video }) => {



    return (
        <>
            <div className='card flex flex-col gap-1'>
                <p className='text-xl'>{video.tittle}</p>
                <p>Category: {video.category}</p>
                <p>{video.description}</p>
                <iframe className='rounded-lg' width="400" height="200" src={video.url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </>
    )
}

export default CardsTrainings