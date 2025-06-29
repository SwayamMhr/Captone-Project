// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import { Box, Button, CircularProgress, Pagination } from "@mui/material";
// import axiosInstance from "../../lib/axios.instance";
// import { useNavigate } from "react-router";
// import Navbar from "../components/Navbar";

// const List = () => {
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
//         setProducts(res?.data?.productList);
//         setTotalPage(res?.data?.totalPage);
//       } catch (error) {
//         setLoading(false);
//         console.log("Product list API call failed...", error);
//       }
//     };

//     getProductList();
//   }, [currentPage]);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <>
//       <Navbar />
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "1rem",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "2rem",
//           margin: "3rem 0",
//         }}
//       >
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => navigate("/add-product")}
//         >
//           Add Product
//         </Button>

//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             alignItems: "center",
//             margin: "5rem",
//             gap: "3rem",
//           }}
//         >
//           {products.map((item) => (
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
//           ))}
//         </Box>

//         <Pagination
//           count={totalPage}
//           page={currentPage}
//           color="secondary"
//           onChange={(event, value) => setCurrentPage(value)}
//         />
//       </Box>
//     </>
//   );
// };

// export default List;

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Box, Button, CircularProgress, Pagination } from "@mui/material";
import axiosInstance from "../../lib/axios.instance";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

const List = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getProductList = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.post("/product/list", {
          page: currentPage,
          limit: 6,
        });
        setLoading(false);
        setProducts(res?.data?.productList);
        setTotalPage(res?.data?.totalPage);
      } catch (error) {
        setLoading(false);
        console.log("Product list API call failed...", error);
      }
    };

    getProductList();
  }, [currentPage]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#2e7d32" }} />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          margin: "3rem 0",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/add-product")}
          sx={{
            backgroundColor: "#2e7d32",
            "&:hover": {
              backgroundColor: "#27642a",
            },
          }}
        >
          Add Product
        </Button>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            margin: "5rem",
            gap: "3rem",
          }}
        >
          {products.map((item) => (
            <ProductCard
              key={item._id}
              _id={item._id}
              name={item.name}
              brand={item.brand}
              category={item.category}
              price={item.price}
              quantity={item.quantity}
              description={item.description}
              image={item.image}
            />
          ))}
        </Box>

        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#2e7d32",
            },
            "& .Mui-selected": {
              backgroundColor: "#2e7d32 !important",
              color: "#fff",
            },
          }}
        />
      </Box>
    </>
  );
};

export default List;
