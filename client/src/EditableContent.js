import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 33.3333%;
  heigth: 100%;
  font-size: 1rem;
  line-height: ${(prop) => prop.height}px;
`;

class UneditableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 100
    };
  }

  handleChange(e) {
    if (this.props.name === "sub_main") {
      this.props.updateMainContent(this.props.id, e.target.value);
    }
  }

  componentDidMount() {
    this.setState((prev) => prev.height = this.Container.offsetHeight);
  }

  render() {
    return <Container contentEditable="true" onChange={this.handleChange.bind(this)} height={this.state.height} ref={(ref) => this.Container = ref}></Container>;
  }
}

export default UneditableContent;
