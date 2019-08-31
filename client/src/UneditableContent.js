import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.input`
  width: 33%;
  heigth: 100%;

  border: 1px solid black;
`;

class UneditableContent extends Component {
  render() {
    return <Container></Container>;
  }
}

export default UneditableContent;
