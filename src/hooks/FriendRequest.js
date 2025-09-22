"use client";
import { useState, useEffect } from "react";
import { fetchPendingRequests, fetchSenderUser } from "./Friend";

export default function useFriendRequest(userID, toggle) {
  const [requester, setRequester] = useState([]);
  const [senderProfiles, setSenderProfiles] = useState([]);
  useEffect(() => {
    async function getRequest() {
      setRequester(await fetchPendingRequests(userID));
    }
    if (userID) {
      getRequest();
    }
  }, [userID, toggle]);

  useEffect(() => {
    async function getRequester() {
      const senderData = requester.map((req) => ({
        user: req.userID,
        reqID: req.id,
      }));
      const profiles = await Promise.all(
        senderData.map((data) => fetchSenderUser(data.user, data.reqID))
      );

      setSenderProfiles(profiles);
    }
    if (requester) {
      getRequester();
    }
  }, [requester]);

  return senderProfiles;
}
