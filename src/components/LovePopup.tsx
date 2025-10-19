import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { motion } from "framer-motion";

const LovePopup: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      className="love-popup"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="popup-content"
      >
        <HeartFilled style={{ fontSize: 48, color: "#eb2f96" }} />
        <h3>Em yêu của anh 💖</h3>
        <p>Mãi luôn xinh đẹp, đáng yêu và là nguồn cảm hứng của anh mỗi ngày.</p>
      </motion.div>
    </Modal>
  );
};

export default LovePopup;
