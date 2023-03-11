import React, { useEffect, useState } from 'react';
import "../styles/Admin.css";

import { auth, storage } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from "firebase/storage";

import { productRead, productAdd } from "../config/HandlingCalls";
import { sha256 } from 'crypto-hash';

const Admin = () => {

  const [user] = useAuthState(auth);
  const [productList, setProductList] = useState();

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [imageURL, setImageURL] = useState();




  useEffect(() => {
    productRead().then((data) => setProductList(data));
  }, []);



  // Uploading the image and getting the url
  const uploadImagehandle = async () => {
    console.log("inside");
    if(id){
    console.log("id done");
      const uploadRef = ref(storage, `product_images/${id}`);
        await uploadBytes(uploadRef, imagePath).then(() => {
          console.log(id);
          alert("Uploaded Success !");
        })
        // Download Link
        await getDownloadURL(uploadRef)
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            // setImageURL(url);
            setImageURL(url);
            console.log("Image URL");
            console.log(url);
          })
    }else{
      alert("Kindly fill remaining fields first");
    }
  }



  const addNewProduct = () => {
    console.log("inside");
    productAdd(id, name, category, amount, imageURL).then(()=> {
      alert('Product Added Successfully');
    });
  }




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
                {
                  productList && productList.map((data, key) => {
                    return (
                      <tr id="admin-tr" key={key}>
                        <td id="admin-td">{data.id}</td>
                        <td id="admin-td">{data.product_name}</td>
                        <td id="admin-td"><img id="admin-td-img" src={data.product_image} alt={data.product_image} /></td>
                        <td id="admin-td">{data.product_category}</td>
                        <td id="admin-td">{data.product_amount}</td>
                      </tr>
                    )
                  })
                }
              </table>
            </div>
          </div>
          <div id="admin-add-product">
                <h3 id='admin-add-h3'>Upload New Products</h3>
                <div id="admin-add-form">
                  <input id="admin-add-input" onChange={(e) => setId(e.target.value)} placeholder='Product ID (001)' type="text" />
                  <input id="admin-add-input" onChange={(e) => setName(e.target.value)} placeholder='Product Name' type="text" />
                  <input id="admin-add-input" onChange={(e) => { uploadImagehandle(); setImagePath(e.target.files[0])}} type="file" />
                  <input id="admin-add-input" onChange={(e) => setCategory(e.target.value)} placeholder='Product Category (laptop)' type="text" />
                  <input id="admin-add-input" onChange={(e) => setAmount(e.target.value)} placeholder='Product Amount' type="text" />
                  <button id="admin-add-btn" onClick={addNewProduct} >Add Product</button>
                </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin