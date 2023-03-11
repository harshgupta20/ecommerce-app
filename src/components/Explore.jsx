import React, { useEffect, useState } from 'react';

import { productRead } from "../config/HandlingCalls";

import "../styles/Explore.css";

const Explore = () => {

  const [productList, setProductList] = useState([]);

  // useEffect(() => {
  //   productRead().then((data) => {
  //     setProductList(data);
  //   });
  // });

  return (
    <>
      <div id="ex-main">
        <div id="ex-body">
          <div id="ex-search">
            <input placeholder='Search products "mobile"' id="ex-search-input" type="text" />
          </div>
        </div>

        <div id="ex-products">
          <div id="ex-products-list">
            <div id="ex-product-card">
              <img id="ex-card-img" src="https://picsum.photos/200/300?grayscale" alt="" />
              <h4 id="ex-card-h4">Phone</h4>
              <div id="ex-product-card-group">
                <p id="ex-group-p1">Amount : 890 Rs.</p>
                <p id="ex-group-p2">Mobile</p>
              </div>
              <button id="ex-product-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore