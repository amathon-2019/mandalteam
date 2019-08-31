import React, { Component } from 'react';
import App from '../components/App.js';

const Room = ({match}) => {
  return (
    <div><App roomId={match.params.id} /></div>
  );
};

export default Room;