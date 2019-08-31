import React from "react";
import "./App.css";
import Root from "./Root";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import liveUsers from "./LiveUsers";
import LiveUsers from "./LiveUsers";

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
  width: 100%;
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
  float: right;
  font-size: 1.6rem;
`;

const Users = styled.div`
  float: right;
  font-size: 1rem;

  padding: 10px 20px;
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

  render() {
    return (
      <Container>
        <Header>
          <ChatButton
            name="live-users"
            onMouseEnter={this.toggleHoverState.bind(this)}
            onMouseLeave={this.toggleHoverState.bind(this)}
            className="icon ion-md-people"
          ></ChatButton>
          <Users>현재 접속 중인 사용자 : {this.state.liveUsers} 명</Users>
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
        <Root
          content={this.state.content ? this.state.content : undefined}
          updateMainContent={this.updateMainContent}
        />
      </Container>
    );
  }
}

export default App;
