import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastConfig = () => (
	<ToastContainer
		position="bottom-right"
		autoClose={3000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
		theme="dark"
		transition={Bounce}
	/>
);

const showToast = (message, type = "default") => {
    toast(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: type,
		theme: "dark",
		transition: Bounce,
	});
};

export { ToastConfig, showToast };