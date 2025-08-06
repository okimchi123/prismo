'use client'
import { useState, useEffect } from "react"
import { fetchPendingRequests, fetchSenderUser } from "./Friend"

export default function FriendRequest(userID){
    const [requester, setRequester] = useState([])
    const [senderProfiles, setSenderProfiles] = useState([])
    useEffect(()=>{
        async function getRequest(){
            setRequester(await fetchPendingRequests(userID))
        }
        if(userID){
          getRequest()  
        }
          
    }, [userID])

    useEffect(()=>{
        async function getRequester(){
            const senderUids = requester.map(req => req.userID)
            setSenderProfiles(await Promise.all(senderUids.map(fetchSenderUser)))
        }
        if(requester){
            getRequester()
        }
    },[requester])
    return senderProfiles
}