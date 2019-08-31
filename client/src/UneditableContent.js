import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 33.3333%;
  heigth: 100%;
`;

class UneditableContent extends Component {
  handleChange(e) {}

  render() {
    return (
      <Container>
        {this.props.area && this.props.area.text
          ? this.props.area.text
          : undefined}
      </Container>
    );
  }
}

export default UneditableContent;
