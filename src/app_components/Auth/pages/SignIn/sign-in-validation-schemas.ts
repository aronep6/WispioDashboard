import * as Yup from "yup";

const _step_one_signInValidationSchema = Yup.object({
    signin_form_email: Yup.string().required("L'adresse email est requise pour pouvoir vous connecter")
            .email("L'adresse email doit être au format valide"),
});

const _step_two_signInValidationSchema = Yup.object({
    signin_form_email: Yup.string().required("L'adresse email est requise pour pouvoir vous connecter")
            .email("L'adresse email doit être au format valide"),
    signin_form_password: Yup.string().required("Le mot de passe est requis pour pouvoir vous connecter")
            .min(6, "Le mot de passe doit contenir au moins 6 caractères")
            .max(50, "Le mot de passe doit contenir au maximum 50 caractères"),
});

export { _step_one_signInValidationSchema, _step_two_signInValidationSchema };