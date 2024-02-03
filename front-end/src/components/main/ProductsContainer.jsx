import { useContext, useEffect, useState } from "react";
import "./ProductCard.css";
import {
  CardMedia,
  Container,
  Alert,
  Rating,
  Snackbar,  
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { DataContextArray } from "../../util/DataContext";

const ProductsContainer = ({ products }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const theme = useTheme();
  // @ts-ignore
  const {
    // @ts-ignore
    setItemInCart,
    // @ts-ignore
    itemInCart,
    // @ts-ignore
    setCountOfCart,
  } = useContext(DataContextArray);
  const navigate = useNavigate();
  const addItemsInCart = (product) => {
    handleClick();
    let item = {
      // @ts-ignore
      img: `${product.attributes.img.data[0].attributes.url}`,
      title: product.attributes.title,
      price: product.attributes.price,
      quantity: 1,
      id: product.attributes.img.data[0].attributes.url,
    };
    let items = [...itemInCart];
    let index = items.findIndex((pro) => pro.img === item.img);
    if (index !== -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }
    setItemInCart(items);
    let count = 0;
    items.map((item) => {
      count += item.quantity;
      setCountOfCart(count);
    });
  };
  return (
    <>
      <Container
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
        className="products main flex-wrap"
      >
        {products?.map((item, i) => (
          <div
            key={i}
            className="item"
            style={{
              border: `2px solid ${theme.palette.divider}`,
              overflow: "hidden",
              borderRadius: "14px",
              backgroundColor:
                theme.palette.mode === "light" ? "white" : "#13171b",
            }}
          >
            <div className="media">
              <div
                className="thumbnail object-cover"
                style={{
                  backgroundColor: "#f0f0f0",
                }}
              >
                <CardMedia
                  sx={{ height: 300 }}
                  image={`${item.attributes.img.data[0].attributes.url}`}
                  title="green iguana"
                />
              </div>
              <div className="hover-able">
                <ul>
                  <li className="active">
                    <Link className={""} to={""}>
                      <FavoriteBorderIcon />
                    </Link>
                  </li>
                  <li>
                    <Link to={`/product/${item.id}`}>
                      <RemoveRedEyeIcon />
                    </Link>
                  </li>
                  <li>
                    <Link to={""} onClick={() => addItemsInCart(item)}>
                      <AddShoppingCartIcon />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="discount circle flex-center">
                <span>31%</span>
              </div>
            </div>
            <div
              className="content"
              style={{
                padding: "0 10px 10px",
              }}
            >
              <h3
                onClick={() => navigate(`/product/${item.id}`)}
                className="main-links"
                style={{
                  // @ts-ignore
                  color: theme.palette.text.primary,
                }}
              >
                {item.attributes.title}
              </h3>
              <Typography
                className="description"
                variant="body2"
                color="text.secondary"
              >
                {item.attributes.desc}
              </Typography>
              <div className="rating">
                <div className="rating">
                  <Rating
                    name="half-rating"
                    defaultValue={item.attributes.rating}
                    precision={0.5}
                  />
                </div>
                <div className="price">
                  <span className="current">$ {item.attributes.price} </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
      <Snackbar open={open} autoHideDuration={1300} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          color="info"
          sx={{ width: "100%" }}
        >
          Added Successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductsContainer;
