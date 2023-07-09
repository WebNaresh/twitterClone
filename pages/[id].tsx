import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import {
  followUserMutation,
  unFollowUserMutation,
} from "@/graphql/mutations/user";
import { getCurrentUserById } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { BiLeftArrowCircle } from "react-icons/bi";

interface Props {
  user?: User;
}

const UserProfilePage: NextPage<Props> = (props) => {
  const { user: currentUser } = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const amIFolowing = useMemo(() => {
    if (!props.user) return false;
    return (
      (currentUser?.following?.findIndex((ele) => ele?.id === props.user?.id) ??
        -1) >= 0
    );
  }, [currentUser?.following, props.user]);
  const handleFollowButton = useCallback(async () => {
    console.log("follow");

    if (!props.user?.id) {
      return;
    }
    await graphqlClient.request(followUserMutation, { to: props.user?.id });
    await queryClient.invalidateQueries(["current-user"]);
  }, []);
  const handleUnFollowButton = useCallback(async () => {
    console.log("Unfollow");
    if (!props.user?.id) {
      return;
    }
    await graphqlClient.request(unFollowUserMutation, { to: props.user?.id });
    await queryClient.invalidateQueries(["current-user"]);
  }, []);

  return (
    <TwitterLayout>
      <div className="w-full h-screen ">
        <div>
          {" "}
          <div className="flex w-full border-b border-slate-700 p-2 bg-transparent items-center">
            <BiLeftArrowCircle
              onClick={() => router.back()}
              className=" hover:text-slate-500 text-lg cursor-pointer"
            />
            <div className="flex flex-col justify-center px-2">
              <div>
                {props.user?.firstName} &nbsp;
                {props.user?.lastName}😃
              </div>
              <div className="text-xs text-slate-700">
                {" "}
                {props.user?.tweets?.length} Tweets
              </div>
            </div>
          </div>{" "}
          <div className="p-2 border-b border-slate-700 grid-cols-5 grid ">
            {props.user?.profileImageURL && (
              <Image
                src={props.user?.profileImageURL}
                height={100}
                width={100}
                alt={props.user?.firstName}
                className="rounded-full col-span-1"
              />
            )}
            <div className="px-2 text-lg p-2 col-span-4 grid md:grid-cols-3 grid-cols-1">
              <div className=" col-span-2">
                {props.user?.firstName} &nbsp;
                {props.user?.lastName}
                <div className="text-xs text-slate-700">
                  {props.user?.email}
                </div>
                <div className=" text-slate-700 text-xs py-2 flex gap-2">
                  <div>{props.user?.followers?.length} followers</div>
                  <div>{props.user?.following?.length} following</div>
                </div>
              </div>
              {currentUser?.id !== props?.user?.id && (
                <div className="col-span-1 flex items-center w-fit p-1 rounded-sm text-sm h-fit">
                  {amIFolowing ? (
                    <button
                      onClick={handleUnFollowButton}
                      className="rounded px-4 text-sm py-2 min-w-max overflow-hidden shadow relative bg-sky-500  text-white hover:bg-opacity-90"
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowButton}
                      className="rounded px-4 text-sm py-2 min-w-max overflow-hidden shadow relative bg-sky-500  text-white hover:bg-opacity-90"
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            {props.user?.tweets?.map((tweets, i) => {
              {
                return <FeedCard key={i} data={tweets as Tweet} />;
              }
            })}
          </div>
        </div>
      </div>
    </TwitterLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id as string | undefined;
  if (!id) return { notFound: true };
  const userInfo = await graphqlClient.request(getCurrentUserById, { id });
  if (!userInfo?.getUserById) return { notFound: true };

  return {
    props: { user: userInfo.getUserById as User },
  };
};

export default UserProfilePage;
