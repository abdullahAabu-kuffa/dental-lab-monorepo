"use client";

import { useState } from "react";
import EducationalResourceCard from "@/components/atoms/EducationalResourceCard/EducationalResourceCard";
import ArticleModal from "./ArticleModal";
import { EducationalResource } from "@/config/LandingData/educational-resources.data";

export default function BlogsPage() {
	const [selectedArticle, setSelectedArticle] =
		useState<EducationalResource | null>(null);

	const handleReadMore = (article: EducationalResource) => {
		setSelectedArticle(article);
	};

	const resources: EducationalResource[] = [
		{
			id: "1",
			title: "Emergency Dental Care: What to Do in a Dental Crisis",
			description:
				"Learn how to handle dental emergencies effectively. From knocked-out teeth to severe toothaches, discover immediate steps to take and when to seek professional help.",
			image:
				"https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
			category: "Emergency Care",
			readTime: "5 min read",
			difficulty: "Beginner",
			readMoreLink: "#emergency-care",
		},
		{
			id: "2",
			title: "Dental Implants: The Permanent Solution to Missing Teeth",
			description:
				"Explore the benefits of dental implants as a long-lasting solution for missing teeth. Understand the procedure, recovery time, and why implants are superior to other options.",
			image:
				"https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop",
			category: "Implants",
			readTime: "8 min read",
			difficulty: "Advanced",
			readMoreLink: "#dental-implants",
		},
		{
			id: "3",
			title: "Teeth Whitening: Everything You Need to Know",
			description:
				"Discover professional teeth whitening options and home remedies. Learn about safety, effectiveness, and how to maintain your bright smile for longer.",
			image:
				"https://images.unsplash.com/photo-1609840112855-9ab5ad8f66e4?w=400&h=300&fit=crop",
			category: "Cosmetic",
			readTime: "6 min read",
			difficulty: "Beginner",
			readMoreLink: "#teeth-whitening",
		},
		{
			id: "4",
			title: "Cosmetic Dentistry: Transforming Smiles with Modern Techniques",
			description:
				"Explore cutting-edge cosmetic dentistry procedures that can transform your smile. From veneers to bonding, learn which treatment is right for you.",
			image:
				"https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop",
			category: "Cosmetic",
			readTime: "7 min read",
			difficulty: "Intermediate",
			readMoreLink: "#cosmetic-dentistry",
		},
		{
			id: "5",
			title: "Understanding Tooth Sensitivity: Causes and Solutions",
			description:
				"Find out what causes tooth sensitivity and how to treat it. Learn about effective treatments and lifestyle changes that can provide relief.",
			image:
				"https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop",
			category: "Dental Health",
			readTime: "5 min read",
			difficulty: "Beginner",
			readMoreLink: "#tooth-sensitivity",
		},
		{
			id: "6",
			title: "The Benefits of Regular Dental Checkups",
			description:
				"Understand why regular dental visits are crucial for maintaining oral health. Learn what happens during checkups and how they prevent serious problems.",
			image:
				"https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
			category: "Prevention",
			readTime: "4 min read",
			difficulty: "Beginner",
			readMoreLink: "#regular-checkups",
		},
		{
			id: "7",
			title: "Understanding Dental Implants: What You Need to Know",
			description:
				"A comprehensive guide to dental implants covering the entire process from consultation to final restoration. Make an informed decision about your dental health.",
			image:
				"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
			category: "Implants",
			readTime: "10 min read",
			difficulty: "Advanced",
			readMoreLink: "#implant-guide",
		},
		{
			id: "8",
			title: "Top 5 Benefits of Professional Teeth Whitening",
			description:
				"Compare professional whitening to over-the-counter products. Discover why professional treatments deliver superior and longer-lasting results.",
			image:
				"https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
			category: "Cosmetic",
			readTime: "6 min read",
			difficulty: "Intermediate",
			readMoreLink: "#whitening-benefits",
		},
		{
			id: "9",
			title: "The Importance of Regular Dental Check-Ups",
			description:
				"Prevention is better than cure. Learn how routine dental visits can save you time, money, and pain by catching problems early.",
			image:
				"https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=400&h=300&fit=crop",
			category: "Prevention",
			readTime: "5 min read",
			difficulty: "Beginner",
			readMoreLink: "#importance-checkups",
		},
	];

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1 pt-20">
				{/* Header Section */}
				<div
					className="relative bg-cover bg-center bg-no-repeat py-20 mb-12"
					style={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920&h=800&fit=crop)",
					}}
				>
					<div className="absolute inset-0 bg-black bg-opacity-40"></div>
					<div className="relative max-w-7xl mx-auto px-6 text-center">
						<h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
							Dental Health Blog
						</h1>
						<p className="text-white text-xl mb-8 drop-shadow-md max-w-2xl mx-auto">
							Expert insights and tips for maintaining your oral health
						</p>
						<div className="flex justify-center">
							<div className="bg-[#E4B441] text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
								Discover Professional Dental Care
							</div>
						</div>
					</div>
				</div>

				{/* Articles Grid */}
				<div className="max-w-7xl mx-auto px-6 pb-20">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{resources.map((resource) => (
							<EducationalResourceCard
								key={resource.id}
								resource={resource}
								onReadMore={handleReadMore}
							/>
						))}
					</div>
				</div>
			</main>

			<ArticleModal
				resource={selectedArticle}
				onClose={() => setSelectedArticle(null)}
			/>
		</div>
	);
}
