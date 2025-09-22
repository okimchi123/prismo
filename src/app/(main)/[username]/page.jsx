"use client";
import ProfileUserData from "@/components/layout/Profile/ProfileUserData";
import { UserPlus, UserRoundCheck, UserRoundCog } from "lucide-react";
import { useUserPosts } from "@/hooks/fetchUserPost";
import { use } from "react";
import { OwnPost } from "@/components/layout/Profile/UserPost";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/hooks/fetchAllUser";
import { storeUser } from "@/hooks/state";
import { AddFriend } from "@/hooks/Friend";
import { toast } from "sonner";
import useAdds from "@/hooks/GetAdds";
import clsx from "clsx";
import { userFriends } from "@/hooks/state";
import UnfriendModal from "@/components/layout/User-Visit/Unfriend-Modal";

export default function Page({ params }) {
  const { username } = use(params);
  const [user, setUser] = useState({});
  const [unfriendToggle, setUnfriendToggle] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  const currentUser = storeUser((state) => state.user);
  const friends = userFriends((state) => state.friend);

  async function handleAddFriend() {
    setToggleButton(true);
    try {
      await AddFriend(currentUser.uid, user.uid);
      toast.success(`Added ${user.firstname} ${user.lastname}`);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      const users = await getAllUsers();

      const user = users.find((u) => {
        return u.username.toLowerCase() === username;
      });
      setUser(user);
    }
    fetchUsers();
  }, [username]);

  const isUserFriend = friends?.find((friend) => friend.uid === user.uid);
  const { posts, loading } = useUserPosts(user?.uid);

  const userAddData = useAdds(currentUser.uid, user.uid, toggleButton);
  return (
    <div className="flex mt-[2%] min-w-[420px] rounded-lg flex-col items-start">
      <section className="bg-white relative pt-1 pb-3 px-3 w-full mb-2 rounded-lg">
        <h1 className="prismo font-semibold mb-2">{user.username}</h1>
        <ProfileUserData user={user} posts={posts} />
        <div
          className={clsx(
            "absolute right-4 bottom-4 flex gap-1  items-center",
            {
              prismo: userAddData.length || isUserFriend,
            }
          )}
        >
          {userAddData.length ? (
            <>
              <UserRoundCheck size="17" /> <>User Added</>
            </>
          ) : isUserFriend ? (
            <>
              <h1 className="select-none">Friend</h1>
              <div className="relative select-non">
                <button
                  onClick={() => setUnfriendToggle(!unfriendToggle)}
                  className="bg-pink-300 relative select-none hover:bg-pink-400 transition-all cursor-pointer ml-0.5 p-1 rounded-md"
                >
                  <UserRoundCog color="white" size="22" />
                </button>
                <UnfriendModal toggle={unfriendToggle} setUnfriendToggle={setUnfriendToggle} user={user} currentUser={currentUser} setToggleButton={setToggleButton} />
              </div>
            </>
          ) : (
            <button
              disabled={userAddData.length || isUserFriend}
              onClick={() => handleAddFriend()}
              className={clsx("flex gap-1  items-center text-sm ", {
                prismo: userAddData.length || isUserFriend,
                "hover:scale-105 transition-all cursor-pointer":
                  !userAddData.length && !isUserFriend,
              })}
            >
              <UserPlus size="17" /> <>Add Friend</>
            </button>
          )}
        </div>
      </section>
      <OwnPost user={user} posts={posts} loading={loading} />
    </div>
  );
}
