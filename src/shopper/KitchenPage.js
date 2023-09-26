import React,{useState,useEffect} from "react";
import "./KitchenPage.css"
import {hostUrl} from '../host'
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Slider = () => {
    return (
      <div className="slider-hk-kitchen">
        <div className="slide-track-hk-kitchen">
          {[...Array(14)].map((_, index) => (
            <div key={index} className="slide-hk-kitchen">
              <img
                src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/${index % 7 + 1}.png`}
                height="100"
                width="250"
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="slider-hk-kitchen::before"></div>
        <div className="slider-hk-kitchen::after"></div>
      </div>
    );
  };




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
          {/* <div className="element-amount-hk-order">
              <h6>{stock==null ?0:stock} Left</h6>
            </div> */}
          <footer>
            <h5>{name}</h5>
            <p>₹{price}</p>
          </footer>
        </div>
      </Wrapper>
    );
  };


const KitchenProducts = () => {
    const [products,changeProducts]=useState([]);

    useEffect(()=>{
        fetch(`${hostUrl}/api/partProducts/staples`)
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json);
            changeProducts(json);
        })
    },[]);

    return(
        <div className="fashion-products">
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

const KitchenPage = () => {
    return (
        <div className="top-kitchen-single-page">
        <div className="just-a-banner-img-hk-kitchen">
            <div className="banner-image-products-hk-kitchen"></div>
            <div className="banner-image-products-hk-right-between-kitchen"></div>
            <div className="banner-image-products-hk-right-kitchen"></div>
        </div>
        <div>
        </div>
        <div>
        <Slider/>
        </div>

        <KitchenProducts/>
        </div>
    );
}


const Wrapper = styled.article`
    
  .outer-div-hk-product{  
    width: 290px;
    height: 300px;
    margin-left: 32px;
    margin-top: 50px;
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

export default KitchenPage;