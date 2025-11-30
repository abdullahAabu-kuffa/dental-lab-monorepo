"use client";

import { Upload } from "lucide-react";
import SwitchButton from "../../../dashboard/_components/@switchBtn";

interface FormErrors {
  [key: string]: string | undefined;
}

interface AccountUIProps {
  profileImage: string;
  info: {
    fullName: string;
    email: string;
    phoneNumber: string;
    city: string;
    clinicName: string;
  };
  basicErrors: FormErrors;
  isEmailOn: boolean;
  isThemeOn: boolean;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleEmail: () => void;
  onToggleTheme: () => void;
  onBasicSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AccountUI({
  profileImage,
  info,
  basicErrors,
  isEmailOn,
  isThemeOn,
  onPhotoChange,
  onToggleEmail,
  onToggleTheme,
  onBasicSubmit,
}: AccountUIProps) {
  const errorStyle =
    "!border-red-500 focus:!border-red-500 hover:!border-red-500 focus:!ring-red-500";
  const successStyle =
    "border-[#6B7280] focus:border-blue-500 focus:ring-blue-500 hover:border-[#6B7280]";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            Manage Your Account Details
          </h1>
          <p className="text-gray-600 text-sm">
            Update, delete, and manage preferences.
          </p>
        </div>

        {/* Basic Information */}
        <div className="bg-white shadow p-6 rounded-xl space-y-6">
          <form onSubmit={onBasicSubmit}>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Basic Information
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
                  <p className="text-sm font-medium">{info?.fullName || "User Name"}</p>
                  <span className="text-xs text-gray-500">{info?.email || "user@example.com"}</span>
                  <label
                    htmlFor="photo"
                    className="text-sm text-black bg-[#e3e7e8] hover:bg-[#bfc4c5] px-3 py-2 rounded-md flex border border-[#CDD8EA] cursor-pointer"
                  >
                    <Upload size={15} className="mx-1 mt-1" /> Change Photo
                  </label>
                  <input
                    className="hidden"
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={onPhotoChange}
                  />
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-2 gap-4 flex-1 justify-center w-full">
                {/** Full Name */}
                <div className="flex flex-col space-y-1">
                  <label className="text-stone-400">Full Name</label>
                  <input
                    type="text"
                    placeholder="Dr. Ahmed Hassan"
                    value={info?.fullName || ""}
                    onChange={(e) =>
                      (info.fullName = e.target.value)
                    }
                    className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
                  />
                </div>

                {/** Email */}
                <div className="flex flex-col space-y-1">
                  <label className="text-stone-400">Email</label>
                  <input
                    type="email"
                    placeholder="ahmed.hassan@dentalclinic.com"
                    value={info?.email || ""}
                    onChange={(e) =>
                      (info.email = e.target.value)
                    }
                    className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
                  />
                </div>

                {/** Phone Number */}
                <div className="flex flex-col space-y-1">
                  <label className="text-stone-400">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 234 567 8900"
                    value={info?.phoneNumber || ""}
                    onChange={(e) =>
                      (info.phoneNumber = e.target.value)
                    }
                    className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
                  />
                </div>

                {/** Address */}
                <div className="flex flex-col space-y-1">
                  <label className="text-stone-400">Address</label>
                  <input
                    type="text"
                    placeholder="Chicago"
                    value={info?.city || ""}
                    onChange={(e) =>
                      (info.city = e.target.value)
                    }
                    className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
                  />
                </div>

                {/** Clinic Name */}
                <div className="flex flex-col space-y-1">
                  <label className="text-stone-400">Clinic Name</label>
                  <input
                    type="text"
                    placeholder="EN12345678"
                    value={info?.clinicName || ""}
                    onChange={(e) =>
                      (info.clinicName = e.target.value)
                    }
                    className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm ${successStyle}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer mt-4"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Notifications & Preferences */}
        <div className="bg-white shadow p-6 rounded-xl space-y-6">
          <h2 className="text-lg font-semibold text-gray-700">Notifications & Theme</h2>
          <div className="flex items-center justify-between p-2">
            <span>Email Notifications</span>
            <SwitchButton isOn={isEmailOn} toggleSwitch={onToggleEmail} />
          </div>
          <div className="flex items-center justify-between p-2">
            <span>Dark Mode</span>
            <SwitchButton isOn={isThemeOn} toggleSwitch={onToggleTheme} />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer w-full">
            Save Preferences
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Danger Zone</h2>
          <p className="text-red-600 text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}
