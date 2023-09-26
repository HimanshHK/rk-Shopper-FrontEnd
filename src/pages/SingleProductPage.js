import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  ProductImages,
  AddToCart,
  Stars
} from "../components";


import styled from "styled-components";
import { Link } from "react-router-dom";
import { hostUrl } from "../host";
import Cookies from "js-cookie";
import Loading from "../shopper/Loading";
import Error from "../shopper/Error";
import Login from "../shopper/Login";

const SingleProductPage = () => {
  const { id } = useParams();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();
  const [token, setToken] = useState("#");
  const [state, setState] = useState("no-one");

  useEffect(() => {
    // console.log("url:",url)
    fetchSingleProduct(`${url}${id}`);
    console.log(id);
  }, [id]);

  useEffect(() => {
    const token = Cookies.get("shopperWebToken");
    if (token != undefined) {
      setToken(token);
      fetch(`${hostUrl}/api/userState`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.type);
          setState(data.type);

          console.log(state);
        });
    }
    console.log(token);
  }, []);

  const history = useHistory();
  function removeItem(event) {
    event.preventDefault();
    // console.log(sku);
    fetch(`${hostUrl}/api/remove-item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: sku }),
    })
      .then((response) => response.json())
      .then((resData) => {
        if (resData.message === "Product has been deleted") {
          alert("Product removed successfully");
          history.push("/products");
        }
      })
      .catch((err) => console.log(err));
  }

  function addToWishlist(event) {
    event.preventDefault();
    console.log(sku);
    fetch(`${hostUrl}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: sku, token: token }),
    })
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        history.push("/wishlist");
      })
      .catch((err) => console.log(err));
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error/>;
  }

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    _id: sku,
    company,
    image,
  } = product;

  return (
    <Wrapper>
      {/* <PageHero title={name} product /> */}
      <div className="section section-center page">
        <div className="product-center">
          <ProductImages image={image} />
          <section className="content">
            <h2>{name}</h2>
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc display-linebreak">{description}</p>

            <p className="info">
              <span>Availability : </span>
              {stock > 0 ? `In Stock (${stock})` : "out of stock"}
            </p>
            <p className="info">
              <span>SKU : </span>
              {sku}
            </p>

            <p className="info">
              <span>Brand : </span>
              {company}
            </p>

            <Stars
              stars={Math.random() * 5 + 1}
              reviews={Math.floor(Math.random() * 200) + 1}
            />
            <hr />
            <div className="single-page-buttons-hk">
              {/* Add to cart*/}
              {state === "buyer" && <AddToCart product={product} />}

              {/* Login To Buy */}
              {state === "no-one" && 
                <div className="btn another-btn-hk">
                    <Login />  
                </div>
              }
              {/* Add to WishList */}
              {state === "buyer" &&
                <button onClick={addToWishlist} className="btn another-btn-hk">
                  Add to WishList
                </button>
                
              }
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    padding-top: 8rem;
  }

  .single-page-buttons-hk {
    display: flex;
    height:0px;
  }

  .another-btn-hk {
    display: flex;
    height: 32px;
    width: 200px;
    margin-top: 108px;
    margin-left: 10px;
    align-items: center;
    justify-content: center;
  }
  .another-btn-hk-heading {
    margin-left: 10px;
  }

  .content h2 {
    font-family: Raleway;
    font-size: 2.2rem;
  }
  .content h5 {
    font-family: revert;
    font-size: 1.1rem;
  }

  .back-to-product-hk {
    font-size: 16px;
    font-family: "Raleway";
    color: black;
    font-weight: 500;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .display-linebreak {
    white-space: pre-line;
  }
  .desc {
    line-height: 1.4;
    max-width: 30em;
    font-size: 15px;
    font-family: "Raleway";
    font-weight: 500;
  }
  .info {
    text-transform: capitalize;
    width: 354px;
    display: grid;
    grid-template-columns: 127px 1fr;
    font-size: 15px;
    font-family: "Raleway";
    span {
      width: 100%;
      font-weight: 700;
    }
  }

  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
    padding: 10px;
    border: white;
    color: white;
    margin-right: 5px;
  }
  .submit-btn {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }
  .link-hk {
    color: white;
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
