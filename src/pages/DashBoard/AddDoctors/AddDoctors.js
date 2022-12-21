import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddDoctors = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    //console.log(imgHostKey)

    const handleAddDoctor = data => {
        //   console.log(data.img[0])
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData)
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        spaciality: data.specialty,
                        photo: imgData.data.url,
                    }
                    fetch('https://doctors-portal-server-psi-opal.vercel.app/doctors', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success('New Doctor in the town')
                            }
                        })
                }
            })
    }
    const { data: spacialities = [], isLoading } = useQuery({
        queryKey: ['appointmentSpaciality'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-psi-opal.vercel.app/appointmentSpaciality')
            const data = await res.json()
            return data
        }
    })
    // console.log(spacialities)
    return (
        <div className='w-96 p-7'>
            <h1>Add Doctors</h1>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register('name', { required: true })} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-warning'>Use A valid user name</p>}

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
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register('specialty')} className="select select-bordered w-full max-w-xs">
                        {/* <option disabled selected>Spaciality</option> */}
                        {
                            spacialities.map(spaciality => <option key={spaciality._id} value={spaciality.name}>{spaciality.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" {...register('img', { required: 'img is required' })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-warning'>{errors.img.message}</p>}

                </div>

                {/* <textarea {...register("aboutYou")} placeholder="About you" /> */}
                <input className='btn w-full mt-2' type="submit" value='Add A Doctor' />
            </form>
        </div>
    );
};

/**
 * Three places to store images
 * 1. img hosting server
 * 2. file system of your server
 * 3. mongodb 
 */

export default AddDoctors;