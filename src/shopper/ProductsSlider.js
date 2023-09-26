import React,{useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductsSlider.css';
import Link from 'react-router-dom/Link';
import {hostUrl} from '../host'

const Article = ({ data }) => {
  const { image, title, subtitle,link } = data;

  return (
    <figure className="snip1584">
    
      <div className="outer-img-hk-trending">
      {/* <img src={image} className="img-hk-trending" alt="" /> */}
      <img className="img-hk-trending" src={(image !=null && image[0]==='i')? `${hostUrl}/${image}`:image}/>
      </div>
      <figcaption>
        <h3>{title}</h3>
        <h5>View Items</h5>
      </figcaption>
      <a href={link}></a>
    </figure>
  );
};

const News = ({ data }) => {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };


  if (data.length > 0) {

    const cards = document.querySelectorAll(".snip1584");
    const newsTemplate = data.map((item, index) => (
      <div key={index}>
      
        <Article data={item}/>
      </div>
    ));

    return (
      <div className="news">
        <Slider {...settings}>{newsTemplate}</Slider>
        
        <strong className={`news__count ${data.length > 0 ? "" : "none"}`}>
        </strong>
      </div>
    );
  }

  return <p>Please add some cards</p>;
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    // <div className={className} onClick={onClick}>
    // </div>
    <></>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      {/* Next */}
    </div>
  );
};

const Carousel = (props) => {

  // console.log(props.item)
  // const cards = [
  //   {
  //     image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/chicago-view-portrait-framing-places.jpg",
  //     title: "Burgundy Flemming",
  //     subtitle: "Advertising",
  //   },
  //   {
  //     image:
  //       "https://i.pinimg.com/564x/e8/29/fd/e829fd11f548737c67fa74f4b064fdd8.jpg",
  //     title: "Nigel Nigel",
  //     subtitle: "Sound & Vision",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     title: "Caspian Bellevedere",
  //     subtitle: "Accounting",
  //   },
  //   {
  //       image:
  //         "https://images.unsplash.com/photo-1582314437409-7a48e94a6511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
  //       title: "Caspian Bellevedere",
  //       subtitle: "Accounting",
  //   },
  //   {
  //     image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/chicago-view-portrait-framing-places.jpg",
  //     title: "Burgundy Flemming",
  //     subtitle: "Advertising",
  //   },
  //   {
  //     image:
  //       "https://i.pinimg.com/564x/e8/29/fd/e829fd11f548737c67fa74f4b064fdd8.jpg",
  //     title: "Nigel Nigel",
  //     subtitle: "Sound & Vision",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     title: "Caspian Bellevedere",
  //     subtitle: "Accounting",
  //   },
  //   {
  //       image:
  //         "https://images.unsplash.com/photo-1582314437409-7a48e94a6511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
  //       title: "Caspian Bellevedere",
  //       subtitle: "Accounting",
  //   },
  //   {
  //     image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/chicago-view-portrait-framing-places.jpg",
  //     title: "Burgundy Flemming",
  //     subtitle: "Advertising",
  //   },
  //   {
  //     image:
  //       "https://i.pinimg.com/564x/e8/29/fd/e829fd11f548737c67fa74f4b064fdd8.jpg",
  //     title: "Nigel Nigel",
  //     subtitle: "Sound & Vision",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     title: "Caspian Bellevedere",
  //     subtitle: "Accounting",
  //   },
  //   {
  //       image:
  //         "https://images.unsplash.com/photo-1582314437409-7a48e94a6511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
  //       title: "Caspian Bellevedere",
  //       subtitle: "Accounting",
  //   },
  // ];

  return (
    <div className="app-hk">
      <News data={props.item} />
    </div>
  );
};

export default Carousel;
