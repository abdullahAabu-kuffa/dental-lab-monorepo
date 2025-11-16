"use client";
import { useState } from "react";
import SwitchButton from "../_components/@switchBtn";
export default function AccountPage() {
  const [isEmailOn, setIsEmailOn] = useState(false);
  const [isThemeOn, setIsThemeOn] = useState(false);
  const handleThemeChange = () => setIsThemeOn(!isThemeOn);
  const handleEmailChange = () => setIsEmailOn(!isEmailOn);
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    professionalLicenseNumber: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [basicErrors, setBasicErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    professionalLicenseNumber: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleBasicSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBasicErrors({
      fullName: !info.fullName
        ? "Full Name is required"
        : info.fullName.length < 3
        ? "Full Name must be at least 3 characters"
        : "",
      email: !info.email
        ? "Email is required"
        : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(info.email)
        ? "please enter a valid email"
        : "",
      phoneNumber: !info.phoneNumber
        ? "Phone Number is required"
        : info.phoneNumber.length < 11
        ? "please enter a valid phone number"
        : /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(info.phoneNumber)
        ? "please enter a valid phone number"
        : "",
      city: !info.city ? "City is required" : "",
      professionalLicenseNumber: !info.professionalLicenseNumber
        ? "Professional License Number is required"
        : "",
      password: !info.password
        ? "Password is required"
        : info.password.length < 6
        ? "Password must be at least 6 characters"
        : "",
      newPassword: !info.newPassword
        ? "New Password is required"
        : info.newPassword.length < 6
        ? "New Password must be at least 6 characters"
        : "",
      confirmPassword: !info.confirmPassword
        ? "Confirm Password is required"
        : info.confirmPassword !== info.newPassword
        ? "Passwords do not match"
        : "",
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-blue-700">
            My Home - Manage Your Account Details
          </h1>
          <p className="text-gray-600 text-sm">
            Update, delete, change your password and manage preferences.
          </p>
        </div>

        {/* Basic Information */}
        <div className="bg-white shadow p-6 rounded-xl space-y-6">
          <form onSubmit={handleBasicSubmit}>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Basic Information
            </h2>

            <div className="flex flex-col gap-6 items-start">
              {/* Avatar */}
              <div className="flex items-center space-y-2">
                <div className="w-30 h-30 rounded-full bg-gray-200 border-4 border-blue-600"></div>
                <div className="flex flex-col items-start ml-4 space-y-2">
                  <p className="text-sm font-medium">Dr. Ahmed Hassan</p>
                  <span className="text-xs text-gray-500">Prosthodontist</span>
                  <label
                    htmlFor="photo"
                    className="text-sm text-white bg-blue-600 px-3 py-1 rounded-md"
                  >
                    Update Your Photo
                  </label>
                  <input
                    className="hidden"
                    id="photo"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Form */}

              <div className="grid grid-cols-2 gap-4 flex-1 justify-center w-full">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="fullName" className="text-stone-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Ahmed Hassan"
                    className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm 
  ${
    basicErrors.fullName
      ? "border-red-500 focus:border-red-500 focus:ring-red-500 hover:border-red-500"
      : "border-[#6B7280] focus:border-blue-500 focus:ring-blue-500 hover:border-[#6B7280]"
  }
`}
                    //   defaultValue="Dr. Ahmed Hassan"

                    value={info.fullName}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        fullName: e.target.value,
                      })
                    }
                  />
                  {basicErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicErrors.fullName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="email" className="text-stone-400">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="ahmed.hassan@dentalclinic.com"
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-[#6B7280] rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    //   defaultValue="ahmed.hassan@dentalclinic.com"
                    value={info.email}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        email: e.target.value,
                      })
                    }
                  />
                  {basicErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicErrors.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="phoneNumber" className="text-stone-400">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+1 234 567 8900"
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-[#6B7280] rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    //   defaultValue="+1 234 567 8900"
                    value={info.phoneNumber}
                    onChange={(e) => {
                      setInfo({
                        ...info,
                        phoneNumber: e.target.value,
                      });
                    }}
                  />
                  {basicErrors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicErrors.phoneNumber}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="city" className="text-stone-400">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Chicago"
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-[#6B7280] rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    //   defaultValue="Chicago"
                    value={info.city}
                    onChange={(e) => {
                      setInfo({
                        ...info,
                        city: e.target.value,
                      });
                    }}
                  />
                  {basicErrors.city && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicErrors.city}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="license" className="text-stone-400">
                    Professional License Number
                  </label>
                  <input
                    type="text"
                    placeholder="EN12345678"
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-[#6B7280] rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    //   defaultValue="EN12345678"
                    value={info.professionalLicenseNumber}
                    onChange={(e) => {
                      setInfo({
                        ...info,
                        professionalLicenseNumber: e.target.value,
                      });
                    }}
                  />
                  {basicErrors.professionalLicenseNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {basicErrors.professionalLicenseNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-md mt-5">
              Save Changes
            </button>
          </form>
        </div>
        {/* Security & Preferences */}
        <div className="bg-white shadow p-6 rounded-xl space-y-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Security & Preferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Change Password */}
            <div className="space-y-3 flex flex-col">
              <h3 className="font-medium">Change Password</h3>
              <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="text-stone-400">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-[#6B7280] rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={info.password}
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="text-stone-400">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-[#6B7280] rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={info.newPassword}
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      newPassword: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="text-stone-400">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-[#6B7280] rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={info.confirmPassword}
                  onChange={(e) => {
                    setInfo({
                      ...info,
                      confirmPassword: e.target.value,
                    });
                  }}
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md w-full">
                Change Password
              </button>
            </div>

            {/* Notifications */}
            <div className="space-y-0">
              <h3 className="font-medium">Notifications & Theme</h3>

              <div className="flex items-center justify-between p-2">
                <span>Email Notifications</span>
                <SwitchButton
                  isOn={isEmailOn}
                  toggleSwitch={handleEmailChange}
                />
              </div>

              {/* <div className="flex items-center justify-between p-2">
                    <span>In‑App Alerts</span>
                    <SwitchButton  />
                </div>

                <div className="flex items-center justify-between p-2">
                    <span>Guest Requests</span>
                    <SwitchButton />
                </div> */}

              <div className="flex items-center justify-between p-2">
                <span>Dark Mode</span>
                <SwitchButton
                  isOn={isThemeOn}
                  toggleSwitch={handleThemeChange}
                />
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-md w-full">
                Save Preferences
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Danger Zone
          </h2>
          <p className="text-red-600 text-sm mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md">
            Delete My Account
          </button>
        </div>
      </div>

      {/* Tailwind helper styles */}
      <style jsx>{`
        .input {
          @apply w-full border rounded-lg p-2 text-sm;
        }
      `}</style>
    </div>
  );
}
