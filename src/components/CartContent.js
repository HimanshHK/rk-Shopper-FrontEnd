import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import CartColumns from './CartColumns';
import CartItem from './CartItem';
import CartTotals from './CartTotals';

const CartContent = () => {
    const { cart, clearCart } = useCartContext();
    return (
        <Wrapper className='section section-center'>
            <CartColumns />
            <div className="slidable-div-hk">
            {cart.map((item) => {
                return <CartItem key={item.id} {...item} />;
            })}
            </div>
            
            <hr />
            <div className='link-container'>
                <Link to='/products' className='link-btn'>
                    continue shopping
                </Link>
                <button type='button' className='link-btn clear-btn' onClick={clearCart}>
                    clear shopping cart
                </button>
            </div>
            <CartTotals />
        </Wrapper>
    );
};
const Wrapper = styled.section`

  ${'' /* .slidable-div-hk {
    height: 220px;
    overflow-y: scroll;
    right: -17px;
  } */}
  .slidable-div-hk {
      height: 220px;
      overflow-y: scroll;
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;  /* Firefox */
  }
  .slidable-div-hk::-webkit-scrollbar { 
      display: none;  /* Safari and Chrome */
  }
  
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-primary-5);
  }

  @media (max-width: 776px) {
    .slidable-div-hk {
      padding-top:80px;
      height: 320px;
    }

  }
`;
export default CartContent;
