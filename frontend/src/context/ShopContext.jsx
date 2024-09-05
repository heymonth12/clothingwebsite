import React, { createContext, useEffect, useState } from 'react'

export const ShopContext = createContext(null);

const getDefaultCart  = () =>{
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
    cart[index] = 0            
    }
    return cart;
}

const ShopContextProvider = (props) =>{

    const[all_product,setAll_Product] = useState([]);
    const[cartItems , setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
          .then((response) => response.json())
          .then((data) => {
            console.log('Fetched products:', data);
            setAll_Product(data);
          });

          if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:"",
            }).then((response)=>response.json()).then((data)=>setCartItems(data))
          }
      }, []);
      

    const addToCart = (itemId) =>{
        setCartItems((perv) => ({...perv,[itemId]:perv[itemId] +1 }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }
    const removeFromCart = (itemId) =>{
        setCartItems((perv) => ({...perv,[itemId]:perv[itemId] -1 }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removecart',{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmout = 0;
    
        // Ensure all_product is loaded before calculating total amount
        if (!all_product || all_product.length === 0) {
            return totalAmout;
        }
    
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // Find the item in the product list
                let itemInfo = all_product.find((product) => product.id === item);
    
                // Guard clause: Check if itemInfo is valid
                if (itemInfo) {
                    totalAmout += itemInfo.new_price * cartItems[item];
                } else {
                    console.log(`Item with id ${item} not found in all_product`);
                }
            }
        }
        return totalAmout;
    };
     

    const getTotalCartItems = () =>{
        let totalItems=0;
        for (const item in cartItems)
         {
            if(cartItems[item]>0)
            {
                totalItems+=cartItems[item]
            }
        }
        return totalItems;
    }

    
    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};//here we will insert any data / function that will be provided in shop context
    // console.log(all_product)

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}


export default ShopContextProvider;