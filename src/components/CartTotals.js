import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { hostUrl } from '../host';
import Cookies from 'js-cookie';

const CartTotals = () => {
    const { total_amount, shipping_fee, cart,clearCart } = useCartContext();
    const { myUser, loinWithRedirect } = useUserContext();
    const [addressState,setAddressState]= useState(false);
    const [token,setToken]=useState("#");
    const [currOrder,setCurrOrder]=useState({
      passToken:"#",
      cartItems:[],
      mobile:"",
      address:""
    });
    
    useEffect(() => {
      const tokenHk=Cookies.get('shopperWebToken');
      const order=currOrder;
      setToken(tokenHk);
      console.log(token+" "+tokenHk);
    },[])

    useEffect(() => {
      const cartItems=cart;
      setCurrOrder({...currOrder,cartItems:cartItems});
      console.log(currOrder);
    },[cart])

    const handleChange=(event)=>{
      if(event)
      event.preventDefault();

      const {name,value}=event.target;
      setCurrOrder({...currOrder,[name]:value,passToken:token});
      console.log(currOrder);
    }
      
    const placeOrder = (event) => { 
      if(event)
      event.preventDefault();
      // const arr={...currOrder,order};

      //aage ka code yaha likhna hai
      fetch(`${hostUrl}/api/placeOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currOrder),
      })
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        clearCart();
        alert("Order Placed Successfully");

      })
      .catch((err) => console.log(err));
      
    };
    
    if(addressState){
      return (
        <Wrapper>
            <div>
                <article>
                    <h5>
                        subtotal : <span>{formatPrice(total_amount)}</span>
                    </h5>
                    <p>
                        shipping fee : <span>{formatPrice(shipping_fee)}</span>
                    </p>
                    <hr />
                    <h4>
                        order total : <span>{formatPrice(total_amount + shipping_fee)}</span>
                    </h4>
                </article>
                <button onClick={placeOrder} className='btn' type='button'>
                    <div>PLACE ORDER</div>
                </button>
           
                    {/* <StripeCheckout
                    name="Shopper Locals Store"
                    amount={(total_amount + shipping_fee)*100}
                    currency="INR"
                      token={onToken}
                      stripeKey="pk_test_51MBdYtSHqt13bUHuSugZS2VbDFbNFwLdglHgpb7umqF0FyhhaQSbyGv3br0HqUz92W69HUof8eahVBPlhHfwgg4u00x21secuO"
                    >
                    <button onClick={setOrder} className='btn' type='button'>
                        <div>Proceed to Pay</div>
                    </button>

                    </StripeCheckout> */}
                
            </div>
        </Wrapper>
    );
    }
    else{
      return (
        <Wrapper>
            <div>
            
                <form>
                <article>
                    <h5 className='label-head-hk'> Ready to Deliver</h5>
                    <div onChange={handleChange}>
                    <input placeholder='Phone Number' name="mobile" value={currOrder.mobile} required className='input-delivery-hk'/><br/>
                    </div>
                    <div onChange={handleChange}>
                    <input placeholder='Delivery Address' name="address" value={currOrder.address} required className='input-delivery-hk'/><br/>
                    </div>
                    
                </article>
                    <button onClick={()=>setAddressState(true)} className='btn' type='button'>
                        <div>PROCEED NEXT</div>
                    </button>
                </form>
                 
            </div>
        </Wrapper>
    );
    }
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  
  .label-head-hk{
    font-size: 20px;
    font-weight: 700;
    font-family: 'Raleway';
  }
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
    height: 180px;
    width: 400px;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .hk{
    color:white;
    background-color: #ff6f61;
    padding: 1rem 1rem 1rem 1rem;

  }
  .btn{
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    color:white;
    background-color:hsl(22, 31%, 52%) ;
  }
  .input-delivery-hk{
    height: 35px;
    width: 100%;
    margin-top: 7px;
    border: 1px solid var(--clr-grey-5);
    border-radius: 3px;
    font-size: 16px;
    font-family: 'Raleway';
    padding-left: 9px;
    padding-right: 9px;

  }

  @media (max-width: 776px) {
    article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 1rem;
    height: 180px;
    width: 300px;
    }

    h5,h4{
      font-size: 95%;
    }
  }
`;

export default CartTotals;
