import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import { menu } from "@/interface";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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

interface TwitterLayoutProps {
  children: React.ReactNode;
}
const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  const queryClient = useQueryClient();
  const { mutate } = useCreateTweet();
  let array: menu[] = [
    {
      iconOutlined: <BiHomeCircle />,
      text: "Home",
      iconFilled: <BiSolidHomeCircle />,
      link: `/`,
    },
    {
      iconOutlined: <FiSearch />,
      text: "Explore",
      iconFilled: <BiSolidSearch />,
      link: `/`,
    },
    {
      iconOutlined: <RiNotification3Line />,
      text: "Notifications",
      iconFilled: <RiNotificationFill />,
      link: `/`,
    },
    {
      iconOutlined: <FaRegEnvelope />,
      text: "Messages",
      iconFilled: <FaEnvelopeOpen />,
      link: `/`,
    },
    {
      iconOutlined: <RiFileList2Line />,
      text: "Lists",
      iconFilled: <RiFileList2Fill />,
      link: `/`,
    },
    {
      iconOutlined: <BsBookmarkHeart />,
      text: "Bookmarks",
      iconFilled: <BsBookmarkHeartFill />,
      link: `/`,
    },
    {
      iconOutlined: <MdOutlineVerified />,
      text: "Verified",
      iconFilled: <MdVerified />,
      link: `/`,
    },
    {
      iconOutlined: <TiUserOutline />,
      text: "Profile",
      iconFilled: <TiUser />,
      link: `/${user?.id}`,
    },
    {
      iconOutlined: <PiDotsThreeCircle />,
      text: "More",
      iconFilled: <PiDotsThreeCircleFill />,
      link: `/`,
    },
  ];

  return (
    <div className=" flex h-screen w-screen px-0 md:px-12 sm:px-0 lg:px-44 ">
      <div className="basis-1/6 flex-col md:inline-block items-center flex relative border-r border-slate-700">
        <div className=" rounded-full  p-1 hover:bg-gray-900 w-fit cursor-pointer ">
          <AiOutlineTwitter className=" text-2xl " />
        </div>
        <ul>
          {array.map((e, i) => {
            return (
              <Link
                href={e.link}
                className=" rounded-full my-2 px-2 py-2 hover:bg-slate-900 w-fit cursor-pointer flex items-center"
                key={i}
              >
                {e.iconOutlined}
                <div className=" text-xs font-semibold mx-2 hidden md:inline xl:inline">
                  {e.text}
                </div>
              </Link>
            );
          })}
        </ul>
        <button className="hidden md:inline-block  w-10/12 m-2 px-2 py-2 bg-sky-500 rounded-full text-xs font-semibold hover:bg-sky-600 transition-all   1 ">
          {" "}
          Tweet
        </button>
        <button className=" md:hidden w-fit m-2 p-1 bg-sky-500 rounded-full text-xs font-semibold hover:bg-sky-600 transition-all   1 ">
          <AiOutlineTwitter className=" text-xl " />
        </button>
        {user?.profileImageURL && (
          <div className=" border-gray-900 border-2 p-1 absolute bottom-2 w-fit rounded-xl flex hover:bg-gray-950 transition-all">
            <Image
              alt=""
              className=" rounded-full h-fit"
              src={user.profileImageURL}
              height={40}
              width={40}
            />
            <div className=" font-semibold text-xs  m-2 hidden md:inline-block">
              <p>
                {user.firstName}&nbsp;{user.lastName}
              </p>
              <p
                style={{ fontSize: "0.5rem", lineHeight: "1.5em" }}
                className="text-slate-500  "
              >
                {user.email}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-5/6 overflow-auto ">{props.children}</div>
    </div>
  );
};
export default TwitterLayout;
