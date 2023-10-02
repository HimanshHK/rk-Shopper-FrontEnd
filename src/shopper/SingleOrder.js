import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { hostUrl } from "../host";
import Cookies from "js-cookie";
import GridViewOrder from "./GridViewOrder";
import Loading from "./Loading";
import "./SingleOrder.css";

const SingleOrder = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${hostUrl}/api/orders/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: Cookies.get("shopperWebToken") }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.orders);
      });
  }, []);

  if (data.length == 0) return <Loading />;
  else {
    return (
      <>
        <div className="upper-div-single-order-hk">
          <div className="inner-div-single-order-hk">
            
              <img className='img-div-single-order-hk' src="https://meccha-japan.com/20598-large_default/nendoroid-genie-aladdin.jpg"/>
              <h2 className='head-div-single-order-hk'>Cart Items</h2>
              <img className='img-div-single-order-hk2' src="https://t3.ftcdn.net/jpg/00/54/52/94/360_F_54529431_ItTVve5guoAjz5mIhxfdBVJ1ARGoj5Yr.jpg"/>
            
          </div>
          <GridViewOrder products={data.arr} />
        </div>
      </>
    );
  }
};

export default SingleOrder;
