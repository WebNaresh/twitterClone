import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { menu } from "@/interface";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineTwitter } from "react-icons/ai";

import { BiHomeCircle, BiSolidHomeCircle, BiSolidSearch } from "react-icons/bi";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { FaEnvelopeOpen, FaRegEnvelope } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdOutlineVerified, MdVerified } from "react-icons/md";
import { PiDotsThreeCircle, PiDotsThreeCircleFill } from "react-icons/pi";
import {
  RiFileList2Fill,
  RiFileList2Line,
  RiNotification3Line,
  RiNotificationFill,
} from "react-icons/ri";
import { TiUser, TiUserOutline } from "react-icons/ti";
export default function Home() {
  const { user } = useCurrentUser();
  console.log(`🚀 ~ user:`, user);

  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success("Verified Success");
      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
        await queryClient.invalidateQueries(["current-user"]);
      }
    },
    [queryClient]
  );
  return (
    <>
      <div className=" flex h-screen w-screen px-44">
        <div className="basis-1/5 flex-col relative">
          <div className=" rounded-full  p-1 hover:bg-gray-900 w-fit cursor-pointer ">
            <AiOutlineTwitter className=" text-2xl " />
          </div>
          <ul>
            {array.map((e, i) => {
              return (
                <div
                  className=" rounded-full my-2 px-2 py-2 hover:bg-slate-900 w-fit cursor-pointer flex items-center"
                  key={i}
                >
                  {/* <AiOutlineTwitter className=" text-lg" /> */}
                  {e.iconOutlined}
                  <div className=" text-xs font-semibold mx-2">{e.text}</div>
                </div>
              );
            })}
          </ul>
          <button className=" w-10/12 m-2 px-2 py-2 bg-sky-500 rounded-full text-xs font-semibold hover:bg-sky-600 transition-all   1 ">
            {" "}
            Tweet
          </button>
          {user && (
            <div className=" border-slate-900 border-2 p-2 absolute bottom-2 w-fit rounded-xl flex hover:bg-slate-900 transition-all">
              <Image
                alt=""
                className=" rounded-full"
                src={user.profileImageURL}
                height={40}
                width={40}
              />
              <p className=" font-semibold text-sm text-slate-500 m-2">
                {user.firstName}&nbsp;{user.lastName}
              </p>
            </div>
          )}
        </div>
        <div className="basis-1/2 border-x border-gray-700 h-screen flex flex-col overflow-y-scroll scrollbar-hide">
          <div className=" w-full h-16 border-b border-gray-700 flex-col text-xs backdrop-blur-sm sticky top-0">
            <div className="h-1/2 p-2 font-bold">Home</div>
            <div className="w-full h-1/2 flex flex-row justify-center items-center">
              <div
                className=" w-1/2 justify-center flex h-full box hover:first-letter:\\7
              "
              >
                <span className="h-full relative flex items-center font-semibold">
                  for You
                  <div className="bg-sky-400 h-0.5 rounded-full absolute bottom-0 w-full"></div>
                </span>
              </div>
              <div className=" w-1/2 justify-center flex h-full">
                <span className="h-full relative flex items-center font-semibold">
                  following
                  <div className=" rounded-full absolute bottom-0 w-full"></div>
                </span>
              </div>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="basis-1/5 ">
          {user === null ? (
            <div className=" bg-slate-700 p-3 rounded-lg m-2">
              <h1 className=" text-center">New To Twitter ?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
let array: menu[] = [
  {
    iconOutlined: <BiHomeCircle />,
    text: "Home",
    iconFilled: <BiSolidHomeCircle />,
  },
  {
    iconOutlined: <FiSearch />,
    text: "Explore",
    iconFilled: <BiSolidSearch />,
  },
  {
    iconOutlined: <RiNotification3Line />,
    text: "Notifications",
    iconFilled: <RiNotificationFill />,
  },
  {
    iconOutlined: <FaRegEnvelope />,
    text: "Messages",
    iconFilled: <FaEnvelopeOpen />,
  },
  {
    iconOutlined: <RiFileList2Line />,
    text: "Lists",
    iconFilled: <RiFileList2Fill />,
  },
  {
    iconOutlined: <BsBookmarkHeart />,
    text: "Bookmarks",
    iconFilled: <BsBookmarkHeartFill />,
  },
  {
    iconOutlined: <MdOutlineVerified />,
    text: "Verified",
    iconFilled: <MdVerified />,
  },
  {
    iconOutlined: <TiUserOutline />,
    text: "Profile",
    iconFilled: <TiUser />,
  },
  {
    iconOutlined: <PiDotsThreeCircle />,
    text: "More",
    iconFilled: <PiDotsThreeCircleFill />,
  },
];
