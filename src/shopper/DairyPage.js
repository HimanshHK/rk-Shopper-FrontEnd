import React,{useState,useEffect} from "react";
import "./DairyPage.css"
import {hostUrl} from '../host'
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Carousel from "./Carousel";

// import React, { useState } from 'react';
// import styled from 'styled-components';

const Container = styled.div`
  height: 600px;
  margin: 0;
  display: grid;
  grid-template-rows: 500px 100px;
  grid-template-columns: 1fr 30px 30px 30px 30px 30px 1fr;
  align-items: center;
  justify-items: center;
`;

const CarouselContainer = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 8;
  width: 100vw;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 600px;
  --items: 5;
  --middle: 3;
  --position: ${(props) => props.position || 1};
  pointer-events: none;
`;

const CarouselItem = styled.div`
  position: absolute;
  width: 300px;
  height: 400px;
  background-color: ${(props) => props.color};
  --r: calc(var(--position) - var(--offset));
  --abs: max(calc(var(--r) * -1), var(--r));
  transition: all 0.25s linear;
  transform: rotateY(calc(-10deg * var(--r))) translateX(calc(-300px * var(--r)));
  z-index: calc((var(--position) - var(--abs)));
`;

const RadioButton = styled.input`
  grid-column: ${(props) => props.col};
  grid-row: 2 / 3;
`;

function Carousel() {
  const [position, setPosition] = useState(3);

  const handleRadioChange = (event) => {
    setPosition(parseInt(event.target.value));
  };

  return (
    <Container>
      <RadioButton
        type="radio"
        name="position"
        value="1"
        col={2}
        checked={position === 1}
        onChange={handleRadioChange}
      />
      <RadioButton
        type="radio"
        name="position"
        value="2"
        col={3}
        checked={position === 2}
        onChange={handleRadioChange}
      />
      <RadioButton
        type="radio"
        name="position"
        value="3"
        col={4}
        checked={position === 3}
        onChange={handleRadioChange}
      />
      <RadioButton
        type="radio"
        name="position"
        value="4"
        col={5}
        checked={position === 4}
        onChange={handleRadioChange}
      />
      <RadioButton
        type="radio"
        name="position"
        value="5"
        col={6}
        checked={position === 5}
        onChange={handleRadioChange}
      />
      <CarouselContainer position={position}>
        <CarouselItem color="#90f1ef" style={{ '--offset': 1 }}></CarouselItem>
        <CarouselItem color="#ff70a6" style={{ '--offset': 2 }}></CarouselItem>
        <CarouselItem color="#ff9770" style={{ '--offset': 3 }}></CarouselItem>
        <CarouselItem color="#ffd670" style={{ '--offset': 4 }}></CarouselItem>
        <CarouselItem color="#e9ff70" style={{ '--offset': 5 }}></CarouselItem>
      </CarouselContainer>
    </Container>
  );
}





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


const DairyProducts = () => {
    const [products,changeProducts]=useState([]);

    useEffect(()=>{
        fetch(`${hostUrl}/api/partProducts/dairy`)
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json);
            changeProducts(json);
        })
    },[]);

    return(
        <div className="dairy-products">
        {/* <Carousel/> */}
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

const DairyPage = () => {
    return (
        <div className="top-dairy-single-page">
        <div className="inner-div-hk-dairy">
          <div className="inner-inner-div-hk-dairy-1">
          <img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios16-iphone13-pro-widgets-stack-animation.gif" className="inner-inner-div-hk-dairy-image"/>
          </div>
          <div className="inner-inner-div-hk-dairy-2">
          <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Google_-_Shopping_Deals__backpacks_.gif" className="inner-inner-div-hk-dairy-image-google"/>
          </div>
          <div className="inner-inner-div-hk-dairy-4">
          <img src="https://uploads-ssl.webflow.com/6356a1df0f3a7a17f96d4ecd/64a2b7d3402b37eb383c2a87_matto-home-18.gif" className="inner-inner-div-hk-dairy-image-tv"/>
          </div>
          {/* <div className="inner-inner-div-hk-electronics-5">
          <h1>Stay Smart</h1>
          </div> */}
          <div className="inner-inner-div-hk-dairy-3">
          <h1>Stay Smarter </h1>
          <img src="https://img.global.news.samsung.com/global/wp-content/uploads/2019/11/StarWars_Edition_Galaxy-Note10_main.gif" className="inner-inner-div-hk-dairy-image-red"/>
          </div>
          
          
        </div>


        <Carousel/>
        <DairyProducts/>
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

export default DairyPage;