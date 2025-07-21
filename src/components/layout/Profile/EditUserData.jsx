'use client'
import { Input } from "@/components/ui/input";

export default function EditUserData({user, setData, userDatas}){

  const labelDesign = "text-sm";

    return(
        <section className="w-full flex flex-col items-start py-2 px-4 gap-1">
                  <div className="flex w-full justify-between">
                    <div>
                      <label htmlFor="" className={labelDesign}>
                        First name
                      </label>
                      <Input value={userDatas.firstname} onChange={(e)=>setData((prev)=>({...prev, firstname:e.target.value,}))} placeholder={user.firstname} />
                    </div>
                    <div>
                      <label htmlFor="" className={labelDesign}>
                        Lastname
                      </label>
                      <Input value={userDatas.lastname} onChange={(e)=>setData((prev)=>({...prev, lastname:e.target.value,}))} placeholder={user.lastname} />
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div>
                      <label htmlFor="" className={labelDesign}>
                        Nickname
                      </label>
                      <Input value={userDatas.nickname} onChange={(e)=>setData((prev)=>({...prev, nickname:e.target.value,}))} placeholder={user.username} />
                    </div>
                    <div>
                      <label htmlFor="" className={labelDesign}>
                        Email
                      </label>
                      <Input placeholder={user.email} disabled className="select-none" />
                    </div>
                  </div>
                </section>
    )
}