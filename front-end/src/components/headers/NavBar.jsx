import {
  Box,
  Container,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";
import WindowIcon from "@mui/icons-material/Window";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import {
  Close,
  FileDownloadDone
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ToShop = () => {
    window.scrollTo(0, 1050);
  }
  const theme = useTheme();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const categories = ["clothes","electronics","accessories","shoes","home"];
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        my: 5,
      }}
    >
      <Box>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            width: 222,
            // @ts-ignore
            bgcolor: theme.palette.myColor.main,
          }}
        >
          <WindowIcon />
          <Typography
            sx={{
              padding: "0",
              textTransform: "capitalize",
              mx: 1,
            }}
          >
            Categories
          </Typography>
          <Box flexGrow={1} />
          <KeyboardArrowRightOutlinedIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            ".MuiPaper-root": {
              width: 220,
              // @ts-ignore
              bgcolor: theme.palette.myColor.main,
              top: "195px !important",
            },
          }}
        >
          <MenuItem onClick={()=> {
            handleClose()
            ToShop()}}>
            <ListItemIcon>
              <FileDownloadDone fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mens</ListItemText>
          </MenuItem>
          <MenuItem onClick={()=> {
            handleClose()
            ToShop()}}>
            <ListItemIcon>
              <FileDownloadDone fontSize="small" />
            </ListItemIcon>
            <ListItemText>Womens</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {useMediaQuery("(min-width:1200px)") && (
        <Stack gap={4} direction={"row"} alignItems={"center"}>
          {categories.map((link, i) => (
          <Button onClick={()=> navigate(`/category/${link}`)} key={i} variant="text">
            {link}
          </Button>
          ))}
        </Stack>
      )}
      {useMediaQuery("(max-width:1200px)") && (
        <IconButton onClick={toggleDrawer("right", true)} >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        sx={{
          ".MuiPaper-root.css-1sozasi-MuiPaper-root-MuiDrawer-paper": {
            height: "100%",
          },
          ".css-1vxvp5a-MuiPaper-root-MuiDrawer-paper" : {
            width: "240px",
          },
          ".css-entiip": {
            width: "100%",
          },
          ".css-jdt12u-MuiPaper-root-MuiDrawer-paper": {
            // @ts-ignore
            backgroundColor: theme.palette.bg.main,
          }
        }}
      >
        <Box
          sx={{ width: "100%", mx: "auto", mt: 6, position: "relative", pt: 10 }}
        >
          <IconButton
            sx={{
              ":hover": { rotate: "180deg" },
              position: "absolute",
              top: 0,
              right: 10,
              rotate: 0,
              transition: "0.3s",
            }}
            onClick={toggleDrawer("right", false)}
          >
            <Close />
          </IconButton>
          <Stack px={8} gap={4} direction={"column"} alignItems={"center"}>
          {categories.map((link, i) => (
          <Button onClick={()=> {
            setState({ ...state, ["right"]: false });
            navigate(`/category/${link}`)}} key={i} variant="text">
            {link}
          </Button>
          ))}
        </Stack>
        </Box>
      </Drawer>
    </Container>
  );
};

export default NavBar;
