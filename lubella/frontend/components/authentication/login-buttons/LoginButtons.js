import { h, Fragment } from 'preact';
import GoogleButton from "./subcomponents/GoogleButton";
import FacebookButton from "./subcomponents/FacebookButton";

const LoginButtons = () => {

    return (
        <Fragment>

            <GoogleButton />
            <FacebookButton />
            

        </Fragment>
    );
};

export default LoginButtons;



