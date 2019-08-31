import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 60px;
  right: 0px;
  width: 20%;
  height: 20%;

  border: 1px solid grey;
  background-color: white;
  z-index: 1;
`;

class LiveUsers extends Component {
  render() {
    return <Container>접속 중인 사용자</Container>;
  }
}

export default LiveUsers;
