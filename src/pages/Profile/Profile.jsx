import React, { useEffect } from 'react'

const Profile = () => {

    useEffect(() => {
        document.body.style.backgroundColor = "#545b66"
    }, []);

    return (
        <div>Profile</div>
    )
}

export default Profile