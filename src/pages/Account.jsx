import React from 'react';
import { CartState } from '../context/Context';
import "../styles/Account.css";

const Account = () => {

  const {state:{cart}} = CartState();

  return (
    <>
      <div id="acc-main">
        <div id="acc-checkout-main">
            <div id="acc-checkout-body">
              <img src="https://picsum.photos/id/237/200/300" alt="df" style={{width:"70px"}} />
              <h3 id="acc-cehckout-h3">Harsh Gupta</h3>
              <h6 id="acc-cehckout-h3">hgupta42774@gmail.com</h6>

              {/* <div id="acc-checkout-btn-group">
                <p id="acc-checkout-p">Rs. 78</p>
                <button id="acc-checkout-btn">Proceed to Checkout</button>
              </div> */}
            </div>
        </div>
        <div id="acc-list-main">
          <h2>Order History</h2>
          <table id="acc-table">
            <tr id="acc-tr">
              <th id="acc-th-head">Product ID</th>
              <th id="acc-th-head">Name</th>
              <th id="acc-th-head">Image</th>
              <th id="acc-th-head">Category</th>
              <th id="acc-th-head">Amount</th>
              {/* <th id="acc-th-head">Update</th> */}
              <th id="acc-th-head">Delete</th>
            </tr>
            {
              cart && cart.map((data, key) => {
                return (
                  <tr id="acc-tr" key={key}>
                    <td id="acc-td">{data.id}</td>
                    <td id="acc-td">{data.product_name}</td>
                    <td id="acc-td acc-td-size"><img id="acc-td-img" src={data.product_image} alt={data.product_image} /> <a href={data.product_image} target="_blank"><button>View Image</button></a></td>
                    <td id="acc-td">{data.product_category}</td>
                    <td id="acc-td">{data.product_amount}</td>
                    {/* <td id="acc-td"><button onClick={()=> IncQty(data)} style={{ backgroundColor: 'grey', color: '#fff', padding: '5px', border: 'none', cursor: 'pointer' }}>Update</button></td> */}
                    {/* <td id="acc-td"><button onClick={() => DecQty(data)} style={{ backgroundColor: 'red', color: '#fff', padding: '5px', border: 'none', cursor: 'pointer' }}>Delete</button></td> */}
                  </tr>
                )
              })
            }
          </table>
        </div>
      </div>
    </>
  )
}

export default Account