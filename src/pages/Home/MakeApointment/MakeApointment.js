import React from 'react';

import doctor from '../../../assets/images/doctor.png'
import appointment from '../../../assets/images/appointment.png'
import Button from '../../../component/Button/Button';

const MakeApointment = () => {
    return (
        <section className='mt-24'>
            <div className="hero text-white" style={{ backgroundImage: `url(${appointment})` }}>
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} alt='' className="w-1/2 md:block hidden md:-mt-20 lg:-mt-40 rounded-lg" />
                    <div>
                        <p className='text-primary font-bold text-lg'>Appointment</p>
                        <h1 className="text-4xl font-bold">Make an appointment Today</h1>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <Button>Get Started</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeApointment;