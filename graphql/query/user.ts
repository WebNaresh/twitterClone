import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      email
      lastName
      profileImageURL
      recommendedUsers {
        firstName
        lastName
        profileImageURL
        id
      }
      followers {
        firstName
        lastName
        profileImageURL
        id
      }
      following {
        firstName
        lastName
        profileImageURL
        id
      }
    }
  }
`);
export const getCurrentUserById = graphql(`
  #graphql
  query ExampleQuery($id: ID) {
    getUserById(id: $id) {
      email
      firstName
      lastName
      profileImageURL
      id
      followers {
        firstName
        lastName
        profileImageURL
        id
      }
      following {
        firstName
        lastName
        profileImageURL
        id
      }
      tweets {
        content
        imageURL
        id
        author {
          profileImageURL
          firstName
          lastName
        }
      }
    }
  }
`);
