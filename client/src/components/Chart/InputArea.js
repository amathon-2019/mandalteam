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

class InputArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: props.background
    };
  }

  convertGridToNumber(grid) {
    switch (grid) {
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
      case "E":
        return 4;
      case "F":
        return 5;
      case "G":
        return 6;
      case "H":
        return 7;
      case "I":
        return 8;
    }
  }

  resizeScroll() {
    this.TextBox.style.height = "1px";
    this.TextBox.style.height = this.TextBox.scrollHeight + 1 + "px";
  }

  handleChange(e) {
    this.resizeScroll();
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
    window.addEventListener("resize", () => {
      this.resizeScroll();
    });
    this.resizeScroll();
  }

  componentDidUpdate() {
    this.resizeScroll();
  }

  render() {
    return (
      <Container background={this.state.background}>
        <TextBox
          onChange={this.handleChange.bind(this)}
          ref={ref => (this.TextBox = ref)}
          value={
            this.props.area && this.props.area.text
              ? this.props.area.text
              : undefined
          }
          disabled={this.props.editable ? "disabled" : ""}
        ></TextBox>
      </Container>
    );
  }
}

export default InputArea;
