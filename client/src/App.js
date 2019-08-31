import React from "react";
import "./App.css";
import Root from "./Root";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

function App() {
  return (
    <Container className="App">
      <Root />
    </Container>
  );
}

export default App;
