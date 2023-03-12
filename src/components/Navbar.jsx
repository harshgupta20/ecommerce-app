import React, { useState } from "react";

// CSS file
import "../styles/Navbar.css";

// Firebase
import {auth, provider} from "../config/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
// To handle user data after login
import {useAuthState} from "react-firebase-hooks/auth";

import { Link } from "react-router-dom";

// Components
import Data from "../Customisation/Data";

const Navbar = () => {

    const [user] = useAuthState(auth);

    const userLoginFunc = async () => {
        const userInfo = await signInWithPopup(auth, provider);
        // console.log(userInfo);
    }
    const userLogoutFunc = async () => {
        await signOut(auth);
    }

 

    return (
        <>
            <div id="navbar">
                <div id="nav-main">
                    <div id="nav-logo">
                        <Link id="nav-link" to='/'>LMA Cart</Link>
                    </div>
                        <ul id="nav-ul">
                            <li id="nav-li"><Link id="nav-link" to='/contact'>Contact</Link></li>
                            {user?.displayName && <li id="nav-li"><Link id="nav-link" to='/wish-list'>Wish List</Link></li>}
                            {user?.displayName && <li id="nav-li"><Link id="nav-link" to='/cart'>Cart</Link></li>}
                            {user?.displayName && <li id="nav-li"><Link id="nav-link" to='/account'>Account</Link></li>}
                            {user?.displayName && <li id="nav-li-admin"><Link id="nav-link" to='/admin'>Admin Panel</Link></li>}
                            {user?.displayName ? <li onClick={userLogoutFunc} id="nav-li"><Link id="nav-link" to='/'>Logout</Link></li> : <li onClick={userLoginFunc} id="nav-li"><Link id="nav-link" to='/'>Login</Link></li>}
                        </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar