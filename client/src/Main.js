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
                ? this.props.contents["1"]
                : undefined
            }
          ></UneditableContent>
          <UneditableContent
            area={
              this.props.content && this.props.content["2"]
                ? this.props.content["2"]
                : undefined
            }
          ></UneditableContent>
          <UneditableContent
            area={
              this.props.content && this.props.content["3"]
                ? this.props.content["3"]
                : undefined
            }
          ></UneditableContent>
        </Row>
        <Row>
          <UneditableContent
            area={
              this.props.content && this.props.content["4"]
                ? this.props.content["4"]
                : undefined
            }
          ></UneditableContent>
          <UneditableContent title={this.props.title} />
          <UneditableContent
            area={
              this.props.content && this.props.content["6"]
                ? this.props.content["6"]
                : undefined
            }
          ></UneditableContent>
        </Row>
        <Row>
          <UneditableContent
            area={
              this.props.content && this.props.content["7"]
                ? this.props.content["7"]
                : undefined
            }
          ></UneditableContent>
          <UneditableContent
            area={
              this.props.content && this.props.content["8"]
                ? this.props.content["8"]
                : undefined
            }
          ></UneditableContent>
          <UneditableContent
            area={
              this.props.content && this.props.content["9"]
                ? this.props.content["9"]
                : undefined
            }
          ></UneditableContent>
        </Row>
      </Container>
    );
  }
}

export default Main;
