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
          <Sub
            content={
              this.props.content && this.props.content["A"]
                ? this.props.content["A"]
                : undefined
            }
            id="1"
            updateMainContent={this.updateMainContent}
          />
          <Sub
            content={
              this.props.content && this.props.content["B"]
                ? this.props.content["B"]
                : undefined
            }
            id="2"
            updateMainContent={this.updateMainContent}
          />
          <Sub
            content={
              this.props.content && this.props.content["C"]
                ? this.props.content["C"]
                : undefined
            }
            id="3"
            updateMainContent={this.updateMainContent}
          />
        </Row>
        <Row>
          <Sub
            content={
              this.props.content && this.props.content["D"]
                ? this.props.content["D"]
                : undefined
            }
            id="4"
            updateMainContent={this.updateMainContent}
          />
          <Main
            title={this.props.title}
            id="main"
            subContents={this.state.subContents}
          />
          <Sub
            content={
              this.props.content && this.props.content["F"]
                ? this.props.content["F"]
                : undefined
            }
            id="6"
            updateMainContent={this.updateMainContent}
          />
        </Row>
        <Row>
          <Sub
            content={
              this.props.content && this.props.content["G"]
                ? this.props.content["G"]
                : undefined
            }
            id="7"
            updateMainContent={this.updateMainContent}
          />
          <Sub
            content={
              this.props.content && this.props.content["H"]
                ? this.props.content["H"]
                : undefined
            }
            id="8"
            updateMainContent={this.updateMainContent}
          />
          <Sub
            content={
              this.props.content && this.props.content["I"]
                ? this.props.content["I"]
                : undefined
            }
            id="9"
            updateMainContent={this.updateMainContent}
          />
        </Row>
      </Container>
    );
  }
}

export default Root;
