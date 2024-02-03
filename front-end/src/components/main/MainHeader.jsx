import { Box, ButtonGroup, Container, Divider, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import "./ProductCard.css";
const MainHeader = ({ setEndPoint, setPage }) => {
  const all =
  `&filters[desc][$ne]=all`
  const men = 
  `&filters[genre][$eq]=men`;
  const women = 
  `&filters[genre][$eq]=women`;
const [alignment, setAlignment] = useState(all);
  const handleChange = (event , newAlignment) => {
    setAlignment(newAlignment);
    setPage(1);
    setEndPoint(newAlignment);
  };
  const theme = useTheme();
  return (
    <Container sx={{
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        mt:{xs: 4,md: 6, lg: 9, xl: 9},
        flexWrap: "wrap",
        gap: 3,
        }}>
        <Box>
          <Typography variant="h5" gutterBottom>Selected Products</Typography>
          <Typography fontWeight={300} variant="body1">
            All our new arrivals in a exclusive brand selection
          </Typography>
        </Box>
        <Box>
            <ToggleButtonGroup
                color="info"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ButtonGroup variant="text" aria-label="text button group"
                sx={{gap: 1}}
                >
                    <ToggleButton value={all}
                        sx={{color:theme.palette.text.primary}}
                    >All Products</ToggleButton>
                    <Divider orientation="vertical" flexItem 
                    />
                    <ToggleButton value={men}
                    sx={{color:theme.palette.text.primary}}>men category</ToggleButton>
                    <Divider orientation="vertical" flexItem 
                    />
                    <ToggleButton value={women}
                    sx={{color:theme.palette.text.primary}}>women category</ToggleButton>
                </ButtonGroup>
            </ToggleButtonGroup>
        </Box>
    </Container>
  )
}

export default MainHeader