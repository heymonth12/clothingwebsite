import React from 'react'
import './Newsletter.css'
const Newsletter = () => {
  return (
    <div className="newsletter">
        <h1>Get Exclusive Offers on your emai </h1>
        <p>subscribe to our newsletter and stay updates</p>
        <div className="input">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default Newsletter