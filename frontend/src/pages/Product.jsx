import React ,{ useContext } from 'react'
import './CSS/Product.css'
import { ShopContext } from '../context/ShopContext'
import Breadcrum from '../components/Breadcrum/Breadcrum';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DiscriptionBox from '../components/DiscriptionBox/DiscriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productid } = useParams();
  console.log(all_product)
  
  if (!all_product) {
    return <div>Loading products...</div>; // Handle undefined all_product
  }
  
  const product = all_product.find((e) => e.id === productid);
  
  console.log('Product:', product); // Log product to check its value
  
  if (!product) {
    return <div>Product not found</div>; // Handle product not found
  }
  
  return (
    <div className="product">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DiscriptionBox />
      <RelatedProducts />
    </div>
  );
};


export default Product