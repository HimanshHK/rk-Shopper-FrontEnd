import React,{useEffect,useState} from "react";
import "./ProductsPage.css";
import ProductsSlider from './ProductsSlider'
import {hostUrl} from '../host'

export default function ProductsPage() {
    const [trendingProduct,changeTrendingProduct]=useState([]);
    const [fashionProduct,changeFashionProduct]=useState([]);
    const [seventyOffProduct,changeSeventyOffProduct]=useState([]);
    const [groceriesProduct,changeGroceriesProduct]=useState([]);
    const [topDealsProduct,changeTopDealsProduct]=useState([]);
    const [dailyProduct,changeDailyProduct]=useState([]);
    const [highDemandProduct,changeHighDemandProduct]=useState([]);

    useEffect(()=>{
        fetch(`${hostUrl}/api/products`)
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json);
            const arr=[];
            const arrfash=[];
            const arrseventy=[];
            const arrgroceries=[];
            const arrtop=[];
            const arrdaily=[];
            const arrdemand=[];

            for(let i=0;i<json.length;i++){
                if(json[i].category==="electronics"){
                    const words=json[i].name.split(" ");
                    const firstTwoWords=words.slice(0,2).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
                    const obj={
                        image:json[i].image,
                        title:firstTwoWords,
                        subtitle:json[i].company,
                        link:`/products/${json[i]._id}`
                    }
                    arr.push(obj);
                }
                if(json[i].category==="cloth"){
                    const words=json[i].name.split(" ");
                    const firstTwoWords=words.slice(0,2).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
                    const obj={
                        image:json[i].image,
                        title:firstTwoWords,
                        subtitle:json[i].company,
                        link:`/products/${json[i]._id}`
                    }
                    arrfash.push(obj);
                }
                if(json[i].price>1000){
                    const words=json[i].name.split(" ");
                    const firstTwoWords=words.slice(0,2).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
                    const obj={
                        image:json[i].image,
                        title:firstTwoWords,
                        subtitle:json[i].company,
                        link:`/products/${json[i]._id}`
                    }
                    arrseventy.push(obj);
                }
                if(json[i].category==="staples"){
                    const words=json[i].name.split(" ");
                    const firstTwoWords=words.slice(0,2).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
                    const obj={
                        image:json[i].image,
                        title:firstTwoWords,
                        subtitle:json[i].company,
                        link:`/products/${json[i]._id}`
                    }
                    arrgroceries.push(obj);
                }
                if(json[i].price>4000 && json[i].price<100000){
                    const words=json[i].name.split(" ");
                    const firstTwoWords=words.slice(0,2).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
                    const obj={
                        image:json[i].image,
                        title:firstTwoWords,
                        subtitle:json[i].company,
                        link:`/products/${json[i]._id}`
                    }
                    arrtop.push(obj);
                }
                if(json[i].category==="fruits"){
                    const words=json[i].name.split(" ");
                    const firstTwoWords=words.slice(0,2).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
                    const obj={
                        image:json[i].image,
                        title:firstTwoWords,
                        subtitle:json[i].company,
                        link:`/products/${json[i]._id}`
                    }
                    arrdaily.push(obj);
                }
                if(json[i].stock>10){
                    const words=json[i].name.split(" ");
                    const firstTwoWords=words.slice(0,2).map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
                    const obj={
                        image:json[i].image,
                        title:firstTwoWords,
                        subtitle:json[i].company,
                        link:`/products/${json[i]._id}`
                    }
                    arrdemand.push(obj);
                }
            }
            console.log(arr);
            changeTrendingProduct(arr);
            changeFashionProduct(arrfash);
            changeSeventyOffProduct(arrseventy.reverse());
            changeGroceriesProduct(arrgroceries);
            changeTopDealsProduct(arrtop.reverse());
            changeDailyProduct(arrdaily.reverse());
            changeHighDemandProduct(arrdemand);
        
        })
    },[]);

    const trendingCards=[
        {
        image: process.env.PUBLIC_URL + "/trending/2.jpg",
        title: "Louis Vuitton",
        subtitle: "Advertising",
        link:"/fashion"
        },
        {
        image: process.env.PUBLIC_URL + "/trending/9.jpg",
        title: "Sisley",
        subtitle: "Advertising",
        link:"/fashion"
        },
        {
        image: process.env.PUBLIC_URL + "/trending/3.jpg",
        title: "Prada",
        subtitle: "Advertising",
        link:"/fashion"
        },
        {
        image: process.env.PUBLIC_URL + "/trending/5.jpg",
        title: "Gucci",
        subtitle: "Advertising",
        link:"/fashion"
        },
        {
        image: process.env.PUBLIC_URL + "/trending/8.jpg",
        title: "Fendi",
        subtitle: "Advertising",
        link:"/fashion"
        },
    ]



    return (
        <div>
        <div className='main-div-product-hk' style={{backgroundImage:`url(${process.env.PUBLIC_URL + "/background-product-page-hk.jpg"})`}}>
        <div className='top-heading-slide-hk'></div>
            <ProductsSlider item={trendingCards}/>
            <div className="just-a-banner-img-hk">
                <div className="banner-image-products-hk"></div>
                <div className="banner-image-products-hk-right"></div>
            </div>
            <div className='heading-slide-hk'>Top Trending Deals</div>
            <ProductsSlider item={trendingProduct}/>
            <div className='heading-slide-hk'>Fashion Deals</div>
            <ProductsSlider item={fashionProduct}/>
            <div className="just-a-banner-img-hk-below">
                <div className="banner-image-products-hk-below"></div>
                <div className="banner-image-products-hk-right-below"></div>
            </div>
            <div className='heading-slide-hk'>Upto 70% Off </div>
            <ProductsSlider item={seventyOffProduct}/>
            <div className="just-a-banner-img-hk-below-more">
                <div className="banner-image-products-hk-below-more"></div>
                <div className="banner-image-products-hk-right-below-more"></div>
                <div className="banner-image-products-hk-right-right-below-more"></div>
            </div>
            <div className='heading-slide-hk'>Groceries</div>
            <ProductsSlider item={groceriesProduct}/>
            <div className='heading-slide-hk'>Daily Use Items</div>
            <ProductsSlider item={highDemandProduct}/>
            
            <div className="just-a-banner-img-hk-below-more-hk">
                <div className="banner-image-products-hk-below-more-hk"></div>
                <div className="banner-image-products-hk-right-below-more-hk"></div>

            </div>
            <div className='heading-slide-hk'>Fresh Items</div>
            <ProductsSlider item={dailyProduct}/>
            <div className='heading-slide-hk'>Top Deals</div>
            <ProductsSlider item={topDealsProduct}/>
        </div>
       
            
        </div>
    );
}