import React, { useEffect, useState } from "react";

// CSS file
import "../styles/Navbar.css";

// Firebase
import {auth, db, provider} from "../config/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
// To handle user data after login
import {useAuthState} from "react-firebase-hooks/auth";

import { Link } from "react-router-dom";

// Components
import Data from "../Customisation/Data";
import { CartState } from "../context/Context";
import { loginAccount, readAccount } from "../config/HandlingCalls";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {

    const [user] = useAuthState(auth);
    const [adminCheck, setAdminCheck] = useState(false);

    const userLoginFunc = async () => {
        const userInfo = await signInWithPopup(auth, provider);
        //Register User info in Firestore
        loginAccount(user.displayName, user.email).then(()=> {
            console.log("Logged in success");
        });
    }
    const userLogoutFunc = async () => {
        await signOut(auth);
    }



    //To check whether the logged-in user has the authority status as "Authorizer"
    const [userAuthStatus, setUserAuthStatus] = useState(false);
    // Function to Fetch Logged-In user Data
    const gettingUserData = async () => {
        const userData = await getDoc(doc(db, "user", user.email));
        // Checking the user has registered or not and Verifying the Status of "Authorizer"
            if (userData.data().admin == "true") {
                setUserAuthStatus(true);
            }
        }

    
    
    useEffect(()=>{
        gettingUserData();
    },[])




   // CART VALUE UPDATE BY CONTEXT_API
    const {state:{cart}} = CartState();

    return (
        <>
            <div id="navbar">
                <div id="nav-main">
                    <div id="nav-logo">
                        <Link id="nav-link-title" to='/'>E-Buy</Link>
                    </div>
                        <ul id="nav-ul">
                            {user?.displayName && <li id="nav-li"><Link id="nav-link" to='/wish-list'>Wish List</Link></li>}
                            {user?.displayName && <li id="nav-li"><Link id="nav-link" to='/cart'>Cart <span>( {cart.length} )</span></Link></li>}
                            {user?.displayName && <li id="nav-li"><Link id="nav-link" to='/account'>Account</Link></li>}
                            {/* {(user?.displayName && userAuthStatus) && <li id="nav-li"><Link id="nav-link" to='/admin'>Admin</Link></li>} */}
                            {user?.displayName ? <li onClick={userLogoutFunc} id="nav-li"><Link id="nav-link" to='/'>Logout</Link></li> : <li onClick={userLoginFunc} id="nav-li"><Link id="nav-link" to='/'>Login</Link></li>}
                        </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar