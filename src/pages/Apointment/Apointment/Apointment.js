import React, { useState } from 'react';
import ApointmentBanner from '../ApointmentBanner/ApointmentBanner';
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment';

const Apointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date)
    return (
        <div>
            <ApointmentBanner setSelectedDate={setSelectedDate} selectedDate={selectedDate} ></ApointmentBanner>
            <AvailableAppointment selectedDate={selectedDate} ></AvailableAppointment>
        </div>
    );
};

export default Apointment;