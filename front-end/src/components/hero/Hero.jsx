import "./slider.css";
import {
    Box,
    Button,
    Container,
    Link,
    Stack,
    Typography,
    useTheme,
  } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
  // @ts-ignore
  import slidImage1 from "../../assets/banners/slider0.jpg";
  // @ts-ignore
 import slidImage2 from "../../assets/banners/bn2.jpg";
  // @ts-ignore
  import banner1 from "../../assets/banners/banner-12.jpg";
  // @ts-ignore
 import banner2 from "../../assets/banners/slider3.jpg";
import IconSection from "./IconSection";
const Hero = () => {
    const theme = useTheme();
    const mySlider = [
      { text: "MEN", link: slidImage1 },
      { text: "WOMEN", link: slidImage2 },
    ];
    return (
      <Container sx={{pt: 4}} className="hero-section" >
        <Box
          sx={{ pt: 2, mt: 2.5, display: "flex", alignItems: "center", gap: 2,
          flexDirection: {xs: "column",md: "row"} }}
        >
        <Swiper
          direction={'vertical'}
          pagination={{
          clickable: true,
          }}
          loop={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {mySlider.map((item) => {
            return (
              <SwiperSlide key={item.link} className="parent-slider">
                <img src={item.link} alt="" />
                <Box
                  sx={{
                    [theme.breakpoints.up("sm")]: {
                      position: "absolute",
                      left: "10%",
                      textAlign: "left",
                      top: "50%",
                      transform: "translateY(-50%)",
                    },
                    [theme.breakpoints.down("sm")]: {
                      pt: 4,
                      pb: 6,
                      backgroundColor: "#f6f9fc",
                      height: "100%",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#222",
                    }}
                    variant="h5"
                  >
                    LIFESTYLE COLLECTION
                  </Typography>
                  <Typography
                    sx={{
                      color: "#222",
                      fontWeight: 500,
                      my: 1,
                    }}
                    variant="h3"
                  >
                    {item.text}
                  </Typography>
                  <Stack
                    sx={{
                      justifyContent: { xs: "center", sm: "left" },
                    }}
                    direction={"row"}
                    alignItems={"center"}
                  >
                    <Typography color={"#333"} mr={1} variant="h4">
                      SALE UP TO
                    </Typography>
                    <Typography color={"#D23F57"} variant="h4">
                      30% OFF
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: "#000",
                      fontWeight: 300,
                      my: 1,
                    }}
                    variant="body1"
                  >
                    Get Free Shipping on orders over $99.00
                  </Typography>
                  <Button
                    sx={{
                      px: 5,
                      py: 1,
                      mt: 2,
                      backgroundColor: "#D23F57",
                      boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                      color: "#fff",
                      borderRadius: "1px",
                      "&:hover": {
                        bgcolor: "#151515",
                        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                      },
                    }}
                    variant="contained"
                    onClick={()=> {
                      window.scrollTo(0, 950)
                    }}
                  >
                    shop now
                  </Button>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
          <Box sx={{ 
            display:"flex",
            flexDirection:{md: "column"}, 
            justifyContent: "space-between" ,
            minWidth:{xs: "100%", md: "27%"}, 
            height:{md: "500px", xs: "170px"} }}>
            <Box sx={{ 
              position: "relative", 
              height:{md: "49%"},
              width:{xs: "49%", md: "100%"},
              overflow: "hidden",
              ":hover img": {
              transform: "scale(1.15) rotate(3deg)"
              } 
            }}>
              <img width={"100%"} src={banner1} alt="" style={{
                objectFit: "cover",
                height: "100%",
                transition: "0.3s",
              }} />
  
              <Stack
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 31,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#f6f6f6",
                    fontSize: "18px",
                  }}
                >
                  NEW ARRIVALS
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#f6f6f6",
                    lineHeight: "16px",
                    mt: 1,
                  }}
                >
                  SUMMER
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#f6f6f6",
                  }}
                >
                  SALE 20% OFF
                </Typography>
  
                <Link
                  sx={{
                    color: "#f6f6f6",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    transition: "0.2s",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#D23F57",
                    },
                  }}
                  underline="none"
                  onClick={()=> {
                    window.scrollTo(0, 950)
                  }}
                >
                  shop now
                  <ArrowForwardIcon sx={{ fontSize: "13px" }} />
                </Link>
              </Stack>
            </Box>
  
            <Box sx={{ position: "relative", 
              height:{md: "49%"},
              width:{xs: "49%", md: "100%"},
              overflow: "hidden",
              ":hover img": {
              transform: "scale(1.15) rotate(3deg)"
              } }}>
              <img width={"100%"} src={banner2} alt="" style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                transition: "0.3s",
              }} />
              <Stack
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 31,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "18px",
                    fontWeight: 300,
                    color: "white",
                  }}
                >
                  GAMING 4K
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    lineHeight: "16px",
                    mt: 1,
                  }}
                >
                  DESKTOPS &
                </Typography>
  
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                  }}
                >
                  LAPTOPS
                </Typography>
  
                <Link
                  sx={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    transition: "0.2s",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#D23F57",
                    },
                  }}
                  underline="none"
                  onClick={()=> {
                    window.scrollTo(0, 950)
                  }}
                >
                  shop now
                  <ArrowForwardIcon sx={{ fontSize: "13px" }} />
                </Link>
              </Stack>
            </Box>
          </Box>
        </Box>
  
        <IconSection />
      </Container>
    );
}

export default Hero