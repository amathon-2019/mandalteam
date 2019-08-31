import React, { Component } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { Mutation } from "react-apollo";

import Room from '../components/List/Room';
import { MakeMutation } from '../graphql/mutations';

const cookies = new Cookies();

const Header = styled.header`
  position: relative;
  margin-bottom: 25px;
	padding: 150px 0px;

	background-color: #ffaa00;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23ffb100' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23ffb800' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23ffbf00' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23ffc500' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%23ffcc00' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%23ffd624' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23ffe038' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23ffeb49' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%23fff558' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%23ffff66' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
	/* background by SVGBackgrounds.com */
	background-attachment: fixed;
  background-size: cover;

	font-size: 1.5em;
	text-align: center;

  h1 {
    margin: 0;
    font-weight: lighter;
  }

  h5 {
    margin: 0;
    font-weight: normal;
  }

  nav {
    position: absolute;
    bottom: 20px;

    width: 100%;
    font-size: 0.8em;
    text-align: center;

    a {
      margin-right: 20px;
      color: black;
      text-decoration: none;

      &:last-chlid {
        margin-right: 0;
      }
    }
  }
`;

const CreateRoom = styled.section`
  max-width: 500px;
  margin: 0 auto 15px;
  padding: 30px 20px;
  border-radius: 8px;
  text-align: center;
  i {
    margin-left: 20px;
    font-size: 1.6em;
    cursor: pointer;
  }
`;

const Title = styled.input`
  width: calc(100% - 50px);
  border: 0;
  border-bottom: 3px solid #666;
  background: none;
  font-size: 1.4rem;
  transition: border 0.5s;
  &:focus {
    border-bottom: 3px solid #2e92d8;
    outline: 0;
  }
`;

class TitleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  handleField(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    return (
      <div>
        <Title value={this.state.title} placeholder="무엇에 대한 만다라트 차트인가요?" onChange={this.handleField('title')}></Title>
        <i class='icon ion-md-create' onClick={(() => {
          this.props.MakeMutation({ variables: this.state });
        }).bind(this)}></i>
      </div>
    );
  }
};

class Home extends Component {
  render() {
    return (
      <div>
        <Header>
          <h1>Mandal-Art</h1>
          <h5>실시간 동기화되는 만다라트 차트를 통해 협업해보세요!</h5>
          {cookies.get('token') ? <nav>
            <a href="#" onClick={() => {cookies.set('token', '')}}>로그아웃</a>
          </nav> : <nav>
            <a href="/login">로그인</a>
            <a href="/register">회원가입</a>
          </nav>}
        </Header>
        <CreateRoom>
          <Mutation
            mutation={MakeMutation}
            onCompleted={async (data) => {
              document.location.href = '/room/' + data.makeChart.chart.id;
            }}
						onError={e => {
							alert(e);
						}}>
            {(MakeMutation) => <TitleBox MakeMutation={MakeMutation}></TitleBox>}
          </Mutation>
        </CreateRoom>
        <Room href="/room/1111" title="방1"></Room>
        <Room href="/room/2222" title="방2"></Room>
        <Room href="/room/3333" title="방3"></Room>
      </div>
    );
  }
};

export default Home;