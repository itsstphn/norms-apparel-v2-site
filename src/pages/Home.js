import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";
import { useAuthContext } from "../hooks/useAuthContext";
import Notifier from "./../components/Notifier";

const Home = () => {
  const { isAdmin } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = useSelector((state) => state.products.products);

  const cartItems = useSelector((state) => state.cartItems.items);

  const [categories, setCategories] = useState([
    "all",
    "tshirts",
    "shorts",
    "dress",
    "shoes",
    "slippers",
    "men",
    "women",
    "kids",
  ]);

  console.log(selectedCategory);

  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Box height="100%" padding="1rem 2rem">
      <Container disableGutters={true}>
        {isAdmin ? (
          <Typography marginY="1rem" variant="h6" component="h1">
            Welcome Admin!
          </Typography>
        ) : (
          <Typography marginY="1rem" variant="h4" component="h1">
            Find Your Style
          </Typography>
        )}

        {/* From md to lg screens */}
        <ToggleButtonGroup
          sx={{ display: { xxs: "none", md: "block" }, marginBottom: "2rem" }}
          value={selectedCategory}
          onChange={handleSelectedCategory}
          exclusive
          size="small"
          color="primary"
        >
          {categories.map((cat) => (
            <ToggleButton key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* for small screens */}
        <Box
          sx={{ display: { xxs: "block", md: "none" } }}
          width="120px"
          marginY="2rem"
        >
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={handleSelectedCategory}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={1}>
          {products ? (
            products.map((product) => (
              <ProductItem key={product.id} product={product}></ProductItem>
            ))
          ) : (
            <Typography variant="h1" color="initial">
              No Products to Show
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
