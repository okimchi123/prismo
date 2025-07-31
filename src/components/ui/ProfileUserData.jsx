import { EditImage } from "@/components/ui/display-image";

export default function ProfileUserData({ user, posts }) {
  return (
    <figure className="flex items-start w-full gap-4">
      <div className="PROFILE-PIC flex justify-center items-center relative yellow-bg h-[100px] w-[100px]">
        <figure className="w-18 h-18 relative">
          {user.localPic ? (
            <EditImage img={user.localPic} />
          ) : (
            <EditImage img={user.dpURL} />
          )}
        </figure>
      </div>

      <div className="USER-DATA flex flex-col gap-2 h-[100px] py-2 justify-between">
        <h1 className="FULLNAME text-lg font-medium leading-4">
          {user.firstname} {user.lastname}
        </h1>
        <div className="FRIENDS-POSTS flex gap-3">
          <div className="flex flex-col items-center">
            <p className="text-sm"> 3 </p>
            <h2 className="leading-3 text-sm">friends</h2>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm"> {posts.length} </p>
            <h2 className="leading-3 text-sm">posts</h2>
          </div>
        </div>
      </div>
    </figure>
  );
}
