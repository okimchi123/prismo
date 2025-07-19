import { Input } from "@/components/ui/input";

export default function EditUserData({user}){
  const labelDesign = "text-sm";

    return(
        <section className="w-full flex flex-col items-start py-2 px-4 gap-1">
                  <div className="flex w-full justify-between">
                    <div>
                      <label htmlFor="" className={labelDesign}>
                        First namee
                      </label>
                      <Input placeholder={user.firstname} />
                    </div>
                    <div>
                      <label htmlFor="" className={labelDesign}>
                        Lastname
                      </label>
                      <Input placeholder={user.lastname} />
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div>
                      <label htmlFor="" className={labelDesign}>
                        Nickname
                      </label>
                      <Input placeholder={user.username} />
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