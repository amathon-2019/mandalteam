import gql from "graphql-tag";

export const second_list = gql`
  query second_list {
    allCharts(first: 10) {
      edges {
        node {
          id
          hashid
          name
        }
      }
    }
  }
`;

export const before_modify = gql`
  query before_modify($roomId: ID) {
    chart(id: $roomId) {
      name
      hashid
      data {
        pos
        data {
          pos
          text
        }
      }
    }
  }
`;
