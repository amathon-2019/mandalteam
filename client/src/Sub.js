import React, { Component } from "react";
import styled from "styled-components";
import EditableContent from "./EditableContent";

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

class Sub extends Component {
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
          <EditableContent background={this.nextBackground()} />
          <EditableContent background={this.nextBackground()} />
          <EditableContent background={this.nextBackground()} />
        </Row>
        <Row>
          <EditableContent background={this.nextBackground()} />
          <EditableContent
            id={this.props.id}
            name="sub_main"
            updateMainContent={this.props.updateMainContent}
            background={this.nextBackground()}
          />
          <EditableContent background={this.nextBackground()} />
        </Row>
        <Row>
          <EditableContent background={this.nextBackground()} />
          <EditableContent background={this.nextBackground()} />
          <EditableContent background={this.nextBackground()} />
        </Row>
      </Container>
    );
  }
}

export default Sub;
