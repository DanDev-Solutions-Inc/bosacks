import * as Yup from "yup";

export const SubscribeFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});
