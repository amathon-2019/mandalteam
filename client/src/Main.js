import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 33%;
  height: 100%;

  border: 1px solid black;
`;

const Row = styled.div`
  width: 100%;
  height: 33%;

  display: flex;
`;

const Content = styled.div`
  width: 33%;
  heigth: 100%;

  border: 1px solid black;
  z-index: 1;
`;

class Main extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Content contentEditable="false" />
          <Content contentEditable="false" />
          <Content contentEditable="false" />
        </Row>
        <Row>
          <Content contentEditable="false" />
          <Content contentEditable="true" />
          <Content contentEditable="false" />
        </Row>
        <Row>
          <Content contentEditable="false" />
          <Content contentEditable="false" />
          <Content contentEditable="false" />
        </Row>
      </Container>
    );
  }
}

export default Main;