import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import NavbarSignIn from "../../components/NavbarSignIn";
import image from "../../Images/excel.png";
import profile from "../../Images/excel-profile.png";
import clock from "../../Images/Clock.png";
import bookOpen from "../../Images/BookOpenText.png";
import {Footer} from "../../components/Footer"

const CartScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const paymentSuccess = new URLSearchParams(location.search).get(
    "paymentSuccess"
  );
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const BASEURLCART = import.meta.env.VITE_API_URL_CART_USER;

  const { userPhone } = useSelector((state) => state.auth);

  const getCartData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/data/getUSER_CART?user_id=${userPhone.user?.empid}`
      );

      const cartData = response.data;
      const subjectDataPromises = cartData.map(async (cartItem) => {
        try {
          const subjectResponse = await axios.get(
            `${BASEURL}/data/getSubjects?subject_id=${cartItem.subject_id}`
          );
          const subjectData = subjectResponse.data;
          return { ...cartItem, ...subjectData[0] };
        } catch (err) {
          console.error(
            `Failed to fetch subject details for ID: ${cartItem.subject_id}`
          );
          return null;
        }
      });

      const enrichedCartItems = await Promise.all(subjectDataPromises);
      setCartItems(enrichedCartItems.filter((item) => item !== null));
      toast.success("Cart items loaded successfully.");
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Unable to load cart items.");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;

    try {
      for (const item of cartItems) {
        await removeCartItem(item.cart_id, true);
      }
      setCartItems([]);
      toast.success("Cart cleared successfully.");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart.");
    }
  };

  const removeCartItem = async (cartId, silent = false) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASEURL}/data/deleteUSER_CART/${cartId}`);
      setCartItems((prev) => prev.filter((item) => item.cart_id !== cartId));
      if (!silent) toast.success("Item removed successfully.");
    } catch (error) {
      console.error("Error removing cart item:", error);
      if (!silent) toast.error("Failed to remove item.");
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add items before checking out.");
      return;
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.subject_price),
      0
    );

    if (totalAmount <= 0) {
      toast.error("Invalid total amount. Please check your cart items.");
      return;
    }

    try {
      // Step 1: Create order using backend API
      const { data } = await axios.post(`${BASEURL}/data/processPayment`, {
        amount: totalAmount,
      });

      const options = {
        key: "rzp_live_Qlf70Mrgd6jWPb", // Razorpay Key ID
        amount: totalAmount * 100, // Amount in paise (Razorpay expects amount in paise)
        // amount: 1, // Amount in paise (Razorpay expects amount in paise)
        currency: "INR",
        name: "GIA SCHOOL",
        description: "Order Payment",
        image: "https://your-logo-url.com",
        order_id: data.order_id,
        handler: function (response) {
          // Handle the response after payment success
          toast.success("Payment successful");
          // Perform further actions like updating cart, etc.
          navigate("/payment", { state: { paymentSuccess: true } });
        },
        prefill: {
          name: "User's Name",
          email: "user@example.com",
          contact: userPhone.user?.phone,
        },
        theme: {
          color: "#FF9F00",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error("Razorpay is not loaded properly. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to initiate payment.");
    }
  };

  const handlePayment = async () => {
    const totalAmount = calculateTotal();

    if (cartItems.length === 0 || totalAmount <= 0) {
      toast.error("Your cart is empty or the total amount is invalid.");
      return;
    }

    try {
      // Step 1: Create order using backend API
      const { data } = await axios.post(`${BASEURL}/data/processPayment`, {
        amount: 1,
      });

      const options = {
        key: "rzp_live_Qlf70Mrgd6jWPb",
        // amount: totalAmount * 100, // Amount in paise
        amount: 1 * 100, // Amount in paise
        currency: "INR",
        name: "GIA SCHOOL",
        description: "Order Payment",
        image: "https://your-logo-url.com",
        order_id: data.order_id,
        handler: async (response) => {
          // Step 2: Save transaction history to the database
          try {
            await axios.post(`${BASEURL}/data/insertpayment_hsitory`, {
              user_id: userPhone.user?.empid,
              payment_amount: totalAmount,
              razorpay_trans_id: response.razorpay_payment_id,
              payment_status: true,
            });

            // Step 3: Clear the cart
            await Promise.all(
              cartItems.map((item) => removeCartItem(item.cart_id, true))
            );

            // Step 4: Show success toast and navigate
            toast.success("Payment successful. Cart cleared.");
            navigate("/GetSubject");
          } catch (error) {
            console.error(
              "Error saving transaction history or clearing cart:",
              error
            );
            toast.error(
              "Payment recorded, but there was an issue clearing your cart."
            );
          }
        },
        prefill: {
          name: "naveen kumar gowda", //your customer's name
          email: "naveenkumargowda952@gmail.com",
          contact: "7382746854", //Provide the customer's phone number }
        },
        theme: {
          color: "#FF9F00",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error("Razorpay is not loaded properly. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to initiate payment.");
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    if (paymentSuccess) {
      toast.success("Payment successful. Cart updated.");
    }
  }, [paymentSuccess]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + parseFloat(item.subject_price),
      0
    );
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-white to-indigo-50">
      {/* <Navbar /> */}
      <NavbarSignIn />
      <div className="container mx-auto md:p-8">
        <div>
          <h1 className="text-3xl font-medium text-center mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg relative">
            My Cart
            <p>
              {" "}
              <Link to="/GetSubject">
                <button className=" p-1 rounded absolute left-3 top-1/2 transform -translate-y-1/2 text-md">
                  &lt;
                </button>
              </Link>
            </p>
          </h1>
        </div>

        <Toaster position="top-left" reverseOrder={false} />

        {loading ? (
          <Loading />
        ) : cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">Your cart is empty.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate("/GetSubject")}
            >
              Add Subjects
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap w-full justify-between gap-5">
              <ul className="flex flex-col items-center md:gap-5">
                {cartItems.map((item) => (
                  <li
                    key={item.cart_id}
                    bg-white
                    className="items-center justify-between gap-36 p-4 rounded-lg md:w-[950px] 
                      md:h-[300px] h-[500px] mb-5 bg-white border border-grey-600 shadow-lg hover:shadow-2xl transform hover:scale-105 
                      transition-transform duration-300"
                  >
                    <div className="flex md:gap-20 gap-3 rounded-lg md:p-6 relative">
                      {item.subject_image_url ? (
                        <img
                          src={item.subject_image_url || "/placeholder.jpg"}
                          alt={item.subject_name}
                          className="w-32 h-50 object-cover rounded-md shadow-lg p-2"
                        />
                      ) : (
                        // <div className="w-full h-64 w-5/6 bg-gray-200 flex items-center justify-center rounded-md">
                        //   <FaCartShopping className="text-6xl text-gray-400" />
                        // </div>
                        <img src={image} className="md:w-96 md:h-60" />
                      )}
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <p className="text-lg font-semibold text-gray-600">
                              {item.board_name}
                            </p>
                            <p> : </p>
                            <h2 className="text-lg font-base">
                              {item.subject_name}
                            </h2>
                          </div>
                          <RxCross1
                            className=""
                            style={{ cursor: "pointer" }}
                            onClick={() => removeCartItem(item.cart_id)}
                          />
                        </div>
                        <div className="gap-6 justify-between items-baseline font-bold">
                          <p className="text-sm text-gray-600">
                            <span className="text-sm">Class </span> : <span>{item.class_name} </span>
                          </p>
                          <div className="flex items-center gap-3 md:mt-2 md:mb-2">
                            <img src={profile} alt="" />
                            <span className="text-xs font-medium">Admin</span>
                          </div>
                          <div className="product-rating flex items-center gap-2 my-1">
                            <div className="stars text-yellow-500 text-xl">
                              ★
                            </div>
                            <span className="rating text-sm">4.5 <span className="text-xs font-medium">(254)</span></span>
                          </div>
                          <div className="flex justify-between gap-2 my-2">
                            <div className="product-delivery flex items-center gap-2 my-2">
                              <img src={bookOpen} />
                              <span className="best-price text-xs">
                                Lesson (9)
                              </span>
                            </div>
                            <div className="product-delivery flex items-center gap-2 my-2">
                              <img src={clock} />
                              <span className="best-price text-xs">3h 10m</span>
                            </div>
                          </div>
                          <hr />
                          <button className="text-2xl text-white rounded bg-blue-600 font-medium px-5 py-2
                           md:mt-4 mt-4"
                           style={{letterSpacing: "1px"}}
                           >
                            ₹{item.subject_price}
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* <button
                      className="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => removeCartItem(item.cart_id)}
                    >
                      Remove
                    </button> */}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col w-96 h-96 bg-white border-white-600">
                <h2 className="text-center md:mt-5 md:mb-5 mt-5 mb-5">Price Details</h2>
                <hr />
                {cartItems.map((item) => (
                  <p key={item.cart_id} className="text-lg md:px-5 md:pt-3 md:mb-5">
                    {item.subject_name} : ₹ {item.subject_price}
                  </p>
                ))}
                <hr />
                <div className="flex items-center text-2xl font-semibold px-5 md:mt-5">
                  <p>Total Amount : ₹{calculateTotal()}</p>
                </div>
                <div className="px-3">
                  <button
                    className="w-full bg-blue-500 md:px-5 text-white px-4 py-2 rounded hover:bg-blue-600 md:mt-5"
                    onClick={handlePayment}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CartScreen;
