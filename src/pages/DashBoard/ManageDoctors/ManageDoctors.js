import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../ConfirmationModal/ConfirmationModal';
import Loading from '../../Loading/Loading';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null)
    const { data: doctors = [], isLoading, refetch } = new useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-psi-opal.vercel.app/doctors', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    const closeModal = () => {
        setDeleteDoctor(null)
    }
    const handleDeleteDoctor = doctor => {
        console.log(doctor)
        fetch(`https://doctors-portal-server-psi-opal.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Doctor ${doctor.name} deleted succesfully`)
                }
            })
    }
    return (
        <div>
            <h4 className="text-xl">Total Doctors {doctors?.length}</h4>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Spacialised</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td> <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={doctor.photo} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div></td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.spaciality}</td>
                                <td> <label htmlFor="my-modal" onClick={() => setDeleteDoctor(doctor)} className="btn btn-sm btn-error">Delete</label></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleteDoctor && <ConfirmationModal title={`Are you sure you want to delete?`} message={`if you delete ${deleteDoctor.name}. it can't be undone `} closeModal={closeModal} successAction={handleDeleteDoctor} modalData={deleteDoctor}></ConfirmationModal>
            }

        </div >
    );
};

export default ManageDoctors;