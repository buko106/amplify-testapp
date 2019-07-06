import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsconfig);

interface Props {
}

interface State {
  username?: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentWillMount(): void {
    Auth.currentAuthenticatedUser().then((user: CognitoUser) => {
      this.setState({
        username: user.getUsername(),
      });
    })
  }

  render() {
    const {username} = this.state;
    return (
      <div>
        Hello {username}.
      </div>
    )
  }
}

const usernameAttributes = 'User ID';

const signUpConfig = {
  hideAllDefaults: true,
  defaultCountryCode: '1',
  signUpFields: [
    {
      label: usernameAttributes,
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    },
  ]
};

export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes
});

