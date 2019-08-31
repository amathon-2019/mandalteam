import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 33%;
  heigth: 100%;

  border: 1px solid black;
`;

class ContentContainer extends Component {
  render() {
    return <Container contentEditable="true">입력</Container>;
  }
}

export default ContentContainer;
