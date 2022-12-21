import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name: treatmentName, slots, price } = treatment
    const { user } = useContext(AuthContext)
    const date = format(selectedDate, 'PP')
    const handleModalSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const slot = form.slot.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const booking = {
            appointmentDate: date,
            treatment: treatmentName,
            slot,
            patient: name,
            email,
            phone,
            price

        }
        //TODO: After sending the data to the database close the modal

        fetch('https://doctors-portal-server-psi-opal.vercel.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(req => req.json())
            .then(data => {
                console.log(data)
                if (data?.acknowledged) {
                    setTreatment(null)
                    toast.success('booking confirmd')
                    refetch()
                }
                else {
                    toast.error(data.message)
                }
            })
        console.log(booking)
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={handleModalSubmit} className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    <div className=' mt-2' >
                        <input type="text" placeholder="Type here" defaultValue={date} disabled className="input  input-bordered w-full" />
                        <select name='slot' className="select select-bordered my-2 w-full">
                            {
                                slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" required name='name' defaultValue={user?.displayName} disabled placeholder="Full name" className="input  input-bordered w-full" />
                        <input type="email" name='email' placeholder="Email" defaultValue={user?.email} disabled className="input mt-2  input-bordered w-full" required />
                        <input type="text" name='phone' placeholder="Phone Number" className="input  input-bordered w-full my-2" required />
                        <input className='btn btn-accent w-full text-white my-2' type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default BookingModal;