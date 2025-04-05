import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const KYCForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      dob: "",
      address: "",
      citizenshipNumber: "",
      phone: "",
      gender: "",
      email: "",
      idImage: "",
      selfieImage: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      dob: Yup.date().required("Required"),
      address: Yup.string().required("Required"),
      citizenshipNumber: Yup.string().required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(/^[0-9]{10,15}$/, "Invalid phone number"),
      gender: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      idImage: Yup.string().required("ID image is required"),
      selfieImage: Yup.string().required("Selfie image is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/kyc/submit", values); // adjust if your route is different
        setSubmissionStatus("KYC submitted successfully!");
        console.log("KYC Response:", response.data);
        formik.resetForm();
      } catch (error) {
        console.error("KYC submission error:", error);
        setSubmissionStatus("Failed to submit KYC.");
      }
    },
  });

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Dummy image upload (replace with Cloudinary or similar)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // if using Cloudinary

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        formData
      );
      formik.setFieldValue(fieldName, res.data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>KYC Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div style={{ color: "red" }}>{formik.errors.fullName}</div>
          )}
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={formik.handleChange}
            value={formik.values.dob}
          />
          {formik.touched.dob && formik.errors.dob && (
            <div style={{ color: "red" }}>{formik.errors.dob}</div>
          )}
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address && (
            <div style={{ color: "red" }}>{formik.errors.address}</div>
          )}
        </div>

        <div>
          <label>Citizenship Number</label>
          <input
            type="text"
            name="citizenshipNumber"
            onChange={formik.handleChange}
            value={formik.values.citizenshipNumber}
          />
          {formik.touched.citizenshipNumber &&
            formik.errors.citizenshipNumber && (
              <div style={{ color: "red" }}>
                {formik.errors.citizenshipNumber}
              </div>
            )}
        </div>

        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div style={{ color: "red" }}>{formik.errors.phone}</div>
          )}
        </div>

        <div>
          <label>Gender</label>
          <select
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <div style={{ color: "red" }}>{formik.errors.gender}</div>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label>ID Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "idImage")}
          />
          {formik.errors.idImage && (
            <div style={{ color: "red" }}>{formik.errors.idImage}</div>
          )}
        </div>

        <div>
          <label>Selfie Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "selfieImage")}
          />
          {formik.errors.selfieImage && (
            <div style={{ color: "red" }}>{formik.errors.selfieImage}</div>
          )}
        </div>

        <button type="submit">Submit KYC</button>
      </form>

      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default KYCForm;
