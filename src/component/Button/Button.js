import React from 'react';

const Button = ({ children }) => {
    return (
        <div>
            <button className="btn btn-primary bg-gradient-to-r from-blue-500 to-green-400 border-0">{children}</button>
        </div>
    );
};

export default Button; 