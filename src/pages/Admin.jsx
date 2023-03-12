import React, { useEffect, useState } from 'react';
import "../styles/Admin.css";

import { auth, storage } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from "firebase/storage";

import { productRead, productAdd, productDelete } from "../config/HandlingCalls";

const Admin = () => {

  const [user] = useAuthState(auth);
  const [productList, setProductList] = useState();

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [imagePath, setImagePath] = useState(null)
  const [imageURL, setImageURL] = useState();

  const [checkUploadStatus, setCheckUploadStatus] = useState(false);




  useEffect(() => {
    productRead().then((data) => setProductList(data));
  }, []);



  // Uploading the image and getting the url
  const uploadImagehandle = async () => {
    // console.log("inside");
    if (id && imagePath) {
      // console.log("path");
      // console.log(imagePath);
      const uploadRef = ref(storage, `product_images/${id}`);
      await uploadBytes(uploadRef, imagePath).then(() => {
        // console.log(id);
        alert("Uploaded Success !");
      })
      // Download Link
      await getDownloadURL(uploadRef)
        .then((url) => {
          setImageURL(url);
          // console.log("Image URL");
          // console.log(url);
        })

      setCheckUploadStatus(true);
    } else {
      alert("Kindly fill remaining fields first");
    }
  }


  const addNewProduct = async () => {
    // console.log("inside");

    if (id && name && category && amount && imagePath) {
      if(checkUploadStatus){
        productAdd(id, name, category, amount, imageURL).then(() => {
          alert('Product Added Successfully');
          setId("");
          setAmount("");
          setCategory("");
          document.getElementById("admin-add-input").value="";
          setName("");
        });
      }else{
        alert("Click on \"Upload Image\", before adding the product ");
      }
    }
    else {
      alert("Kindly fill remaining fields first");
    }
  }



  const deleteProduct = (product_id) => {
    if(window.confirm(`Delete product of id '${product_id}' ?`)){
      productDelete(product_id).then((res)=>{
        alert("Product Deleted");
      });
    }
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
                  <th id="admin-th-head">Update</th>
                  <th id="admin-th-head">Delete</th>
                </tr>
                {
                  productList && productList.map((data, key) => {
                    return (
                      <tr id="admin-tr" key={key}>
                        <td id="admin-td">{data.id}</td>
                        <td id="admin-td">{data.product_name}</td>
                        <td id="admin-td admin-td-size"><img id="admin-td-img" src={data.product_image} alt={data.product_image} /> <a href={data.product_image} target="_blank"><button>View Image</button></a></td>
                        <td id="admin-td">{data.product_category}</td>
                        <td id="admin-td">{data.product_amount}</td>
                        <td id="admin-td"><button style={{backgroundColor:'grey', color:'#fff', padding:'5px', border:'none', cursor:'pointer'}}>Update</button></td>
                        <td id="admin-td"><button onClick={()=> deleteProduct(data.id)} style={{backgroundColor:'red', color:'#fff', padding:'5px', border:'none', cursor:'pointer'}}>Delete</button></td>
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
              <input id="admin-add-input" value={id} onChange={(e) => setId(e.target.value)} placeholder='Product ID (001)' type="text" />
              <input id="admin-add-input" value={name} onChange={(e) => setName(e.target.value)} placeholder='Product Name' type="text" />
              <div style={{ display: "flex", alignItems: 'center' }}>
                <input id="admin-add-input" onChange={(e) => { setImagePath(e.target.files[0]) }} type="file" />
                <button id="admin-add-btn" style={{ fontSize: 10, height: 'fit-content', padding: '5px', backgroundColor: '#E384FF', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={uploadImagehandle}>Upload Image</button>
              </div>
              <input id="admin-add-input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Product Category (laptop)' type="text" />
              <input id="admin-add-input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Product Amount' type="text" />
              <button id="admin-add-btn" onClick={addNewProduct} >Add Product</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin