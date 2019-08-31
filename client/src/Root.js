import React, { Component } from "react";
import styled from "styled-components";
import Sub from "./Sub";
import Main from "./Main";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  border: 1px solid #999;
`;

const Row = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
`;

class Root extends Component {
  constructor(props) {
    super(props);
  }

  updateMainContent() {}

  render() {
    return (
      <Container>
        <Row>
          <Sub />
          <Sub />
          <Sub />
        </Row>
        <Row>
          <Sub />
          <Main />
          <Sub />
        </Row>
        <Row>
          <Sub />
          <Sub />
          <Sub />
        </Row>
      </Container>
    );
  }
}

export default Root;
