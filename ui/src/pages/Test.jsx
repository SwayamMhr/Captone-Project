import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Test = () => {
  let [count, setCount] = useState(1);

  const [count2, setCount2] = useState(100);

  //   ?useEffect
  //   ? handles side effect
  //    react component life cycle : mounting, updating, unmounting
  //   ? syntax
  //   useEffect(function)
  //   useEffect(function,[]) // dependency array
  //   useEffect(function,[a,b,c]) // dependency array with values

  useEffect(() => {
    console.log("here");
  }, [count2]);

  return (
    <Box>
      <Typography variant="h1">Count:{count}</Typography>

      <Button
        variant="contained"
        onClick={() => {
          let newCount = count + 1;

          setCount(newCount);
        }}
      >
        increase count
      </Button>
      <Typography variant="h1">Count2:{count2}</Typography>

      <Button
        variant="contained"
        onClick={() => {
          let newCount = count2 + 1;

          setCount2(newCount);
        }}
      >
        increase count2
      </Button>
    </Box>
  );
};

export default Test;
