import React from 'react';
import Amplify, {Auth} from "aws-amplify";
import { AmplifyAuthenticator, withAuthenticator, AmplifySignOut  } from "@aws-amplify/ui-react";
import amplifyConfig from '../assets/js/amplifyConfig';

Amplify.configure(amplifyConfig);
const currentConfig = Auth.configure();

function SignUp() {
    Auth.currentSession().then(session => {
        console.log('session : '+JSON.stringify(session));
    }).catch(e => {
        console.log(e);
    });

  return (<>
    <AmplifyAuthenticator>
      <div>
        ONLY LOGGED IN USERS CAN SEE THIS
      </div>
    </AmplifyAuthenticator>
    <AmplifySignOut/>
  </>);
}
  
export default SignUp;