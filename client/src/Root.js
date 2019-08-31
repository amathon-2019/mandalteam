import React, { Component } from "react";
import styled from "styled-components";
import Sub from "./Sub";
import Main from "./Main";

const Container = styled.div`
  width: ${(prop) => prop.size}px;
  height: ${(prop) => prop.size}px;
  margin: 0 auto;

  border: solid #999;
  border-weight: 1px 0 0 1px;

  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  height: 33.3333%;
  display: flex;
`;

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subContents: [null, null, null, null, null, null, null, null, null, null],
      main: <Main />,
      containerSize: Math.min(window.innerWidth, window.innerHeight) - 100
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState(prev => prev.containerSize = Math.min(window.innerWidth, window.innerHeight) - 100);
    });
  }

  updateMainContent(sub_id, content) {
    console.log(`sub_id: ${sub_id}, content: ${content}`);
  }

  render() {
    return (
      <Container size={this.state.containerSize}>
        <Row>
          <Sub id="sub_1" updateMainContent={this.updateMainContent} />
          <Sub id="sub_2" updateMainContent={this.updateMainContent} />
          <Sub id="sub_3" updateMainContent={this.updateMainContent} />
        </Row>
        <Row>
          <Sub id="sub_4" updateMainContent={this.updateMainContent} />
          <Main id="main" subContents={this.state.subContents} />
          <Sub id="sub_6" updateMainContent={this.updateMainContent} />
        </Row>
        <Row>
          <Sub id="sub_7" updateMainContent={this.updateMainContent} />
          <Sub id="sub_8" updateMainContent={this.updateMainContent} />
          <Sub id="sub_9" updateMainContent={this.updateMainContent} />
        </Row>
      </Container>
    );
  }
}

export default Root;
