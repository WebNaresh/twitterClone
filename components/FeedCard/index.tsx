import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { IoStatsChartOutline } from "react-icons/io5";

const FeedCard: React.FC = () => {
  return (
    <div className="flex flex-row w-fit justify-evenly  border-b border-slate-700 mx-2 py-4 ">
      <div className="w-24 justify-center flex h-fit ">
        <Image
          className="rounded-full m-2"
          width={50}
          height={50}
          src={"https://avatars.githubusercontent.com/u/91016022?v=4"}
          alt="User Missing"
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center ">
          <div>
            <div className="flex items-baseline">
              <div className="text-sm font-semibold">Naresh bhosale</div>
              <div className=" flex text-slate-700 text-xs mx-2">
                <div>@nareshbhosale.dev</div>
                <div>Apr 17</div>
              </div>
            </div>
            <div className="flex text-sm">
              Hey <div className=" text-sky-500 mx-2">@Razorpay</div>
            </div>
          </div>
          <div className="m-6 cursor-pointer">
            {" "}
            <BsThreeDots />
          </div>
        </div>
        <div className=" text-sm text-slate-300 mt-4">
          I waant to intergrate Razorpay Connect to my platform just like
          @stripe connect .
          <br />i have gone through documentation and nothing is clear.😢
        </div>
        <div className="flex flex-row justify-start gap-10 my-4">
          <div className=" flex cursor-pointer text-gray-700 gap-2">
            {" "}
            <BiMessageRounded className=" text-sm" />
            <div className="text-xs">4</div>
          </div>
          <div className=" flex cursor-pointer text-gray-700 gap-2">
            {" "}
            <FaRetweet className=" text-sm" />
            <div className="text-xs">4</div>
          </div>
          <div className=" flex cursor-pointer text-gray-700 gap-2">
            {" "}
            <AiOutlineHeart className=" text-sm" />
            <div className="text-xs">4</div>
          </div>
          <div className=" flex cursor-pointer text-gray-700 gap-2">
            {" "}
            <IoStatsChartOutline className=" text-sm" />
            <div className="text-xs">4</div>
          </div>
          <div className=" flex cursor-pointer text-gray-700 gap-2">
            {" "}
            <HiOutlineUpload className=" text-sm" />
            <div className="text-xs">4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
