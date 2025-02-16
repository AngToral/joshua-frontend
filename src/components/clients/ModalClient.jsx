import { Modal } from 'antd'
import React from 'react'

const ModalClient = ({ visible, onCancel }) => {
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={[
                <button onClick={onCancel}>
                    Cancel
                </button>
            ]}>
            Nuevo cliente
        </Modal>
    )
}

export default ModalClient