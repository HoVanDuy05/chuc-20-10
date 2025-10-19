import React from "react";
import { motion } from "framer-motion";
import "../index.css";

export default function LoaderScreen() {
  return (
    <div className="loader-screen">
      {/* Vòng loader */}
      <motion.div
        className="loader-ring"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: "8px solid transparent",
          borderTop: "8px solid #ff4b2b",
          borderRight: "8px solid #ff416c",
          boxShadow: "0 0 20px rgba(255, 65, 108, 0.5)",
          background: "conic-gradient(#ffdde1, #ff4b2b, #ff416c, #ffdde1)",
        }}
      />

      {/* Text */}
      <motion.div
        className="loader-text"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: [0, 1, 0.8, 1], y: [6, 0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        style={{
          marginTop: 24,
          fontSize: 20,
          fontWeight: 700,
          color: "#fff",
          textShadow: "0 0 12px rgba(255,255,255,0.7)",
        }}
      >
        Đang chuẩn bị tấm thiệp cho em...
      </motion.div>
    </div>
  );
}
