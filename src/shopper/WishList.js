import React,{useState,useEffect} from "react";
import "./WishList.css";
import WishCards from "./WishCards";
import CardsFun from "./CardsFun";
import { hostUrl } from "../host";
import Cookies from 'js-cookie';
import Link from 'react-router-dom/Link';
import Loading from "./Loading";


export default function WishList() {
  const [wishlist, changeWishlist] = useState([]);
  const [token,setToken]=useState("#");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = Cookies.get('shopperWebToken');
    if (token !== undefined) {
      setToken(token);
    }
    console.log(token);
  
    fetch(`${hostUrl}/api/wishlistAll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const arr=[];
        for(let i=0;i<json.products.length;i++){
          arr.push(json.products[i]);
        }
        console.log(arr);
        changeWishlist(arr);
        // console.log(wishlist);
        setLoading(false);
      });
  }, [token]);
  

  
  if(loading)
  return <Loading/>
  else
  return (
    <>
        <div className="top-head-wish-hk-line">
        <div>
        <h1 className="top-head-wish-hk-text"><img src='https://thewishlist.pk/wp-content/uploads/2021/05/Wish-list-logo-F.png'/></h1>
        </div>    
        </div>
      <div className="top-head-wish-hk">
        {wishlist.map((item,index) => {
          const link=`/products/${item._id}`;
          if(index%2==0){
            return(
              <div>
              <Link to={link}>
                <div class="wishcards-hk-line">
                  <WishCards item={item} />
                </div>
              </Link>
              </div> 
            )
          }
          else{
            return(
              <div>
              <Link to={link}>
                <div class="wishcards-hk-line">
                  <CardsFun item={item} />
                </div>
              </Link>
              </div>    
            )
          }
        })

        }
      </div>
    </>
  );
}
