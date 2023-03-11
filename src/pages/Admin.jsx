import React, { useState } from 'react';
import "../styles/Admin.css";

import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { productRead } from "../config/HandlingCalls";

const Admin = () => {

  const [user] = useAuthState(auth);
  const [productList, setProductList] = useState();

  // const getProducts = () => {
  //   productRead().then((data)=> setProductList(data));
  // }


  console.log(productList);

  return (
    <>
      <div id="admin-main">
        <h3 id="admin-h3">Welcome <span id="admin-name">{user?.displayName}</span></h3>
        <div id="admin-body">
          <div id="admin-data">
            <div id="admin-data-body">
              <table id="admin-table">
                <tr id="admin-tr">
                  <th id="admin-th-head">Product ID</th>
                  <th id="admin-th-head">Name</th>
                  <th id="admin-th-head">Image</th>
                  <th id="admin-th-head">Category</th>
                  <th id="admin-th-head">Amount</th>
                </tr>
                <tr id="admin-tr">
                  <td id="admin-td">January</td>
                  <td id="admin-tr">$100</td>
                </tr>
              </table>
            </div>
          </div>
          <div id="admin-add-product">

          </div>
        </div>
      </div>
    </>
  )
}

export default Admin