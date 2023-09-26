import React,{useState,useEffect} from "react";
import "./ElectronicsPage.css"
import {hostUrl} from '../host'
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

const ProductOrder = ({ image, name, price, _id,stock }) => {
    return (
      <Wrapper>
        <div className="outer-div-hk-product">
          <div className="container">
            <div>
            <img src={(image !=null && image[0]==='i')? `${hostUrl}/${image}`:image} alt='main' className="product-order-hk-image"/>
            </div>
             
            <Link to={`/products/${_id}`} className="link">
              <FaSearch />
            </Link>
          </div>
          <div className="element-amount-hk-order">
              {/* <h6>{stock} Left</h6> */}
            </div>
          <footer>
            <h5>{name}</h5>
            <p>₹{price}</p>
          </footer>
        </div>
      </Wrapper>
    );
  };


const ElectronicsProducts = () => {
    const [products,changeProducts]=useState([]);

    useEffect(()=>{
        fetch(`${hostUrl}/api/partProducts/electronics`)
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json);
            changeProducts(json);
        })
    },[]);

    return(
        <div className="electronics-products">
            {
                products.map((product)=>{
                    return(
                        <ProductOrder key={product._id} {...product}/>
                    )
                })
            }
        </div>
    );
}

const ElectronicsPage = () => {
    return (
        <div className="top-electronics-single-page">
        <div className="inner-div-hk-electronics">
          <div className="inner-inner-div-hk-electronics-1">
          <img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios16-iphone13-pro-widgets-stack-animation.gif" className="inner-inner-div-hk-electronics-image"/>
          </div>
          <div className="inner-inner-div-hk-electronics-2">
          <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Google_-_Shopping_Deals__backpacks_.gif" className="inner-inner-div-hk-electronics-image-google"/>
          </div>
          <div className="inner-inner-div-hk-electronics-4">
          <img src="https://uploads-ssl.webflow.com/6356a1df0f3a7a17f96d4ecd/64a2b7d3402b37eb383c2a87_matto-home-18.gif" className="inner-inner-div-hk-electronics-image-tv"/>
          </div>
          <div className="inner-inner-div-hk-electronics-3">
          <h1>Stay Smarter </h1>
          <img src="https://cdn.vox-cdn.com/thumbor/h9LsGphYavpCM5kY3TBNzu-CXys=/0x0:5760x3240/1400x1050/filters:focal(2880x1620:2881x1621)/cdn.vox-cdn.com/uploads/chorus_asset/file/16274522/OMEN_X_2S_Laptop___2.jpg" className="inner-inner-div-hk-electronics-image-red"/>
          </div>
          
          
        </div>


        <Carousel/>
        <ElectronicsProducts/>
        </div>
    );
}


const Wrapper = styled.article`
    
  .outer-div-hk-product{  
    width: 290px;
    height: 300px;
    margin-left: 32px;
  }

  .container {
    position: relative;
    display:flex;
    justify-content:center;
    align-items:center;
    background: var(--clr-black);
    border-radius: var(--radius);
  }

  .element-amount-hk-order h5{
    font-family: Raleway, sans-serif;
    margin-top: 3px;
    margin-bottom: 0px;
    font-weight: 400;
    font-size: 14px;
    margin-left: 220px;
  }

  .element-amount-hk-order h6{
    font-family: Raleway, sans-serif;
    margin-top: 3px;
    margin-bottom: 0px;
    font-weight: 400;
    font-size: 13px;
    margin-left: 184px;
  }


  .product-order-hk-image{
    height: 175px;
    width: 100%;
    display: block;
    object-fit: contain;
    border-radius: var(--radius);
    transition: var(--transition);
  }

  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5 {
    font-family: Raleway, sans-serif;
    margin-top: 3px;
    margin-bottom: 0px;
    font-weight: 400;
    font-size: 14px;
  }

  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`;

export default ElectronicsPage;