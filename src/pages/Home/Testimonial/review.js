import React from 'react';

const Review = ({ review }) => {
    const { name, img, review: patientReview, location } = review
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">

                <p className='text-lg'>{patientReview}</p>
                <div className="card-actions flex justify-start">
                    <div>
                        <div className="avatar">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={img} className='w-16 ' alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-xl font-bold'>{name}</p>
                        <p>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;