import React, { useEffect, useState } from 'react';

import { productRead } from "../config/HandlingCalls";

import Data from "../Customisation/Data";

import "../styles/Explore.css";

const Explore = () => {

  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   productRead().then((data) => {
  //     setProductList(data);
  //   });
  // });


//   {allDocs ? allDocs.filter(doc=>doc.email.toLowerCase().includes(simpleSearch)).map((doc) => (
//     <DocsTable key={doc.id} docData={doc} />
// )) : ""}

  console.log(Data);

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
              Data.filter(data=> {
                  return data.product_name.toLowerCase().includes(search) || data.product_category.toLowerCase().includes(search);            
              } ).map((data) => {
                return (
                  <div id="ex-product-card">
                    <img id="ex-card-img" src={data.product_image} alt="" />
                    <h4 id="ex-card-h4">{data.product_name}</h4>
                    <div id="ex-product-card-group">
                      <p id="ex-group-p1">Amount : {data.product_amount} Rs.</p>
                      <p id="ex-group-p2">{data.product_category}</p>
                    </div>
                    <button id="ex-product-btn">Add to Cart</button>
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