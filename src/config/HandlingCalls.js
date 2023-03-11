import {addDoc, getDocs, collection, setDoc, doc } from "firebase/firestore";
import {db} from "./Firebase";

const productRef = collection(db, "products");

export const productRead = async () => {
    const data = await getDocs(productRef);
    // const data.docs.map((doc) => ({...doc.data(), id : doc.id})));
    return data.docs.map((doc) => ({...doc.data(), id : doc.id}));
}

export const productAdd = async (id, name, category, amount, imageURL) => {
    console.log("Strat");
    const path = id;
    await setDoc(doc(db, "products", path),{
        product_name:"dsad",
        product_image:imageURL,
        product_category:"nsdf",
        product_amount: "sdfnm"
    });

    console.log("End");
}
