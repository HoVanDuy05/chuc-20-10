import React from "react";
import { Modal } from "antd";
import { motion } from "framer-motion";

type Props = { visible: boolean; onClose: () => void };

export default function WishOverlay({ visible, onClose }: Props) {
  return (
    <Modal open={visible} onCancel={onClose} footer={null} centered bodyStyle={{ background: "transparent", border: "none" }} width={760}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div style={{ padding: 28, borderRadius: 16, background: "linear-gradient(180deg,#fff, #fff4f8)", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: 44, color: "#b83a7a", margin: 0 }}>20/10</h1>
          <p style={{ marginTop: 12, fontSize: 18, color: "#4b3b4b" }}>
            Em yêu ơi — chúc em luôn tươi cười, luôn rạng rỡ và mỗi ngày đều trọn vẹn niềm vui. Anh mãi bên em.
          </p>
          <div style={{ marginTop: 18, fontFamily: "'Dancing Script', cursive", fontSize: 26, color: "#b83a7a" }}>— Gửi bởi người luôn yêu em</div>
        </div>
      </motion.div>
    </Modal>
  );
}
