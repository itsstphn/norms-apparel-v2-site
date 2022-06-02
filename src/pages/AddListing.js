import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { db, storage } from "../firebase/config";
import { useCategoriesContext } from "./../hooks/useCategoriesContext";

const AddListing = () => {
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  console.log(productCategory);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { categories } = useCategoriesContext();

  const handleAddProduct = async (e) => {
    setError(null);
    setIsPending(true);

    e.preventDefault();
    if (
      productName &&
      productDetails &&
      productPrice &&
      productCategory &&
      productImg
    ) {
      try {
        const docRef = await addDoc(collection(db, "products"), {
          productName,
          productDetails,
          productPrice,
          productCategory,
        });

        // upload Image
        const uploadPath = `thumbnails/${docRef.id}/${productImg.name}`;
        const storageRef = ref(storage, uploadPath);
        await uploadBytes(storageRef, productImg);

        const imgURL = await getDownloadURL(ref(storage, uploadPath));

        const updateDocRef = doc(db, "products", docRef.id);

        await setDoc(
          updateDocRef,
          { productImgURL: imgURL, id: docRef.id },
          { merge: true }
        );
        setIsPending(false);
        navigate("/");
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  return (
    <CardForm>
      <Typography color="primary" fontWeight="bold" variant="h6">
        Add New Listing
      </Typography>
      <TextField
        required
        variant="standard"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        label="Product Name"
        size="small"
      ></TextField>

      <TextField
        required
        variant="standard"
        multiline
        label="Product Details"
        value={productDetails}
        margin="dense"
        onChange={(e) => setProductDetails(e.target.value)}
        placeholder="Describe your product..."
        maxRows={3}
        size="small"
      ></TextField>

      <TextField
        required
        variant="standard"
        type="number"
        label="Price"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        margin="dense"
        size="small"
        InputProps={{
          startAdornment: <InputAdornment position="start">Php</InputAdornment>,
        }}
      ></TextField>

      <TextField
        required
        type="file"
        label="Upload Photo"
        variant="standard"
        margin="dense"
        onChange={(e) => setProductImg(e.target.files[0])}
        inputProps={{ accept: "image/*" }}
        InputLabelProps={{
          shrink: true,
        }}
      ></TextField>

      <FormControl variant="standard" margin="dense">
        <InputLabel>Category</InputLabel>
        <Select
          required
          value={productCategory}
          label="Category"
          onChange={(e) => setProductCategory(e.target.value)}
          multiple
          size="small"
          renderValue={(selected) => selected.join(", ")}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={productCategory.indexOf(category) > -1} />

              <ListItemText
                primary={category
                  .charAt(0)
                  .toUpperCase()
                  .concat(category.slice(1))}
              ></ListItemText>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select all that applies</FormHelperText>
      </FormControl>
      <Button
        sx={{ width: "fit-content", margin: "1rem auto 0" }}
        variant="contained"
        type="submit"
        onClick={handleAddProduct}
        disabled={isPending}
      >
        {isPending ? "Loading" : "Add Product"}
      </Button>
    </CardForm>
  );
};

export default AddListing;
