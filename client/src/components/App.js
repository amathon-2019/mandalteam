import React from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import crypto from "crypto";

import "./App.css";
import Chart from "./Chart/Chart";
import LiveUsers from "./Header/LiveUsers";

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 20px 10px;
  box-shadow: 0 0 3px #999;
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
      isHovering: false
    };
    this.updateMainContent = this.updateMainContent.bind(this);
  }

  componentDidMount() {
    const url = "/json";

    fetch(url)
      .then(res => res.json())
      .then(async data => {
        console.log(data);
        await this.setState({
          content: data,
          title: data.E[5].text
        });
      })
      .catch(err => {
        let newContent = this.state.content;
        newContent = {};
        newContent["E"] = {};
        newContent["E"]["5"] = {};

        this.setState({
          content: newContent
        });
      });

    const socket = socketIOClient("http://localhost:4000");
    socket.on("update", content => {
      this.setState({
        content: content
      });
    });

    socket.on("count", count => {
      this.setState({
        liveUsers: count
      });
    });

    this.setState({
      socket: socket
    });
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

    this.state.socket.emit("update", this.state.content);
  }

  async handleChange(e) {
    let newContent = this.state.content;
    if (!newContent) {
      newContent = {};
    }
    if (!newContent["E"]) {
      newContent["E"] = {};
    }
    if (!newContent["E"]["5"]) {
      newContent["E"]["5"] = {};
    }
    newContent["E"]["5"]["text"] = e.target.value;
    console.log(newContent["E"]["5"]["text"]);
    await this.setState({
      content: newContent
    });

    this.state.socket.emit("update", this.state.content);
  }

  toggleHoverState(e) {
    this.setState({
      isHovering: !this.state.isHovering
    });
  }

  makeColor(id) {
    let hash = crypto.createHash('md5').update(id.toString()).digest('hex')
    ,   color = parseInt(hash.slice(0, 2), 16);
    return {
      major: 'hsl(' + color + ', 21%, 60%)',
      minor: 'hsl(' + color + ', 27%, 67%)'
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <ChatButton
            name="live-users"
            onMouseEnter={this.toggleHoverState.bind(this)}
            onMouseLeave={this.toggleHoverState.bind(this)}
            className="icon ion-md-people">
            <Users>{this.state.liveUsers}</Users>
          </ChatButton>
          {this.state.isHovering ? <LiveUsers /> : undefined}
          <TitleWrapper>
            <BackButton className="icon ion-md-arrow-round-back"></BackButton>
            <Title
              name="title"
              value={
                this.state.content
                  ? this.state.content["E"]["5"]["text"]
                  : undefined
              }
              placeholder="무엇에 대한 만다라트 차트인가요?"
              onChange={this.handleChange.bind(this)}
            />
          </TitleWrapper>
        </Header>
        <Chart
          content={this.state.content ? this.state.content : undefined}
          updateMainContent={this.updateMainContent}
          themeColor={this.makeColor(1)}
        />
      </Container>
    );
  }
}

export default App;
