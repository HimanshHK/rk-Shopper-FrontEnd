import React,{useEffect,useState} from "react";
import "./Orders.css";
import Slider from './Slider'
import { hostUrl } from "../host";
import Cookies from 'js-cookie';
import Loading from "./Loading";


export default function Orders() {
    const [orders,setOrders]=useState([]);
    const [previousOrders,setPreviousOrders]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        fetch(`${hostUrl}/api/orders`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({token:Cookies.get('shopperWebToken')}),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data.orders.cartItems);
            const ordersCurr=[];
            const ordersPrev=[];

            console.log(data.orders.cartItems.length);
            for (let i = 0; i < data.orders.cartItems.length; i++) {
                const currDate = new Date();
                const orderDate = new Date(data.orders.cartItems[i].orderDate);
            
                if (orderDate instanceof Date && !isNaN(orderDate)) {
                    const value = currDate.getTime() - orderDate.getTime();
                    const millisecondsInOneMonth = 30 * 24 * 60 * 60 * 1000;
                    const amtData=data.orders.cartItems[i].arr;
                    let totalAmt=0;
                    for(let j=0;j<amtData.length;j++){
                        totalAmt+=amtData[j].price*amtData[j].amount;
                    }

                    const obj={
                        // image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
                        OrderDate:formatDateToDDMMYY(orderDate),
                        actualDate:orderDate,
                        Amount:totalAmt,
                        Items:data.orders.cartItems[i].arr,
                    }

                    if(i%8==0)
                    obj.image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60";
                    else if(i%8==1)
                    obj.image="https://images.unsplash.com/photo-1555421689-43cad7100750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWNvbW1lcmNlfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60";
                    else if(i%8==2)
                    obj.image="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVjb21tZXJjZXxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";
                    else if(i%8==3)
                    obj.image="https://images.unsplash.com/photo-1615833843615-884a03a10642?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGVjb21tZXJjZXxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";
                    else if(i%8==4)
                    obj.image="https://images.unsplash.com/photo-1630750797329-9772dcdee075?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGVjb21tZXJjZXxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";
                    else if(i%8==5)
                    obj.image="https://images.unsplash.com/photo-1504977402025-84285fea814b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxlY29tbWVyY2V8ZW58MHwxfDB8fHww&auto=format&fit=crop&w=600&q=60";
                    else if(i%8==6)
                    obj.image="https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWNvbW1lcmNlfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60";
                    else
                    obj.image="https://images.unsplash.com/photo-1629019581609-a1626ecfcc19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGVjb21tZXJjZXxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60";

                    if (value < millisecondsInOneMonth) {
                        ordersCurr.push(obj);
                    } else {
                        ordersPrev.push(obj);
                    }
                } else {
                    // Handle the case where orderDate is not a valid Date object
                    console.error(`Invalid date at index ${i}`);
                }
            }
            

            console.log(ordersCurr);
            console.log(ordersPrev);

            

            setOrders(ordersCurr);
            setPreviousOrders(ordersPrev);

            // setOrders(data.orders.cartItems);
            setLoading(false);
        })



    },[]);

    function formatDateToDDMMYY(date) {
        const day = date.getDate().toString().padStart(2, '0'); // Get and format the day (01 - 31)
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get and format the month (01 - 12)
        const year = date.getFullYear().toString().slice(-2); // Get and format the last two digits of the year (00 - 99)
    
        return `${day}-${month}-${year}`;
    }

    console.log(orders, previousOrders)
    if(loading)
    return <Loading/>
    else
    return (
        <>
            <div className='top-heading-slide-hk-order'>
            //<img className='trackorder-div-single-order-hk' src="https://muvit.in/wp-content/uploads/2022/04/TRACKING-order-POSTER.jpg"/>
            <img className='trackorder-div-single-order-hk' src="https://www.mydesignation.com/wp-content/uploads/2020/08/delivery-banner.jpg"/>
            <img className='trackorder-div-single-order-hk' src="https://www.incredible.co.za/media/wysiwyg/istockphoto-183322339-612x612.jpg"/>
            
            </div>
            <div className='heading-slide-hk-order'>Current Orders</div>
            <Slider item={orders}/>
            <div className='heading-slide-hk-order-down'>Previous Orders</div>
            <Slider item={previousOrders}/>
        </>
    )
}
