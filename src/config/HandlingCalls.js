import { getDocs, collection } from "firebase/firestore";
import {db} from "./Firebase";

export const productRead = async () => {
    const productRef = collection(db, "products");
    const data = await getDocs(productRef);
    // const data.docs.map((doc) => ({...doc.data(), id : doc.id})));

    return data.docs.map((doc) => ({...doc.data(), id : doc.id}));
}