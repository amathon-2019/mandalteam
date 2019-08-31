import React, { Component } from 'react';
import styled from "styled-components";

const Container = styled.section`
  padding: 10px 0;
`;

const Link = styled.a`
  display: block;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 20px 25px;
  border-radius: 20px;
  background: #efefef;
  color: black;
  font-size: 1.2em;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: #e0e0e0;
  }
`;

class Room extends Component {
  render() {
    return (
      <Container>
        <Link href={this.props.href}>
          {this.props.title}
        </Link>
      </Container>
    );
  }
};

export default Room;