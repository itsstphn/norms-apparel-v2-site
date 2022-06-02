import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Snackbar,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../store/cartSlice";
import Notifier from "./Notifier";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthContext } from "./../hooks/useAuthContext";
import { useAddCart } from "../hooks/useAddCart";

const ProductItem = ({ product }) => {
  console.log(product.id);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.items);

  const { addCart, error, isPending } = useAddCart();

  // for notifier message snackbar component
  const [openNotifierMessage, setOpenNotifierMessage] = useState(false);
  const handleClose = () => {
    setOpenNotifierMessage(false);
  };

  const handleAddCart = (item) => {
    addCart(item);
    // const docRef = doc(db, "users", user.uid);
    // const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    // if (!existingItem) {
    //   await setDoc(
    //     docRef,
    //     {
    //       cart: arrayUnion({
    //         id: item.id,
    //         productName: item.productName,
    //         productPrice: +item.productPrice,
    //         quantity: 1,
    //         totalPrice: +item.productPrice,
    //         productImgURL: item.productImgURL,
    //       }),
    //     },
    //     { merge: true }
    //   );
    // } else {
    //   await updateDoc(docRef, {
    //     quantity: existingItem.quantity + 1,
    //     totalPrice: existingItem.totalPrice + existingItem.productPrice,
    //   });
    // }
    setOpenNotifierMessage(true);
  };

  // for success message

  return (
    <Grid item xxs={12} xs={6} sm={4} md={2.4}>
      <Card>
        <Link to={`/product/${product.id}`}>
          <CardMedia
            component="img"
            height="200px"
            image={product.productImgURL}
          ></CardMedia>
        </Link>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 0,
          }}
        >
          <Link to={`/product/${product.id}`}>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "primary.dark",
              }}
              gutterBottom
              component="h3"
            >
              {product.productName}
            </Typography>
          </Link>

          <Typography sx={{ fontSize: ".8rem" }}>
            Php {product.productPrice}
          </Typography>
          {product.productRating ? (
            <Box display="flex">
              <Rating value={product.productRating} precision={0.1}></Rating>
              <Typography>({product.productRating})</Typography>
            </Box>
          ) : (
            <Typography sx={{ fontSize: ".9em" }} variant="body1" component="p">
              No rating yet
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button onClick={() => handleAddCart(product)}>Add to Cart</Button>

          <Notifier
            openMessage={openNotifierMessage}
            handleClose={handleClose}
            message="Item added to cart"
            alertType="success"
          ></Notifier>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
