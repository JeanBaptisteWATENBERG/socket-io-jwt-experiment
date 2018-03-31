import React, { Component } from 'react';
import { Form, Row, Col, Button, message } from 'antd';
import io from 'socket.io-client';

import LoginForm from './LoginForm';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      logged: false,
      connected: false,
      profile: null
    }
  }

  onLogged(profile) {
    this.setState({logged: true, profile});
    const socket = io('http://127.0.0.1:3000', {
      //path: '/data',
      query: 'token=' + profile.token
    });

    socket.on('connect', () => {
      this.setState({connected: true});
      message.success('You\'re successfully connected !');
    }).on('disconnect', () => {
      this.setState({connected: false});
      message.error('You\'re disconnected !');
    });
  }

  render() {
    const {loggining,logged} = this.state;

    const WrappedLoginForm = Form.create()(LoginForm);
    return (
      <Row>
        <Col span={12} offset={6}>
          {!logged && <WrappedLoginForm onLogged={(profile) => this.onLogged(profile)}/>}
        </Col>
      </Row>
    );
  }
}

export default App;
