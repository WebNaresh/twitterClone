import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

export const graphqlClient = new GraphQLClient(
  "https://d2vcaeil8kefe2.cloudfront.net/graphql",
  {
    headers: () => ({
      Authorization: isClient
        ? `Bearer ${window.localStorage.getItem("__twitter_token")}`
        : "",
    }),
  }
);
