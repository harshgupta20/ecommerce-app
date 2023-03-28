import React, { useEffect, useState } from 'react';
import { CartState } from '../context/Context';
import "../styles/Account.css";
import { auth } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { OrdersRead } from '../config/HandlingCalls';

import sampleImage from "../img/sample-product.jpg";

const Account = () => {

  const { state: { cart } } = CartState();
  const [user] = useAuthState(auth);
  const [order, setOrder] = useState();


  useEffect(() => {
    OrdersRead(user.email).then((data) => {
      setOrder(data);
    });
  }, [])

  return (
    <>
      <div id="acc-main">
        <div id="acc-checkout-main">
          <div id="acc-checkout-body">
            <img src={user?.photoURL} alt={user?.displayName} style={{ width: "150px", borderRadius: '20px' }} />
            <div id="acc-checkout-userdata">
              <h3 id="acc-checkout-h3">{user?.displayName}</h3>
              <h6 id="acc-checkout-h6">{user?.email}</h6>
            </div>
          </div>
        </div>
        {/* <div id="acc-list-main">
          <h2>My Order History</h2>
          <table id="acc-table">
            <tr id="acc-tr">
              <th id="acc-th-head">Product ID</th>
              <th id="acc-th-head">Name</th>
              <th id="acc-th-head">Image</th>
              <th id="acc-th-head">Category</th>
              <th id="acc-th-head">Amount</th>
            </tr>
            {
              order && order.map((data, key) => {
                return (
                  <tr id="acc-tr" key={key}>
                    <td id="acc-td">{data.id}</td>
                    <td id="acc-td">{data.product_name}</td>
                    <td id="acc-td acc-td-size"><img id="acc-td-img" src={data.product_image} alt={data.product_image} /> <a href={data.product_image} target="_blank"><button>View Image</button></a></td>
                    <td id="acc-td">{data.product_category}</td>
                    <td id="acc-td">{data.product_amount}</td>
                  </tr>
                )
              })
            }
          </table>
        </div> */}


        <hr style={{margin:'20px'}} />


        <h1 style={{ color: '#865DFF', marginTop:'30px' }}>My Order History</h1>
        <div id="acc-product-list">
          {
            order && order.map((data, key) => {
              return (
              <div id="acc-single-product" key={key}>
                <img id="acc-img" src={data.product_image} alt={data.product_image} />
                <hr />
                <div id="acc-data-block">
                  <div id="acc-block-info">
                    <p id="acc-block-p1">{data.product_name}</p>
                    <p id="acc-block-p2">{data.product_amount} Rs.(Paid)</p>
                    <p id="acc-block-p3">Product ID : {data.id}</p>
                  </div>
                  <div id="acc-block-category">
                    <p>{data.product_category}</p>
                  </div>
                </div>
              </div>
              )

            })
          }


        </div>



      </div>
    </>
  )
}

export default Account