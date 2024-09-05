import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
const CartItems = () => {
    const { getTotalCartAmount,all_product, cartItems, removeFromCart } = useContext(ShopContext)
    return (
        <div className="CartItems">
            <div className="item-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div>
                        <div className="format item-main">
                            <img src={e.image} alt="" className="product-icon" />
                            <p>{e.name}</p>
                            <p>{e.new_price}</p>
                            <button className="quantity">{cartItems[e.id]}</button>
                            <p>${e.new_price*cartItems[e.id]}</p>
                            <img className='remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id)}} alt="" />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })}
            <div className="down">
                <div className="total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="totalitem">
                            <p>Sub total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="totalitem">
                            <p>Shipping fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="totalitem">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>Proceed to checkout</button>
                </div>
                <div className="promocode">
                    <p>If u have promo code enter it here</p>
                    <div className="promobox">
                        <input type="text" placeholder='promocode' name="" id="" />
                        <button type="button">submit</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CartItems