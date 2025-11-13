export default function UserPage() {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Doctor
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Manage your dental orders with ease
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#E4B441] to-[#D4A431] mx-auto rounded-full"></div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Order management page will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}