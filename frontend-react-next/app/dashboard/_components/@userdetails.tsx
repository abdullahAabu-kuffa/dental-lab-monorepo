import { useState } from "react";
import { User } from "../interfaces/users";

interface UserDetailsModalProps {
    user: User;
    onClose: () => void;
}

const tabs = ["Details", "Invoices", "Orders"];

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose }) => {
    const [activeTab, setActiveTab] = useState("Details");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-transparent transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="relative w-full max-w-md bg-white shadow-2xl rounded-lg border border-gray-200 z-10 max-h-[90vh] overflow-hidden">
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                >
                    &times;
                </button>

                <div className="px-6 pt-6 pb-2 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">User Information</h2>
                </div>

                <div className="flex border-b border-gray-200 px-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-3 text-sm font-medium transition ${activeTab === tab
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="px-6 py-4 overflow-y-auto text-sm text-gray-700 max-h-[65vh] space-y-4">
                    {activeTab === "Details" && (
                        <table className=" w-full text-sm text-left text-gray-700 border border-gray-500  rounded-lg overflow-hidden">
                            <tbody>
                                <TableRow label="Full Name" value={user.fullName} />
                                <TableRow label="Email" value={user.email} />
                                <TableRow label="Phone" value={user.phoneNumber} />
                                <TableRow label="Clinic" value={user.clinicName} />
                                <TableRow label="Address" value={user.clinicAddress} />
                                <TableRow label="Role" value={user.role} />
                                <TableRow label="Verified" value={user.isVerified ? "Yes" : "No"} />
                                <TableRow label="Status" value={user.isActive ? "Approved" : "Pending"} />
                                <TableRow label="Created At" value={new Date(user.createdAt).toLocaleString()} />
                            </tbody>
                        </table>

                    )}

                    {activeTab === "Invoices" && (
                        <p className="text-gray-500 italic">No invoices available yet.</p>
                    )}

                    {activeTab === "Orders" && (
                        <p className="text-gray-500 italic">No orders found for this user.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const TableRow = ({ label, value }: { label: string; value: string }) => (
    <tr className="border-t border-gray-200">
        <td className="px-4 py-2 font-medium text-gray-500 w-1/3">{label}</td>
        <td className="px-4 py-2 text-gray-800">{value}</td>
    </tr>
);



export default UserDetailsModal;