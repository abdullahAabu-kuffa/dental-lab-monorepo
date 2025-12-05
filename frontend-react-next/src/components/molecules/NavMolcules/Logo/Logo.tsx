"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
	animations,
	hoverEffects,
	tapEffects,
} from "@/app/[locale]/design-system";

export default function Logo() {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.a
			href="/"
			className="relative block group"
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			whileHover={hoverEffects.scaleSmall}
			whileTap={tapEffects.scaleSmall}
			transition={animations.spring}
		>
			{/* Logo Image with Smooth 3D Effect */}
			<motion.div
				className="relative z-10"
				animate={{
					rotateY: isHovered ? 8 : 0,
					y: isHovered ? -2 : 0,
				}}
				transition={{ duration: 0.4, ease: "easeOut" }}
				style={{
					transformStyle: "preserve-3d",
					perspective: "1000px",
				}}
			>
				<Image
					src="/Avanté logo black.png"
					alt="Avanté Logo"
					width={600}
					height={200}
					priority
					className="h-[150px] w-auto transition-all duration-300"
				/>
			</motion.div>
		</motion.a>
	);
}
