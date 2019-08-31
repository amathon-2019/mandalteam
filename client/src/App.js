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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Container className="App">
        <Title
          name="title"
          value={this.state.title}
          onChange={this.handleChange.bind(this)}
        />
        <Root
          title={this.state.title}
          content={this.state.content ? this.state.content : undefined}
        />
      </Container>
    );
  }
}

export default App;
