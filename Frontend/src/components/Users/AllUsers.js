import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL } from '../../common/constants';
import UserContext from '../../providers/UserContext';
import UserAdminView from '../AdminViews/UserAdminView';
import "./AllUsers.scss"


const AllUsers = () => {
    const [error, setError] = useState(null);
    const [appUsers, updateUsers] = useState([]);
    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    useEffect(() => {

        fetch(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            }
        })
            .then((response) => response.json())
            .then((result) => {
                if (Array.isArray(result)) {
                    console.log('users', result);
                    const users = result.filter(u => u.id !== loggedUser.id);
                    updateUsers(users);
                } else {
                    throw new Error(result.message);
                }
            })
            .catch((error) => setError(error.message))
    }, []);


    const toggleUserRights = (userId) => {
        fetch(`${BASE_URL}/users/${userId}/role`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.message);
                }
                const newUsers = appUsers.map(user => user.id === userId ? user = result : user);
    
                updateUsers(newUsers);
            })
            .catch((error) => console.log(error.message));
      }

      const toggleDeleteUser = (userId) => {
        fetch(`${BASE_URL}/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.message);
                }
                const newUsers = appUsers.map(user => user.id === userId ? user = result : user);
    
                updateUsers(newUsers);
            })
            .catch((error) => console.log(error.message));
      }


      return (<div className='allUsers'>
            {appUsers &&
                    appUsers.map((user) => (<div>
                        <UserAdminView key={user.id} user={user} toggleUserRights={toggleUserRights} toggleDeleteUser={toggleDeleteUser}></UserAdminView>
                    </div>))}
         </div>);
}


export default AllUsers;