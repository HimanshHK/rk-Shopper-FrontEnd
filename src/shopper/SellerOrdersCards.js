import React from 'react';
import './SellerOrdersCards.css'
import { AiFillCaretRight } from "react-icons/ai";
import { hostUrl } from '../host';
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Cookies from 'js-cookie';


const MainCard=(props)=>{
    console.log(props.data);
    const fullName = props.data.currOrder.name; // Assuming props.item.name is your string

    // Split the string into words
    const words = fullName.split(' ');

    // Take the first two words and capitalize the first letter of each
    const firstTwoWords = words.slice(0, 2).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Now, firstTwoWords contains the first two words with the first letter of each word capitalized
    console.log(firstTwoWords);

    return (
        <div>
        <div className='seller-orders-inner-div-hk'>
            <div className="slite-outer-image-seller-order-inner-hk">
            <img className='image-seller-order-inner-hk' src={(props.data.currOrder.image !=null && props.data.currOrder.image[0]==='i')? `${hostUrl}/${props.data.currOrder.image}`:props.data.currOrder.image}/>
            {/* <img className='image-seller-order-inner-hk'  alt='main' className="product-order-hk-image"/> */}
            </div>
            
            <div className='seller-inner-description-name-div-hk'>{firstTwoWords}</div>
            <div className='seller-inner-description-div-hk'>₹{props.data.currOrder.price}</div>
            <div className='seller-inner-description-left-div-hk'>{props.data.currOrder.amount} Item</div>
        </div>

        </div>
    )
}

const AddressCard= (props)=>{
    const fullName=props.data.address;
    const words = fullName.split(' ');
    const addressWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return(
        <div className='seller-orders-inner-div-hk'>
            <div className='inner-address-seller-order-hk-card'>
            Address:
            </div>
            <div className='inner-down-address-seller-order-hk-card'>
            {addressWords}
            </div>
        </div>
    )
}

const MobileCard= (props)=>{
    const fullName=props.data.mobile;
    const email=props.data.buyerEmail;
    return(
        <div className='seller-orders-inner-div-hk'>
            <div className='inner-first-address-seller-order-hk-card'>
            Mobile:
            </div>
            <div className='inner-first-down-address-seller-order-hk-card'>
            +91-{fullName}
            </div>
            <div className='inner-second-address-seller-order-hk-card'>
            Email:
            </div>
            <div className='inner-second-down-address-seller-order-hk-card'>
            {email}
            </div>
        </div>
    )
}

const SellerOrdersCards = (props) => {
    console.log(props.data);
    const [state,setState]=React.useState(0);
    const changeState=()=>{
        if(state==0){
            setState(1);
        }
        else if(state==1){
            setState(2);
        }
        else{
            setState(0);
        }
    }

    const handleClick = async () => {
        console.log(props.data.currOrder.status);
        if(props.data.currOrder.status==="Ordered"){
            const answer = await customConfirm({
            text: "Do you want to change the order status to Shipped?",
            title: "Are you Sure?This Can't be Redone",
            options: {
                trueButtonText: "Yes, I'm",
                falseButtonText: "No",
            },
            });
            console.log(props.data); 

            if(answer){
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        token: Cookies.get("shopperWebToken"),
                        order:props.data,
                        status:"Shipped",
                    })
                };
                const res = await fetch(`${hostUrl}/api/changeOrderStatus`, requestOptions);
                const data = await res.json();
                console.log(data);
            }

        }
        else if(props.data.currOrder.status==="Shipped"){
            const answer = await customConfirm({
            text: "Have you delivered the ordered succesfully?",
            title: "Are you Sure?This Can't be Redone",
            options: {
                trueButtonText: "Yes",
                falseButtonText: "No",
            },
            });
            console.log(props.data); 

            if(answer){
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        token: Cookies.get("shopperWebToken"),
                        order:props.data,
                        status:"Delivered",
                    })
                };
                const res = await fetch(`${hostUrl}/api/changeOrderStatus`, requestOptions);
                const data = await res.json();
                console.log(data);
            }
        }
        
    };

    
    return (
        <div className='seller-orders-outer-div-hk'>
        {
            state==0?<MainCard data={props.data}/>:state==1?<AddressCard data={props.data}/>:<MobileCard data={props.data}/>
        }
        <div className='seller-orders-inner-down-div-hk'>
            <div className='seller-orders-inner-down-right-down-div-hk-icon' onClick={changeState}><AiFillCaretRight /></div>
            <div className='seller-orders-inner-down-right-down-div-hk' style={props.data.currOrder.status==="Ordered"?{"color":"#bf0707"}:props.data.currOrder.status==="Shipped"?{"color":"#0500d3"}:{"color":"green"}} onClick={handleClick}>● {props.data.currOrder.status}</div>
        </div>
        </div>
    );
}



//Confirm Box
const confirmRoot = document.createElement("div");
const body = document.querySelector("body");
body?.appendChild(confirmRoot);

function ConfirmDialog({ title, text, giveAnswer, options }) {
  return (
    <Dialog
      open
      disableBackdropClick
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => giveAnswer(false)} color="primary">
          {options && options.falseButtonText ? options.falseButtonText : "Disagree"}
        </Button>
        <Button onClick={() => giveAnswer(true)} color="primary" autoFocus>
          {options && options.trueButtonText ? options.trueButtonText : "Agree"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const customConfirm = ({ text, title, options }) =>
  new Promise((res) => {
    const giveAnswer = (answer) => {
      ReactDOM.unmountComponentAtNode(confirmRoot);
      res(answer);
    };

    ReactDOM.render(
      <ConfirmDialog title={title} text={text} giveAnswer={giveAnswer} options={options} />,
      confirmRoot
    );
  });

const CustomComponent = () => {
  const handleClick = async () => {
    const answer = await customConfirm({
      text: "Are you positive you actually clicked this button?",
      title: "Are you okay?",
      options: {
        trueButtonText: "Uhm, yeah",
        falseButtonText: "Hell nawh",
      },
    });
    console.log("User's answer:", answer);
  };

  const myStyle={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100vh',
    padding:'0 20px'
  }

  return (
    <div style={myStyle}>
      <div onClick={handleClick}>Open Confirmation Dialog</div>
    </div>
  );
};


export default SellerOrdersCards;