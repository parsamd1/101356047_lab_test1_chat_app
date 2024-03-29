import React, {useContext, useEffect, useState} from 'react';
import './styles.css';
import axios from "axios";
import LoginContext from "../context/LoginContext";
// import { redirect } from 'react-router-dom';


function Login() {
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const {count, setCount}=useContext(LoginContext)


    return (
        <div className="container">
            <h1>Login</h1>
            <form className='form'>
                <input
                    type='text'
                    placeholder='Username...'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password...'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={async (event) => {
                    event.preventDefault()

                    await axios.post('http://localhost:8081/login', {"username": username, "password": password})
                        .then(res => {
                            console.log(res.data);
                            alert(res.data)
                            localStorage.setItem('username', username)
                            // return redirect('http://localhost:8081/chat')
                            setCount(count+1)

                        }).catch(e => {
                            alert('Error while logging in')
                            console.log(e)
                        })
                }}>Login
                </button>

            </form>
            <div className="switch-link">
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        localStorage.removeItem('loginPage')
                        setCount(count+1)
                    }}
                >Go to Signup page
                </button>
            </div>
        </div>
    )
}

export default Login;
