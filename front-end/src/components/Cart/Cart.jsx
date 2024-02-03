import { RemoveShoppingCartTwoTone, Close } from "@mui/icons-material";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { Stack, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContextArray } from "../../util/DataContext";
const Cart = ({ setOpenCart }) => {
    // @ts-ignore
  const { setItemInCart , itemInCart, setCountOfCart } = useContext(DataContextArray);
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(()=> {
        let subTotal = 0;
        let count = 0;
        itemInCart.map(item => {
            subTotal += item.price * item.quantity;
            count += item.quantity;
            setCountOfCart(count)
            setTotalPrice(subTotal);
        })
        if (!itemInCart.length) {
            setCountOfCart(0);
        }
    },[itemInCart])
    const navigate = useNavigate();
    const HandelPlusQuantityButton = (id) => {
        let filtered = itemInCart.filter((pro)=> {
            if (id.includes(pro.id)) {
                pro.quantity = pro.quantity + 1;
                return pro;
            } else {
                return pro;
            }
        })
        setItemInCart(filtered);
    }
    const HandelMinusQuantityButton = (id) => {
        let filtered = itemInCart.filter((pro)=> {
            if (id.includes(pro.id) && pro.quantity > 1) {
                pro.quantity = pro.quantity - 1;
                return pro;
            } else {
                return pro;
            }
        })
        setItemInCart(filtered);
    }
    const theme = useTheme();
    const handelDelete = (productId) => {
        let filtered = itemInCart.filter((pro)=> !productId.includes(pro.id))
        setItemInCart(filtered);
    }
    const CartItem = ({ product}) => {
        return (
            <div className="cart-products">
                <div className="search-result-item">
                    <div className="image-container">
                        <img
                            src={product.img}
                            alt="product-img" />
                    </div>
                    <div className="prod-details">
                        <span className="name">{product.title}</span>
                        <Close onClick={()=> handelDelete(product.img)} />
                        <Stack mb={2} direction="row" alignItems="center" justifyContent="space-between" >
                            <div className="quantity-buttons">
                                <span onClick={() => HandelMinusQuantityButton(product.img)}>
                                    -
                                </span>
                                <span>{product.quantity}</span>
                                <span onClick={() => HandelPlusQuantityButton(product.img)}>
                                    +
                                </span>
                            </div>
                            <span className="highlight">
                                <span>$</span>
                                {product.price}
                            </span>
                        </Stack>
                        <div className="text">
                            <span>(x {product.quantity})</span>
                            <span style={{color: '#d23f57b5', fontSize: "16px"}}>
                                <span>$</span>
                                {product.price * product.quantity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="cart-panel">
            <div
                className="overlay"
                onClick={() => setOpenCart(false)}
            ></div>
            <div className="cart-content" style={{
                // @ts-ignore
                backgroundColor: theme.palette.bg.main,
            }}
            >
                <div className="cart-header" style={{
                // @ts-ignore
                    backgroundColor: theme.palette.mode === "dark" 
                    ? "#121212" : "white",
                }}
                >
                    <span className="heading">Shopping Cart</span>
                    <span
                        className="close-btn"
                        onClick={() => setOpenCart(false)}
                    >
                        <Close className="close-btn" />
                        <span className="text">close</span>
                    </span>
                </div>
                {!itemInCart.length ? (<div className="empty-cart">
                    <RemoveShoppingCartTwoTone />
                    <span>No products in the cart.</span>
                    <button className="return-cta" 
                        onClick={()=> {
                            setOpenCart(false)
                        }}
                    >
                        RETURN TO SHOP
                    </button>
                </div>):(
                <>
                    <div className="cart-items-container">
                    {itemInCart.map((item)=> (
                        <CartItem key={item.img} product={item} />))}
                    </div>
                    <div className="cart-footer" style={{
                        // @ts-ignore
                            backgroundColor: theme.palette.mode === "dark" 
                            ? "#121212" : "white",
                        }}
                    >
                        <div className="subtotal">
                            <span className="text">Subtotal:</span>
                            <span className="text total">
                                ${totalPrice}
                            </span>
                        </div>
                        <div className="button">
                            <button onClick={()=> {
                                setOpenCart(false);
                                navigate('/checkout')}}
                                className="checkout-cta"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>) }
            </div>
        </div>
    );
};

export default Cart;
