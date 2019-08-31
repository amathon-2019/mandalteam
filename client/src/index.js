import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri:
    "https://6qqekckfi1.execute-api.ap-northeast-2.amazonaws.com/dev/graphql#operationName=before_modify&query=fragment%20chart%20on%20ChartNode%7B%0A%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20pos%0A%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20pos%0A%20%20%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%7D%0Amutation%20first_make%20%7B%0A%20%20makeChart(name%3A%20%22sample%22)%20%7B%0A%20%20%20%20chart%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20...chart%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20second_list%20%7B%0A%20%20allCharts(first%3A%2010)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20hashid%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0A%0Aquery%20before_modify%20%7B%0A%20%20chart(id%3A%20%22Q2hhcnROb2RlOjh3ZHo%3D%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20...chart%0A%20%20%7D%0A%7D%0A%0Amutation%20modifyCell%20%7B%0A%20%20modifyChartCell(chartId%3A%22Q2hhcnROb2RlOjh3ZHo%3D%22%2C%20location%3A%20%22A1%22%2C%20text%3A%20%22test%22)%20%7B%0A%20%20%20%20success%0A%20%20%20%20chart%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20...chart%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Amutation%20modifyName%20%7B%0A%20%20modifyChartName(chartId%3A%20%22Q2hhcnROb2RlOjh3ZHo%3D%22%2Cname%3A%22change%20title%22)%20%7B%0A%20%20%20%20success%0A%20%20%20%20chart%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20...chart%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
