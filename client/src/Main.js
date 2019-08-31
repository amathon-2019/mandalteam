import React, { Component } from "react";
import styled from "styled-components";
import UneditableContent from "./UneditableContent";

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

class Main extends Component {
  render() {
    return (
      <Container>
        <Row>
          <UneditableContent
            area={
              this.props.content && this.props.content["1"]
                ? this.props.content["1"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
          ></UneditableContent>
          <UneditableContent
            area={
              this.props.content && this.props.content["2"]
                ? this.props.content["2"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
          ></UneditableContent>
          <UneditableContent
            area={
              this.props.content && this.props.content["3"]
                ? this.props.content["3"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
          ></UneditableContent>
        </Row>
        <Row>
          <UneditableContent
            area={
              this.props.content && this.props.content["4"]
                ? this.props.content["4"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
          ></UneditableContent>
          <UneditableContent
            name="title"
            area={
              this.props.content && this.props.content["5"]
                ? this.props.content["5"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
          />
          <UneditableContent
            area={
              this.props.content && this.props.content["6"]
                ? this.props.content["6"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
          ></UneditableContent>
        </Row>
        <Row>
          <UneditableContent
            area={
              this.props.content && this.props.content["7"]
                ? this.props.content["7"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
          ></UneditableContent>
          <UneditableContent
            area={
              this.props.content && this.props.content["8"]
                ? this.props.content["8"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
          ></UneditableContent>
          <UneditableContent
            area={
              this.props.content && this.props.content["9"]
                ? this.props.content["9"]
                : undefined
            }
            updateMainContent={this.props.updateMainContent}
          ></UneditableContent>
        </Row>
      </Container>
    );
  }
}

export default Main;
