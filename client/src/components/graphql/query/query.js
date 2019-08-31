import gql from "graphql-tag";

export const first_make = gql`
  mutation first_make {
    makeChart(name: "sample") {
      chart {
        name
        data {
          pos
          data {
            pos
            text
          }
        }
      }
    }
  }
`;

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
