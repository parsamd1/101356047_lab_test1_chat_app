import React, {useContext, useState} from 'react';
import './styles.css';
import axios from 'axios'
import LoginContext from "../context/LoginContext";

function Signup() {
    const {count, setCount}=useContext(LoginContext)
    const [username, setUsername]=useState('')
    const [firstname, setFirstname]=useState('')
    const [lastname, setLastname]=useState('')
    const [password, setPassword]=useState('')
    // const [count, setCount]=useState(0)
    return (
        <div className="container">
            <h1>Signup</h1>
            <div className="form">
                <input
                    type='text'
                    placeholder='First Name...'
                    onChange={event => setFirstname(event.target.value)}
                />
                <input
                    type='text'
                    placeholder='Last Name...'
                    onChange={event => setLastname(event.target.value)}
                />
                <input
                    type='text'
                    placeholder='Username...'
                    onChange={e=>setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password...'
                    onChange={e=>setPassword(e.target.value)}
                />
                <button
                        onClick={async (event)=>{
                        event.preventDefault()
                        if (firstname!=='' && username!=='' && password !== '' && lastname!==''){
                            // Adding backend handling HEREEEE!!!!
                            // Adding user credentials to the database

                            await axios.post('http://localhost:8081/signup', {"username":username, "firstname":firstname ,"password":password, "lastname":lastname, "createon":Date.now()})
                                .then(res=>{
                                    console.log(res.data);
                                    alert("User successfully registered");
                                    // setRegistered(true)
                                })
                                .catch(e=> {
                                    alert('Error while signing up')
                                    console.log('The error is: ' + e)
                                })


                            // ****************************************
                        }
                    }}
                >Signup
                </button>
            </div>
            <div className="switch-link">
                <button
                    onClick={(event)=>{event.preventDefault();
                        localStorage.setItem('loginPage', 'true')
                        setCount(count+1)
                    }}
                >Go to login page</button>
            </div>
        </div>
    );
}

export default Signup;
