"use client";
import { getAllUsers } from "@/hooks/fetchAllUser";
import { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SearchUser() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleSelectUser = (username) => {
    setQuery("");
    router.push(username);
  };

  useEffect(() => {
    async function fetchUsers() {
      setUsers(await getAllUsers());
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullname = `${user.firstname} ${user.lastname}`.toLowerCase();
    return fullname.includes(query.toLowerCase());
  });

  return (
    <div ref={dropdownRef} className="relative mb-4">
      <SearchInput
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.trim() !== "" && (
        <div className="absolute z-200 left-4 w-[90%] bg-white shadow-lg max-h-60 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {filteredUsers.map((user, index) => {
                const slug = user.username.toLowerCase();
                return (
                <li
                  onClick={()=>handleSelectUser(user.username.toLowerCase())}
                  key={index}
                  className="px-4 py-2 hover:bg-pink-100 cursor-pointer"
                >
                    {user.firstname} {user.lastname}
                </li>
              )
              })}
            </ul>
          ) : <p className="p-2 text-sm">No user found</p>}
        </div>
      )}
    </div>
  );
}
