import { React, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Sidebar, Footer } from "./components";
import Navbar from "./shopper/Navbar";
import Orders from "./shopper/Orders";


import {
  // Update,
  // SellerItems,
  // Registered,
  // SupportAdmin,
  // Home,
  SingleProduct,
  Cart,
  // Checkout,
  // Error,
  // About,
  Products,
  // PrivateRoute,
  // AuthWrapper,
  // Dashboard,
  // Profile,
  // Support,
  // Admin,
  // ProfileAdmin,
  // Users,
} from "./pages";


// import AddProduct from "./pages/AddProduct";
import ProductsPage from "./shopper/ProductsPage";
import WishList from "./shopper/WishList";
import SingleOrder from "./shopper/SingleOrder";
import SellerOrders from "./shopper/SellerOrders";
// import ConfirmBox from "./shopper/ConfirmBox";
import ShopperMainPage from "./shopper/ShopperMainPage";
import ElectronicsPage from "./shopper/ElectronicsPage";
import FashionPage from "./shopper/FashionPage";
// import LoadingPage from "./shopper/Loading";
import KitchenPage from "./shopper/KitchenPage";
import DailyProductsPage from "./shopper/DailyProductsPage";
import DairyPage from "./shopper/DairyPage";
import Error from "./shopper/Error";

export const UserContext = createContext(null);
function App() {


  document.title="RK SHOPPER";
  const favicon = document.querySelector('link[rel="icon"]');
  favicon.href=process.env.PUBLIC_URL + "/rk-logo-modified.png";

  return (
    <UserContext.Provider>
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <ShopperMainPage />
            </Route>
            <Route exact path="/wishlist">
              <WishList />
            </Route>
            <Route exact path="/electronics">
              <ElectronicsPage />
            </Route>
            <Route exact path="/daily">
              <DailyProductsPage />
            </Route>
            <Route exact path="/dairy">
              <DairyPage />
            </Route>
            <Route exact path="/fashion" >
              <FashionPage />
            </Route>
            <Route exact path="/kitchen">
              <KitchenPage />
            </Route>
            {/* <Route exact path="/confirm">
              <ConfirmBox />
            </Route> */}
            {/* <Route exact path="/registered">
              <Registered />
            </Route> */}
            <Route exact path="/orders">
              <Orders />
            </Route>
            <Route exact path="/sellerorders">
              <SellerOrders />
            </Route>
            {/* <Route exact path="/update">
              <Update handleDataUser={handleDataUser} />
            </Route> */}
            {/* <Route exact path="/items">
              <SellerItems />
            </Route> */}
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/trending">
              <ProductsPage />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            {/* <Route exact path="/addproduct">
              <AddProduct />
            </Route> */}
            <Route exact path="/products/:id" children={<SingleProduct />} />
            <Route exact path="/orders/:id" children={<SingleOrder />} />
            {/* <Route exact path="/dashboard">
              <Dashboard />
            </Route> */}
            {/* <Route exact path="/allusers">
              <Users />
            </Route> */}
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
