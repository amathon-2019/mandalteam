import React from "react";
import "./App.css";
import Root from "./Root";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 20px 10px;
  box-shadow: 0 0 3px #999;
`;

const BackButton = styled.i`
  display: inline-block;
  width: 33px;
  margin-right: 17px;
  font-size: 1.6rem;
`;

const TitleWrapper = styled.h1`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  font-size: 1.4rem;
`;

const Title = styled.input`
  width: calc(100% - 50px);
  border: 0;
  border-bottom: 3px solid #666;
  font-size: 1.4rem;
  transition: border 0.5s;
  &:focus {
    border-bottom: 3px solid #2e92d8;
    outline: 0;
  }
`;

const ChatButton = styled.i`
  float: right;
  font-size: 1.6rem;
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
      <Container>
        <Header>
          <ChatButton className="icon ion-md-people"></ChatButton>
          <TitleWrapper>
            <BackButton className="icon ion-md-arrow-round-back"></BackButton>
            <Title
              name="title"
              value={this.state.title}
              placeholder="무엇에 대한 만다라트 차트인가요?"
              onChange={this.handleChange.bind(this)}
            />
          </TitleWrapper>
        </Header>
        <Root title={this.state.title} />
      </Container>
    );
  }
}

export default App;
