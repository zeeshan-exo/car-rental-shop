'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
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
              className="w-full h-auto object-cover"
            />
          </div>
        );
      })}
    </Slider>
  );
};

export default ImageSlider;
