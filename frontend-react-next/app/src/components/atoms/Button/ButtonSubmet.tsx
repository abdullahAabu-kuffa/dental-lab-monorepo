// "use client";
// import { motion } from "framer-motion";
// import { useState } from "react";
// import {
// 	animations,
// 	hoverEffects,
// 	tapEffects,
// 	componentStyles,
// } from "../../../../design-system";

// interface ButtonProps {
// 	children: React.ReactNode;
// 	variant?: "outline" | "solid";
// 	onClick?: () => void;
// 	className?: string;
// }

// export default function Buttons({
// 	children,
// 	variant = "solid",
// 	onClick,
// 	className = "",
// }: ButtonProps) {
// 	const [isPressed, setIsPressed] = useState(false);

// 	const variantClass =
// 		variant === "outline"
// 			? componentStyles.buttons.whiteBlackHover
// 			: componentStyles.buttons.primary;

// 	return (
// 		<motion.button
// 			onClick={onClick}
// 			className={`${variantClass} ${className}`}
// 			whileHover={hoverEffects.scaleSmall}
// 			whileTap={tapEffects.scaleSmall}
// 			onTapStart={() => setIsPressed(true)}
// 			onTapCancel={() => setIsPressed(false)}
// 			transition={animations.spring}
// 		>
// 			{/* Shine Effect */}
// 			<motion.div
// 				className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
// 				animate={{ x: isPressed ? ["-100%", "200%"] : "-100%" }}
// 				transition={{ duration: 0.6 }}
// 			/>

// 			<span className="relative z-10 flex items-center justify-center gap-2">
// 				{children}
// 			</span>
// 		</motion.button>
// 	);
// }