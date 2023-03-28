import React, { useEffect, useState } from 'react';

import { productRead, WishListRead, WishListUpload } from "../config/HandlingCalls";
import { CartState } from '../context/Context';
import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import Data from "../Customisation/Data";

// var CryptoJS = require("crypto-js");
import CryptoJS from "crypto-js";


import "../styles/Explore.css";

const Explore = () => {

  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState('');
  const [user] = useAuthState(auth);

  // Crypto-js
  var sample_key = "secret key";

  const [wishList, setWishList] = useState();

  useEffect(() => {
    loadData();
  },[]);
  
  const loadData = () => {
    productRead().then((data) => {
      setProductList(data);
    });
  } 
  const addToWishlist = (data) => {
    console.log(data);

    var product__id = data.id;
    var product__name = data.product_name;
    var product__amount = data.product_amount;
    var product__category = data.product_category;

    product__id = CryptoJS.AES.encrypt(product__id, sample_key).toString();
    product__name = CryptoJS.AES.encrypt(product__name, sample_key).toString();
    product__amount = CryptoJS.AES.encrypt(product__amount, sample_key).toString();
    product__category = CryptoJS.AES.encrypt(product__category, sample_key).toString();

    WishListUpload(product__id, product__name, data.product_image, product__amount, product__category, user.email).then(()=>{
      alert("Added to wishlist");
    });
  }

  // console.log(Data);

  const RemoveFromCart = (data) => {
    dispatch({type:"REMOVE_FROM_CART", payload: data})
  }
  const AddToCart = (data) => {
    dispatch({type:"ADD_TO_CART", payload: data})
  }




  //-----------Check Context API
  // const {state} = CartState();
  // console.log(state);
  //------------ Add and Remove CART
  const { state: { cart }, dispatch } = CartState();
  // console.log(cart);

  return (
    <>
      <div id="ex-main">
        <div id="ex-body">
          <div id="ex-search">
            <input onChange={(e) => setSearch(e.target.value)} placeholder='Search products "mobile"' id="ex-search-input" type="text" />
          </div>
        </div>

        <div id="ex-products">
          <div id="ex-products-list">

            {
              productList.filter(data => {
                return data.product_name.toLowerCase().includes(search) || data.product_category.toLowerCase().includes(search);
              }).map((data) => {
                return (
                  <div id="ex-product-card">
                    <img id="ex-card-img" src={data.product_image} alt={data.product_image} />
                    <h4 id="ex-card-h4">{data.product_name}</h4>
                    <div id="ex-product-card-group">
                      <p id="ex-group-p1">Amount : {data.product_amount} Rs.</p>
                      <p id="ex-group-p2" onClick={() => {addToWishlist(data)}}>Add to Wishlist</p>
                    </div>

                    {/* Feature to show ADD and REMOVE CART option by CONTEXT_API */}
                    {
                      cart.some((p) => p.id === data.id) ?
                        (<button id="ex-product-btn" onClick={()=> {RemoveFromCart(data)}}>Remove from Cart</button>)
                        :
                        (user ? <button id="ex-product-btn" onClick={()=>{AddToCart(data)}}>Add to Cart</button> : <button id="ex-product-btn" onClick={()=> {alert("Login Required");}}>Add to Cart</button>)
                    }
                    {/* <button id="ex-product-btn">Add to Cart</button> */}
                  </div>
                )
              })
            }


          </div>
        </div>
      </div>
    </>
  )
}

export default Explore