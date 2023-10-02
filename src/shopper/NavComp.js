import React,{useState} from 'react'
import './NavComp.css'
import Login from './Login'
import {Link} from 'react-router-dom'
// import Help from './Help'

export default function NavComp(props){
    const [links,setLinks]=useState(
        {
            first:"",
            second:"",
            third:"",
            fourth:"",
            fifth:"",
            sixth:""
        }
    );

    return (
        <>
        <div className='head-div'>
            <div className='child-div'>
                Shop
                <div className='inner-div-hk'>
                    <h4>
                    <Link to="" className='link-hk-navbar'>Shop {props.list.first}</Link>    
                    </h4>
                    <h4>
                    <Link to="" className='link-hk-navbar'>{props.list.second}</Link>    
                    </h4>
                    <h4>
                    <Link to="" className='link-hk-navbar'>{props.list.third}</Link> 
                    </h4>
                    <h4>
                    <Link to="" className='link-hk-navbar'>{props.list.fourth}</Link> 
                    
                    </h4>
                    <h4>
                    <Link to="" className='link-hk-navbar'>{props.list.fifth}</Link> 
                    
                    </h4>
                    <h4>
                    <Link to="" className='link-hk-navbar'>{props.list.sixth}</Link> 
                    
                    </h4>
                </div>
                <div className='quick-hk'>
                <Link to="" className='link-hk-navbar'>Why RK?<br/></Link> 
                
                <Link to="" className='link-hk-navbar'>Compare with Others</Link> 
                
                </div>
                
            </div>
            <div className='child-div'>
                Quick Links
                <div className='quick-hk'>
                <Link to="" className='link-hk-navbar'>Find a Store<br/></Link> 
                
                <Link to="" className='link-hk-navbar'>Order Status<br/></Link>     
                <Link to="" className='link-hk-navbar'>{props.list.eighth!=null && props.list.eighth}<br/></Link> 
                
                <Link to="" className='link-hk-navbar'>{props.list.ninth!=null && props.list.ninth}<br/></Link> 
                
                <Link to="" className='link-hk-navbar'>{props.list.seventh!=null && <Login/>}<br/></Link> 
                

                
                </div>
            </div>
        </div>
        </>
    )
}