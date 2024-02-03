// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./SingleProduct.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { Box, CardMedia, Container, Grid, Rating, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
export default function RelatedProducts({ products }) {
  const theme = useTheme();
  return (
    <Container className="products RelatedProducts"
    style={{
      padding: "20px 0"
    }} >
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        style={{
          padding: "50px 0"
        }}
      >
        {products?.map((item, i) => (
          <SwiperSlide key={i}>
            <Grid
              item
              // @ts-ignore
              // sx={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className="movie"
              key={i}
              style={{
                border: `2px solid ${theme.palette.divider}`,
                overflow: "hidden",
                borderRadius: "14px",
                backgroundColor: theme.palette.mode === "light" ? "white" : "#13171b",
                }}
            >
              <Link className="movie-links" to={`/product/${item.id}`}
              onClick={()=> {
                setTimeout(()=> {
                  window.scrollTo(0, 250)
                }, 200);
              }}>
                <div className="movie-image-container">
                  <CardMedia
                    className="movie-image"
                    sx={{ height: 300 }}
                    // @ts-ignore
                    image={`${item.attributes.img.data[0].attributes.url}`}
                    title="green iguana"
                  />
                </div>
                <Box className="content" px={1}>
                <Typography
                  gutterBottom
                  variant="h5"
                  className="movie-title"
                  color={theme.palette.mode === "dark" ? "#ffffffb3" : "rgba(0, 0, 0, 0.87)"}
                >
                  {item.attributes.title}
                </Typography>
                <Typography gutterBottom mb={2}
                  className='description' variant='body2' color="text.secondary" >
                  {item.attributes.desc}
                </Typography>
                <div className="rating rating-move">
                  <div className="rating">
                  <Rating name="half-rating" defaultValue={item.attributes.rating} precision={0.5} />
                  </div>
                  <div className="price">
                    <span className="current">${item.attributes.price}.00 </span>
                  </div>
                </div>
                </Box>
              </Link>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
