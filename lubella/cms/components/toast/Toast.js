import { Fragment, h } from "preact";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'preact/hooks';
import 'react-toastify/dist/ReactToastify.min.css';
import "./toast.scss";

const Toast = () => (
    <Fragment>
        <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />
    </Fragment>
)

export default Toast;