// routes/kyc.controller.js
import express from "express";
import Yup from "yup";
import isUser from "../middleware/authentication.middleware.js";
import KYCTable from "../models/kyc.model.js";

const router = express.Router();

router.post(
  "/kyc/submit",
  isUser,
  async (req, res, next) => {
    const kycValidationSchema = Yup.object({
      fullName: Yup.string().required().max(100),
      dob: Yup.date().required(),
      address: Yup.string().required().max(300),
      citizenshipNumber: Yup.string().required().max(50),
      phone: Yup.string()
        .required()
        .matches(/^[0-9]{10}$/),
      gender: Yup.string().required().oneOf(["Male", "Female", "Other"]),
      email: Yup.string().required().email(),
      idImage: Yup.string().required().url(),
      selfieImage: Yup.string().required().url(),
    });

    try {
      req.body = await kycValidationSchema.validate(req.body);
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    const newKYC = req.body;

    await KYCTable.create(newKYC);

    return res.status(201).send({ message: "KYC submitted successfully." });
  }
);

export { router as kycController };
