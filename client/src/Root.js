import React, { Component } from "react";
import styled from "styled-components";
import Sub from "./Sub";
import Main from "./Main";

const Container = styled.div`
  width: ${prop => prop.size}px;
  height: ${prop => prop.size}px;
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
      containerSize: Math.min(window.innerWidth, window.innerHeight) - 100
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState(
        prev =>
          (prev.containerSize =
            Math.min(window.innerWidth, window.innerHeight) - 100)
      );
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
            grid="A"
            updateMainContent={this.props.updateMainContent}
          />
          <Sub
            content={
              this.props.content && this.props.content["B"]
                ? this.props.content["B"]
                : undefined
            }
            grid="B"
            updateMainContent={this.props.updateMainContent}
          />
          <Sub
            content={
              this.props.content && this.props.content["C"]
                ? this.props.content["C"]
                : undefined
            }
            grid="C"
            updateMainContent={this.props.updateMainContent}
          />
        </Row>
        <Row>
          <Sub
            content={
              this.props.content && this.props.content["D"]
                ? this.props.content["D"]
                : undefined
            }
            grid="D"
            updateMainContent={this.props.updateMainContent}
          />
          <Main
            content={
              this.props.content && this.props.content["E"]
                ? this.props.content["E"]
                : undefined
            }
            grid="E"
            updateMainContent={this.props.updateMainContent}
          />
          <Sub
            content={
              this.props.content && this.props.content["F"]
                ? this.props.content["F"]
                : undefined
            }
            grid="F"
            updateMainContent={this.props.updateMainContent}
          />
        </Row>
        <Row>
          <Sub
            content={
              this.props.content && this.props.content["G"]
                ? this.props.content["G"]
                : undefined
            }
            grid="G"
            updateMainContent={this.props.updateMainContent}
          />
          <Sub
            content={
              this.props.content && this.props.content["H"]
                ? this.props.content["H"]
                : undefined
            }
            grid="H"
            updateMainContent={this.props.updateMainContent}
          />
          <Sub
            content={
              this.props.content && this.props.content["I"]
                ? this.props.content["I"]
                : undefined
            }
            grid="I"
            updateMainContent={this.props.updateMainContent}
          />
        </Row>
      </Container>
    );
  }
}

export default Root;
