"use client";

import { motion } from "framer-motion";
import { gradients } from "@/app/design-system";

interface HeroTextProps {
	text: string;
	gradientText?: string;
	className?: string;
	isGradient?: boolean;
	delay?: number;
}

export default function HeroText({
	text,
	gradientText,
	className = "",
	isGradient = false,
	delay = 0,
}: HeroTextProps) {
	const renderText = () => {
		if (!isGradient || !gradientText) return text;

		const parts = text.split(gradientText);

		return (
			<>
				{parts[0]}
				<span
					className="bg-clip-text text-transparent"
					style={{
						backgroundImage: gradients.goldText,
					}}
				>
					{gradientText}
				</span>
				{parts[1]}
			</>
		);
	};

	return (
		<motion.p
			className={className}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				delay,
				duration: 0.8,
				ease: "easeOut",
			}}
		>
			{renderText()}
		</motion.p>
	);
}
