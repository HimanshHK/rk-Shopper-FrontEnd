import React from 'react'
import styled from 'styled-components'
// import { formatPrice } from '../utils/helpers'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {hostUrl} from '../host'

const Product = ({image, name, price, _id}) => {
  return <Wrapper>
  <div className='outer-div-hk-product'>
      <div className="container">
        <img src={(image !=null && image[0]==='i')? `${hostUrl}/${image}`:image} alt='main' className='main' />
        <Link to={`/products/${_id}`} className="link">
          <FaSearch />
        </Link>
      </div>

      <footer>
        <h5>{name}</h5>
        <p>₹{price}</p>
      </footer>

  </div>
    
  </Wrapper>
}

const Wrapper = styled.article`

  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
    
  }

  img {
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
  footer h5{
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
  ${'' /* @media (max-width: 1323px) {
    .outer-div-hk-product{
      width:300px;
    }
  }
  @media (max-width: 1211px) {
    .outer-div-hk-product{
      width:270px;
    }
  } */}
`
export default Product
