import React from "react";
import "./App.css";
import Root from "./Root";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.h1`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: 10px 20px 20px;
  font-size: 1.4rem;
`;

const Title = styled.input`
  width: 100%;
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
      title: ""
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Container className="App">
        <TitleWrapper>
          <Title
            name="title"
            value={this.state.title}
            onChange={this.handleChange.bind(this)}
          />
        </TitleWrapper>
        <Root title={this.state.title} />
      </Container>
    );
  }
}

export default App;
