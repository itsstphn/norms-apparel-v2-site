import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

const NavbarCartList = ({ cartItems, handleCartClose }) => {
  const { user } = useAuthContext();

  const handleDeleteCartItem = async (item) => {
    const docRef = doc(db, "users", user.uid);

    try {
      await updateDoc(docRef, {
        cart: arrayRemove(item),
      });
    } catch (error) {
      console.log(error.message);
    }

    console.log(item);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        padding: ".5rem",
        paddingBottom: 0,
        maxHeight: "500px",
      }}
    >
      {cartItems.length !== 0 ? (
        cartItems.map((item) => (
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
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
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr",
                width: "100%",
                gap: "1rem",
                alignItems: "center",
              }}
              alignItems="center"
            >
              <ListItemAvatar width="50px" display="grid">
                <img
                  width="100%"
                  src={item.productImgURL}
                  alt={item.productName}
                />
              </ListItemAvatar>
              <ListItemText>
                <Typography>{item.productName}</Typography>
              </ListItemText>
              <ListItemText sx={{ background: "transparent" }}>
                Php{item.productPrice}
              </ListItemText>
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
