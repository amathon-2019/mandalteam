import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 33.3333%;
  height: 100%;
  background: ${(prop) => prop.background};
  font-size: 1rem;
  line-height: ${(prop) => prop.height}px;
`;

class UneditableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 100,
      background: props.background
    };
  }

  componentDidMount() {
    this.setState((prev) => prev.height = this.Container.offsetHeight);
  }

  render() {
    return (
      <Container
        height={this.state.height}
        ref={(ref) => this.Container = ref}
        background={this.state.background}>
        {this.props.area && this.props.area.text
          ? this.props.area.text
          : undefined}
      </Container>
    );
  }
}

export default UneditableContent;
