import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 33%;
  heigth: 100%;

  border: 1px solid black;
`;

class UneditableContent extends Component {
  render() {
    return (
      <Container>
        {this.props.title
          ? this.props.title
          : this.props.content
          ? this.props.content
          : ""}
      </Container>
    );
  }
}

export default UneditableContent;
