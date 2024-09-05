import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_product = async () => {
        // console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch("http://localhost:4000/upload", {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data })
        // console.log(responseData)

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product)
            await fetch("http://localhost:4000/addproduct",{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type':'application/json'
                },
                body:JSON.stringify(product)
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("product added"):alert("failed")
            })
        }
    }
    return (
        <div className="add-product">
            <div className="addproduct-itemfeild">
                <p>product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfeild">
                    <p>price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='type here' />
                </div>
                <div className="addproduct-itemfeild">
                    <p>Offer price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='type here' />
                </div>
            </div>
            <div className="addproduct-itemfeild">
                <p>prouct Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">women</option>
                    <option value="men">men</option>
                    <option value="kid">kid</option>
                </select>
            </div>
            <div className="addproduct-itemfeild">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} value={productDetails.image} onChange={changeHandler} alt="" className='addproduct-thumnail-img' />
                </label>
                <input onChange={imageHandler} type="file" name="" id="file-input" hidden />
            </div>
            <button onClick={() => { Add_product() }} className='addproduct-btn'>----Add----</button>
        </div>
    )
}

export default AddProduct