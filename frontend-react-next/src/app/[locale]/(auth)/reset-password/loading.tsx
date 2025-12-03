export default function Loading() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-gray-50/50 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 via-white to-blue-50/50 -z-10"></div>

      <div className="w-full max-w-5xl h-[90%] grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm animate-pulse">
        {/* FORM SECTION */}
        <div className="p-6 flex flex-col justify-center items-center space-y-6">
          <div className="shrink-0 space-y-2 text-center w-full max-w-md">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>

          <div className="space-y-4 w-full max-w-md">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* ANIMATION & INFO ASIDE */}
        <div className="hidden md:flex flex-col justify-center items-center p-8 bg-[#d8a832]/10 border-l border-[#d8a832]/20">
          <div className="w-full max-w-xs mb-6 h-64 bg-gray-200 rounded-3xl"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </main>
  );
}
