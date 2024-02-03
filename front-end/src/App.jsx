import MiddleBar from "./components/headers/MiddleBar";
import NavBar from "./components/headers/NavBar";
import TopBar from "./components/headers/TopBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll/ScrollToTop";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import Checkout from "./components/checkout/Checkout";
import RegisterForm from "./components/rigesterForm/RegisterForm";
import Category from "./components/category/Category";

function App() {
  const [open, setOpen] = useState(false);
  const [theme, colorMode] = useMode();
  const [openCart, setOpenCart] = useState(false);
  const location = useLocation().pathname;
  return (
    <ColorModeContext.Provider
      // @ts-ignore
      value={colorMode}
    >
      <ThemeProvider
        // @ts-ignore
        theme={theme}
      >
        <CssBaseline />
          <div className="App">
            {openCart && <Cart setOpenCart={setOpenCart} />}
            <TopBar />
            {location !== '/checkout' && (<>
              <MiddleBar setOpenCart={setOpenCart} />
              <RegisterForm open={open} setOpen={setOpen} />
              <NavBar />
            </>)}
            <main
              style={{
                backgroundColor:
                  // @ts-ignore
                  theme.palette.bg.main,
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/category/:id" element={<Category />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
