import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import { IoIosArrowDropdown } from "react-icons/io";
const Navbar = () => {

    const [menu , setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
      menuRef.current.classList.toggle('nav-menu-visible')
      e.target.classList.toggle('open');
      
    }

  return (
    <div className="navbar">
        <div className="nav-logo">  
            <img src={logo} alt="" />
            <p>SHOPIFY</p>
        </div>
        <IoIosArrowDropdown className='nav-dropdown' size="3em" onClick={dropdown_toggle} />
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to = "/">shop</Link>{menu === "shop" ? <hr/> :<></>}</li>
            <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration:'none'}} to = "/mens">men</Link>{menu === "men" ? <hr/> :<></>}</li>
            <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration:'none'}} to = "/womens">women</Link>{menu === "women" ? <hr/> :<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to = "/kids">kids</Link>{menu === "kids" ? <hr/> :<></>}</li>
        </ul>
        <div className="login-cart">
          {localStorage.getItem('auth-token')
          ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")}}>Logout</button>:<Link style={{textDecoration:'none'}} to='/login'> <button>login</button></Link>}
           
         <Link to='/cart'>  <img src={cart_icon} alt="" /></Link>  
            <div className="cart-count">{getTotalCartItems()}</div> 
        </div>
    </div>
  )
}

export default Navbar