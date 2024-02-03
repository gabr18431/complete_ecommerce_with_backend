import "./SingleProduct.css";
import { useContext, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByNameQuery } from "../../Redux/product";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Pinterest,
  AddShoppingCart,
  Twitter,
} from "@mui/icons-material";
import {
  Button,
  Typography,
  Box,
  useTheme,
  CircularProgress,
  Rating,
  Divider,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataContextArray } from "../../util/DataContext";
import RelatedProducts from "./RelatedProducts";
const SingleProduct = () => {
  // @ts-ignore
  const { setItemInCart, itemInCart, setCountOfCart } =
    useContext(DataContextArray);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data, isLoading } = useGetProductByNameQuery(
    `/products?populate=*&[filters][id]=${id}`
  );
  const { data: relatedProducts, isLoading: isFetching } =
    useGetProductByNameQuery(
      `/products?populate=*&[filters][category][$eq]=${data?.data[0]?.attributes?.category}`
    );
    const filteredRelatedProducts = relatedProducts?.data?.filter((product) => product.id != id);
  const decrement = (quantity) => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const theme = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    let subTotal = 0;
    let count = 0;
    itemInCart.map((item) => {
      subTotal += item.price * item.quantity;
      count += item.quantity;
      setCountOfCart(count);
    });
  }, [itemInCart]);
  const addItemsInCart = () => {
    handleClick();
    let activeImg = document
      .querySelector(".swiper-slide.swiper-slide-active img")
      .getAttribute("src");
    let itemImage = data.data[0].attributes.img.data.filter((img) => {
      if (activeImg.includes(img.attributes.url)) {
        return activeImg;
      }
    });
    let item = {
      // @ts-ignore
      img: `${itemImage[0].attributes.url}`,
      title: data.data[0].attributes.title,
      price: data.data[0].attributes.price,
      quantity: quantity,
      id: itemImage[0].attributes.url,
    };
    let items = [...itemInCart];
    let index = items.findIndex((pro) => pro.img === item.img);
    if (index !== -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }
    setItemInCart(items);
  };
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
  return (
    <Container sx={{py: 8}} className="single-product-main-content">
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="40vh"
        >
          <CircularProgress size={"8rem"} />
        </Box>
      ) : (
        <div className="layout">
          <div className="single-product-page">
            <div className="left">
              <Swiper
                cssMode={true}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
              >
                {data?.data[0]?.attributes?.img?.data?.map((img, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img
                        // @ts-ignore
                        src={`${img.attributes?.url}`}
                        alt="img"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="right">
              <h3 className="name">{data?.data[0]?.attributes?.title}</h3>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  mb: "20px",
                }}
              >
                <Typography variant="h6">Price : </Typography>
                <span className="price">
                  ${data?.data[0]?.attributes?.price}
                </span>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Rating
                  name="half-rating"
                  defaultValue={data?.data[0]?.attributes?.rating}
                  precision={0.5}
                />
                <Typography color="#a6a6a6" variant="body2">
                  ({data?.data[0]?.attributes?.rating})
                </Typography>
              </Box>
              <Typography variant="h6">Overview : </Typography>
              <p className="desc">{data?.data[0]?.attributes?.desc}</p>
              <div className="cart-buttons">
                <div className="quantity-buttons">
                  <span onClick={() => decrement(quantity)}>-</span>
                  <span>{quantity}</span>
                  <span onClick={() => setQuantity((prev) => prev + 1)}>+</span>
                </div>
                <Button
                  variant="contained"
                  className="add-to-cart-button"
                  onClick={() => {
                    setQuantity(1);
                    addItemsInCart();
                  }}
                >
                  <AddShoppingCart />
                  ADD TO CART
                </Button>
              </div>
              <span className="divider" />
              <div className="info-item">
                <span className="text-bold">
                  Category:{" "}
                  <button
                    onClick={() =>
                      navigate(`/category/${data.data[0].attributes.category}`)
                    }
                  >
                    {data?.data[0]?.attributes?.category}
                  </button>
                </span>
                <span className="text-bold">
                  Share:
                  <span className="social-icons">
                    <Facebook />
                    <Twitter />
                    <Instagram />
                    <LinkedIn />
                    <Pinterest />
                  </span>
                </span>
              </div>
            </div>
          </div>
          <Container sx={{mt: 8}}>
          <Divider />
            <Typography className="myTitle" mt={4}
              variant="h3"
              color={
                // @ts-ignore
                theme.palette.myTitle.main
              }
            >
              Related Products
            </Typography>
            <RelatedProducts products={filteredRelatedProducts} />
          </Container>
        </div>
      )}
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
    </Container>
  );
};

export default SingleProduct;
