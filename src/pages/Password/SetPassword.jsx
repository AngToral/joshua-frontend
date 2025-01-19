import { message } from 'antd';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const SetPassword = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();

    const { userId } = useParams();


    return (
        <>
            {contextHolder}
            <div className="flex justify-center items-center h-screen">
                <div className="login">
                    <p className="text-4xl mb-6 flex justify-center">Set new password!</p>
                    <form
                    >
                        <input type="text" placeholder='Password' />
                        <input type="text" placeholder='Confirm password' />

                        <button>
                            {loading ? "Loading..." : 'Set new'}
                        </button>

                        <button onClick={() => navigate('/login')}>
                            Go to Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SetPassword