// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import { Box, Button, CircularProgress, Pagination } from "@mui/material";
// import axiosInstance from "../../lib/axios.instance";
// // rafce => react arrow function component with export
// import { useNavigate } from "react-router";
// import Navbar from "../components/Navbar";
// const Home = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [totalPage, setTotalPage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   useEffect(() => {
//     const getProductList = async () => {
//       try {
//         setLoading(true);
//         const res = await axiosInstance.post("/product/list", {
//           page: currentPage,
//           limit: 6,
//         });
//         setLoading(false);
//         const productList = res?.data?.productList;
//         const numberOfPages = res?.data?.totalPage;

//         setProducts(productList);
//         setTotalPage(numberOfPages);
//       } catch (error) {
//         setLoading(false);
//         console.log("Product list api hit failed...");
//         console.log(error);
//       }
//     };

//     getProductList();
//   }, [currentPage]);

//   if (loading) {
//     return <CircularProgress />;
//   }
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "2rem",
//         margin: "3rem 0",
//       }}
//     >
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={() => {
//           navigate("/add-product");
//         }}
//       >
//         Add Product
//       </Button>

//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           alignItems: "center",
//           margin: "5rem",
//           gap: "3rem",
//         }}
//       >
//         {products.map((item) => {
//           console.log(item);
//           return (
//             <ProductCard
//               key={item._id}
//               _id={item._id}
//               name={item.name}
//               brand={item.brand}
//               category={item.category}
//               price={item.price}
//               quantity={item.quantity}
//               description={item.description}
//               image={item.image}
//             />
//           );
//         })}
//       </Box>

//       <Pagination
//         count={totalPage}
//         page={currentPage}
//         color="secondary"
//         onChange={(event, value) => {
//           setCurrentPage(value);
//         }}
//       />
//     </Box>
//   );
// };

// export default Home;

import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [bikeType, setBikeType] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const locations = [
    "Kathmandu",
    "Pokhara",
    "Chitwan",
    "Mustang",
    "Namche",
    "Mugu",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ffffff, #e6f7ff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mt={4}
        color="black"
      >
        Looking to Save More on Your Rental Two-Wheeler?
      </Typography>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search the cheapest..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "5px 0 0 5px",
          }}
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: "0 5px 5px 0",
            padding: "1rem",
            backgroundColor: "#facc15",
            color: "#000",
            "&:hover": { backgroundColor: "#fbbf24" },
          }}
        >
          <SearchIcon />
        </Button>
      </Box>

      <Typography variant="h5" mt={6} fontWeight="bold" color="black">
        Book a Vehicle Today
      </Typography>

      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: "16px",
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "#f8f8f8",
        }}
      >
        <Select
          fullWidth
          displayEmpty
          value={bikeType}
          onChange={(e) => setBikeType(e.target.value)}
        >
          <MenuItem value="" disabled>
            Choose Bike Type
          </MenuItem>
          <MenuItem value="scooter">Scooter</MenuItem>
          <MenuItem value="motorbike">Motorbike</MenuItem>
          <MenuItem value="cruiser">Cruiser</MenuItem>
        </Select>

        <Select
          fullWidth
          displayEmpty
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        >
          <MenuItem value="" disabled>
            Pick-up Location
          </MenuItem>
          {locations.map((location) => (
            <MenuItem key={location} value={location.toLowerCase()}>
              {location}
            </MenuItem>
          ))}
        </Select>

        <Select
          fullWidth
          displayEmpty
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
        >
          <MenuItem value="" disabled>
            Drop-off Location
          </MenuItem>
          {locations.map((location) => (
            <MenuItem key={location} value={location.toLowerCase()}>
              {location}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => navigate("/booking")}
          sx={{ mt: 2 }}
        >
          Continue
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
