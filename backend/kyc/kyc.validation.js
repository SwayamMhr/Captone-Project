// validations/kyc.validation.js
import * as Yup from "yup";

const kycValidationSchema = Yup.object({
  fullName: Yup.string().required.max(155).trim(),
  dob: Yup.date().required,
  address: Yup.string().required.max(300).trim(),
  citizenshipNumber: Yup.string()
    .required
    .max(50)
    .trim(),
  phone: Yup.string()
    .required
    .matches(/^[0-9]{10,15}$/),
  gender: Yup.string()
    .required
    .oneOf(["Male", "Female", "Other"]),
  email: Yup.string().required.email(),
  // idImage: Yup.string().required.url(),
  // selfieImage: Yup.string().required.url(),
    idImage: Yup.string().required.trim(),
  selfieImage: Yup.string().required.trim(),
});

export default kycValidationSchema;
