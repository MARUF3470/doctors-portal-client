import React from 'react';

const InfoCard = ({ card }) => {
    const { icon, bgClass, name, description } = card
    console.log(icon)
    return (
        <div className={`card card-side bg-base-100 shadow-xl ${bgClass} px-6 mt-6 text-white`}>
            <figure><img src={icon} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;