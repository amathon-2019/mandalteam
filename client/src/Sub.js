import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 33%;
  height: 100%;
  border: solid #999;
  border-width: 0 1px 1px 0;
`;

const Row = styled.div`
  width: 100%;
  height: 33%;

  display: flex;
`;

const Content = styled.div`
  width: 33%;
  heigth: 100%;
`;

class Sub extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Content contentEditable="true" />
          <Content contentEditable="true" />
          <Content contentEditable="true" />
        </Row>
        <Row>
          <Content contentEditable="true" />
          <Content contentEditable="true" />
          <Content contentEditable="true" />
        </Row>
        <Row>
          <Content contentEditable="true" />
          <Content contentEditable="true" />
          <Content contentEditable="true" />
        </Row>
      </Container>
    );
  }
}

export default Sub;
