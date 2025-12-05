"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroHeading from "@/app/[locale]/design-system/components/HeroHeading";
import HeroSubtitle from "@/app/[locale]/design-system/components/HeroSubtitle";
import { useTranslations } from "next-intl";
export default function AboutPage() {
	const t = useTranslations();
	return (
		<div className="relative flex flex-col min-h-screen overflow-hidden">
			<div className="absolute inset-0 -z-10 bg-white"></div>

			{/* Single Combined Section */}
			<section className="relative w-full py-16">
				<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
					{/* Left Side - Hero Text + Content */}
					<motion.div
						className="space-y-10"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						{/* Hero Heading */}
						<div className="text-center md:text-left">
							<HeroHeading
								primaryText={t("aboutUs").split(" ")[0]}
								gradientText={t("aboutUs").split(" ")[1]}
								variant="black"
								className="!mb-3 drop-shadow-sm"
							/>

							<HeroSubtitle
								text={t("egyptsFirstDigitalLab")}
								variant="black"
								className="!mb-0 !text-2xl md:!text-3xl !font-medium"
								delay={0.3}
							/>
						</div>

						{/* Info Blocks */}
						<div className="space-y-8">
							{/* Block 1 */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
									{t("aboutSubtitle")}
								</h3>
								<p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
									{t("aboutSubtitleText")}
								</p>
							</motion.div>

							{/* Block 2 */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
							>
								<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
									{t("whatMakesUsUnique")}
								</h3>
								<p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
									{t("whatMakesUsUniqueText")}
								</p>
							</motion.div>

							{/* Block 3 */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.6 }}
							>
								<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
									{t("educationalResources")}
								</h3>
								<p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
									{t("educationalResourcesText")}
								</p>
							</motion.div>
						</div>
					</motion.div>

					{/* Right Side - Image */}
					<motion.div
						initial={{ opacity: 0, x: 60 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, delay: 0.3 }}
						className="flex justify-center"
					>
						<div className="relative">
							<Image
								src="/aboutUspic.jpg"
								alt={t("dentalLab")}
								width={550}
								height={450}
								className="relative rounded-2xl shadow-2xl ring-1 ring-white/50"
								priority
							/>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
