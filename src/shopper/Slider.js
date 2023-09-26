import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import { Link } from "react-router-dom";

const Article = ({ data }) => {
  const { image, OrderDate, Amount, Items,actualDate } = data;
  
  const currStyle = {
    backgroundImage: `url(${image})`,
    padding: "50px 40px",
    backgroundSize:"cover",
    lineHeight: "0.1",
    color: "white",
    fontSize: "1px",
    margin: "0",
  };

  const fontStyle = {
    "fontSize": "10.5px",
    "margin": "122px 0px 0px 3px",
    "fontFamily": "R",
    "fontWeight": "500",
    "backgroundColor": "cadetblue",
    "padding": "1px 1px 1px 6px",
    "borderRadius": "4px",
    "width": "79px",
  };
  
  const fontStylehk = {
    "fontSize": "10.5px",
    "margin": "0px 0px 0px 15px",
    "fontFamily": "R",
    "fontWeight": "500",
    "backgroundColor": "darkmagenta",
    "padding": "0px 1px 0px 6px",
    "borderRadius": "4px",
    "width": "50px",
  };

  const link=`/orders/${actualDate.toISOString()}`

  return (
    <div>
    <Link to={link}>
    <div class="card-hkslide">
        <span
          style={{
            letterSpacing: "0.2em",
            position: "absolute",
            bottom: "8px",
            left: "20px",
            color: "rgb(51, 51, 51)",
            fontSize: "0.5em",
            fontWeight: 700,
          }}
        >Amount:₹{Amount}</span>
        <div style={currStyle}>
          <h6 style={fontStyle}>
            ORDERED ON
            <br /> 
          </h6>
          <h6 style={fontStylehk}>
            {OrderDate}
            <br />
          </h6>
        </div>
      </div>
    </Link>
    
      
    </div>
  );
};

const News = ({ data }) => {
  const [screenWidth, setScreenWidth] = useState(8);

  useEffect(()=>{

    function screenWidthHandler () {
      if(window.innerWidth>1490)
      setScreenWidth(8);
      else if(window.innerWidth<1490 && window.innerWidth>1290)
      setScreenWidth(7);
      else if(window.innerWidth<1290 && window.innerWidth>1110)
      setScreenWidth(6);
      else if(window.innerWidth<1110 && window.innerWidth>922)
      setScreenWidth(5);
      else if(window.innerWidth<922 && window.innerWidth>736)
      setScreenWidth(4);
      else if(window.innerWidth<736 && window.innerWidth>552)
      setScreenWidth(3);
      else if(window.innerWidth<552 && window.innerWidth>0)
      setScreenWidth(2);
    }

    window.addEventListener("resize", screenWidthHandler);

    //clean up function
    return () => {
      window.removeEventListener("resize", screenWidthHandler);
    }

  },[]);

  const settings = {
    infinite: false,
    slidesToShow: screenWidth,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    centerMode: false, // Ensure centerMode is set to false
    initialSlide: 0, // Start from the first slide
  };
  

  if (data.length > 0) {
    // const cards = document.querySelectorAll(".snip1584-order-hk");
    console.log(data.length);
    const newsTemplate = data.map((item, index) => (
        <div key={index}>
        {/* <Link to="#"> */}
          <Article data={item}/>
        {/* </Link> */}
        </div>
    ));

    return (
      <div className="news-order-hk">
        <Slider {...settings}>{newsTemplate}</Slider>

        <strong
          className={`news__count ${data.length > 0 ? "" : "none"}`}
        ></strong>
      </div>
    );
  }

  return <p>Please add some cards</p>;
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className="arrow-hk-style">
    <div className={className} onClick={onClick}>
      
    </div>
    </div>
    
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className="arrow-hk-style">
    <div className={className} onClick={onClick}>
      {/* Next */}
    </div>

    </div>
    
  );
};

const Carousel = (props) => {
  // const cards = [
  //   {
  //     image:
  //       "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/chicago-view-portrait-framing-places.jpg",
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
  //     image:
  //       "https://images.unsplash.com/photo-1582314437409-7a48e94a6511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
  //     title: "Caspian Bellevedere",
  //     subtitle: "Accounting",
  //   },
  //   {
  //     image:
  //       "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/chicago-view-portrait-framing-places.jpg",
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
  //     image:
  //       "https://images.unsplash.com/photo-1582314437409-7a48e94a6511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
  //     title: "Caspian Bellevedere",
  //     subtitle: "Accounting",
  //   },
  //   {
  //     image:
  //       "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/chicago-view-portrait-framing-places.jpg",
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
  //     image:
  //       "https://images.unsplash.com/photo-1582314437409-7a48e94a6511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
  //     title: "Caspian Bellevedere",
  //     subtitle: "Accounting",
  //   },
  // ];

  return (
    <div className="app-hk-order-hk">
      <News data={props.item} />
    </div>
  );
};

export default Carousel;
