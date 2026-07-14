"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-xl overflow-hidden">
      
      {/* Background Soft Orbs with Primary Colors */}
      <motion.div
        className="absolute w-72 h-72 bg-red-500/10 rounded-full blur-3xl mix-blend-multiply"
        animate={{ x: [-40, 40, -40], y: [-30, 30, -30] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply"
        animate={{ x: [40, -40, 40], y: [40, -40, 40] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-yellow-400/15 rounded-full blur-3xl mix-blend-multiply"
        animate={{ x: [0, -30, 0], y: [-40, 40, -40] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-center">
        {/* Fast Inner Primary Color Ring */}
        <motion.div
          className="absolute inset-[-8px] sm:inset-[-12px] rounded-full border-[3px] sm:border-[4px] border-transparent border-t-red-500 border-r-yellow-400 border-b-blue-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Slow Outer Primary Color Ring */}
        <motion.div
          className="absolute inset-[-18px] sm:inset-[-24px] rounded-full border-[2px] border-transparent border-l-yellow-400 border-b-red-500 border-r-blue-500 opacity-60"
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Circular Image Container */}
        <motion.div
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-10 flex items-center justify-center overflow-hidden p-2 sm:p-4"
          animate={{ scale: [0.97, 1.03, 0.97] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src="/icon-192x192.png"
              alt="Loading..."
              fill
              sizes="(max-width: 768px) 128px, 160px"
              priority
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}