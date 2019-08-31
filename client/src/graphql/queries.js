import gql from "graphql-tag";

export const recentlyChartsQuery = gql`
	query recentlyCharts {
		allCharts(last: 10) {
			edges {
				node {
					id
					name
				}
			}
		}
	}
`;