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
  constructor(props) {
    super(props);
    this.state = {
      background: this.props.startBackground
    };
  }

  nextBackground() {
    let nowBg = this.state.background;
    if (!nowBg) nowBg = '#fff';
    this.state.background = nowBg == '#f9f9f9' ? '#fff' : '#f9f9f9';
    return nowBg;
  }

  render() {
    return (
      <Container>
        <Row>
          <UneditableContent content={this.props.subContents[1]} background={this.nextBackground()} />
          <UneditableContent content={this.props.subContents[2]} background={this.nextBackground()} />
          <UneditableContent content={this.props.subContents[3]} background={this.nextBackground()} />
        </Row>
        <Row>
          <UneditableContent content={this.props.subContents[4]} background={this.nextBackground()} />
          <UneditableContent title={this.props.title} background={this.nextBackground()} />
          <UneditableContent content={this.props.subContents[6]} background={this.nextBackground()} />
        </Row>
        <Row>
          <UneditableContent content={this.props.subContents[7]} background={this.nextBackground()} />
          <UneditableContent content={this.props.subContents[8]} background={this.nextBackground()} />
          <UneditableContent content={this.props.subContents[9]} background={this.nextBackground()} />
        </Row>
      </Container>
    );
  }
}

export default Main;
