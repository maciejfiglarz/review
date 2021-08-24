import { h, Fragment } from 'preact';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import useApi from '../../../../lib/api/useApi';
import facebookIcon from "../../../../images/icons/auth-facebook.svg";

const FacebookButton = () => {


    const responseFacebook = (profileObj) => {
        console.log('profile',profileObj);

        const { id: facebookId, name, email } = profileObj;
        const data = {facebookId, name, email};
        const [fetch] = useApi();
        if(facebookId && email){
            fetch('/login-facebook', data, 'post')
            .then((response) => {
                if (response.url) {
                    location.href = response.url;
                }
            })
            .catch((error) => {

                console.log('facebookError',error);
            });
        } else {
            alert('Coś poszło nie tak lub Twoje konto nie posiada adresu e-mail. Spróbuj ponownie lub skorzystaj z tradycyjnej rejestracji.')
        }
   
    };

    return (
        <Fragment>
            <FacebookLogin
                appId="349019853622801"
                autoLoad={false}
                fields="name,email,picture"
                // onClick={componentClicked}
                callback={responseFacebook}
                render={renderProps => (
                    <button class="btn--facebook" onClick={renderProps.onClick}><img class="icon" src={facebookIcon} /><span class="text">Użyj konta Facebook</span></button>
                )}
            />
        </Fragment>
    )

}

export default FacebookButton;
