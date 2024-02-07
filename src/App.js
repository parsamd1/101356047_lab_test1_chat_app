import logo from './logo.svg';
import './App.css';
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
    function checkForLocalItem(){
        var user1=localStorage.getItem('username')
        if (user1 != null){
            return user1
        }
        else {
            return null
        }
    }
  return (
    <div>


    </div>
  );
}

export default App;
