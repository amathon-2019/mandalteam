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
  font-size: 1.4em;
  transition: border 0.5s;
  &:focus {
    border-bottom: 3px solid #2e92d8;
    outline: 0;
  }
`;

function App() {
  return (
    <Container className="App">
      <Title />
      <Root />
    </Container>
  );
}

export default App;
