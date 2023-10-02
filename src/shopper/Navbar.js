import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";
import NavComp from "./NavComp";
import Login from "./Login";
import AddProduct from "./AddProductModal";
import Cookies from "js-cookie";
import { hostUrl } from "../host";

export default function Navbar() {
  const location = useLocation();
  const [state, setState] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [navPass, setNavPass] = useState("trending");
  const [userState, setUserState] = useState("no-one");
  const [token, setToken] = useState("#");

  console.log("navbar", location.pathname);

  const [list, setList] = useState({
    first: "the Latest",
    second: "Electronics",
    third: "Grocery",
    fourth: "Fashion",
    fifth: "Kitchen",
    sixth: "Fruits",
  });
  const [showSidebar, setShowSidebar] = useState(false);

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
          setUserState(data.type);

          console.log(userState);
        });
    }
    console.log(token);
  }, []);

  function highlightHeader(e) {
    if (e != undefined) {
      console.log(e.target.firstChild);
      console.log(e.target.firstChild.textContent === "Trending");

      if (e.target.firstChild.textContent === "Trending") {
        setNavPass("Trending");
        setList({
          first: "the Latest",
          second: "Electronics",
          third: "Grocery",
          fourth: "Fashion",
          fifth: "Kitchen",
          sixth: "Fruits",
          seventh: "SignIn",
          eighth: "Orders",
          ninth: "Wishlist",
        });
      } else if (e.target.firstChild.textContent === "Explore") {
        setNavPass("Explore");
        setList({
          first: "the Latest",
          second: "Electronics",
          third: "Grocery",
          fourth: "Fashion",
          fifth: "Kitchen",
          sixth: "Fruits",
          seventh: "SignIn",
          eighth: "Orders",
          ninth: "Wishlist",
        });
      } else if (e.target.firstChild.textContent === "Fashion") {
        setNavPass("Fashion");
        setList({
          first: "Latest Trends",
          second: "Mens Collection",
          third: "Womens Collection",
          fourth: "Kids Collections",
          fifth: "Latest Brands",
          sixth: "Most Popular",
        });
      } else if (e.target.firstChild.textContent === "Electronics") {
        setNavPass("Electronics");
        setList({
          first: "Appliances",
          second: "Mobiles",
          third: "Laptops",
          fourth: "Hardware",
          fifth: "Software & Games",
          sixth: "Most Popular",
        });
      } else if (e.target.firstChild.textContent === "Kitchen") {
        setNavPass("Kitchen");
        setList({
          first: "Kitchen Appliances",
          second: "Cookware",
          third: "Dinnerware & Tableware",
          fourth: "Kitchen Storage",
          fifth: "Kitchen Tools",
          sixth: "Most Popular",
        });
      } else if (e.target.firstChild.textContent === "Groceries") {
        setNavPass("Groceries");
        setList({
          first: "Fresh Items",
          second: "Fruits",
          third: "Vegetables",
          fourth: "Dairy Products",
          fifth: "Bakery Items",
          sixth: "Most Popular",
        });
      } else if (e.target.firstChild.textContent === "Dairy") {
        setNavPass("Dairy");
        setList({
          first: "Dairy Products",
          second: "Milk Products",
          third: "Cheese Products",
          fourth: "Daily use",
          fifth: "Bakery Items",
          sixth: "Most Popular",
        });
      } else {
        setNavPass("Me");
        setList({
          first: "Now Trending",
          second: "Account",
          third: "Sign In",
          fourth: "Your Saves",
          fifth: "More Items",
          sixth: "Support",
        });
      }
    }

    return new Promise((resolve) => {
      const headerNav = document.querySelector(".header-nav");
      headerNav.classList.add("highlight");
      setTimeout(() => {
        headerNav.classList.add("highlight");
        setState(true);
        resolve();
      }, 200);
    });
  }

  async function unhighlightHeader() {
    if (state === false) return;
    await highlightHeader();
    const headerNav = document.querySelector(".header-nav");
    setState(false);
    headerNav.classList.remove("highlight");
  }

  useEffect(() => {
    function handleResize() {
      setShowSidebar(window.innerWidth < 690);
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial render
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="header-nav" onMouseLeave={unhighlightHeader}>
        <ul className="ul-nav">
          <li>
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + "/rk-logo-new.jpg"}
                alt="My Image"
                className="logo-shopper-hk"
              />
              
            </Link>
          </li>
          {!showSidebar && (
            <>
              {/* <li
                className="li-nav"
                onClick={state ? unhighlightHeader : highlightHeader}
                onMouseOver={highlightHeader}
              >
                <Link to="/trending" className="nav-link-hk-bar">
                  Trending
                </Link>
              </li> */}
              <li
                className="li-nav"
                name="electronics"
                onClick={state ? unhighlightHeader : highlightHeader}
                onMouseOver={highlightHeader}
              >
                <Link to="/fashion" className="nav-link-hk-bar">
                  Fashion
                </Link>
              </li>
              <li
                className="li-nav"
                name="electronics"
                onClick={state ? unhighlightHeader : highlightHeader}
                onMouseOver={highlightHeader}
              >
                <Link to="/electronics" className="nav-link-hk-bar">
                  Electronics
                </Link>
              </li>
              <li
                className="li-nav"
                name="kitchen"
                onClick={state ? unhighlightHeader : highlightHeader}
                onMouseOver={highlightHeader}
              >
                <Link to="/kitchen" className="nav-link-hk-bar">
                  Kitchen
                </Link>
              </li>
              <li
                className="li-nav"
                name="groceries"
                onClick={state ? unhighlightHeader : highlightHeader}
                onMouseOver={highlightHeader}
              >
                <Link to="/daily" className="nav-link-hk-bar">
                  DailyItems
                </Link>
              </li>
              <li
                className="li-nav"
                name="dairy"
                onClick={state ? unhighlightHeader : highlightHeader}
                onMouseOver={highlightHeader}
              >
                <Link to="/products" className="nav-link-hk-bar">
                  AllProducts
                </Link>
              </li>
              {userState === "buyer" && (
                <li
                  className="li-nav"
                  name="wish"
                  onMouseOver={unhighlightHeader}
                >
                  <Link to="/wishlist" className="nav-link-hk-bar">
                    Wishlist
                  </Link>
                </li>
              )}

              {userState === "buyer" && (
                <li
                  className="li-nav"
                  name="orders"
                  onMouseOver={unhighlightHeader}
                >
                  <Link to="/orders" className="nav-link-hk-bar">
                    Orders
                  </Link>
                </li>
              )}
              {userState === "seller" && (
                <li
                  className="li-nav"
                  name="sellerorders"
                  onMouseOver={unhighlightHeader}
                >
                  <Link to="/sellerorders" className="nav-link-hk-bar">
                    SellerOrders
                  </Link>
                </li>
              )}

              {/* <li className="li-nav" name="me" onClick={state?unhighlightHeader:highlightHeader} onMouseOver={highlightHeader}>
                Myself
              </li> */}
              <li className="li-nav" name="me">
                <Login />
              </li>
              {userState === "seller" && (
                <li className="li-nav" name="me">
                  {/* <Link to="#" className="li-nav-inside"></Link> */}
                  <AddProduct />
                </li>
              )}
              {userState === "buyer" && (
                <li
                  className="li-nav"
                  name="wish"
                  onMouseOver={unhighlightHeader}
                >
                  <Link to="/cart" className="nav-link-hk-bar">
                    Cart
                  </Link>
                </li>
              )}
            </>
          )}
          {showSidebar && (
            <li
              className="li-nav side-new-hk"
              name="sidebar-hk"
              onClick={state ? unhighlightHeader : highlightHeader}
              onMouseOver={highlightHeader}
            >
              Explore
            </li>
          )}
        </ul>
        {state && (
          <>
            <NavComp list={list} navPass={navPass} />
          </>
        )}
      </div>
    </>
  );
}
