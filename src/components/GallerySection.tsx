import React from "react";
import Slider from "react-slick";
import { Typography } from "antd";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const { Title } = Typography;

const images = [
  "/assets/memories/img1.jpg",
  "/assets/memories/img2.jpg",
  "/assets/memories/img3.jpg",
];

const GallerySection: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="gallery-section">
      <Title level={3}>🌸 Những khoảnh khắc của chúng ta 🌸</Title>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt="Kỷ niệm" className="memory-img" />
            </div>
          ))}
        </Slider>
      </motion.div>
      <p className="message">
        “Cảm ơn em đã đến trong cuộc đời anh.  
        Chúc em 20/10 thật hạnh phúc, và mãi là người con gái anh yêu nhất.” 💕
      </p>
    </div>
  );
};

export default GallerySection;
