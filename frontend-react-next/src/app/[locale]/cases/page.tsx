"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroHeading from "@/app/[locale]/design-system/components/HeroHeading";
import { useTranslations } from "next-intl";

export default function CasesPage() {
	const t = useTranslations();
	return (
		<>
			<div className="absolute inset-0 -z-10 bg-white"></div>
			<section className="relative w-full pt-4 pb-2 md:pt-6 md:pb-3 text-center">
				<div className="max-w-4xl mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<HeroHeading
							primaryText={t("dentalCases")}
							gradientText={t("dentalCasesCollection")}
							variant="black"
							className="!mb-1 drop-shadow-lg"
						/>
					</motion.div>
				</div>
			</section>

			<section className="relative w-full py-4 md:py-6">
				<div className="max-w-7xl mx-auto px-6 grid gap-8 items-start md:grid-cols-2">
					{/* Left Side - Content Blocks */}
					<motion.div
						className="space-y-6"
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						{/* Info Blocks */}
						<div className="space-y-5">
							{/* Block 1 */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.5 }}
							>
								<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
									{t("restorativeDentistryCases")}
								</h3>
								<ul className="space-y-2 text-base md:text-lg text-gray-700 leading-relaxed font-light">
									<li>
										<strong>{t("cavityRestoration")}:</strong>{" "}
										{t("cavityRestorationDesc")}
									</li>
									<li>
										<strong>{t("endodonticTreatment")}:</strong>{" "}
										{t("endodonticTreatmentDesc")}
									</li>
									<li>
										<strong>{t("compositeBonding")}:</strong>{" "}
										{t("compositeBondingDesc")}
									</li>
								</ul>
							</motion.div>

							{/* Block 2 */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.7 }}
							>
								<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
									{t("orthodonticCases")}
								</h3>
								<ul className="space-y-2 text-base md:text-lg text-gray-700 leading-relaxed font-light">
									<li>
										<strong>{t("bracesAndAligners")}:</strong>{" "}
										{t("bracesAndAlignersDesc")}
									</li>
									<li>
										<strong>{t("retentionPlans")}:</strong>{" "}
										{t("retentionPlansDesc")}
									</li>
								</ul>
							</motion.div>

							{/* Block 3 */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.9 }}
							>
								<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
									{t("periodonticsCases")}
								</h3>
								<ul className="space-y-2 text-base md:text-lg text-gray-700 leading-relaxed font-light">
									<li>
										<strong>{t("gumDiseaseTreatment")}:</strong>{" "}
										{t("gumDiseaseTreatmentDesc")}
									</li>
									<li>
										<strong>{t("softTissueGrafting")}:</strong>{" "}
										{t("softTissueGraftingDesc")}
									</li>
								</ul>
							</motion.div>
						</div>
					</motion.div>

					{/* Right Side - Image */}
					<motion.div
						initial={{ opacity: 0, x: 60 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, delay: 0.4 }}
						className="flex justify-center md:justify-end order-first md:order-none"
					>
						<div className="relative">
							<Image
								src="/caseback.jpg"
								alt={t("dentalCasesAlt")}
								width={550}
								height={450}
								className="relative rounded-2xl shadow-2xl ring-1 ring-white/50"
								priority
								unoptimized={true}
							/>
						</div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
