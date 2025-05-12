"use client";

import UserSearch from "@/components/UserSearch";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 text-white py-8 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">User Directory</h1>
          <p className="mt-2 text-zinc-400">Search and view user profiles</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card>
          <CardContent className="p-6">
            <UserSearch />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
