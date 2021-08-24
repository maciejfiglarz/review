
import { h, Fragment } from "preact";
import SubmitButton from "./submitButton";
import LinkButton from "./linkButton";
import { useForm } from 'react-hook-form';
import { useState } from "preact/hooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import useApi from "../../lib/components/useApi";

const LoginForm = (props: { onSubmitted, setCloseDisabled }) => {
    const [isResendLink, setIsResendLink] = useState(false);
    const [isSendingLink, setIsSendingLink] = useState(false);
    const [formData, setFormData] = useState({});
    const { setCloseDisabled, onSubmitted } = props;

    // const defaultValues = {
    //     email: 'test@example.com',
    // }
    //
    const defaultValues = {
        email: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "all",
        defaultValues
    });
    const [isSending, setIsSending] = useState<boolean>(false);
    const [fetch] = useApi();

    Object.keys(errors).map(key => {
        const node = errors[key].ref;
        node.parentElement.classList.add('-error');
        node.addEventListener('blur', () => node.parentElement.classList.remove('-error'));
    });

    const onClickReSend = () => {
        setIsSendingLink(true);
        fetch('resend', formData, 'post')
            .then(() => {
                onSubmitted(true);
            })
            .catch((error) => {
                const message = error.message || 'Please try again later.';
                toast.error((<>{message}</>), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }).finally(() => {
                setIsSendingLink(false);
            });
    }

    const onSubmit = data => {

        //Tymczasowo
        // document.cookie = 'user_logged_globaltrendsreport=true';
        // setTimeout(() => window.location.reload(), 2000);

        setIsSending(true);
        setCloseDisabled(true);
        fetch('login', data, 'post')
            .then((response: any) => {
                console.log('responseSubmit', response);
                if (response.status) {
                    const url = window.location.href + 'trends.html';
                    window.location.href = url;
                }
                // onSubmitted(true);
            })
            .catch((error) => {
                const message = error.message
                if (message == 1001) {
                    setIsResendLink(true);
                    setFormData(data);
                    const message = 'Account not activated. Please activate your account by clicking confirmation link in received email.';
                    toast.error((<>{message}</>), {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error((<>{message || 'Please try again later.'}</>), {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })

            .finally(() => {
                setIsSending(false);
                setCloseDisabled(false);
            });
    };

    const InvalidMsg = (e) => {
        let el = e.currentTarget as HTMLInputElement;
        if(el.validity.typeMismatch){
            el.setCustomValidity('Please type correct email address');
        }
        else {
            el.setCustomValidity('');
        }
        return true;
    }

    return (
        <form class={`access--form -email ${isSending ? `-sending` : ``}`} onSubmit={handleSubmit(onSubmit)}>
            {!isResendLink
                ?
                <Fragment>
                    <h5 class="title">Please enter your email address:</h5>
                    <div class="field">
                        <input type="email" name="email" placeholder="e-mail"
                            // @ts-ignore
                               oninvalid={(e) => InvalidMsg(e)}
                               oninput={(e) => InvalidMsg(e)}
                               {...register("email", { required: true })} />
                    </div>
                    <SubmitButton isSending={isSending} label="Log in" />
                </Fragment>
                : <LinkButton onClickReSend={onClickReSend} isSending={isSendingLink} label="Re-send activation link" />
            }

        </form>
    );
}

export default LoginForm;