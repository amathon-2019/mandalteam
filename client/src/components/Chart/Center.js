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

class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: this.props.themeColor,
      background: this.props.themeColor.minor
    };
  }

  nextBackground() {
    let nowBg = this.state.background;
    this.state.background =
      nowBg === this.state.themeColor.major
        ? this.state.themeColor.minor
        : this.state.themeColor.major;
    return nowBg;
  }

  render() {
    return (
      <Container>
        <Row>
          <InputArea
            area={
              this.props.content && this.props.content["0"]
                ? this.props.content["0"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
            editable="true"
          ></InputArea>
          <InputArea
            area={
              this.props.content && this.props.content["1"]
                ? this.props.content["1"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
            editable="true"
          ></InputArea>
          <InputArea
            area={
              this.props.content && this.props.content["2"]
                ? this.props.content["2"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
            editable="true"
          ></InputArea>
        </Row>
        <Row>
          <InputArea
            area={
              this.props.content && this.props.content["3"]
                ? this.props.content["3"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
            editable="true"
          ></InputArea>
          <InputArea
            name="title"
            area={
              this.props.content && this.props.content["4"]
                ? this.props.content["4"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
            editable="true"
          />
          <InputArea
            area={
              this.props.content && this.props.content["5"]
                ? this.props.content["5"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
            editable="true"
          ></InputArea>
        </Row>
        <Row>
          <InputArea
            area={
              this.props.content && this.props.content["6"]
                ? this.props.content["6"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
            editable="true"
          ></InputArea>
          <InputArea
            area={
              this.props.content && this.props.content["7"]
                ? this.props.content["7"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
            editable="true"
          ></InputArea>
          <InputArea
            area={
              this.props.content && this.props.content["8"]
                ? this.props.content["8"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
            editable="true"
          ></InputArea>
        </Row>
      </Container>
    );
  }
}

export default Center;
