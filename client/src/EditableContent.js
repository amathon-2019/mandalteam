import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.input`
  width: 33.3333%;
  height: 100%;
  border: 0;
  background: ${(prop) => prop.background};
  font-size: 1rem;
  line-height: ${prop => prop.height}px;
`;

class UneditableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 100,
      background: props.background
    };
  }

  convertGridToNumber(grid) {
    switch (grid) {
      case "A":
        return 1;
      case "B":
        return 2;
      case "C":
        return 3;
      case "D":
        return 4;
      case "E":
        return 5;
      case "F":
        return 6;
      case "G":
        return 7;
      case "H":
        return 8;
      case "I":
        return 9;
    }
  }

  handleChange(e) {
    this.props.updateMainContent(
      this.props.grid,
      this.props.num,
      e.target.value
    );
    if (this.props.name === "sub_main") {
      this.props.updateMainContent(
        "E",
        this.convertGridToNumber(this.props.grid),
        e.target.value
      );
    }
  }

  componentDidMount() {
    this.setState(prev => (prev.height = this.Container.offsetHeight));
  }

  render() {
    return (
      <Container
        onChange={this.handleChange.bind(this)}
        ref={ref => (this.Container = ref)}
        height={this.state.height}
        background={this.state.background}
        value={
          this.props.area && this.props.area.text
            ? this.props.area.text
            : undefined
        }
      ></Container>
    );
  }
}

export default UneditableContent;
