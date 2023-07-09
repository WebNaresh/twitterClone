import { graphql } from "../../gql";

export const getAllTweetsQuery = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        firstName
        lastName
        profileImageURL
        id
      }
    }
  }
`);

export const getSignedUrl = graphql(`
  #graphql
  query GetSignedUrl($imageName: String!, $imageType: String!) {
    getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)
  }
`);
