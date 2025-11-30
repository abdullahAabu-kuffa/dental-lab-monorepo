import { useState } from "react";
import { User } from "../interfaces/users";
import ErrorMessage from "./@displayerrors";
import { MdCancel, MdDone } from "react-icons/md";
import { useChangeUserStatus } from "../services/hookes/change_user_status";
import ConfirmModal from "./@confirmmodel";
import { useDeleteUser } from "../services/hookes/delete_user";
interface UserDetailsModalProps {
    user: User;
    onClose: () => void;
}

const tabs = ["Details", "Invoices", "Orders"];

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose }) => {
    const [activeTab, setActiveTab] = useState("Details");
    const [userId, setUserId] = useState(1);
    // mutation hook
    const { mutate, isPending, isSuccess, isError, error } = useChangeUserStatus();
    //delete user hook
    const { mutate: deleteUserMutate, isPending: isDeletePending, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError } = useDeleteUser();
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleApproveUser = () => {
        mutate({ userId, action: "approve" }, {
            onSuccess: () => {
                setShowApproveModal(false);
            },
            onError: (error) => {
                <ErrorMessage message={error.message} />
            },
        });
    };
    const getModalApproveMessage = () => {
        if (isPending) {
            return "Approving user... Please wait.";
        } else if (isSuccess) {
            return "User has been successfully approved!";
        } else if (isError) {
            return `Error: ${error?.message || "Something went wrong!"}`;
        } else {
            return "Do you want to approve this user?";
        }
    };

    // handle delete user
    const handleDeleteUser = () => {
        deleteUserMutate(userId, {
            onSuccess: () => {
                setShowDeleteModal(false);
            },
            onError: (error) => {
                <ErrorMessage message={error.message} />
            },
        });
    };
    const getModalDeleteMessage = () => {
        if (isDeletePending) {
            return "Deleting user... Please wait.";
        } else if (isDeleteSuccess) {
            return "User has been successfully deleted!";
        } else if (isDeleteError) {
            return `Error: ${deleteError?.message || "Something went wrong!"}`;
        } else {
            return "Do you want to delete this user?";
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/40 transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-lg border border-gray-200 z-10 max-h-[90vh] overflow-hidden">
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 rounded"
                >
                    <span aria-hidden>✕</span>
                </button>

                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex gap-4 items-start">
                    <div className="shrink-0">
                        <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                            {user.fullName ? user.fullName.split(" ").map(n => n[0]).slice(0, 2).join("") : "U"}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-semibold text-gray-900 truncate">{user.fullName}</h2>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">{user.isVerified ? 'Verified' : 'Unverified'}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${user.isActive ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{user.isActive ? 'Active' : 'Pending'}</span>
                        </div>

                        <p className="text-sm text-gray-500 truncate">{user.email} • {user.phoneNumber || '—'}</p>
                        <p className="text-sm text-gray-500 mt-1 truncate">{user.clinicName || ''} {user.clinicAddress ? `• ${user.clinicAddress}` : ''}</p>
                    </div>

                    <div className="flex items-center gap-2 mr-5">
                        {!user.isActive && (<button
                            onClick={() => { setUserId(user.id); setShowApproveModal(true); }}
                            className={`px-2 py-1 text-xs font-medium rounded-full hover:bg-green-300 bg-green-100 text-green-700`}
                        >
                            <div className="flex items-center gap-1">
                                <MdDone size={16} />
                                <span>Approve</span>
                            </div>
                        </button>)}
                        <button
                            onClick={() => { setUserId(user.id); setShowDeleteModal(true); }}
                            className={`px-2 py-1 text-xs font-medium rounded-full hover:bg-red-300 bg-red-100 text-red-700`}
                        >
                            <div className="flex items-center gap-1">
                                <MdCancel size={16} />
                                <span>Reject</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-6 py-3 border-b border-gray-100">
                    <div className="inline-flex rounded-lg bg-gray-50 p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${activeTab === tab ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-5 overflow-y-auto text-sm text-gray-700 max-h-[65vh] space-y-4">
                    {activeTab === "Details" && (
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            <div>
                                <dt className="text-xs font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.fullName}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500">Phone</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.phoneNumber || '—'}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500">Role</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.role}</dd>
                            </div>

                            <div className="sm:col-span-2">
                                <dt className="text-xs font-medium text-gray-500">Clinic</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.clinicName || '—'}</dd>
                            </div>

                            <div className="sm:col-span-2">
                                <dt className="text-xs font-medium text-gray-500">Address</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.clinicAddress || '—'}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500">Account status</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.isActive ? 'Approved' : 'Pending'}</dd>
                            </div>

                            <div>
                                <dt className="text-xs font-medium text-gray-500">Created at</dt>
                                <dd className="mt-1 text-sm text-gray-900">{new Date(user.createdAt).toLocaleString()}</dd>
                            </div>
                        </dl>
                    )}

                    {activeTab === "Invoices" && (
                        <div className="text-gray-600">
                            <p className="italic">No invoices available yet.</p>
                        </div>
                    )}

                    {activeTab === "Orders" && (
                        <div className="text-gray-600">
                            <p className="italic">No orders found for this user.</p>
                        </div>
                    )}
                </div>
                {showApproveModal && (
                    <ConfirmModal
                        onConfirm={handleApproveUser}
                        onCancel={() => setShowApproveModal(false)}
                        message={getModalApproveMessage()}
                        isLoading={isPending}
                    />
                )}
                {showDeleteModal && (
                    <ConfirmModal
                        onConfirm={handleDeleteUser}
                        onCancel={() => setShowDeleteModal(false)}
                        btName='Delete'
                        message={getModalDeleteMessage()}
                        isLoading={isPending}
                    />
                )}
            </div>
        </div>
    );
};

export default UserDetailsModal;