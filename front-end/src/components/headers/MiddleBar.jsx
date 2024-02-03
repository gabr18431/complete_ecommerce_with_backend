import { useContext, useEffect, useState } from "react";
import "../Search/Search.css";
import { ExpandMore, FavoriteBorder, Close } from "@mui/icons-material";
import {
  Badge,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  Box,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// @ts-ignore
import lightModeLogo from "../../assets/logo1.svg";
// @ts-ignore
import darkModeLogo from "../../assets/logo2.svg";
import { DataContextArray } from "../../util/DataContext";
import { Link, useNavigate } from "react-router-dom";
import SearchModal from "../../components/Search/SearchModal";
import { useGetProductByNameQuery } from "../../Redux/product";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const options = ["All Categories", "Shoes", "Clothes", "Electronics", "Home"];

const MiddleBar = ({ setOpenCart }) => {
  const navigate = useNavigate();
  // const [dataSearch, setDataSearch] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all categories')
  const [ showSearch, setShowSearch ] = useState(false);
  const [query, setQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // @ts-ignore
  const { countOfCart } = useContext(DataContextArray);
  const [endPoint, setEndPoint] = useState('*')
  const {data} = useGetProductByNameQuery(
    `/products?populate=${endPoint}`)
  useEffect(()=> {
    if (selectedCategory === "all categories") {
      setEndPoint('*')
    } else {
      setEndPoint(`*&[filters][category][$eq]=${selectedCategory}`)
    }
  }, [selectedCategory])

  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    let cat = event.target.innerText.toLowerCase()
    setSelectedCategory(cat);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 800px)')
  return (
    <Container sx={{ my: 3, display: "flex", justifyContent: "space-between" }}>
      {showSearch && <SearchModal query={query} setQuery={setQuery} setShowSearch={setShowSearch} data={data?.data} />}
      <Stack sx={{ minWidth: "170px" }} component={Link} to={'/'} >
        {theme.palette.mode === "dark" ? (
          <img height="44px" alt="logo" src={darkModeLogo} />
        ) : (
          <img height="44px" alt="logo" src={lightModeLogo} />
        )}
      </Stack>
      {!isMobile && (
      <Box
        sx={{
          display: "flex",
          border:theme.palette.mode === "light" ? `1px solid #0000008a`: `1px solid #f1f1f1` ,
          borderRadius: "30px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          pl: 2,
          flexGrow: "0.4",
        }}
      >
        {!showSearch ? <SearchIcon /> : (
          <Close style={{cursor: "pointer"}}
            onClick={() => {
              setShowSearch(false)
              setQuery('')
            }}
          />
        )}
        <input className="border0" style={{
          border: "none", fontSize: "19px", backgroundColor: "transparent",
          flexGrow: 1,
          color: theme.palette.mode === "light" ? "#444" : "#999",
        }}
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSearch(true)
          }}
        />
        <div>
          <List
            component="nav"
            aria-label="Device settings"
            sx={{
              // @ts-ignore
              bgcolor: theme.palette.myColor.main,
              borderBottomRightRadius: 30,
              borderTopRightRadius: 30,
              p: "0",
            }}
          >
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
            >
              <ListItemText
                // className="border"
                sx={{
                  width: "100px",
                  textAlign: "center",
                  "&:hover": { cursor: "pointer" },
                }}
                secondary={options[selectedIndex]}
              />
              <ExpandMore sx={{ fontSize: "16px" }} />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                sx={{ fontSize: "13px" }}
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Box>)}
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={countOfCart} color="primary">
            <ShoppingCartIcon onClick={() => setOpenCart(true)} />
          </StyledBadge>
        </IconButton>
          { isMobile && <IconButton onClick={()=> setShowSearch(true)}>
          <SearchIcon />
        </IconButton>}
        <IconButton>
          <Person2OutlinedIcon />
        </IconButton>
      </Stack>
    </Container>
  );
};

export default MiddleBar;
