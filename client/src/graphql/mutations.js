import gql from "graphql-tag";
import { Mutations } from "react-apollo";

export const RegisterMutation = gql`
  mutation signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      success
      user {
        username
        dateJoined
        id
        hashid
      }
    }
  }
`;

export const LoginMutation = gql`
  mutation login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const MakeMutation = gql`
  mutation first_make($title: String!) {
    makeChart(name: $title) {
      chart {
        name
        id
      }
    }
  }
`;