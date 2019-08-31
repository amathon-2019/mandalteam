import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 33.3333%;
  height: 100%;
  border: 0;
  background: ${prop => prop.background};
  font-size: 1rem;
  overflow: auto;
  resize: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 1px;
  }
`;

const TextBox = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  border: 0;
  background: none;
  font-size: 1em;
  text-align: center;
  overflow: visible;
  resize: none;
  transform: translateY(-50%);
  &:focus {
    outline: none;
  }
`;

class UneditableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: props.background
    };
  }

  componentDidMount() {
    this.TextBox.style.height = "1px";
    this.TextBox.style.height = this.TextBox.scrollHeight + 1 + 'px';
  }

  componentDidUpdate() {
    this.TextBox.style.height = "1px";
    this.TextBox.style.height = this.TextBox.scrollHeight + 1 + 'px';
  }

  render() {
    return (
      <Container
        background={this.state.background}>
        <TextBox
          ref={ref => (this.TextBox = ref)}>
          {this.props.area && this.props.area.text
            ? this.props.area.text
            : undefined}
        </TextBox>
      </Container>
    );
  }
}

export default UneditableContent;
