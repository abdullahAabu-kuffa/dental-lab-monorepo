"use client";

import { motion } from "framer-motion";
import {
	componentStyles,
	animations,
	hoverEffects,
	tapEffects,
} from "../../../../design-system";

type ButtonVariant =
	| "primary"
	| "whiteBlackHover"
	| "serviceCard"
	| "lightPrimary"
	| "lightSecondary";

interface ButtonProps {
	children: React.ReactNode;
	variant?: ButtonVariant;
	onClick?: () => void;
	className?: string;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
}

export default function Button({
	children,
	variant = "primary",
	onClick,
	className = "",
	type = "button",
	disabled = false,
}: ButtonProps) {
	const buttonClass = componentStyles.buttons[variant];

	return (
		<motion.button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${buttonClass} ${className} ${
				disabled ? "opacity-50 cursor-not-allowed" : ""
			}`}
			whileHover={disabled ? {} : hoverEffects.scaleSmall}
			whileTap={disabled ? {} : tapEffects.scaleSmall}
			transition={animations.spring}
		>
			{children}
		</motion.button>
	);
}
