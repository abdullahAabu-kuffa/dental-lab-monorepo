"use client";
import Button from "../../../atoms/Button/Button";
import { HeroHeading, HeroSubtitle } from "@/app/[locale]/design-system";
import { ScrollAnimation } from "@/app/[locale]/design-system";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../../../../assets/lotties/Generate-Initial.json";
import { useTranslations } from "next-intl";

export default function ChooseMaterialSection() {
	const router = useRouter();
	const t = useTranslations();

	return (
		<section
			className="w-full py-12 lg:py-16 bg-linear-to-br from-gray-50 to-white"
			style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
		>
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
					{/* Text Content - Center */}
					<div className="text-center space-y-6">
						<ScrollAnimation animation="fadeInFromLeft">
							<HeroHeading
								primaryText={t("chooseYourMaterial") + " & "}
								gradientText={t("trackYourOrderOnline")}
								variant="black"
							/>
						</ScrollAnimation>

						<ScrollAnimation animation="fadeInFromLeft" delay={0.2}>
							<HeroSubtitle
								text={t("uploadExocadText")}
								variant="black"
								highlightText="ExoCAD"
							/>
						</ScrollAnimation>

						<ScrollAnimation
							animation="fadeInFromBottom"
							delay={0.4}
							className="flex flex-wrap gap-8 justify-center"
						>
							<Button
								variant="lightPrimary"
								onClick={() => router.push("/get-started")}
							>
								{t("getStarted")}
							</Button>
							<Button
								variant="lightSecondary"
								onClick={() => router.push("/track-order")}
							>
								{t("trackOrder")}
							</Button>
						</ScrollAnimation>
					</div>

					{/* Lottie Animation - Right */}
					<div className="relative">
						<ScrollAnimation
							animation="complexEntrance"
							delay={0.6}
							className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-16"
						>
							<div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
								<div className="w-full h-auto">
									<Lottie
										animationData={animationData}
										loop
										autoplay
										className="w-full h-auto"
									/>
								</div>
							</div>
						</ScrollAnimation>
					</div>
				</div>
			</div>
		</section>
	);
}
