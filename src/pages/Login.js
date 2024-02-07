import React, {useContext, useState} from 'react';
import './styles.css';
import axios from "axios";

function Login() {
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    return (
        <div className="container">
            <h1>Login</h1>
            <form className='form'>
                <input
                    type='text'
                    placeholder='Username...'
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password...'
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button onClick={async (event)=>{
                    event.preventDefault()

                    await axios.post('http://localhost:8081/login', {"username":username, "password":password})
                        .then(res=> {
                            console.log(res.data);
                            alert(res.data)
                            localStorage.setItem('username', username)

                        }).catch(e=> {
                            alert('Error while logging in')
                            console.log(e)
                        })
                }}>Login</button>

            </form>
        </div>
    )
}

export default Login;
