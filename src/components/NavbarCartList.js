import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDeleteCart } from "./../hooks/useDeleteCart";

const NavbarCartList = ({ cartItems, handleCartClose }) => {
  const { deleteCart } = useDeleteCart();

  const handleDeleteCartItem = (item) => {
    deleteCart(item);
    console.log("item to delete: ", item);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 380,
        bgcolor: "background.paper",
        // padding: ".5rem",
        paddingBottom: 0,
        maxHeight: "500px",
      }}
    >
      {cartItems.length !== 0 ? (
        cartItems.map((item) => (
          <ListItem
            secondaryAction={
              <IconButton
                // edge="end"
                onClick={() => handleDeleteCartItem(item)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            }
            key={item.id}
          >
            <ListItemButton
              component={Link}
              to={`/product/${item.id}`}
              onClick={handleCartClose}
              sx={{
                display: "flex",

                // width: "100%",
                gap: "1rem",
                // alignItems: "center",
                paddingRight: 0,
              }}
            >
              <ListItemAvatar width="50px" height="50px" display="grid">
                <Avatar
                  flex="2"
                  variant="square"
                  src={item.productImgURL}
                  alt={item.productName}
                />
              </ListItemAvatar>
              <ListItemText flex="3">
                <Typography>{item.productName}</Typography>
              </ListItemText>
              <ListItemText flex="3" sx={{ background: "transparent" }}>
                Php{item.productPrice}
              </ListItemText>
              <ListItemText flex="1">x{item.quantity}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <Typography sx={{ color: "#777", padding: ".5rem .5rem 0" }}>
          Cart is empty
        </Typography>
      )}
    </List>
  );
};

export default NavbarCartList;
