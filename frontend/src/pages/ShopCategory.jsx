import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/Assets/dropdown_icon.png';
import Item from '../components/item/Item';

const ShopCategory = (props) => {
  // Retrieve all products from context
  const { all_product } = useContext(ShopContext);

  return (
    <div className="ShopCategory">
      {/* Banner Image */}
      <img className='ShopCategory-banner' src={props.banner} alt="" />
      
      {/* Index and Sort Section */}
      <div className="ShopCategory-indexSort">
        <p>
          <span>showing 1-12</span> out of 36 products
        </p>
        <div className="ShopCategory-sort">
          Sort by <img src={dropdown_icon} alt="Sort icon" />
        </div>
      </div>
      
      {/* Product Listing */}
      <div className="ShopCategory-products">
        {all_product.map((item, i) => {
          // Render item if it matches the current category
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="loadmore">
      Load More
      </div>
    </div>
  );
}

export default ShopCategory;
