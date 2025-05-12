"use client";

import UserSearch from "@/components/UserSearch";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-6 mb-8 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">User Directory</h1>
          <p className="mt-2 text-blue-100">Search and view user profiles</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <UserSearch />
        </div>
      </div>
    </main>
  );
}
