import React, { Component } from "react";
import styled from "styled-components";
import UneditableContent from "./UneditableContent";
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

class Main extends Component {
  render() {
    return (
      <Container>
        <Row>
          <UneditableContent>{this.props.subContents[1]}</UneditableContent>
          <UneditableContent>{this.props.subContents[2]}</UneditableContent>
          <UneditableContent>{this.props.subContents[3]}</UneditableContent>
        </Row>
        <Row>
          <UneditableContent>{this.props.subContents[4]}</UneditableContent>
          <EditableContent />
          <UneditableContent>{this.props.subContents[6]}</UneditableContent>
        </Row>
        <Row>
          <UneditableContent>{this.props.subContents[7]}</UneditableContent>
          <UneditableContent>{this.props.subContents[8]}</UneditableContent>
          <UneditableContent>{this.props.subContents[9]}</UneditableContent>
        </Row>
      </Container>
    );
  }
}

export default Main;
