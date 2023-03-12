import React, { useEffect, useState } from 'react';
import { CartState } from '../context/Context';
import "../styles/Cart.css"

const Cart = () => {

  const {state:{cart}, dispatch} = CartState();

  const [total, setTotal] = useState(0);



  const DecQty = (data) => {
    dispatch({type:"REMOVE_FROM_CART", payload: data});

  }

  useEffect(()=> {
    let cartTotal = 0;
      cart.map((product)=>{
        const amountInt = parseInt(product.product_amount);
        const qtyInt = parseInt(product.qty);
        cartTotal= cartTotal + (amountInt*qtyInt);
        setTotal(cartTotal);
      }) 
      if(cart.length == 0){
        setTotal(0);
      } 
  });

  console.log(total);


  console.log(cart);
  return (
    <>
      <div id="cart-main">
        <div id="cart-list-main">
          <table id="cart-table">
            <tr id="cart-tr">
              <th id="cart-th-head">Product ID</th>
              <th id="cart-th-head">Name</th>
              <th id="cart-th-head">Image</th>
              <th id="cart-th-head">Category</th>
              <th id="cart-th-head">Amount</th>
              {/* <th id="cart-th-head">Update</th> */}
              <th id="cart-th-head">Delete</th>
            </tr>
            {
              cart && cart.map((data, key) => {
                return (
                  <tr id="cart-tr" key={key}>
                    <td id="cart-td">{data.id}</td>
                    <td id="cart-td">{data.product_name}</td>
                    <td id="cart-td cart-td-size"><img id="cart-td-img" src={data.product_image} alt={data.product_image} /> <a href={data.product_image} target="_blank"><button>View Image</button></a></td>
                    <td id="cart-td">{data.product_category}</td>
                    <td id="cart-td">{data.product_amount}</td>
                    {/* <td id="cart-td"><button onClick={()=> IncQty(data)} style={{ backgroundColor: 'grey', color: '#fff', padding: '5px', border: 'none', cursor: 'pointer' }}>Update</button></td> */}
                    <td id="cart-td"><button onClick={() => DecQty(data)} style={{ backgroundColor: 'red', color: '#fff', padding: '5px', border: 'none', cursor: 'pointer' }}>Delete</button></td>
                  </tr>
                )
              })
            }
          </table>
        </div>
        <div id="cart-checkout-main">
            <div id="cart-checkout-body">
              <h3 id="cart-cehckout-h3">Subtotal ({cart.length}) Items</h3>

              <div id="cart-checkout-btn-group">
                <p id="cart-checkout-p">Rs. {total}</p>
                <button id="cart-checkout-btn">Proceed to Checkout</button>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Cart