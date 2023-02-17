import axios from 'axios';
import React, {useState, useEffect} from "react";

import UserRowInterface from '../UI/User/UserRowInterface';

export default () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then((response) => {
                setUsers(response.data);
            })
    }, []);
    
    return(
        <>
            {
                users.map((user) => (
                    <UserRowInterface user={user} />
                )) 
            }
        </>
    );
}