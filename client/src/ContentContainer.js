import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid black;
`;

class ContentContainer extends Component {
  render() {
    return <Container contentEditable="true">입력 해 주세요</Container>;
  }
}

export default ContentContainer;
