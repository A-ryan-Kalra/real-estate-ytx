import { HiOutlineArrowUp } from "react-icons/hi";
import { Icon } from "@iconify/react";

function CardInfo({
  user,
  type,
  icons,
}: {
  user: any;
  type: string;
  icons?: string;
}) {
  return (
    <div className="flex-col border-2  rounded-lg w-[300px]  flex gap-2 p-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl">Total {type}</h1>
          <h1 className="text-xl">{user?.totalUsers}</h1>
        </div>
        <div className="rounded-full bg-teal-700 p-2">
          <Icon
            icon={icons as string}
            className="text-white"
            width={30}
            height={30}
          />
        </div>
      </div>
      <div>
        <h1 className="flex items-center gap-1 text-slate-500">
          <span className="items-center relative bottom-0.5">
            <HiOutlineArrowUp color="#28a998" size={17} />
          </span>
          <span className="text-[#1b6157]">{user?.lastMonthUser}</span> Last
          Month
        </h1>
      </div>
    </div>
  );
}

export default CardInfo;
