import React from 'react';
import styled from 'styled-components';
// import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import Stars from './Stars';
import { hostUrl } from '../host';
const ListView = ({ products }) => {
  return (
      <Wrapper>
        {products.map((product) => {
          const { _id, image, name, price, description,stock } = product;
          return (
              <article key={_id}>
              <img src={(image !=null && image[0]==='i')? `${hostUrl}/${image}`:image} alt='main' className='main' />
                <div>
                  <h4>{name}</h4>
                  <h5 className='price'>₹{price}</h5>
                  {/* <p className='des'> {description}</p> */}
                  <Link to={`/products/${_id}`} className='btn'>
                    View Item
                  </Link>
                  <br/>
                  <Stars stars={(Math.random() * 5)+1} reviews={Math.floor(Math.random()*200)+1} />
                  <div className='curr-quantity-hk'>{stock > 0 ? `Available` : 'Out of stock'}</div>
                  
                  </div>
              </article>
          );
        })}
      </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
 .des{
   white-space:nowrap;
   overflow:hidden;
 }
  img {
    
    display: block;
    width: 300px;
    height: 200px;
    object-fit: contain;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
    font-family: 'Raleway';
    font-weight: 500;
  }
  .curr-quantity-hk{
    font-size: 14px;
    font-family: 'Raleway';
    font-weight: 900;
  }

  h5{
    font-size:18px;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }

  .btn {
    font-size: 10px;
    padding: 0.35rem 0.8rem;
    font-weight: 700;
    font-family: 'Raleway';
  }
  @media (min-width: 992px) {
    article {
      width:90vw;
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
    article {
      width:90vw;
      justify-content:center;
      align-items:center;
      display:grid;
    }
  }
`;

export default ListView;
