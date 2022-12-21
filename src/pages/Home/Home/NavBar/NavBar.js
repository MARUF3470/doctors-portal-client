import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthProvider/AuthProvider';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext)
    const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch(error => console.error(error))
    }
    const menu = <>
        <li><Link to='/' className='btn btn-ghost'>Home</Link></li>
        <li><Link className='btn btn-ghost'>About</Link></li>
        <li><Link to='/appointment' className='btn btn-ghost'>Appointment</Link></li>

        {
            user?.email ? <> <li><Link to='/dashboard' className='btn btn-ghost'>Dashboard</Link></li><li><button onClick={handleLogOut} className='btn btn-ghost'> Logout </button></li></> : <><Link to='/login' className='btn btn-ghost'>Login</Link></>
        }

    </>
    return (

        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>

                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
                <label htmlFor="my-drawer-2" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>

            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menu}
                </ul>
            </div>
        </div>

    );
};

export default NavBar;