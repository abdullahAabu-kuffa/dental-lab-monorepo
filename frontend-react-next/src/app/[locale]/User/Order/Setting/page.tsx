/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import SwitchButton from "../../../dashboard/_components/@switchBtn";
import { useTranslations } from "next-intl";

export default function AccountUI() {
	const [profileImage, setProfileImage] = useState<string>(
		"/default-avatar.png"
	);
	const [info, setInfo] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		city: "",
		clinicName: "",
	});
	const [isEmailOn, setIsEmailOn] = useState(false);
	const [isThemeOn, setIsThemeOn] = useState(false);
	const t = useTranslations();

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => setProfileImage(reader.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleToggleEmail = () => setIsEmailOn(!isEmailOn);
	const handleToggleTheme = () => setIsThemeOn(!isThemeOn);

	const handleBasicSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted", info);
	};

	const updateInfo = (field: keyof typeof info, value: string) => {
		setInfo((prev) => ({ ...prev, [field]: value }));
	};
	const successStyle =
		"border-[#6B7280] focus:border-blue-500 focus:ring-blue-500 hover:border-[#6B7280]";

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-5xl mx-auto space-y-10">
				{/* Header */}
				<div>
					<h1 className="text-2xl font-bold text-blue-700">
						{t("manageYourAccountDetails")}
					</h1>
					<p className="text-gray-600 text-sm">
						{t("updateDeleteManagePreferences")}
					</p>
				</div>

				{/* Basic Information */}
				<div className="bg-white shadow p-6 rounded-xl space-y-6">
					<form onSubmit={handleBasicSubmit}>
						<h2 className="text-lg font-semibold text-gray-700 mb-2">
							{t("basicInformation")}
						</h2>

						<div className="flex flex-col gap-6 items-start">
							{/* Avatar */}
							<div className="flex items-center space-y-2">
								<div className="w-30 h-30 rounded-full bg-gray-200 border-4 border-blue-600">
									<img
										src={profileImage || "/default-avatar.png"}
										alt="avatar"
										className="w-full h-full rounded-full object-cover"
									/>
								</div>
								<div className="flex flex-col items-start ml-4 space-y-2">
									<p className="text-sm font-medium">
										{info?.fullName || "User Name"}
									</p>
									<span className="text-xs text-gray-500">
										{info?.email || "user@example.com"}
									</span>
									<label
										htmlFor="photo"
										className="text-sm text-black bg-[#e3e7e8] hover:bg-[#bfc4c5] px-3 py-2 rounded-md flex border border-[#CDD8EA] cursor-pointer"
									>
										<Upload size={15} className="mx-1 mt-1" />{" "}
										{t("changePhoto")}
									</label>
									<input
										className="hidden"
										id="photo"
										type="file"
										accept="image/*"
										onChange={handlePhotoChange}
									/>
								</div>
							</div>

							{/* Form */}
							<div className="grid grid-cols-2 gap-4 flex-1 justify-center w-full">
								{/** Full Name */}
								<div className="flex flex-col space-y-1">
									<label className="text-stone-400">{t("fullName")}</label>
									<input
										type="text"
										placeholder={t("fullNamePlaceholder")}
										value={info?.fullName || ""}
										// onChange={(e) =>
										//   (info.fullName = e.target.value)
										// }

										className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
									/>
								</div>

								{/** Email */}
								<div className="flex flex-col space-y-1">
									<label className="text-stone-400">{t("email")}</label>
									<input
										type="email"
										placeholder={t("emailPlaceholder")}
										value={info?.email || ""}
										// onChange={(e) =>
										//   (info.email = e.target.value)
										// }
										className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
									/>
								</div>

								{/** Phone Number */}
								<div className="flex flex-col space-y-1">
									<label className="text-stone-400">{t("phoneNumber")}</label>
									<input
										type="text"
										placeholder={t("phoneNumberPlaceholder")}
										value={info?.phoneNumber || ""}
										// onChange={(e) =>
										//   (info.phoneNumber = e.target.value)
										// }
										className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
									/>
								</div>

								{/** Address */}
								<div className="flex flex-col space-y-1">
									<label className="text-stone-400">{t("address")}</label>
									<input
										type="text"
										placeholder={t("addressPlaceholder")}
										value={info?.city || ""}
										// onChange={(e) =>
										//   (info.city = e.target.value)
										// }
										className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
									/>
								</div>

								{/** Clinic Name */}
								<div className="flex flex-col space-y-1">
									<label className="text-stone-400">{t("clinicName")}</label>
									<input
										type="text"
										placeholder={t("clinicNamePlaceholder")}
										value={info?.clinicName || ""}
										// onChange={(e) =>
										//   (info.clinicName = e.target.value)
										// }
										className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
									/>
								</div>
							</div>

							<button
								type="submit"
								className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer mt-4"
							>
								{t("saveChanges")}
							</button>
						</div>
					</form>
				</div>

				{/* Notifications & Preferences */}
				<div className="bg-white shadow p-6 rounded-xl space-y-6">
					<h2 className="text-lg font-semibold text-gray-700">
						{t("notificationsAndTheme")}
					</h2>
					<div className="flex items-center justify-between p-2">
						<span>{t("emailNotifications")}</span>
						<SwitchButton isOn={isEmailOn} toggleSwitch={handleToggleEmail} />
					</div>
					<div className="flex items-center justify-between p-2">
						<span>{t("darkMode")}</span>
						<SwitchButton isOn={isThemeOn} toggleSwitch={handleToggleTheme} />
					</div>
					<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer w-full">
						{t("savePreferences")}
					</button>
				</div>

				{/* Danger Zone */}
				<div className="bg-red-50 border border-red-200 p-6 rounded-xl">
					<h2 className="text-lg font-semibold text-red-700 mb-2">
						{t("dangerZone")}
					</h2>
					<p className="text-red-600 text-sm mb-4">
						{t("deleteAccountWarning")}
					</p>
					<button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer">
						{t("deleteMyAccount")}
					</button>
				</div>
			</div>
		</div>
	);
}
