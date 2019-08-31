import React from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import crypto from "crypto";

import "./App.css";
import Chart from "./Chart/Chart";
import LiveUsers from "./Header/LiveUsers";

// 1
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { second_list, before_modify } from "../graphql/query";

// 2
const httpLink = createHttpLink({
  uri:
    "https://6qqekckfi1.execute-api.ap-northeast-2.amazonaws.com/dev/graphql#operationName=before_modify&query=fragment%20chart%20on%20ChartNode%7B%0A%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20pos%0A%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20pos%0A%20%20%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%7D%0Amutation%20first_make%20%7B%0A%20%20makeChart(name%3A%20%22sample%22)%20%7B%0A%20%20%20%20chart%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20...chart%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20second_list%20%7B%0A%20%20allCharts(first%3A%2010)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20hashid%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0A%0Aquery%20before_modify%20%7B%0A%20%20chart(id%3A%20%22Q2hhcnROb2RlOjh3ZHo%3D%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20...chart%0A%20%20%7D%0A%7D%0A%0Amutation%20modifyCell%20%7B%0A%20%20modifyChartCell(chartId%3A%22Q2hhcnROb2RlOjh3ZHo%3D%22%2C%20location%3A%20%22A1%22%2C%20text%3A%20%22test%22)%20%7B%0A%20%20%20%20success%0A%20%20%20%20chart%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20...chart%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Amutation%20modifyName%20%7B%0A%20%20modifyChartName(chartId%3A%20%22Q2hhcnROb2RlOjh3ZHo%3D%22%2Cname%3A%22change%20title%22)%20%7B%0A%20%20%20%20success%0A%20%20%20%20chart%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20...chart%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D"
});

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 20px 10px;
  box-shadow: 0 0 3px #999;
  cursor: pointer;
`;

const BackButton = styled.i`
  display: inline-block;
  width: 33px;
  margin-right: 17px;
  font-size: 1.6rem;
`;

const TitleWrapper = styled.h1`
  width: calc(100% - 50px);
  max-width: 520px;
  margin: 0 auto;
  font-size: 1.4rem;
`;

const Title = styled.input`
  width: calc(100% - 50px);
  border: 0;
  border-bottom: 3px solid #666;
  font-size: 1.4rem;
  transition: border 0.5s;
  &:focus {
    border-bottom: 3px solid #2e92d8;
    outline: 0;
  }
`;

const ChatButton = styled.i`
  position: relative;
  float: right;
  font-size: 2rem;
