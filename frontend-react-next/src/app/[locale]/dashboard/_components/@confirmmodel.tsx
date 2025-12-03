interface ConfirmApproveModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  btName?: string; // Add btName prop
  message?: string;
  isLoading?: boolean; // Add isLoading prop
}

const ConfirmModal: React.FC<ConfirmApproveModalProps> = ({
  onConfirm,
  onCancel,
  btName = "Approve",
  message = "Are you sure you want to approve this request?",
  isLoading = false, // Default is false if not passed
}) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full z-10 border border-gray-200">
        <div className="px-6 pt-6 pb-2 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Confirm Action
          </h2>
        </div>

        <div className="px-6 py-4 text-sm text-gray-700">{message}</div>

        <div className="px-6 pb-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-sm rounded-md ${isLoading ? "bg-gray-400" : btName === "Approve" ? "bg-green-600" : "bg-red-600"
              } text-white ${btName === "Approve" ? "hover:bg-green-700" : "hover:bg-red-700"}`}
          >
            {isLoading ? `${btName}ing...` : btName}{" "}
            {/* Change text based on loading */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
