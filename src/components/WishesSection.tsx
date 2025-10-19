import React from "react";
import { Card, Row, Col } from "antd";
import { motion } from "framer-motion";

const wishes = [
  "Chúc bạn luôn xinh đẹp và tự tin 💅",
  "Chúc ngày 20/10 rực rỡ như hoa 🌺",
  "Mong bạn luôn mỉm cười và hạnh phúc 🌸",
  "Bạn là điều tuyệt vời nhất trong thế giới này 💖",
];

const WishesSection: React.FC = () => (
  <div className="wishes-section">
    <Row gutter={[16, 16]} justify="center">
      {wishes.map((wish, i) => (
        <Col xs={22} sm={10} md={6} key={i}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="wish-card" bordered={false}>
              {wish}
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  </div>
);

export default WishesSection;
