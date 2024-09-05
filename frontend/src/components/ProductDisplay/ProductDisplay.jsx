import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'

const ProductDisplay = (props) => {

  const {product} = props;
  console.log(product)
  const {addToCart} = useContext(ShopContext)
  return (
    <div className="productdisplay">
      {/* //div left start here */}
      <div className="left">  
        <div className="imglist">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="img">
          <img className='main-img' src={product.image} alt="" />
        </div>
      </div>
      {/* //div right start here */}
      <div className="right">
        <h1>{product.name}</h1>
        <div className="stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="prices">
          <div className="oldprice"> ${product.old_price}</div>
          <div className="newprice">${product.new_price}</div>
        </div>
        <div className="pd-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem suscipit corrupti nemo sit!
        </div>
        <div className="size">
          <h1>Select size</h1>
          <div className="sizes">
            <div>s</div>
            <div>m</div>
            <div>l</div>
            <div>xl</div>
            <div>xxl</div>
          </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>Add To Cart</button>
        <p className="category"><span>Category : </span>Women ,t-shirt,crop top</p>
        <p className="category"><span>Tags : </span>Mordern , latest</p>
      </div>
    </div>
  )
}

export default ProductDisplay