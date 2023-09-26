import React from 'react';
import styled from 'styled-components';
import Product from './Product';

const GridView = ({ products }) => {

  console.log(products);
  
  return (
    <Wrapper>
      <div className='products-container'>
        {products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
    width: 64vw;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 768px) {
    .products-container {
      width:90vw;
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default GridView;
