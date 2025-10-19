import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import PictureTwoTone from "./PictureTwoTone"; 

type Props = {
  onOpenGallery?: () => void;
};

export default function EnvelopeCard({ onOpenGallery }: Props) {
  const [opened, setOpened] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleEnvelopeClick = () => {
    if (!opened) setOpened(true);
  };

  const handleLetterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (opened) setExpanded(true);
  };

  return (
    <div
      className={`envelope-wrap ${expanded ? "expanded" : ""}`}
      onClick={handleEnvelopeClick}
      role="button"
      tabIndex={0}
    >
      <div className="envelope-shadow" />

      <div className="envelope">
        <motion.div
          className="envelope-flap"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: opened ? -160 : 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        />

        <div className="envelope-body" />
        <div className="envelope-seal" />

        <motion.div
  className="envelope-letter"
  initial={{ y: "100%", scale: 1, opacity: 0 }} // lúc chưa mở, ẩn hoàn toàn
  animate={{
    y: opened ? "-30%" : "100%",   // nhô lên khi mở phong bì
    scale: expanded ? 1.5 : 1,     // phóng to khi nhấn mở thư
    opacity: opened ? 1 : 0,
  }}
  transition={{
    y: { type: "spring", stiffness: 120, damping: 15 },
    scale: { type: "tween", duration: 0.5 },
    opacity: { duration: 0.3 },
  }}
  onClick={(e) => {
    e.stopPropagation();
    if (opened) setExpanded(true);
  }}
>
  <h3 className="letter-title">Gửi em bé Quynh Trumm</h3>
  <p className="letter-text">
    Hôm nay là ngày đặc biệt — chúc em 20/10 thật rạng rỡ, hạnh phúc
    và luôn được yêu thương. I Love You! Boz.💛
  </p>
  {expanded && (
    <div className="letter-actions">
      <Button
        type="primary"
        shape="round"
        icon={<PictureTwoTone />}
        onClick={(e) => {
          e.stopPropagation();
          onOpenGallery?.();
        }}
      >
        Xem ảnh
      </Button>
    </div>
  )}
</motion.div>

      </div>
    </div>
  );
}
