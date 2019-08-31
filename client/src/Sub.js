import React, { Component } from "react";
import styled from "styled-components";
import EditableContent from "./EditableContent";

const Container = styled.div`
  width: 33%;
  height: 100%;

  border: 1px solid black;
`;

const Row = styled.div`
  width: 100%;
  height: 33%;

  display: flex;
`;

class Sub extends Component {
  render() {
    return (
      <Container>
        <Row>
          <EditableContent />
          <EditableContent />
          <EditableContent />
        </Row>
        <Row>
          <EditableContent />
          <EditableContent
            id={this.props.id}
            name="sub_main"
            updateMainContent={this.props.updateMainContent}
          />
          <EditableContent />
        </Row>
        <Row>
          <EditableContent />
          <EditableContent />
          <EditableContent />
        </Row>
      </Container>
    );
  }
}

export default Sub;
