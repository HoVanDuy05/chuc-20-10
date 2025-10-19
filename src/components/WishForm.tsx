import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import { motion } from "framer-motion";

const { TextArea } = Input;

const WishForm: React.FC = () => {
  const [ten, setTen] = useState("");
  const [loiChuc, setLoiChuc] = useState("");
  const [hienThi, setHienThi] = useState(false);

  return (
    <div className="wish-form">
      <Card title="💌 Gửi lời chúc của bạn" bordered={false}>
        <Input
          placeholder="Nhập tên bạn..."
          value={ten}
          onChange={(e) => setTen(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <TextArea
          placeholder="Nhập lời chúc thật ngọt ngào..."
          value={loiChuc}
          onChange={(e) => setLoiChuc(e.target.value)}
          rows={3}
          style={{ marginBottom: 10 }}
        />
        <Button
          type="primary"
          onClick={() => setHienThi(true)}
          disabled={!ten || !loiChuc}
        >
          Gửi lời chúc 💖
        </Button>

        {hienThi && (
          <motion.div
            className="wish-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3>🌷 Từ: {ten}</h3>
            <p>{loiChuc}</p>
          </motion.div>
        )}
      </Card>
    </div>
  );
};

export default WishForm;
