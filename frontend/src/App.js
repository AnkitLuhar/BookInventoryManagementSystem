import React, { useEffect } from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourite from "./components/Profile/Favourite";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Setting from "./components/Profile/Setting";
const App = () => {
  const dispatch = useDispatch();
  // const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  });
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about-us" element={<Home />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourite />} />
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/setting" element={<Setting />} />
        </Route>
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
