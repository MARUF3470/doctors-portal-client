import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
const ApointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <section className='mt-10'>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} alt='' className=" w-1/2 rounded-lg shadow-2xl" />
                    <div className='mr-10'>
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ApointmentBanner;