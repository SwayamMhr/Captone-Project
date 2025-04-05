import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axiosInstance from "../../lib/axios.instance";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white", // Changed from "#f1f1f1" to "white"
      }}
    >
      <Box
        sx={{
          width: "800px",
          display: "flex",
          boxShadow: 3,
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "white",
        }}
      >
        {/* Left section */}
        <Box
          sx={{
            width: "40%",
            background: "linear-gradient(to bottom, #2ecc71, #27ae60)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography textAlign="center">
            Log in to access your account and manage your bike rentals.
          </Typography>
        </Box>

        {/* Right section */}
        <Box sx={{ width: "60%", padding: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            <Person sx={{ verticalAlign: "middle" }} /> Account Login
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Please enter your credentials to continue
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={yup.object({
              email: yup
                .string()
                .email("Invalid email")
                .required("Email is required"),
              password: yup.string().required("Password is required"),
            })}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                const res = await axiosInstance.post("/user/login", values);
                const accessToken = res.data?.accessToken;
                localStorage.setItem("accessToken", accessToken);
                toast.success("Logged in successfully.");
                navigate("/");
              } catch (err) {
                toast.error(err?.response?.data?.message || "Login failed");
              } finally {
                setLoading(false);
              }
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    {...formik.getFieldProps("email")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...formik.getFieldProps("password")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <FormHelperText error>
                      {formik.errors.password}
                    </FormHelperText>
                  )}
                </FormControl>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={1}
                >
                  <Box display="flex" alignItems="center">
                    <Checkbox size="small" />
                    <Typography variant="body2">Remember me</Typography>
                  </Box>
                  <Link to="/forgot-password" style={{ fontSize: 14 }}>
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2, py: 1, backgroundColor: "#00c853" }}
                >
                  Login
                </Button>

                <Typography
                  textAlign="center"
                  sx={{ mt: 3, color: "gray", position: "relative" }}
                >
                  <span>or login with:</span>
                </Typography>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={2}
                  gap={2}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#db4437" }}
                  >
                    Google
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#3b5998" }}
                  >
                    Facebook
                  </Button>
                </Box>

                <Typography mt={3} textAlign="center" fontSize={14}>
                  Don’t have an account?{" "}
                  <Link to="/register" style={{ color: "#00c853" }}>
                    Sign up now
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
