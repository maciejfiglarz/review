
import { h, Fragment } from "preact";
import SubmitButton from "./submitButton";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "preact/hooks";
import { toast, ToastPosition } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
import useApi from "../../lib/components/useApi";

const SignupForm = (props: { onSubmitted, setCloseDisabled }) => {

    const defaultSelectValues = { industry: [], position: [], nationality: [], loaded: false };
    const { onSubmitted, setCloseDisabled } = props;
    const [selectValues, setSelectValues] = useState(defaultSelectValues);

    const defaultValues = {
        email: '',
        first_name: '',
        last_name: '',
        industry: '',
        position: '',
        company: '',
        nationality: '',
        agreement1: false,
        agreement2: false
    }

    const toastErrorOptions = {
        position: "top-center" as ToastPosition,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "all",
        defaultValues
    });
    const [isSending, setIsSending] = useState<boolean>(false);
    const [fetch] = useApi();

    useEffect(() => {
        fetch('select-values', {}, 'get').then(({ data }) => {
            const selectValues = defaultSelectValues;
            Object.keys(data).map(key => {
                selectValues[key] = Object.keys(data[key]).map(value => {
                    return { value, label: data[key][value] };
                })
            });
            selectValues.loaded = true;
            setSelectValues({ ...selectValues });
        }).catch(() => {
            toast.error((<><b>Error!</b> Data cannot be fetched.</>), toastErrorOptions);
        })
    }, []);

    Object.keys(errors).map(key => {
        const node = errors[key].ref;
        node.parentElement.classList.add('-error');
        node.addEventListener('blur', () => node.parentElement.classList.remove('-error'));
    });

    const onSubmit = data => {

        setIsSending(true);
        setCloseDisabled(true);
        fetch('register', data, 'post')
            .then(() => {
                onSubmitted(true);
            })
            .catch((error) => {
                const message = error.message || 'Please try again later.';
                toast.error((<>{message}</>), toastErrorOptions);
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
        <form class={`access--form  ${isSending ? `-sending` : ``}`} onSubmit={handleSubmit(onSubmit)}>
            <h5 class="title">Please Sign up</h5>
            <div class="field -mandatory">
                <input type="email" name="email" placeholder="e-mail"
                    // @ts-ignore
                       oninvalid={(e) => InvalidMsg(e)}
                       oninput={(e) => InvalidMsg(e)}
                       {...register("email", { required: true })} />
            </div>


            <div class="wrap">
                <div class="field">
                    <input type="text" placeholder="First name" {...register("first_name", { required: false })} />
                </div>
                <div class="field">
                    <input type="text" placeholder="Last name" {...register("last_name", { required: false })} />
                </div>
            </div>

            <div class="select--component field">
                <select name="frm_donator" class="form--control" disabled={!selectValues.loaded} {...register("industry", { required: false })}>
                    <option selected disabled class="disabled">Industry</option>
                    {selectValues.industry.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
                </select>
                <div class="arrow"><i class="icon-arrow-dropdown" /></div>
            </div>

            <div class="wrap">
                <div class="field">
                    <input type="text" name="company" placeholder="Company" {...register("company", { required: false })} />
                </div>
                <div class="select--component field">
                    <select name="frm_donator" class="form--control" disabled={!selectValues.loaded} {...register("position", { required: false })}>
                        <option selected disabled class="disabled">Position</option>
                        {selectValues.position.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
                    </select>
                    <div class="arrow"><i class="icon-arrow-dropdown" /></div>
                </div>

            </div>


            <div class="select--component field">
                <select name="frm_donator" class="form--control" disabled={!selectValues.loaded} {...register("nationality", { required: false })}>
                    <option selected disabled class="disabled">Country</option>
                    {selectValues.nationality.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
                </select>
                <div class="arrow"><i class="icon-arrow-dropdown" /></div>
            </div>


            <p class="info field">Providing your email is necessary for identification and security purposes. Providing other data is voluntary and doing so will allow us to create more adequate information tailored to your needs and supply you with selected benefits.</p>
            <p class="info field">By clicking the sign-up button below you consent for the processing of your dataspecified above by Ringier Axel Springer Polska sp. z o.o. for the purpose of accessing the Business Insider Global Trends Report and for the adjustment and personalization of its content. You may also grant consent for processing your data for additional purposes as provided below.</p>

            <div class="checkbox--component field">
                <input type="checkbox" class="input" id="agreement1" {...register("agreement1", { required: false })} />
                <label for="agreement1" class="label">

                    <span
                        class="text">I consent to receiving commercial information to the email provided in the form of the Business Insider Global Trends Report Newsletter including: future conferences, accompanying events, and promotions; from Ringier Axel SpringerPolska sp. z o.o. or on request of its partners. </span>
                </label>
            </div>

            <div class="checkbox--component field">
                <input type="checkbox" class="input" id="agreement2" {...register("agreement2", { required: false })} />
                <label for="agreement2" class="label">

                    <span
                        class="text">I consent to receiving commercial and marketing messages sent by RingierAxel Springer Polska sp.z o.o. to the email address provided above on their own behalf or on behalf of their business partners.</span>
                </label>
            </div>


            <div class="mandatory">* mandatory field</div>
            <SubmitButton isSending={isSending} label="sign up" />
            <p class="info field">Your personal data will be administered by Ringier Axel Springer Polska sp. z o.o.with its registered office in Warsaw (02-672), ul. Domaniewska 49 (the Con-troller). The data will be processed in order to provide you an access to BusinessInsider Global Trends Report and other purposes according to your consents. Your rights: Providing data is voluntary, and the person providing the data hasthe right to access data, the right to rectify data, the right to limit processing, the right to delete data, object to processing, and the right to submit a complaint to the supervisory body for the protection of personal data. To the extent that your consent is the basis for the processing of your personal data, you also have theright to data portability. The withdrawal of consent shall not affect the lawfulness of processing based on consent before its withdrawal.</p>
            <p class="info field">The legitimate interest of the Controller: The data provided in the registration form may be processed for marketing purposes of the Controller (including the necessary analytics and compilation into marketing profiles), to which you canobject. For more information please refer to the <a class="link" target="_blank" href="https://ocdn.eu/special/Trends/RASP%20Privacy%20Policy%20PP_ENG_20201105.pdf">Privacy Policy.</a></p>
        </form>
    );
}

export default SignupForm;