import React from 'react'
import './HomePage.scss'

const IconCards = () => {
    return (
      <div className="icon-cards-hk-groceries">
        <div className="icon-cards-hk-groceries__content">
          {[1, 2, 3, 4, 5].map((index) => (
            <div className="icon-cards-hk-groceries__item" key={index}></div>
          ))}
        </div>
      </div>
    );
  };

const HomePage = () => {
    return (
        <div className='home-hk-main-div'>
            <IconCards/>
            <IconCards/>
            <IconCards/>
        </div>
    )
}

export default HomePage;