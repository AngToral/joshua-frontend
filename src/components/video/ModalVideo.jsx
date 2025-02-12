import Modal from 'antd/es/modal/Modal'
import React from 'react'
import './../../App.scss'

const ModalVideo = ({ visible, onCancel, refresh, videoId }) => {


    return (
        <>
            <Modal
                title="Video"
                open={visible}
                onCancel={onCancel}
                footer={[
                    <button onClick={onCancel}>
                        Cancel
                    </button>
                ]}
            >
                <div>ModalVideo</div>
            </Modal>
        </>
    )
}

export default ModalVideo