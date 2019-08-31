import gql from "graphql-tag";

export const recentlyChartsQuery = gql`
	query recentlyCharts {
		allCharts(first: 10) {
			edges {
				node {
					master {
						username
					}
					id
					name
				}
			}
		}
	}
`;