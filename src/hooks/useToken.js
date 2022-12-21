import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        console.log('email', email)
        if (email) {
            fetch(`https://doctors-portal-server-psi-opal.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log('token data', data)
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        setToken(data.accessToken);
                    }
                });
        }
    }, [email]);
    return [token];
}
export default useToken;