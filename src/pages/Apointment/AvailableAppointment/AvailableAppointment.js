import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../../Loading/Loading';
import AppointmentServices from '../AppointmentServices/AppointmentServices';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointment = ({ selectedDate }) => {
    //const [appointmentOptions, SetAppointmentOptions] = useState([])
    const [treatment, setTreatment] = useState(null)
    const date = format(selectedDate, 'PP')
    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentCollection', date],
        queryFn: () => fetch(`https://doctors-portal-server-psi-opal.vercel.app/appointmentCollection?date=${date}`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    // useEffect(() => {
    //     fetch('https://doctors-portal-server-psi-opal.vercel.app/appointmentCollection')
    //         .then(res => res.json())
    //         .then(data => SetAppointmentOptions(data))
    // })
    return (
        <div className=' my-16'>
            <p className='text-center mt-6 text-green-400 font-bold'>You have selected date : {format(selectedDate, 'PP')}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-4'>
                {
                    appointmentOptions.map(services => <AppointmentServices key={services._id} services={services} setTreatment={setTreatment}></AppointmentServices>)
                }
            </div>
            {
                treatment && <BookingModal treatment={treatment} setTreatment={setTreatment} selectedDate={selectedDate} refetch={refetch}></BookingModal>
            }
        </div>
    );
};

export default AvailableAppointment;