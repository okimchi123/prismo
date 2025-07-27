"use client";
import { getAllUsers } from "@/hooks/fetchAllUser";
import { useState, useEffect } from "react";

export default function SearchUser() {
    const [users, setUsers] = useState([])

    useEffect(()=>{
        async function fetchUsers(){
            setUsers(await getAllUsers())
        }
        fetchUsers();
    },[])

  return (
    <div className="absolute -bottom-46 z-200 left-4 w-[90%] h-[200px] bg-white">
      <div className="flex flex-col">
            {users.map((user, index)=>(
                <h1 key={index}>{user.firstname} {user.lastname}</h1>
            ))}
      </div>
    </div>
  );
}
