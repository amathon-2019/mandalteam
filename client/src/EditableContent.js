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
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 1px;
  }
`;

const TextBox = styled.textarea`
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

class EditableContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.TextBox.style.height = "1px";
    this.TextBox.style.height = this.TextBox.scrollHeight + 1 + 'px';
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
    this.TextBox.style.height = "1px";
    this.TextBox.style.height = this.TextBox.scrollHeight + 1 + 'px';
    window.addEventListener('resize', () => {
      this.TextBox.style.height = "1px";
      this.TextBox.style.height = this.TextBox.scrollHeight + 1 + 'px';
    });
  }

  render() {
    return (
      <Container
        background={this.state.background}>
        <TextBox
          onChange={this.handleChange.bind(this)}
          ref={ref => (this.TextBox = ref)}
          value={this.props.area && this.props.area.text
            ? this.props.area.text
            : undefined}>
        </TextBox>
      </Container>
    );
  }
}

export default EditableContent;
