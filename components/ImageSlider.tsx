'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images}) => {
  const settings = {
    dots: true,             
    infinite: true,         
    speed: 800,             
    slidesToShow: 1,        
    slidesToScroll: 1,      
    autoplay: true,         
    autoplaySpeed: 3000,    
    cssEase: "ease-in-out", 
    arrows: false,         
    pauseOnFocus: true,    
    adaptiveHeight: true,
    lazyLoad: "ondemand",
    dotsClass: "slick-dots mt-2 flex justify-center gap-2",
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          dots: false,        
          autoplaySpeed: 2500
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {images.map((img, index) => {
        const imageUrl = typeof img === "string" ? img : img.cloudinaryUrl;
        return (
          <div key={index}>
            <img
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-60 object-cover rounded-md"
            />
          </div>
        );
      })}
    </Slider>
  );
};

export default ImageSlider;
