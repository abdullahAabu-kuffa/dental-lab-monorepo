
const Loading = () => {
    return (
        <div className="flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-4 text-gray-600 text-sm">Loading...</span>
        </div>
    );
};

export default Loading;