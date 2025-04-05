import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axiosInstance from "../../lib/axios.instance";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const registerUser = async (values) => {
    try {
      const res = await axiosInstance.post("/user/register", values);
      toast.success(res?.data?.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 2,
      }}
    >
      <Toaster />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(to bottom, #2ecc71, #27ae60)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h4" fontWeight={700} mb={1}>
            Join Hamro Bike
          </Typography>
          <Typography>Start your biking adventure today</Typography>
        </Box>

        {/* Right Form Panel */}
        <Box
          sx={{
            flex: 1.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            backgroundColor: "#fff",
          }}
        >
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              address: "",
              password: "",
              gender: "",
              phoneNumber: "",
            }}
            validationSchema={yup.object({
              fullName: yup
                .string()
                .required("Full name is required.")
                .max(255),
              email: yup
                .string()
                .email("Must be a valid email.")
                .required("Email is required.")
                .max(100),
              address: yup.string().max(255),
              password: yup
                .string()
                .required("Password is required.")
                .min(8, "Min 8 characters")
                .max(30, "Max 30 characters"),
              gender: yup
                .string()
                .required("Gender is required.")
                .oneOf(["male", "female", "other", "preferNotToSay"]),
              phoneNumber: yup.string().min(10).max(20),
            })}
            onSubmit={registerUser}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                <Box sx={{ maxWidth: "500px", mx: "auto" }}>
                  <Typography variant="h5" fontWeight={600} mb={1}>
                    👥 Create Account
                  </Typography>
                  <Typography variant="body2" mb={3}>
                    Fill in your details below
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          label="Full Name"
                          required
                          {...formik.getFieldProps("fullName")}
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                          <FormHelperText error>
                            {formik.errors.fullName}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          label="Email Address"
                          required
                          {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <FormHelperText error>
                            {formik.errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          label="Phone Number"
                          {...formik.getFieldProps("phoneNumber")}
                        />
                        {formik.touched.phoneNumber &&
                          formik.errors.phoneNumber && (
                            <FormHelperText error>
                              {formik.errors.phoneNumber}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          type="password"
                          label="Password"
                          required
                          {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <FormHelperText error>
                            {formik.errors.password}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          label="Address"
                          {...formik.getFieldProps("address")}
                        />
                        {formik.touched.address && formik.errors.address && (
                          <FormHelperText error>
                            {formik.errors.address}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select {...formik.getFieldProps("gender")} required>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                          <MenuItem value="preferNotToSay">
                            Prefer Not To Say
                          </MenuItem>
                        </Select>
                        {formik.touched.gender && formik.errors.gender && (
                          <FormHelperText error>
                            {formik.errors.gender}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <Typography variant="body2">
                            I agree to the{" "}
                            <span style={{ color: "#00a676", fontWeight: 600 }}>
                              Terms
                            </span>{" "}
                            and{" "}
                            <span style={{ color: "#00a676", fontWeight: 600 }}>
                              Privacy Policy
                            </span>
                          </Typography>
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#00c853",
                          color: "#fff",
                          fontWeight: 600,
                          py: 1.5,
                          "&:hover": {
                            backgroundColor: "#00b342",
                          },
                        }}
                      >
                        Sign Up ➜
                      </Button>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 2, mb: 1 }}
                      >
                        Or sign up with
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 2,
                        }}
                      >
                        <Button variant="outlined" color="error">
                          G
                        </Button>
                        <Button variant="outlined" color="primary">
                          f
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="body2" align="center">
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#00a676" }}>
                          Log In
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
