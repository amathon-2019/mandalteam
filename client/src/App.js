import React from "react";
import "./App.css";
import Root from "./Root";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const Title = styled.input`
  width: 520px;
  margin: 10px 10px 20px;
  border: 0;
  border-bottom: 3px solid #666;
  font-size: 1.4rem;
  transition: border 0.5s;
  &:focus {
    border-bottom: 3px solid #2e92d8;
    outline: 0;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      // content
      // {
      //   "A": {
      //     "1": {
      //       "text": "asdfasfd"
      //     },
      //     "2": {
      //       "text": "asdfasfd"
      //     }
      //   },
      //   "B": {
      //     "1": {
      //       "text": "asdfasfd"
      //     },
      //     "2": {
      //       "text": "asdfasfd"
      //     }
      //   }
      // }
      content: undefined
    };
    this.updateMainContent = this.updateMainContent.bind(this);
  }

  componentDidMount() {
    const url = "/json";

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          content: data,
          title: data.E[5].text
        });
      });
  }

  updateMainContent(grid, num, text) {
    console.log(grid, num, text);
    const newContent = this.state.content;
    if (!newContent[grid]) {
      newContent[grid] = {};
    }
    if (!newContent[grid][num]) {
      newContent[grid][num] = {};
    }
    newContent[grid][num]["text"] = text;

    this.setState({
      content: newContent
    });
  }

  handleChange(e) {
    const newContent = this.state.content;
    newContent["E"]["5"]["text"] = e.target.value;
    this.setState({
      content: newContent
    });
  }

  render() {
    return (
      <Container className="App">
        <Title
          name="title"
          value={
            this.state.content
              ? this.state.content["E"]["5"]["text"]
              : undefined
          }
          onChange={this.handleChange.bind(this)}
        />
        <Root
          content={this.state.content ? this.state.content : undefined}
          updateMainContent={this.updateMainContent}
        />
      </Container>
    );
  }
}

export default App;
