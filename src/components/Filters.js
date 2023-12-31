import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';


const Filters = () => {

  const [showFilters, setShowFilters] = React.useState(true);
    const {
        filters: {
            text,
            category,
            company,
            color,
            min_price,
            price,
            max_price,
            shipping,
        },
        updateFilters,
        clearFilters,
        all_products,
    } = useFilterContext();

    const categories = getUniqueValues(all_products, 'category');
    const companies = getUniqueValues(all_products, 'company');
    const colors = getUniqueValues(all_products, 'colors');

    React.useEffect(() => {
      const handleResize = () => {
        setShowFilters(window.innerWidth >= 768);
      };
  
      // Set up the event listener when the component mounts
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        <Wrapper>
            <div style={{"display":showFilters?"grid":"none"}}>
            <div className="content" >
                <form onSubmit={(e) => e.preventDefault()}>

                    <div className="form-control">
                        <input
                            type="text"
                            name="text"
                            placeholder="search"
                            className="search-input"
                            value={text}
                            onChange={updateFilters}
                        />
                    </div>
                </form>
            </div>

            <div className="form-control">
                <h5>category</h5>
                <div>
                    {categories.map((c, index) => {
                        return (
                            <button
                                key={index}
                                onClick={updateFilters}
                                type="button"
                                name="category"
                                className={`${category === c.toLowerCase() ? 'active' : null}`}
                            >
                                {c}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="form-control">
                <h5>company</h5>
                <select
                    name="company"
                    value={company}
                    onChange={updateFilters}
                    className="company"
                >
                    {companies.map((c, index) => {
                        return (
                            <option key={index} value={c}>
                                {c}
                            </option>
                        );
                    })}
                </select>
            </div>



            <div className="form-control">
                <h5>price</h5>
                <p className="price">{formatPrice(price)}</p>
                <input
                    type="range"
                    name="price"
                    onChange={updateFilters}
                    min={min_price}
                    max={max_price}
                    value={price}
                />
            </div>

            <div className="form-control shipping">
                <label htmlFor="shipping">free shipping</label>
                <input
                    type="checkbox"
                    name="shipping"
                    id="shipping"
                    onChange={updateFilters}
                    checked={shipping}
                />
            </div>


            <button type="button" className="clear-btnn-hk" onClick={clearFilters}>
                clear filters
            </button>

            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  position:fixed;
  ${'' /* display: grid; */}

  .form-control {
    margin-bottom: 1.25rem;
    border: transparent;
    line-height: 0.8;
    font-family: 'Raleway';
    font-size: 0.8rem;

    h5 {
      margin-bottom: 0.5rem;
    }
  }
  
  .search-input {
    background: var(--clr-grey-10);
    border-radius: 7px;
    border-color: transparent;
    letter-spacing: var(--spacing);
    padding: 3px;
    font-family: 'Raleway';
    font-size: 14px;
    font-weight: 500;
    position: relative;
    width:144px;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btnn-hk {
    width:150px;
    background: var(--clr-red-dark);
    color: var(--clr-white);
    margin-left:12px;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: relative;
      top: 1rem;
    }
  }
`;

export default Filters;
