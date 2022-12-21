import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signUp, upadeteUserProfile } = useContext(AuthContext)
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate()
    if (token) {
        navigate('/')
    }
    const handleSignUp = data => {
        console.log(data)
        signUp(data.email, data.password)
            .then(res => {
                const user = res.user;
                const profile = {
                    displayName: data.name,
                    photoURL: data.photoURL,
                }
                toast('User Created Successfully.')
                upadeteUserProfile(profile)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.error(err))
    }

    const saveUser = (name, email) => {
        const user = {
            name: name,
            email: email
        }
        fetch('https://doctors-portal-server-psi-opal.vercel.app/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
            })
    }


    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-2xl'>SignUp</h1>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register('name', { required: true })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-warning'>Use A valid user name</p>}

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">PhotoURL</span>
                        </label>
                        <input type="text" {...register('photoURL', { required: true })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-warning'>Add a photoURL</p>}

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register('email', { required: 'Email is required' })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-warning'>{errors.email.message}</p>}

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register('password', {
                            required: 'Password is required', minLength: 6, pattern: {
                                value: /((?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]))/,
                                message: "select a strong password, must include a uppercase, spacial charecter, and any digit"
                            }
                        })} className="input input-bordered w-full max-w-xs" />
                        {
                            errors.password && errors.password.type === 'required' && <p className='text-warning'>{errors.password.message}</p>
                        }
                        {
                            errors.password && errors.password.type === 'pattern' && <p className='text-warning'>{errors.password.message}</p>
                        }
                        {
                            errors.password && errors.password.type === 'minLength' && <p className='text-warning'>Password must be 6 or more than that</p>
                        }
                    </div>

                    {/* <textarea {...register("aboutYou")} placeholder="About you" /> */}
                    <input className='btn w-full mt-2' type="submit" value='SignIn' />
                </form>
                <p>Already have an account?<Link to='/login' className='text-accent '>SignIn</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>Google Login</button>
            </div>
        </div>
    );
};

export default SignUp;