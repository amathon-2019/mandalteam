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
    this.updateMainContent = this.updateMainContent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState(prev => prev.containerSize = Math.min(window.innerWidth, window.innerHeight) - 100);
    });
  }

  updateMainContent(sub_id, content) {
    console.log(sub_id, content);
    const newSubContents = this.state.subContents;
    newSubContents[sub_id] = content;

    this.setState({
      subContents: newSubContents
    });
  }

  render() {
    return (
      <Container size={this.state.containerSize}>
        <Row>
          <Sub id="1" updateMainContent={this.updateMainContent} />
          <Sub id="2" updateMainContent={this.updateMainContent} />
          <Sub id="3" updateMainContent={this.updateMainContent} />
        </Row>
        <Row>
          <Sub id="4" updateMainContent={this.updateMainContent} />
          <Main
            title={this.props.title}
            id="main"
            subContents={this.state.subContents}
          />
          <Sub id="6" updateMainContent={this.updateMainContent} />
        </Row>
        <Row>
          <Sub id="7" updateMainContent={this.updateMainContent} />
          <Sub id="8" updateMainContent={this.updateMainContent} />
          <Sub id="9" updateMainContent={this.updateMainContent} />
        </Row>
      </Container>
    );
  }
}

export default Root;
