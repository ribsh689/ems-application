import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import './Login.css'
import Navbar from './Navbar'

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()

    const errorMsg = document.getElementById('error');

    const saveData = () => {
        sessionStorage.setItem("username", user)
    }

    const clearSessionData = () => {
        sessionStorage.removeItem("username");
    }

    const handleLogin = () => {
        // console.log(user);

        if (user === "user123@psl" && password === "passkey@123") {
            auth.login(user)
            saveData();
            navigate('/home', { replace: true })
            setTimeout(() => {
                clearSessionData();
            }, 30000000)
        }
        else {
            errorMsg.style.visibility = "visible";
            errorMsg.innerHTML = "Incorrect username or password"
        }
    }
    return (
        <div class="container">
            <div class="inputs">
                <div class="fields">
                    <label>
                        Username:{' '}
                        <input type='text' onChange={(e) => setUser(e.target.value)} />
                    </label>
                </div>
                <div class="fields">
                    <br />
                    <label>
                        Password:{' '}
                        <input type='password' onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <br />
                <button class="button-30" onClick={handleLogin}>Login</button>
                <div className='error-message' id='error'></div>
            </div>

        </div>
    )
}