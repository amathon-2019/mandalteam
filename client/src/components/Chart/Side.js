import React, { Component } from "react";
import styled from "styled-components";
import InputArea from "./InputArea";

const Container = styled.div`
  width: 33.3333%;
  height: 100%;
  border: solid #999;
  border-width: 0 1px 1px 0;
`;

const Row = styled.div`
  width: 100%;
  height: 33.3333%;

  display: flex;
`;

class Side extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: this.props.startBackground
    };
  }

  nextBackground() {
    let nowBg = this.state.background;
    if (!nowBg) nowBg = "#fff";
    this.state.background = nowBg == "#f6f6f6" ? "#fff" : "#f6f6f6";
    return nowBg;
  }

  render() {
    return (
      <Container>
        <Row>
          <InputArea
            grid={this.props.grid}
            num={0}
            area={
              this.props.content && this.props.content["0"]
                ? this.props.content["0"]
                : undefined
            }
            background={this.nextBackground()}
            updateMainContent={this.props.updateMainContent}
          />
          <InputArea
            grid={this.props.grid}
            num={1}
            area={
              this.props.content && this.props.content["1"]
                ? this.props.content["1"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
          />
          <InputArea
            grid={this.props.grid}
            num={2}
            area={
              this.props.content && this.props.content["2"]
                ? this.props.content["2"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
          />
        </Row>
        <Row>
          <InputArea
            grid={this.props.grid}
            num={3}
            area={
              this.props.content && this.props.content["3"]
                ? this.props.content["3"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
          />
          <InputArea
            grid={this.props.grid}
            num={4}
            area={
              this.props.content && this.props.content["4"]
                ? this.props.content["4"]
                : undefined
            }
            name="sub_main"
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
          />
          <InputArea
            grid={this.props.grid}
            num={5}
            area={
              this.props.content && this.props.content["5"]
                ? this.props.content["5"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
          />
        </Row>
        <Row>
          <InputArea
            grid={this.props.grid}
            num={6}
            area={
              this.props.content && this.props.content["6"]
                ? this.props.content["6"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
          />
          <InputArea
            grid={this.props.grid}
            num={7}
            area={
              this.props.content && this.props.content["7"]
                ? this.props.content["7"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
          />
          <InputArea
            grid={this.props.grid}
            num={8}
            area={
              this.props.content && this.props.content["8"]
                ? this.props.content["8"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
          />
        </Row>
      </Container>
    );
  }
}

export default Side;
