import "./checkout.css";
import { Alert, Button, Container, TextField, Typography, MenuItem  } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContextArray } from "../../util/DataContext";
import { ArrowBack } from "@mui/icons-material";

const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  let paypalButton = true;
  // @ts-ignore
  const { itemInCart } = useContext(DataContextArray);
  let subTotal = 0;
  // Calculate subTotal outside the map function
  itemInCart.forEach(item => {
    subTotal += item.price * item.quantity;
  });
  // Update totalAmount after the loop
  useEffect(() => {
    setTotalAmount(subTotal);
  }, [itemInCart]);
  const navigate = useNavigate();
  useEffect(()=> {
    // Render the PayPal button into #paypal-button-container
  // @ts-ignore
  window.paypal
  .Buttons({
    // Call your server to set up the transaction
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: 600.00,
            },
          },
        ],
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(function (details) {
        return <Alert color="info" severity="success">{"Thank for paying dear" + details.payer.name.gavin_name}</Alert>
      });
    },
  })
  .render("#paypal-button-container");
  },[paypalButton]);
  const city = [
    {
      value: 'landon',
      label: 'Landon',
    },
    {
      value: 'cairo',
      label: 'Cairo',
    },
    {
      value: 'BTC',
      label: 'BTC',
    },
  ];
  const currencies = [
    {
      value: 'USD',
      label: 'USD',
    },
    {
      value: 'EUR',
      label: 'EUR',
    },
    {
      value: 'BTC',
      label: 'BTC',
    },
    {
      value: 'JPY',
      label: 'JPY',
    },
  ];
  return (
    <Container className="checkout-page">
      <div className="container">
        <div className="checkoutLayout">
          <div className="returnCart">
            <Button onClick={()=> navigate('/')} variant="outlined" startIcon={<ArrowBack />}>
              keep shopping
            </Button>
            <Typography variant="h2" gutterBottom sx={{ fontSize: "2.5rem"}}>List Product in Cart</Typography>
            <div className="list">
              {itemInCart?.length > 0 ? (
                itemInCart.map((product, i) => (
                  <div key={i} className="item">
                    <img src={product.img} />
                    <div className="info">
                      <div className="name">{product.title}</div>
                      <div className="price">${product.price}</div>
                    </div>
                    <div className="quantity">x{product.quantity}</div>
                    <div className="returnPrice">
                      ${product.price * product.quantity}
                    </div>
                  </div>
                ))
              ) : (
                <Typography variant="h6">No Item in Cart.</Typography>
              )}
            </div>
          </div>
          <div className="right">
            <h1>Checkout</h1>
            <div className="form">
              <div className="group">
                <TextField fullWidth label="Full Name" id="fullWidth" />
              </div>
              <div className="group">
                <TextField type="phone" fullWidth label="Phone Number" id="fullWidth" />
              </div>
              <div className="group">
                <TextField fullWidth label="Address" id="fullWidth" />
              </div>
              <div className="group">
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                defaultValue="EUR"
                helperText="Please select your country"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </div>
              <div className="group">
              <TextField
                id="outlined-select-city"
                select
                label="Select"
                defaultValue="landon"
                helperText="Please select your city"
              >
                {city.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </div>
            </div>
            <div className="return">
              <div className="row">
                <div>Total Quantity</div>
                <div className="totalQuantity">{itemInCart?.length}</div>
              </div>
              <div className="row">
                <div>Total Price</div>
                <div className="totalPrice">${totalAmount}</div>
              </div>
            </div>
            {/* <button className="buttonCheckout">CHECKOUT</button> */}
            {/* <!-- Set up a container element for the button --> */}
            <div id="paypal-button-container"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
