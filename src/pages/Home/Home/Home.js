import React from 'react';
import ContactUs from '../../ContactUs/ContactUs';
import Banner from '../Banner/Banner';
import InfoCards from '../InfoCards/InfoCards';
import MakeApointment from '../MakeApointment/MakeApointment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <MakeApointment></MakeApointment>
            <Testimonial></Testimonial>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;