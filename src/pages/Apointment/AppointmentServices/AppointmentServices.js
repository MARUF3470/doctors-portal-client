import React from 'react';

const AppointmentServices = ({ services, setTreatment }) => {
    const { name, slots, price } = services
    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <h2 className="text-xl font-medium  text-green-400 text-center">{name}</h2>
                <h2 className="text-xl font-medium  text-green-400 text-center">price: ${price}</h2>
                <p className='text-center'>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                <p className='text-center'>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <div className="card-actions justify-center">

                    <label htmlFor="booking-modal" onClick={() => setTreatment(services)} className={`${slots.length > 0 ? 'btn btn-success font-bold text-white' : 'btn btn-disabled'}`}>Booking Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentServices;