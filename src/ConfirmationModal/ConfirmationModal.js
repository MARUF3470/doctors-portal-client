import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, modalData, successAction }) => {
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn" onClick={() => successAction(modalData)}>Confirm</label>
                        <label htmlFor="my-modal" onClick={closeModal} className="btn btn-outline">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;