import React, { createContext, useContext, useReducer } from 'react';

import Data from "../Customisation/Data";
import { cartReducer } from './Reducers';

const Cart = createContext();

const Context = ({children}) => {

    // console.log(Data);  

    const [state, dispatch] = useReducer(cartReducer, {
        data: Data,
        cart: []
    });
    

  return (
    <Cart.Provider value={{state, dispatch}}>
        {children}
    </Cart.Provider>
  )
}

export default Context

export const CartState = () => {
    return useContext(Cart);
}