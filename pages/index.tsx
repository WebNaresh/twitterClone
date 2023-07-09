import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/layout/TwitterLayout";
import { Tweet } from "@/gql/graphql";
import { getAllTweetsQuery, getSignedUrl } from "@/graphql/query/tweets";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { CiImageOn } from "react-icons/ci";
import { PiDotsThreeCircle } from "react-icons/pi";
interface TweetData {
  tweet?: Tweet[];
}
const Home: NextPage<TweetData> = (props: TweetData) => {
  const { user } = useCurrentUser();
  const [imageUrl, setImageUrl] = useState("");
  const { tweets = props?.tweet as Tweet[] } = useGetAllTweets();

  const queryClient = useQueryClient();
  const { mutateAsync } = useCreateTweet();

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
  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) {
        return;
      }
      const { getSignedUrlForTweet } = await graphqlClient.request(
        getSignedUrl,
        { imageName: file.name, imageType: file.type }
      );
      if (getSignedUrlForTweet) {
        toast.loading("Uploading", { id: "2" });
        await axios.put(getSignedUrlForTweet, file, {
          headers: {
            "Content-Type ": file.type,
          },
        });
        toast.success("Uploading Completed", { id: "2" });
        const url = new URL(getSignedUrlForTweet);
        setImageUrl(`${url.origin}${url.pathname}`);
      }
    };
  }, []);

  const handleImage = useCallback(() => {
    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    const handleFn = handleInputChangeFile(input);
    input.addEventListener("change", handleFn);
    input.click();
  }, [handleInputChangeFile]);
  const handleCreateTweet = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formElement = e.target as HTMLFormElement;

      // Access the form elements using the 'elements' property
      const textareaElement = formElement.elements[0] as HTMLTextAreaElement;

      if (textareaElement.value.length !== 0) {
        await mutateAsync({
          content: textareaElement.value,
          imageURL: imageUrl,
        });
        textareaElement.value = "";
        setImageUrl("");
      }
    },
    [imageUrl, mutateAsync]
  );

  return (
    <>
      <TwitterLayout>
        <div className="w-full border-x border-gray-700 h-screen flex flex-col  overflow-y-scroll scrollbar-hide">
          <div
            style={{ height: "88px" }}
            className=" w-full  border-b border-gray-700 flex-col text-xs backdrop-blur-sm sticky top-0 "
          >
            <div className="h-1/2 px-2 font-bold py-6 ">Home</div>
            <div className="w-full h-2/5 flex flex-row justify-center items-center">
              <div className=" w-1/2 justify-center flex h-full box hover:bg-slate-900 transition-all cursor-pointer ">
                <span className="h-full relative flex items-center font-semibold">
                  for You
                  <div className="bg-sky-400 h-0.5 rounded-full absolute bottom-0 w-full"></div>
                </span>
              </div>
              <div className=" w-1/2 justify-center flex h-full  hover:bg-slate-900 transition-all cursor-pointer">
                <span className="h-full relative flex items-center font-semibold">
                  following
                  <div className=" rounded-full absolute bottom-0 w-full"></div>
                </span>
              </div>
            </div>
          </div>
          {user?.profileImageURL && (
            <div className="flex w-full justify-evenly border-b border-slate-600 p-2 ">
              <div className="m-2" style={{ width: "10%" }}>
                <Image
                  alt={user.firstName}
                  className="rounded-full m-auto"
                  height={50}
                  src={user?.profileImageURL}
                  width={50}
                />
              </div>
              <form onSubmit={handleCreateTweet} className="w-4/5">
                <textarea
                  className="m-2 rounded-sm w-full text-slate-400 bg-transparent outline-none border-b border-slate-600 text-sm p-4 overflow-auto"
                  placeholder="What's happening ?"
                  id=""
                  rows={3}
                />
                {imageUrl.length > 0 && (
                  <Image
                    src={imageUrl}
                    alt="tweetImage"
                    width={300}
                    height={300}
                  />
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <CiImageOn
                      onClick={handleImage}
                      className=" text-sky-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <button className=" w-10/12 m-2 px-2 py-2 bg-sky-500 rounded-full text-xs font-semibold hover:bg-sky-600 transition-all   1 ">
                      {" "}
                      Tweet
                    </button>
                  </div>
                </div>
              </form>
              <div className=" m-auto " style={{ width: "10%" }}>
                <PiDotsThreeCircle className=" text-lg m-auto cursor-pointer" />
              </div>
            </div>
          )}
          {tweets?.map((tweet, i) =>
            tweet ? <FeedCard key={i} data={tweet as Tweet} /> : ""
          )}
        </div>
        {user === null ? (
          <div className="basis-3/12 justify-center flex w-fit h-fit ">
            {!user && (
              <div className=" bg-slate-700 p-3 rounded-lg m-2">
                <h1 className=" text-center text-xs">Tap</h1>
                <GoogleLogin
                  theme="filled_black"
                  size="medium"
                  type="icon"
                  useOneTap
                  onSuccess={handleLoginWithGoogle}
                />
              </div>
            )}
          </div>
        ) : (
          <div className=" bg-slate-800 h-fit m-2 p-2 rounded-md w-fit">
            <h1>User You May Know:</h1>
            <div className="flex flex-col">
              {user?.recommendedUsers?.map(
                (e, i) =>
                  e?.profileImageURL && (
                    <Link
                      key={i}
                      href={`/${e.id}`}
                      className="flex rounded-md hover:bg-customColor  cursor-pointer"
                    >
                      <Image
                        src={e?.profileImageURL}
                        alt="userIMage"
                        width={40}
                        height={40}
                        className=" rounded-full m-1"
                      />
                      <p className=" overflow-hidden text-sm text-slate-500 p-2 text-ellipsis">
                        {e.firstName}&nbsp;{e.lastName}
                      </p>
                    </Link>
                  )
              )}
            </div>
          </div>
        )}
      </TwitterLayout>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const tweet = await graphqlClient.request(getAllTweetsQuery);
  if (!tweet?.getAllTweets) return { notFound: true };

  return {
    props: { tweet: tweet?.getAllTweets as Tweet[] },
  };
};
export default Home;
