import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    console.log(token)

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(data.email);
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-2xl'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input   {...register("email", { required: 'Email address is required' })} type="text" className="input input-bordered w-full max-w-xs" />
                        {errors.email?.type === 'required' && <p className='text-warning'>Email Address is required</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input   {...register("password", { required: 'Password is required', minLength: 6 })} type="password" className="input input-bordered w-full max-w-xs" />
                        {errors.password?.type === 'required' && <p className='text-warning'>password is required</p>}
                        {errors.password && errors.password.type === "minLength" && <span className='text-warning'>Password must be 6 charecters or more</span>}
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                    </div>
                    {
                        <p className='text-red-500'>{loginError.split('Firebase:')}</p>
                    }

                    {/* <textarea {...register("aboutYou")} placeholder="About you" /> */}
                    <input className='btn w-full' type="submit" value='Login' />
                </form>
                <p>New to Doctors Portal? <Link to='/signup' className='text-accent'>Create New Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>Google Login</button>
            </div>
        </div>
    );
};

export default Login;