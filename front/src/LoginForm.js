import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggining: false,
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loggining: true });

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.doLogin(values);
      }
    });
  }

  async doLogin(loginObject) {
    const res = await fetch('http://127.0.0.1:3000/login', { 
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginObject) 
    });
    const jsonResponse = await res.json();
    localStorage.token = jsonResponse.token;
    this.setState({ loggining: false });
    this.props.onLogged(jsonResponse);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loggining } = this.state;
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className='login-form'>
        <FormItem>
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Please input your first name!' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Type your first name here...' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('lastName', {
            rules: [{ required: true, message: 'Please input your last name!' }],
          })(
            <Input
              prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Type your last name here...' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email', message: 'The input is not valid E-mail!',
              },
              { required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Type your email here...' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' loading={loggining} htmlType='submit' className='login-form-button'>
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default LoginForm;