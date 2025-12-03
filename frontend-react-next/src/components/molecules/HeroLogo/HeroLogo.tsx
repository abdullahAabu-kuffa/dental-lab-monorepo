"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { motionVariants, gradients } from "@/app/[locale]/design-system";

interface HeroLogoProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	delay?: number;
}

export default function HeroLogo({
	src,
	alt,
	width,
	height,
	className = "",
	delay = 0,
}: HeroLogoProps) {
	return (
		<motion.div className="text-center" {...motionVariants.fadeInDown(delay)}>
			<div className="inline-block relative">
				{/* Logo with Float Animation */}
				<motion.div
					animate={{
						y: [0, -8, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
						repeatDelay: 0.5,
					}}
				>
					<Image
						src={src}
						alt={alt}
						width={width}
						height={height}
						className={`${className} mx-auto relative z-10`}
						priority
					/>
				</motion.div>

				{/* Animated Underline */}
				<motion.div
					className="mt-6 mx-auto h-0.5"
					style={{
						width: "70%",
						backgroundImage: gradients.goldUnderline,
					}}
					initial={{ scaleX: 0, opacity: 0 }}
					animate={{ scaleX: 1, opacity: 0.6 }}
					transition={{
						duration: 1.2,
						delay: delay + 0.6,
						ease: "easeOut",
					}}
				/>
			</div>
		</motion.div>
	);
}
