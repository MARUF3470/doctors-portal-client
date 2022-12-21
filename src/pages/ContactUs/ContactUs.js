import React from 'react';
import img from '../../assets/images/appointment.png';
const ContactUs = () => {
    return (
        <div className='md:p-32' style={{ background: `url(${img})` }}>
            <div className='w-1/2 mx-auto '>
                <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full block" />
                <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full block my-6" />
                <textarea className="textarea textarea-primary w-full" placeholder="Bio"></textarea>
            </div>
        </div>
    );
};

export default ContactUs;