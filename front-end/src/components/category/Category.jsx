import {
  CircularProgress,
  Container,
  Typography,
  Stack,
  Button,
  MenuItem,
  Menu,
  Box,
} from "@mui/material";
import { useGetProductByNameQuery } from "../../Redux/product";
import { useParams } from "react-router-dom";
import "./Category.css";
import ProductsContainer from "../../components/main/ProductsContainer";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";

const Category = () => {
    const [endPoint, setEndPoint] = useState('&filters[genre][$ne]=all')
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByNameQuery(
    `/products?populate=*&filters[category][$eq]=${id}${endPoint}`
  );
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={"8rem"} />
      </div>
    );
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelFilter = (endPoint) => {
    setEndPoint(endPoint);
  }
  return (
    <Container sx={{ py: 6 }} className="categoryPage">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" className="myTitle">
          {id}
        </Typography>
        <Box>
          <Button
          id="demo-customized-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
           variant="outlined" endIcon={<TuneIcon />}>
            Filter
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={()=>{
                handelFilter('&filters[genre][$ne]=all') 
                handleClose()}}>All</MenuItem>
            <MenuItem onClick={()=>{
                handelFilter('&filters[genre][$eq]=men') 
                handleClose()}}>Men's</MenuItem>
            <MenuItem onClick={()=>{
                handelFilter('&filters[genre][$eq]=women') 
                handleClose()}}>women's</MenuItem>
          </Menu>
        </Box>
      </Stack>
      <ProductsContainer products={data?.data} />
    </Container>
  );
};

export default Category;
