
import React from 'react';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPrevious, onNext }) => {
    return (
        <div className="flex items-center justify-center gap-4 my-6">
            <button
                onClick={onPrevious}
                disabled={page === 1}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${page === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                    }`}
            >
                Previous
            </button>

            <span className="text-sm text-gray-700">
                Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
            </span>

            <button
                onClick={onNext}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${page === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                    }`}
            >
                Next
            </button>
        </div>
    );
};
