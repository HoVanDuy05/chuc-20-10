import React from "react";
import { motion } from "framer-motion";
import { Typography, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => (
  <div className="hero-section">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <Title level={2}>Happy Women’s Day 20/10 🌸</Title>
      <Paragraph className="hero-text">
        Hôm nay là ngày tôn vinh những người phụ nữ Việt Nam —  
        chúc bạn mãi xinh đẹp, hạnh phúc và luôn được yêu thương 💗
      </Paragraph>
      <Button
        type="primary"
        size="large"
        icon={<HeartOutlined />}
        shape="round"
      >
        Gửi yêu thương 💞
      </Button>
    </motion.div>
  </div>
);

export default HeroSection;
