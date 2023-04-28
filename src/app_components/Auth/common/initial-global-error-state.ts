import { AuthFlowErrorPayload } from "../components/AuthWrapper/interfaces";

const INITIAL_GLOBAL_ERROR_STATE: AuthFlowErrorPayload = {
    isError: false,
    title: '',
    message: '',
};

export default INITIAL_GLOBAL_ERROR_STATE;