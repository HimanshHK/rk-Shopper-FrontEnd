import React from 'react';
import { useFilterContext } from '../context/filter_context';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import styled from 'styled-components';

const Sort = () => {
  const { filtered_products: products, grid_view, setGridView, setListView, sort, updateSort } = useFilterContext();

  return (
    <Wrapper>
      <div className='btn-container'>
        <button type='button' className={`${grid_view ? 'active' : null}`} onClick={setGridView}>
          <BsFillGridFill className='clr'/>
        </button>

        <button type='button' className={`${!grid_view ? 'active' : null}`} onClick={setListView}>
          <BsList className='clr'/>
        </button>

      </div>
      <p>{products.length} products found</p>
      <hr />

      
      <form>
        <label htmlFor='sort'>sort by</label>
        <select name='sort' id='sort' className='sort-input' value={sort} onChange={updateSort}>
          <option value='price-lowest'>price (lowest)</option>
          <option value='price-highest'>price (highest)</option>
          <option value='name-a'>name (a-z)</option>
          <option value='name-z'>name (z-a)</option>
        </select>
      </form>
      
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  font-family: "Raleway", sans-serif;
  width: 64vw;

  .clr {
    color: #4B4447;
    border: 1px solid #4B4447;
    border-radius: var(--radius);
  }

  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }

    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (max-width: 768px) {
      width:90vw;
  }

  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;

    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      svg {
        font-size: 1.1rem;
      }
    }

    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border: 1px solid var(--clr-black);
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    margin-left: 0.5rem;
    border-radius: 4%;
    
  }


  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;
