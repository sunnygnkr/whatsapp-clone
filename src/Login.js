import React from 'react';
import './Login.css';
import { Button } from "@material-ui/core";
import { auth, provider} from './Firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

const Login = () => {

// So here the first part is the state and we set user there but we are not using anything hence an empty object is passed.
// Dispatch is like a gun basically we can put any required payload there then shoot it.
   const [{}, dispatch] = useStateValue();

    const signIn = () => {
    auth.signInWithPopup(provider).
    then((result) => {
        dispatch ({
            type: actionTypes.SET_USER,
            user: result.user
        })
    }).
    catch((error) => alert(error.message))
    }

    return (
        <div className="Login">
          <div className="login_container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png" />
          <div className="login_text">
            <h1>Sign in to whatsApp..</h1>
          </div>

        <Button type="sumit" onClick={signIn}>
            Sign in with your Google login
        </Button>
          </div>
        </div>
    );
};

export default Login;