`;

const Users = styled.div`
  position: absolute;
  right: -10px;
  bottom: 5px;
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  background: rgba(171, 122, 110, 0.9);
  font-size: 0.8rem;
  font-style: normal;
  line-height: 1.6em;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      // content
      // {
      //   "A": {
      //     "1": {
      //       "text": "asdfasfd"
      //     },
      //     "2": {
      //       "text": "asdfasfd"
      //     }
      //   },
      //   "B": {
      //     "1": {
      //       "text": "asdfasfd"
      //     },
      //     "2": {
      //       "text": "asdfasfd"
      //     }
      //   }
      // }
      content: undefined,
      socket: undefined,
      liveUsers: 0,
      isHovering: false,
      hash: undefined
    };
    this.updateMainContent = this.updateMainContent.bind(this);
  }

  async componentDidMount() {
    // const url = "/json";

    // fetch(url)
    //   .then(res => res.json())
    //   .then(async data => {
    //     console.log(data);
    //     let newContent = {};

    //     data.map(grid => {
    //       newContent[grid.pos] = {};
    //       if (grid.data && grid.data.length > 0) {
    //         grid.data.forEach(area => {
    //           newContent[grid.pos][area.pos] = {};
    //           newContent[grid.pos][area.pos]["text"] = area.text;
    //         });
    //       }
    //     });

    //     await this.setState({
    //       content: newContent,
    //       title: newContent.E[5].text
    //     });

    //     console.log(this.state.content);
    //   })
    //   .catch(err => {
    //     let newContent = this.state.content;
    //     newContent = {};
    //     newContent["E"] = {};
    //     newContent["E"]["4"] = {};

    //     this.setState({
    //       content: newContent
    //     });
    //   });

    await client
      .query({
        query: before_modify,
        variables: {
          roomId: this.props.roomId
        }
      })
      .then(async res => {
        console.log(res.data);
        const data = res.data.chart.data;
        const hash = res.data.chart.hashid;
        console.log(hash);

        let newContent = {};

        data.map(grid => {
          newContent[grid.pos] = {};
          if (grid.data && grid.data.length > 0) {
            grid.data.forEach(area => {
              newContent[grid.pos][area.pos] = {};
              newContent[grid.pos][area.pos]["text"] = area.text;
            });
          }
        });

        await this.setState({
          content: newContent,
          title: newContent.E[4].text,
          hash: hash
        });
      });

    const socket = new WebSocket(
      "wss://hzm41kw816.execute-api.ap-northeast-2.amazonaws.com/dev"
    );
    const hash = this.state.hash;
    console.log(hash);

    socket.onopen = function(evt) {
      console.log("연결 완료");
      const option = { type: "init", chart: hash };
      console.log(option);
      // 만약 사용자가 처음 생성한 것이라면 init 을 해준다
      socket.send(JSON.stringify(option));

      // 그게 아니라 기존에 존재하는 참여자의 차트에 연결하는 것이면 기존에 존재하는 roomId와 연결한다
      // socket.send(JSON.stringify({ type: 'load', chart: roomId }))
    };

    // 새로 업데이트 된 data를 받아와서 업데이트 시켜준다
    socket.onmessage = evt => {
      // 받아오는 데이터 형태 : {"type":"changed","chart":"asdf","pos":"a0","text":"asdf"}
      const msg = JSON.parse(evt.data);
      console.log(msg);

      // 만약 메시지가 changed 이라면, 해당 메세지의 pos와 text를 가져와 content를 업데이트 한다
      if (msg.type === "changed") {
        console.log("change detected");
        const grid = msg.location[0];
        const area = msg.location[1];
        const text = msg.text;

        const newContent = this.state.content;

        newContent[grid][area]["text"] = text;
        this.setState({
          content: newContent
        });
      }
    };

    socket.onclose = function(evt) {
      console.log("연결 해제");
    };

    // socket.on("update", content => {
    //   this.setState({
    //     content: content
    //   });
    // });

    // socket.on("count", count => {
    //   this.setState({
    //     liveUsers: count
    //   });
    // });

    this.setState({
      socket: socket
    });

    // socket 연결 초기화 방지
    setInterval(() => {
      this.state.socket.send(JSON.stringify({ type: "ping" }));
    }, 500000);

    console.log(socket);
  }

  async updateMainContent(grid, num, text) {
    console.log(grid, num, text);
    let newContent = this.state.content;
    if (!newContent) {
      newContent = {};
    }
    if (!newContent[grid]) {
      newContent[grid] = {};
    }
    if (!newContent[grid][num]) {
      newContent[grid][num] = {};
    }
    newContent[grid][num]["text"] = text;

    await this.setState({
      content: newContent
    });

    const option = {
      type: "edit",
      chart: this.state.hash,
      location: grid + num,
      text: text
    };
    console.log(option);
    // 수정 작업 socket 전송
    this.state.socket.send(JSON.stringify(option));
  }

  async handleChange(e) {
    let newContent = this.state.content;
    if (!newContent) {
      newContent = {};
    }
    if (!newContent["E"]) {
      newContent["E"] = {};
    }
    if (!newContent["E"]["4"]) {
      newContent["E"]["4"] = {};
    }
    newContent["E"]["4"]["text"] = e.target.value;
    console.log(newContent["E"]["4"]["text"]);
    await this.setState({
      content: newContent
    });

    const option = {
      type: "edit",
      chart: this.state.hash,
      location: "E4",
      text: newContent["E"]["4"]["text"]
    };
    // 수정 작업 socket 전송
    this.state.socket.send(JSON.stringify(option));
  }

  gotoHome() {
    document.location.href = "/";
  }

  toggleHoverState(e) {
    this.setState({
      isHovering: !this.state.isHovering
    });
  }

  makeColor(id) {
    if (!id) id = "1";
    let hash = crypto
        .createHash("md5")
        .update(id.toString())
        .digest("hex"),
      color = parseInt(hash.slice(0, 2), 16);
    return {
      major: "hsl(" + color + ", 21%, 60%)",
      minor: "hsl(" + color + ", 27%, 67%)"
    };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Header>
            <ChatButton
              name="live-users"
              onMouseEnter={this.toggleHoverState.bind(this)}
              onMouseLeave={this.toggleHoverState.bind(this)}
              className="icon ion-md-people"
            >
              <Users>{this.state.liveUsers}</Users>
            </ChatButton>
            {this.state.isHovering ? <LiveUsers /> : undefined}
            <TitleWrapper>
              <BackButton
                className="icon ion-md-arrow-round-back"
                onClick={this.gotoHome}
              ></BackButton>
              <Title
                name="title"
                value={
                  this.state.content &&
                  this.state.content["E"] &&
                  this.state.content["E"]["4"] &&
                  this.state.content["E"]["4"]["text"]
                    ? this.state.content["E"]["4"]["text"]
                    : ""
                }
                placeholder="무엇에 대한 만다라트 차트인가요?"
                onChange={this.handleChange.bind(this)}
              />
            </TitleWrapper>
          </Header>
          <Chart
            content={this.state.content ? this.state.content : undefined}
            updateMainContent={this.updateMainContent}
            themeColor={this.makeColor(this.props.roomId)}
          />
        </Container>
      </ApolloProvider>
    );
  }
}

export default App;
