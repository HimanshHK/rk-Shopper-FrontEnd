import React, { useEffect, useRef, useState } from 'react';
import './ShopperMainPage.css';

const ShopperMainPage = () => {
  const canvasRef = useRef();
  const [scrollComplete, setScrollComplete] = useState(false);
  const [showList, setShowList] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // Add state to control animation

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const frameCount = 945;
    const animationSpeed = 100; // Adjust this value to control animation speed (in milliseconds)

    const currentFrame = (index) =>
      `${process.env.PUBLIC_URL}/finalfolder/rkshop${(index + 1).toString().padStart(5, '0')}.png`;

    const preloadImages = async () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        // await new Promise((resolve) => setTimeout(resolve, animationSpeed)); // Introduce a delay between image loads
      }
    };

    const img = new Image();
    img.src = currentFrame(0);

    const updateImage = async(index) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0, img.width, img.height);
      await new Promise((resolve) => setTimeout(resolve, animationSpeed));
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const isScrollComplete = Math.abs(scrollTop - maxScrollTop) < 1;

      if (isScrollComplete) {
        setScrollComplete(true);
        setShowList(true);
      } else {
        const scrollFraction = scrollTop / maxScrollTop;
        const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));

        if (!isAnimating) {
          setIsAnimating(true);
          requestAnimationFrame(() => {
            updateImage(frameIndex + 1);
            setIsAnimating(false);
          });
        }
      }

      if (isScrollComplete === false) {
        setShowList(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    preloadImages();

    // Set the canvas dimensions to match the image dimensions
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
    };

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='hk-main-page'>
      <canvas ref={canvasRef} id="hero-lightpass" />
    </div>
  );
};

export default ShopperMainPage;
