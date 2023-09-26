import React,{useState,useEffect} from "react";
import "./AddProductForm.css";
import {hostUrl} from "../host"
import Cookies from 'js-cookie';

export default function AddProductForm() {

    const [inputs, setInputs] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(()=>{
        setInputs({token:Cookies.get('shopperWebToken')});
        console.log(inputs);
    },[])

    const handleChange = (event) => {
      event.preventDefault();  
      const name = event.target.name;
      if (name === "product-image") {
        console.log(name)
        return setInputs((prevState) => ({ ...prevState, [name]: event.target.files[0] }));
      }

      const value =
        event.target.name === "price" || event.target.name === "stock"
          ? parseInt(event.target.value)
          : event.target.value;
  
      setInputs((prevState) => ({ ...prevState, [name]: value }));
      console.log(inputs);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs);
      const formData = new FormData();
  
      for (const key in inputs) {
        formData.append(key.toString(), inputs[key]);
      }
      fetch(`${hostUrl}/api/product`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setSubmitted(true);
          console.log(data);
        }).catch((err) => {
          setSubmitted(false);
          console.log(err.message)
        });
    };


  return (
    <div>
      <div className="container">
        <div className="left">
          <div className="header">
            <h2 className="animation a1">Add Product</h2>
            <h4 className="animation a2">
              Please fill all categories properly
            </h4>
          </div>
          <form className="form">

            <div onChange={handleChange}>
              <input
                type="text"
                className="form-field animation a3"
                placeholder="Product Name"
                name="productName"
              />
            </div>
            <div onChange={handleChange}>
              <input
                type="text"
                className="form-field animation a4"
                placeholder="Description"
                name="productDesc"
              />
            </div>

            <div onChange={handleChange}>
              <input
                type="text"
                className="form-field animation a3"
                placeholder="Company Name"
                name="company"
              />
            </div>

            <div onChange={handleChange}>
              <select
                name="category"
                className="form-field animation a4 text-category-addproduct-hk"
                placeholder="Select a category"
              >
                <option value="dairy">Dairy</option>
                <option value="fruits">Fruits</option>
                <option value="staples">Staples</option>
                <option value="cloth">Cloth</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>

            <div onChange={handleChange}>
              <input
                type="file"
                className="file-product-hk-form animation a4"
                name="product-image"
              ></input>
            </div>

            <div onChange={handleChange}>
              <input
                type="text"
                className="form-field animation a4"
                placeholder="Price Per Item"
                name="price"
              />
            </div>

            <div onChange={handleChange}>
              <input
                type="text"
                className="form-field animation a4"
                placeholder="Stock Available"
                name="stock"
              />
            </div>

            {/* <input type="checkbox" className="form-field animation a4" placeholder="Stock Available" /> */}
            <button type="submit" className="animation a6" onClick={handleSubmit}>
              Add 
            </button>
          </form>
        </div>
        {/* <div className="right"></div> */}
      </div>
    </div>
  );
}
