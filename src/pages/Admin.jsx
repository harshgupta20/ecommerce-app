import React from 'react';
import "../styles/Admin.css";

import {auth} from "../config/Firebase";
import {useAuthState} from "react-firebase-hooks/auth";


const Admin = () => {

  const [user] = useAuthState(auth);

  return (
    <>
      <div id="admin-main">
        <h3 id="admin-h3">Welcome <span id="admin-name">{user?.displayName}</span></h3>
        <div id="admin-body">
            <div id="admin-data">
                
            </div>
            <div id="admin-add-product">

            </div>
        </div>
      </div>
    </>
  )
}

export default Admin