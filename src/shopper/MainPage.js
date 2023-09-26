import React,{useState,useEffect} from 'react';
import './MainPage.css';

const MainPage = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [index,setIndex] =useState(50);
    const [image,setImage] =useState(process.env.PUBLIC_URL + "/finalfolder/rkshop00001.png"); 

    useEffect(()=>{

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            if(currentScrollPos>prevScrollPos){
                setIndex(index+1);
                setImage(process.env.PUBLIC_URL + `/finalfolder/rkshop${(index+1)
                .toString()
                .padStart(5, '0')
                }.png`);
            }
            else{
                setIndex(index-1);
                setImage(process.env.PUBLIC_URL + `/finalfolder/rkshop${(index-1)
                .toString()
                .padStart(5, '0')
                }.png`);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };

    },[]);

    
    return (
        <div className="main-div-page-hk">
            <img src={image} className="main-page-image-div-hk"/>
        </div>
    )
}

export default MainPage;