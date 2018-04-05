import React from 'react';
import { Container } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import LoginForm from '../components/LoginForm';

@inject('authStore')
@observer
export default class Login extends React.Component {
  render() {
    const { authStore: { isAuthenticated } } = this.props;

    return isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <Container text>
        <LoginForm />
      </Container>
    );
  }
}
