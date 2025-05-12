"use client";

import { useEffect, useState } from "react";
import { User, UserApiResponse } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function UserSearch() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=100");
        const data: UserApiResponse = await response.json();
        setUsers(data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.first.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <Input
            type="text"
            placeholder="Search users by first name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onClick={() => setIsDropdownOpen(true)}
            className="pl-10 py-6 text-lg"
          />
        </div>
        {loading && (
          <div className="absolute right-4 top-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isDropdownOpen && searchTerm && (
        <Card className="absolute z-10 w-full mt-2 overflow-hidden">
          <CardContent className="p-0 max-h-[400px] overflow-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <Button
                  key={`${user.email}-${index}`}
                  variant="ghost"
                  className="w-full justify-start p-4 hover:bg-zinc-100"
                  onClick={() => {
                    setSelectedUser(user);
                    setSearchTerm("");
                    setIsDropdownOpen(false);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-zinc-200">
                      <AvatarImage
                        src={user.picture.thumbnail}
                        alt={`${user.name.first} ${user.name.last}`}
                      />
                      <AvatarFallback>
                        {user.name.first[0]}
                        {user.name.last[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium">
                        {user.name.first} {user.name.last}
                      </p>
                      <p className="text-sm text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                </Button>
              ))
            ) : (
              <div className="p-4 text-zinc-500 text-center">No users found</div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Selected User Details */}
      {selectedUser && (
        <Card className="mt-8 overflow-hidden">
          <CardHeader className="p-8 bg-gradient-to-r from-zinc-800 to-zinc-900 text-white">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <Avatar className="h-40 w-40 border-4 border-white/30 shadow-xl">
                <AvatarImage
                  src={selectedUser.picture.large}
                  alt={`${selectedUser.name.first} ${selectedUser.name.last}`}
                />
                <AvatarFallback className="text-4xl">
                  {selectedUser.name.first[0]}
                  {selectedUser.name.last[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">
                  {selectedUser.name.title}. {selectedUser.name.first}{" "}
                  {selectedUser.name.last}
                </h2>
                <p className="text-zinc-300 mt-2 text-lg">{selectedUser.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-zinc-100 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500">Gender</p>
                    <p className="text-lg capitalize">{selectedUser.gender}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-zinc-100 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500">Email</p>
                    <p className="text-lg">{selectedUser.email}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-zinc-100 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500">Phone</p>
                    <p className="text-lg">{selectedUser.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-3 bg-zinc-100 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500">Country</p>
                    <p className="text-lg">{selectedUser.location.country}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 