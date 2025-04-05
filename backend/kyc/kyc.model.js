// models/kyc.model.js
import mongoose from "mongoose";

// define schema
const kycSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 155,
    },
    dob: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    citizenshipNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 15,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    idImage: {
      type: String,
      required: true,
      trim: true,
    },
    selfieImage: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const KYCTable = mongoose.model("KYC", kycSchema);
export default KYCTable;
