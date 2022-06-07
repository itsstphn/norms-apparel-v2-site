import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import BrandLogo from "../assets/img/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Badge,
  styled,
  Container,
  List,
  ListItem,
  Popover,
  Typography,
  Drawer,
  ListItemText,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NavbarCartList from "./NavbarCartList";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "../hooks/useAuthContext";

import { useLogout } from "../hooks/useLogout";
import { emptyCart, fetchCart } from "../store/cartSlice";

const StyledBox = styled(Box)({
  display: "flex",
  // width: "fit-content",
  // justifyContent: "center",
});

const NavButton = styled(Button)({
  color: "#fff",
});

const DrawerButton = styled(Button)({
  // width: "100%",
  "&:hover": {
    background: "transparent",
  },
  "&:active": {
    backgroundColor: "transparent",
  },
});

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const cart = useSelector((state) => state.cartItems);
  console.log("cart: ", cart);
  const cartItems = cart.items;
  cartItems.length !== 0 && console.log("cartItems: ", cartItems);

  // CartPopover
  const [anchorElCart, setAnchorElCart] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const handleCartClick = (e) => {
    setAnchorElCart(e.currentTarget);
    setOpenCart(true);
  };
  const handleCartClose = () => {
    setAnchorElCart(null);
    setOpenCart(false);
  };

  // UserPopover
  const { user, isAdmin } = useAuthContext();

  const [openUser, setOpenUser] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const anchorUserRef = useRef();

  const handleUserClick = (e) => {
    setAnchorElUser(anchorUserRef.current);
    setOpenUser(true);
  };

  const handleUserClose = () => {
    setAnchorElUser(null);
    setOpenUser(false);
  };

  useEffect(() => {
    setOpenUser(false);
  }, [user]);

  console.log("openuser:", openUser);

  const handleToggleDrawer = (value) => {
    setOpenDrawer(value);
  };

  // Logout
  const { error, isPending, logout } = useLogout();

  const dispatch = useDispatch();
  const handleLogout = () => {
    logout();
    dispatch(emptyCart());
  };

  // const { user } = useAuthContext();
  // user && console.log(user);

  return (
    <AppBar
      sx={{
        height: { xxs: "65px", md: "80px" },
        justifyContent: "center",
        width: "100%",
      }}
      elevation={0}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <StyledBox display={{ md: "none" }}>
            <IconButton
              onClick={() => handleToggleDrawer(true)}
              sx={{ color: "#fff" }}
              size="large"
            >
              <MenuIcon></MenuIcon>
            </IconButton>
            <Drawer
              anchor="left"
              open={openDrawer}
              onClose={() => handleToggleDrawer(false)}
            >
              <Box width="250px" padding="1rem">
                <List>
                  <Link to="/">
                    <ListItem onClick={() => handleToggleDrawer(false)} button>
                      <ListItemText>
                        <DrawerButton>Home</DrawerButton>
                      </ListItemText>
                    </ListItem>
                  </Link>
                  <Link to="/">
                    <ListItem onClick={() => handleToggleDrawer(false)} button>
                      <ListItemText>
                        <DrawerButton>Vouchers</DrawerButton>
                      </ListItemText>
                    </ListItem>
                  </Link>
                  {isAdmin ? (
                    <Link to="/add-listing">
                      <ListItem
                        onClick={() => handleToggleDrawer(false)}
                        button
                      >
                        <ListItemText>
                          <DrawerButton>Add New Listing</DrawerButton>
                        </ListItemText>
                      </ListItem>
                    </Link>
                  ) : (
                    <Link to="/">
                      <ListItem
                        onClick={() => handleToggleDrawer(false)}
                        button
                      >
                        <ListItemText>
                          <DrawerButton>My Orders</DrawerButton>
                        </ListItemText>
                      </ListItem>
                    </Link>
                  )}

                  {user ? (
                    <Box
                      marginLeft={2}
                      alignItems="center"
                      // display={{ xxs: "none", md: "flex" }}
                    >
                      <Popover
                        open={openUser}
                        anchorEl={anchorElUser}
                        onClose={handleUserClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <Paper
                          sx={{
                            minWidth: "200px",
                            minHeight: "100px",
                            padding: "1rem",
                          }}
                        >
                          <Typography variant="h6">
                            {user.displayName}
                          </Typography>
                          <Divider></Divider>
                          <Box width="100%" display="flex" justifyContent="end">
                            <Button onClick={handleLogout}>Logout</Button>
                          </Box>
                        </Paper>
                      </Popover>
                      <IconButton ref={anchorUserRef} onClick={handleUserClick}>
                        <Avatar
                          sx={{
                            color: "#fff",
                            bgcolor: "primary.main",
                            width: "30px",
                            height: "30px",
                            marginRight: "1rem",
                          }}
                        >
                          {user.displayName &&
                            user.displayName.toUpperCase().charAt(0)}
                        </Avatar>
                        <Typography color="#222">{user.displayName}</Typography>
                      </IconButton>
                    </Box>
                  ) : (
                    <Link to="/login">
                      <ListItem
                        onClick={() => handleToggleDrawer(false)}
                        button
                      >
                        <ListItemText>
                          <DrawerButton>Login/Signup</DrawerButton>
                        </ListItemText>
                      </ListItem>
                    </Link>
                  )}
                </List>
              </Box>
            </Drawer>
          </StyledBox>

          <StyledBox
            sx={{
              height: "50px",
              overflow: "hidden",
            }}
          >
            <Link to="/">
              <img height="100%" src={BrandLogo} alt="logo" />
            </Link>
          </StyledBox>

          {/* navlinks for md screens  */}
          <StyledBox
            sx={{
              // flex: 3,
              justifyContent: "center",
              gap: 3,
            }}
            display={{ xxs: "none", md: "flex" }}
          >
            <Link to="/">
              <NavButton>Home</NavButton>
            </Link>

            <NavButton>Vouchers</NavButton>

            {isAdmin ? (
              <Link to="/add-listing">
                <NavButton>Add New Listing</NavButton>
              </Link>
            ) : (
              <NavButton>My Orders</NavButton>
            )}
          </StyledBox>

          <StyledBox sx={{ justifyContent: "end", alignItems: "center" }}>
            <Box>
              <Popover
                open={openCart}
                anchorEl={anchorElCart}
                onClose={handleCartClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                // disableScrollLock
              >
                <NavbarCartList
                  handleCartClose={handleCartClose}
                  cartItems={cartItems}
                ></NavbarCartList>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    padding: 1,
                    gap: "1rem",
                  }}
                >
                  {cartItems.length !== 0 && (
                    <>
                      <Typography>
                        Total Php <strong>{cart.totalPrice}</strong>
                      </Typography>
                      <Button variant="contained">Checkout</Button>
                    </>
                  )}
                </Box>
              </Popover>
              <IconButton onClick={handleCartClick}>
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon sx={{ color: "#fff" }}></ShoppingCartIcon>
                </Badge>
              </IconButton>
            </Box>
            {user ? (
              <Box
                marginLeft={2}
                alignItems="center"
                display={{ xxs: "none", md: "flex" }}
              >
                <Popover
                  open={openUser}
                  anchorEl={anchorElUser}
                  onClose={handleUserClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Paper
                    sx={{
                      minWidth: "200px",
                      minHeight: "100px",
                      padding: "1rem",
                    }}
                  >
                    <Typography variant="h6">{user.displayName}</Typography>
                    <Divider></Divider>
                    <Box width="100%" display="flex" justifyContent="end">
                      <Button onClick={handleLogout}>Logout</Button>
                    </Box>
                  </Paper>
                </Popover>
                <IconButton ref={anchorUserRef} onClick={handleUserClick}>
                  <Avatar
                    sx={{
                      color: "primary.main",
                      bgcolor: "#fff",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    {user.displayName &&
                      user.displayName.toUpperCase().charAt(0)}
                  </Avatar>
                </IconButton>
              </Box>
            ) : (
              <Box display={{ xxs: "none", md: "flex" }}>
                <Link to="/login">
                  <Button
                    sx={{ color: "#fff", fontSize: ".7rem" }}
                    variant="text"
                  >
                    Login/Register
                  </Button>
                </Link>
              </Box>
            )}
          </StyledBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
