import React from 'react';
import { Button } from '@material-ui/core';
import { ENV } from '../../environment.js';

const REGISTER_URL = `http://ec2-3-20-99-103.us-east-2.compute.amazonaws.com:8080/auth/realms/qa-platform-realm/protocol/openid-connect/registrations?client_id=qa-platform&response_type=code&scope=openid%20email&redirect_uri=${ENV.base_url}/company-info/&kc_locale=en`;
const LOGIN_URL = `http://ec2-3-20-99-103.us-east-2.compute.amazonaws.com:8080/auth/realms/qa-platform-realm/protocol/openid-connect/auth?response_type=code&client_id=qa-platform&redirect_uri=${ENV.base_url}&login=true&scope=openid`;

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h2>
        QA Platform
      </h2>
      <div>
        <Button href={REGISTER_URL} className="p-1">Register</Button>
        <Button href={LOGIN_URL} className="p-1">Login</Button>
      </div>
    </div>
  );
};

export default LandingPage;
