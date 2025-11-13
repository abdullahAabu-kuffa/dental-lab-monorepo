"use client";
import { FC, ReactNode } from "react";
import { motion } from "framer-motion";
interface StatsCardProps {
  title: string;
  value: string | number;
  growth?: string;
  icon?: ReactNode;
  fromColor?: string;
  toColor?: string;
  delay?: number;
}

const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  growth,
  icon,
  fromColor = "from-blue-500",
  toColor = "to-blue-600", 
}) => {
  return (
    <motion.div
      className={`flex flex-col sm:flex-row sm:items-center hover:shadow-xl transition-all duration-400 sm:justify-between w-full sm:w-64 p-5 rounded-xl text-white shadow-md bg-linear-to-l ${fromColor} ${toColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      
      whileHover={{
        y: -10,
        transition: {  ease: "easeOut" },
      }}
    >
      <div className="flex-1">
        <p className="text-sm opacity-90">{title}</p>
        <h2 className="text-3xl font-semibold wrap-break-word">{value}</h2>
        {growth && <p className="text-xs mt-1 opacity-80">{growth}</p>}
      </div>

      {icon && (
        <div className="mt-4 sm:mt-0 sm:ml-4 bg-white/20 p-3 rounded-full self-start sm:self-auto">
          {icon}
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;
