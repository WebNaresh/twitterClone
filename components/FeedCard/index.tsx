import { Tweet } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { IoStatsChartOutline } from "react-icons/io5";
interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;

  return (
    <div className="flex flex-row w-full justify-evenly  border-b border-slate-700 py-4 ">
      {data?.author?.profileImageURL && (
        <Link
          href={`/${data.author.id}`}
          className="w-24 justify-center flex h-fit "
        >
          <Image
            className="rounded-full m-2  cursor-pointer"
            width={40}
            height={40}
            src={data?.author?.profileImageURL}
            alt="User Missing"
          />
        </Link>
      )}
      <div className="w-full">
        <div className="flex justify-between items-center ">
          <div>
            <div className="flex items-baseline">
              <div className="text-sm font-semibold">
                {data?.author?.firstName} &nbsp;{data?.author?.lastName}
              </div>
              <div className="cursor-pointer flex text-slate-700 text-xs mx-2">
                <div> {data?.author?.firstName}&nbsp;</div>
                <div>Apr 17</div>
              </div>
            </div>
            <div className="flex text-sm">
              Hey{" "}
              <div className=" text-sky-500 mx-2  cursor-pointer">
                @Razorpay
              </div>
            </div>
          </div>
          <div className="m-6 cursor-pointer">
            {" "}
            <BsThreeDots />
          </div>
        </div>
        <div className=" text-sm text-slate-300 mt-4 w-max">
          {data?.imageURL && (
            <Image
              className="rounded-lg m-2  cursor-pointer "
              width={300}
              height={300}
              src={data.imageURL}
              alt={data.content}
            />
          )}
          <div className="w-4/5">
            {data?.content}
            <br />i have gone through documentation and nothing is clear.😢
          </div>
        </div>
        <div className="flex flex-row justify-start md:gap-10 gap-2 my-4">
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
