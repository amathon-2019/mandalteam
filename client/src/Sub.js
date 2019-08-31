import React, { Component } from "react";
import styled from "styled-components";
import ContentContainer from "./ContentContainer";

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

const Content = styled(ContentContainer)`
  width: 33%;
  heigth: 100%;

  border: 1px solid black;
`;

class Sub extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Content />
          <Content />
          <Content />
        </Row>
        <Row>
          <Content />
          <Content />
          <Content />
        </Row>
        <Row>
          <Content />
          <Content />
          <Content />
        </Row>
      </Container>
    );
  }
}

export default Sub;
