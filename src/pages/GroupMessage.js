import React, {useContext, useEffect, useState} from 'react';
import './styles.css';
import axios from "axios";
import LoginContext from "../context/LoginContext";
import GroupMessageModel from '../models/GroupMessageModel'
import {io} from "socket.io-client";
import socket from "../IOClient";
// import socket from "../IOClient";


function GroupMessage() {

    const chatSection = io('http://localhost:8081');


    const {count, setCount}=useContext(LoginContext)
    const username=localStorage.getItem('username')
    let [room, setRoom]=useState('')
    let temp=''
    let temp2=''
    // const [text, setText]=useState('')
    const [listChat, setListChat]=useState([])
    const [data, setData]=useState([])

    useEffect( ()=>{
        console.log('GroupMessage rendered')

        chatSection.on('connect', '')
        chatSection.on('welcome message', data=>alert(data))
        chatSection.emit('username', username)

        axios.post('http://localhost:8081/chatinfo', {"room":room})
            .then((res)=>{
                console.log(res.data)
                // res.data.forEach((chat)=>{
                //     data+=chat.from_user+': '+chat.message+'  '+reformat_time(chat.date_sent)+'<br>'
                // })
                setData(res.data)
            })
            .catch(e=>{
                console.log(e)
                alert(e)
            })

    }, [room])

    function reformat_time(date) {
        // Get the current timestamp in milliseconds
        // Create a Date object from the timestamp
        const currentDate = new Date(date);

        // Get hours and minutes
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');

        // Format the time as "hh:mm"
        const formattedTime = `${hours}:${minutes}`;

        return formattedTime;
    }

    function chatRoom() {
        data.forEach((chat)=>{
            document.getElementById('write_here').innerHTML+=chat.from_user+': '+chat.message+'  '+reformat_time(chat.date_sent)+'<br>'
        })
        return(
            <div className="container">
                <h1>Chat Box</h1>
                <form className='form'>

                    <div id='write_here' style={{paddingBottom: '25px'}}></div>

                    <div>
                        <label>{username}: </label>
                        <input type='text' placeholder='Write something...'
                               onChange={(event) => {
                                   event.preventDefault();
                                   temp2 = event.target.value
                               }}
                        />
                    </div>

                    <button onClick={async (event) => {
                        event.preventDefault();
                        const newObj_group_msg = new GroupMessageModel({
                            from_user: username,
                            room: room,
                            message: temp2,
                            date_sent: Date.now()
                        })
                        await axios.post('http://localhost:8081/chat', newObj_group_msg)
                            .then(res => {
                                console.log(res.data)
                                document.getElementById('write_here').innerHTML += username + ': ' + temp2 + '   ' + reformat_time(Date.now()) + '<br>'
                                chatSection.emit('message sent', `user ${username} said: ${temp2}`)
                            })
                            .catch(e => {
                                console.log(e)
                                alert(e)
                            })

                    }}>Post
                    </button>

                    <button onClick={(event) => {
                        event.preventDefault();
                        setRoom('')
                        setCount(count + 1)
                    }}>leave room
                    </button>

                </form>

                <button onClick={(event) => {
                    event.preventDefault();
                    localStorage.removeItem('username')
                    setCount(count + 1)
                }}>Log Out
                </button>

            </div>
        )
    }

    function menu() {
        return (
            <div className="container">
                <h1>Chat Room</h1>
                <form className='form'>
                <select id="room" name="room"
                            onChange={(event) => {
                                event.preventDefault()
                                temp=event.target.value
                                localStorage.setItem('room', event.target.value)
                            }}
                    >
                        <option value=''>--</option>
                        <option value="devops">DevOps</option>
                        <option value="cloud_computing">Cloud Computing</option>
                        <option value="covid19">Covid-19</option>
                        <option value="sports">Sports</option>
                        <option value="nodejs">NodeJS</option>
                    </select>
                    <button onClick={(event) => {
                        event.preventDefault();
                        chatSection.emit('room joined', username+` joined room ${temp}`)
                        setRoom(temp)
                        setCount(count + 1)
                    }}>Join room</button>

                </form>

                <button onClick={(event)=>{event.preventDefault();
                localStorage.removeItem('username')
                    setCount(count+1)
                }}>Log Out</button>

            </div>
        )
    }

    function toShow() {
        if (room === ''){
            return menu()
        }
        else {
            return chatRoom()
        }
    }

    return toShow()
}

export default GroupMessage;
