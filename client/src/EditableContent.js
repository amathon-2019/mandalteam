import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.input`
  width: 33%;
  heigth: 100%;
  font-size: 1rem;

  border: 1px solid black;
`;

class UneditableContent extends Component {
  handleChange(e) {
    if (this.props.name === "sub_main") {
      this.props.updateMainContent(this.props.id, e.target.value);
    }
  }

  render() {
    return <Container onChange={this.handleChange.bind(this)}></Container>;
  }
}

export default UneditableContent;
