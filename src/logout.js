import React from 'react';
import { GoogleLogin } from 'react-google-login';

// hide this in .env eventually
const REACT_APP_GOOGLE_CLIENT_ID = "845379710734-vv3tm1qqp004uv7kb6f75l7rcrkb3ese.apps.googleusercontent.com";

// keep this thought
const clientId = REACT_APP_GOOGLE_CLIENT_ID;

export function Logout() {

    // hide this in .env eventually
    const REACT_APP_GOOGLE_CLIENT_ID = "845379710734-vv3tm1qqp004uv7kb6f75l7rcrkb3ese.apps.googleusercontent.com";

    const onSuccess = (res) => {
      console.log('Logout Successful:');
    };
  
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onSuccess}
        />
      </div>
    );
  }
  


export default Logout;