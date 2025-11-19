import React from "react";

interface ConfirmApproveModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    message?: string;
}

const ConfirmModal: React.FC<ConfirmApproveModalProps> = ({
    onConfirm,
    onCancel,
    message = "Are you sure you want to approve this request?",
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-30"
                onClick={onCancel}
                aria-hidden="true"
            />

            {/* Modal panel */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full z-10 border border-gray-200">
                {/* Header */}
                <div className="px-6 pt-6 pb-2 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Confirm Approval</h2>
                </div>

                {/* Message */}
                <div className="px-6 py-4 text-sm text-gray-700">
                    {message}
                </div>

                {/* Actions */}
                <div className="px-6 pb-4 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;