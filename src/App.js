import logo from './logo.svg';
import './App.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {useState} from "react";
import LoginContext from "../src/context/LoginContext"
import GroupMessage from "./pages/GroupMessage";


function App() {
    const [count, setCount]=useState(0)

    function loginPage(){
        return localStorage.getItem('loginPage')
    }
    function checkForLocalItem(){
        return localStorage.getItem('username')
    }

    function toShow(){
        if (checkForLocalItem() == null && loginPage()==null){
            return (<Signup></Signup>)
        }
        else if(checkForLocalItem() == null && loginPage() === 'true'){
            return (<Login></Login>)
        }
        else {
            console.log('group message reached')
            return (<GroupMessage></GroupMessage>)
        }
    }
  return (
    <div>
        <LoginContext.Provider value={{count, setCount}}>
            {toShow()}
        </LoginContext.Provider>

    </div>
  );
}

export default App;
