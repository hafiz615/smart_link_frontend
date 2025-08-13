import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3)
    .max(30)
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, underscores"
    )
    .required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(6)
    .matches(/^(?=.*[a-z])/, "Must contain lowercase")
    .matches(/^(?=.*[A-Z])/, "Must contain uppercase")
    .matches(/^(?=.*\d)/, "Must contain number")
    .required(),
  role: Yup.string().oneOf(["user", "admin"]).required(),
});
