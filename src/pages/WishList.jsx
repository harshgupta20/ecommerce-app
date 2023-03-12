import React, { useEffect, useState } from 'react';
import { CartState } from '../context/Context';
import "../styles/WishList.css";


import { auth } from '../config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { WishListDelete, WishListRead } from '../config/HandlingCalls';

const WishList = () => {

  const [user] = useAuthState(auth);
  const [wishlist, setWishlist] = useState();

  useEffect(()=>{
    WishListRead(user.email).then((data)=>{
      setWishlist(data)
    });
  },[]);

  const deleteWishlist = (data) => {
    WishListDelete(user.email, data.id).then(()=>{
      alert("Product removed from wishlist");
    });
  }


  const {cart} = CartState();
  return (
    <>
      <div id="wish-main">
        <div id="wish-list-main">
          <h2>Your Wishlist</h2>
          <table id="wish-table">
            <tr id="wish-tr">
              <th id="wish-th-head">Product ID</th>
              <th id="wish-th-head">Name</th>
              <th id="wish-th-head">Image</th>
              <th id="wish-th-head">Category</th>
              <th id="wish-th-head">Amount</th>
              {/* <th id="wish-th-head">Update</th> */}
              <th id="wish-th-head">Delete</th>
            </tr>
            {
              wishlist && wishlist.map((data, key) => {
                return (
                  <tr id="wish-tr" key={key}>
                    <td id="wish-td">{data.product_id}</td>
                    <td id="wish-td">{data.product_name}</td>
                    <td id="wish-td wish-td-size"><img id="wish-td-img" src={data.product_image} alt={data.product_image} /> <a href={data.product_image} target="_blank"><button>View Image</button></a></td>
                    <td id="wish-td">{data.product_category}</td>
                    <td id="wish-td">{data.product_amount}</td>
                    {/* <td id="wish-td"><button onClick={()=> IncQty(data)} style={{ backgroundColor: 'grey', color: '#fff', padding: '5px', border: 'none', cursor: 'pointer' }}>Update</button></td> */}
                    <td id="wish-td"><button onClick={() => deleteWishlist(data)} style={{ backgroundColor: 'red', color: '#fff', padding: '5px', border: 'none', cursor: 'pointer' }}>Delete</button></td>
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

export default WishList