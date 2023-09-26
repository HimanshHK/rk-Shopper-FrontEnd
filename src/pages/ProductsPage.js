import React from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero } from '../components';


const ProductsPage = () => {
    return (
        <main>
            <Wrapper className='page'>
                <div className='section-center products'>
                <div className="col-lg-2 col-md-4 col-sm-6">
                <Filters />
                </div>              
                    <div className="col-lg-10 col-md-8 col-sm-6 elements-products-hk">
                        <Sort />
                        <ProductList />
                    </div>
                </div>
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.div`


  ${'' /* margin-top:10vh; */}

  .products {
    display: grid;
    flex-direction: column;
    gap: 3rem 1.5rem;
    padding-top: 80px;
    padding-bottom: 5rem;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
      ${'' /* padding-top: 40px; */}
    }
  }
  @media (max-width: 768px) {
    .products {
      ${'' /* grid-template-columns: 200px 1fr; */}
      padding-top:40px;

    }
  }
`;

export default ProductsPage;
