import React, { Component } from "react";
import styled from "styled-components";
import Sub from "./Sub";
import Main from "./Main";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  border: 1px solid black;
`;

const Row = styled.div`
  width: 100%;
  height: 300px;

  display: flex;
`;

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subContents: [null, null, null, null, null, null, null, null, null, null],
      main: <Main />
    };
    this.updateMainContent = this.updateMainContent.bind(this);
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
      <Container>
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
