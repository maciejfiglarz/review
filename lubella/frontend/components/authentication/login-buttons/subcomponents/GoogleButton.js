import { h, Fragment } from 'preact';
import { GoogleLogin } from 'react-google-login';
import useApi from '../../../../lib/api/useApi';
import googleIcon from "../../../../images/icons/auth-google.svg";

const GoogleButton = () => {

    const clientId =
        '320610643608-kb13ocfn071vn8g0te3dphrbqnjao9fb.apps.googleusercontent.com';

    const onSuccess = ({ profileObj }) => {
        console.log('profile',profileObj);
        const { googleId , givenName:firstName, familyName:secondName, email } = profileObj;
        const data = { email, firstName, secondName, googleId };
        const [fetch] = useApi();

        fetch('/login-google', data, 'post')
            .then((response) => {
                if (response.url) {
                    location.href = response.url;
                }
            })
            .catch((error) => {

                // console.log(error);
            });

    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={false}
            render={renderProps => (
                <button class="btn--google" onClick={renderProps.onClick} disabled={renderProps.disabled}><img class="icon" src={googleIcon} /><span class="text">Użyj konta Google</span></button>
            )}
        />
    )

}

export default GoogleButton;
