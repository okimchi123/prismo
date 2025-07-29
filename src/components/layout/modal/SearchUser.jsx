"use client";
import { getAllUsers } from "@/hooks/fetchAllUser";
import { useState, useEffect } from "react";

export default function SearchUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      setUsers(await getAllUsers());
    }
    fetchUsers();
  }, []);

  return (
    <div className="absolute z-200 left-4 w-[90%] bg-white border shadow-lg max-h-60 overflow-y-auto">
        <ul className="divide-y divide-gray-100">
          {users.map((user, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-pink-100 cursor-pointer"
            >
              {user.firstname} {user.lastname}
            </li>
          ))}
        </ul>
    </div>
  );
}
