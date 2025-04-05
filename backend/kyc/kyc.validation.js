// validations/kyc.validation.js
import * as Yup from "yup";

const kycValidationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required").max(155).trim(),
  dob: Yup.date().required("Date of birth is required"),
  address: Yup.string().required("Address is required").max(300).trim(),
  citizenshipNumber: Yup.string()
    .required("Citizenship number is required")
    .max(50)
    .trim(),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,15}$/, "Phone number must be valid"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female", "Other"]),
  email: Yup.string().required("Email is required").email(),
  idImage: Yup.string().required("ID image is required").url(),
  selfieImage: Yup.string().required("Selfie image is required").url(),
});

export default kycValidationSchema;
