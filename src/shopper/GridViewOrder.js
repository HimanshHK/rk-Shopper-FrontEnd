import React from 'react';
import styled from 'styled-components';
import ProductOrder from './ProductOrder';

const GridViewOrder = ({ products }) => {

  console.log(products);
  
  return (
    <Wrapper>
      <div className='products-container-hk-order'>
        {products.map((product) => {
          return <ProductOrder key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  ${'' /* margin-top: 5rem; */}
  img {
    height: 175px;
  }

  .products-container-hk-order {
    display: flex;
    flex-wrap: wrap;
    gap: 0rem 3rem;
    height:80vh;
    width: 90vw;
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

export default GridViewOrder;
