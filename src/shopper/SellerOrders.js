import React,{useState,useEffect} from 'react';
import './SellerOrders.css'
import SellerOrdersCards from './SellerOrdersCards';
import { hostUrl } from "../host";
import Cookies from "js-cookie";
import { set } from 'lodash';
import Loading from './Loading';

const SellerOrders = () => {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        fetch(`${hostUrl}/api/getSellerOrders/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: Cookies.get("shopperWebToken") }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.orders[0].orders);
                setData(data.orders[0].orders);
                setLoading(false);
            });

    },[]);

    if(loading)
    return <Loading/>
    else
    return (
        <div className='more-seller-order-hk-div-outer'>
        <div className='seller-order-hk-div-outer'>
        {
            data.map((item)=>{
                return(
                    <SellerOrdersCards data={item}/>
                )
            })
        }
        </div>

        </div>
        
    );
}

export default SellerOrders;