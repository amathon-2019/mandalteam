import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 33.3333%;
  heigth: 100%;
`;

class UneditableContent extends Component {
  render() {
    return (
      <Container>
        {this.props.title
          ? this.props.title
          : this.props.content
          ? this.props.content
          : undefined}
      </Container>
    );
  }
}

export default UneditableContent;
