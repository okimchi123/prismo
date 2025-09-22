'use client'
import { useState, useEffect } from "react"
import { getUserAdds } from "./Friend"

export default function useAdds(userID, addedUserID, toggleButton){
    const [addData, setAddData] = useState([])

    useEffect(()=>{
        async function getAdds(){
            setAddData(await getUserAdds(userID, addedUserID))
        }
        if(userID && addedUserID){
            getAdds()
        }
    },[userID, addedUserID,toggleButton])
    return addData;
}