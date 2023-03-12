import { getDocs, collection, setDoc, doc, deleteDoc, addDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db, storage } from "./Firebase";




const productRef = collection(db, "products");

export const productRead = async () => {
    const data = await getDocs(productRef);
    // const data.docs.map((doc) => ({...doc.data(), id : doc.id})));
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const productAdd = async (id, name, category, amount, imageURL) => {
    console.log("Strat");
    const path = id;
    await setDoc(doc(db, "products", path), {
        product_name: name,
        product_image: imageURL,
        product_category: category,
        product_amount: amount
    });
    
    console.log("End");
}

export const productDelete = async (product_id) => {
    await deleteDoc(doc(db, "products", product_id));
    const desertRef = ref(storage, `product_images/${product_id}`);
    // Delete the file
    deleteObject(desertRef);
}



export const WishListUpload = async (id, name, imageURL, amount, category, email) => {
    const newCollectionRef = collection(db, 'user', email, 'wishlist')
    await addDoc(newCollectionRef, {
        product_id:id,
        product_name: name,
        product_image: imageURL,
        product_amount: amount,
        product_category: category
    })
}

export const WishListRead = async (email) => {
    const newCollectionRef = collection(db, 'user', email, 'wishlist');
    const data = await getDocs(newCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}
export const WishListDelete = async (email, id) => {
    await deleteDoc(doc(db, "user", email, "wishlist", id));
}





export const OrderUpload = async (id, name, imageURL, amount, category, email) => {
    // const newCollectionRef = collection(db, 'user', email, 'orders',id)
    // await setDoc(newCollectionRef, {
    //     product_id:id,
    //     product_name: name,
    //     product_image: imageURL,
    //     product_amount: amount,
    //     product_category: category
    // })

    await setDoc(doc(db, "user", email,'orders',id), {
        product_id:id,
        product_name: name,
        product_image: imageURL,
        product_amount: amount,
        product_category: category
    });
}



export const OrdersRead = async (email) => {
    const newCollectionRef = collection(db, 'user', email, 'orders');
    const data = await getDocs(newCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}