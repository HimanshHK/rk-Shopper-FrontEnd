import React from 'react';
import { Link } from 'react-router-dom';
import './Page.css';
import Login from './Login';
import NavComp from './NavComp'

export default function Page(){
    return(
        <>
            <div className="container-h"/>    
            <div className="container-hk">
            <Login/>
            </div>
            <div className="container-hks">
            <img
              src={process.env.PUBLIC_URL + "/shinchan.gif"}
              alt="My Image"
              className="shinchan-hk"
            />
            <img
              src={process.env.PUBLIC_URL + "/buriburi.gif"}
              alt="My Image"
              className="shinchan-hk"
            />
            {/* <NavComp/> */}
            </div>
        </>
    )
}