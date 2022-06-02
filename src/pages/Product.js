import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../store/cartSlice";
import Notifier from "./../components/Notifier";
import { useAddCart } from "../hooks/useAddCart";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useDeleteCart } from "../hooks/useDeleteCart";

const Product = () => {
  const products = useSelector((state) => state.products.products);
  console.log(products);

  const { addCart, isPending, error } = useAddCart();

  const [openNotifierMessage, setOpenNotifierMessage] = useState(false);
  const handleClose = () => {
    setOpenNotifierMessage(false);
  };

  // const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedProduct = products.find((product) => product.id === id);

  const { user, isAdmin } = useAuthContext();

  const {
    deleteProduct,
    error: deleteError,
    isPending: deleteIsPending,
  } = useDeleteProduct();

  const { deleteCart } = useDeleteCart();

  // console.log(selectedProduct);

  const handleAddCart = () => {
    // dispatch(addCart(selectedProduct));
    addCart(selectedProduct);
    setOpenNotifierMessage(true);
  };

  const handleDeleteListing = () => {
    deleteProduct(id);
    deleteCart(selectedProduct);
    navigate("/");
  };

  return (
    <Box padding="2rem">
      {selectedProduct ? (
        <Grid spacing={2} container>
          <Grid item xxs={12} md={5}>
            <Box
              sx={{
                width: "100%",
                maxHeight: "450px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                width="400px"
                src={selectedProduct.productImgURL}
                alt={selectedProduct.productName}
              />
            </Box>
          </Grid>
          <Grid item sm={12} md={7}>
            <Box
              display="flex"
              padding="2rem"
              height="100%"
              flexDirection="column"
            >
              <Typography gutterBottom variant="h4" component="h1">
                {selectedProduct.productName}
              </Typography>
              <Box display="flex">
                <Rating
                  value={selectedProduct.productRating}
                  // precision={0.1}
                ></Rating>
                <Typography sx={{ marginLeft: 1 }}>
                  (
                  {selectedProduct.productRating
                    ? selectedProduct.productRating
                    : "No ratings yet"}
                  )
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "normal",
                  color: "#3b3b3b",
                }}
                marginTop="2rem"
                component="h3"
              >
                {selectedProduct.productDetails}
              </Typography>
              <Box sx={{ marginTop: "auto" }}>
                <Button onClick={handleAddCart} variant="outlined">
                  Add To Cart
                </Button>
                <Notifier
                  openMessage={openNotifierMessage}
                  handleClose={handleClose}
                  message="Item added to cart"
                  alertType="success"
                ></Notifier>
                {user && isAdmin ? (
                  <Button
                    onClick={handleDeleteListing}
                    sx={{ marginLeft: "1rem" }}
                    variant="contained"
                  >
                    Delete Listing
                  </Button>
                ) : (
                  <Button sx={{ marginLeft: "1rem" }} variant="contained">
                    Buy Now
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography> No product</Typography>
      )}
    </Box>
  );
};

export default Product;
