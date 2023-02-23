import React from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import Login from './Login';

function Navbar({ linkName }) {
    let link = "Home"
    if (linkName === "/add")
        link = "Add Employee"

    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/')
    }

    return (<div>
        <div class="topnav">

            {/* <!-- Centered link --> */}


            {/* Left-aligned links (default) */}
            <h2>Employee Management System</h2>

            {/* //<!-- Right-aligned links --> */}
            <div class="topnav-right">
                {auth.user &&
                    <button class="button-30" role="button"><Link to={linkName}>{link}</Link></button>
                }
                {!auth.user &&
                    <button class="button-30" role="button"><Link to='/login'>Login</Link></button>
                }
            </div>
            {
                auth.user &&
                <button class="button-30" role="button" onClick={handleLogout}>Logout</button>
            }

        </div>
    </div>

    );
}

export default Navbar;
