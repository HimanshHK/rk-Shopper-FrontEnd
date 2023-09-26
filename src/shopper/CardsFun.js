import React from 'react'
import './CardsFun.css'
import { hostUrl } from '../host';

export default function CardsFun(props) {
    console.log(props);
    const fullName = props.item.name; // Assuming props.item.name is your string

    // Split the string into words
    const words = fullName.split(' ');

    // Take the first two words and capitalize the first letter of each
    const firstTwoWords = words.slice(0, 2).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Now, firstTwoWords contains the first two words with the first letter of each word capitalized
    console.log(firstTwoWords); // Display the result


    //company name
    const fullcompanyName = props.item.company; // Assuming props.item.name is your string

    // Split the string into words
    const word = fullName.split(' ');

    // Take the first two words and capitalize the first letter of each
    const companyName = word.slice(0, 2).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Now, firstTwoWords contains the first two words with the first letter of each word capitalized
    console.log(companyName); // Display the result
    
    return (
        <>
        <div class="container-hk-cards-fun">
        <div class="box-hk-cards-fun">
            <div className="content-hk-wish-cardfun">
            <img src={(props.item.image !=null && props.item.image[0]==='i')? `${hostUrl}/${props.item.image}`:props.item.image} alt='main' className="product-order-hk-image"/>
            <div className="description-hk-wish-cardfun">
                <p className="title-hk-wish-cardfun">
                <strong>{firstTwoWords}</strong>
                </p>
                <p className="info-hk-wish-cardfun">{companyName} | {props.item.stock} Left</p>
                <p className="price-hk-wish-cardfun">{props.item.price}</p>
            </div>
            </div>
        </div>
        </div>
        </>
    );
}