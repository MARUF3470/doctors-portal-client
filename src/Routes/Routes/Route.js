import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main"
import Apointment from "../../pages/Apointment/Apointment/Apointment";
import AddDoctors from "../../pages/DashBoard/AddDoctors/AddDoctors";
import AllUsers from "../../pages/DashBoard/AllUsers/AllUsers";
import ManageDoctors from "../../pages/DashBoard/ManageDoctors/ManageDoctors";
import MyAppointement from "../../pages/DashBoard/MyAppointment/MyAppointement";
import MyBookings from "../../pages/DashBoard/MyBookings/MyBookings";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/Login/SignUp";
import ErrorPage from "../../pages/shared/ErrorPage";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/appointment',
                element: <Apointment></Apointment>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointement></MyAppointement>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/adddoctors',
                element: <AdminRoute><AddDoctors></AddDoctors></AdminRoute>
            },
            {
                path: '/dashboard/doctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
            {
                path: '/dashboard/bookings/:id',
                loader: ({ params }) => fetch(`https://doctors-portal-server-psi-opal.vercel.app/bookings/${params.id}`),
                element: <MyBookings></MyBookings>
            }
        ]
    }
])

export default router;