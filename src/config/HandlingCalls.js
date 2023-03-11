import { getDocs, collection, setDoc, doc, deleteDoc } from "firebase/firestore";
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