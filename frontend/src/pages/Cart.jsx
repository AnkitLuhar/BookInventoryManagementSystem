import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-from-cart",
          { headers }
        );
        setCart(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };
    fetchCartItems();
  }, []);

  // Fetch product details for items in cart
  useEffect(() => {
    if (cart.length > 0) {
      const fetchProducts = async () => {
        try {
          const productPromises = cart.map(async (item) => {
            const response = await axios.get(
              `http://localhost:8080/get-book-by-id/${item}`
            );
            return response.data; // Assuming response.data is the product information
          });

          const productData = await Promise.all(productPromises);

          setProducts(productData.map((item) => item.data));
          console.log(products.map((item) => item));
        } catch (error) {
          console.error("Error fetching products", error);
        }
      };
      fetchProducts();
    }
  }, [cart]); // Dependency on cart to ensure products are fetched only when cart is updated

  const deleteItem = async (bookid) => {
    const res = await axios.post(
      `http://localhost:8080/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(res.data.message);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let totals = 0;
      products.map((items) => {
        totals += Number(items.price);
      });
      setTotal(totals);
      // totals = 0;
    }
  }, [total]);

  const PlaceOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/place-order",
        { order: products.map((item) => item) },
        { headers }
      );
      alert(res.data.message);
      navigate("/profile/orderHistory");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen bg-zinc-900 px-12 py-8">
      {!cart && cart.length === 0 ? (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {products.length === 0 && (
            <div className="h-screen">
              <div className="h-[100%] flex items-center justify-center flex-col">
                <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                  Empty Cart
                </h1>
                <CiShoppingCart className="mt-8 text-zinc-300" size={100} />
              </div>
            </div>
          )}
          {products.length > 0 && (
            <>
              <h1 className="text-5xl font-serif text-zinc-500 mb-8">
                Your Cart
              </h1>
              {products.map((item, i) => (
                <div
                  className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                  key={i}
                >
                  <img
                    src={item.url}
                    className="h-[20vh] object-cover md:h-[10vh]"
                    alt={item.title}
                  />
                  <div className="w-full md:w-auto">
                    <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                      {item.title}
                    </h1>
                    <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                      {item.desc.slice(0, 100)}...
                    </p>
                    <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                      {item.desc.slice(0, 65)}...
                    </p>
                    <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                      {item.desc.slice(0, 100)}...
                    </p>
                  </div>
                  <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                    <h2 className="text-zinc-100 text-3xl font-semibold flex">
                      ₹ {item.price}
                    </h2>
                    <button
                      className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                      onClick={() => deleteItem(item._id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
          {cart && cart.length > 0 && (
            <div className="mt-4 w-full flex items-center justify-end">
              <div className="p-4 bg-zinc-800 rounded">
                <h1 className="text-3xl text-zinc-200 font-semibold">
                  Total Amount
                </h1>
                <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                  <h2>{cart.length} books</h2>
                  <h2> ₹ {total}</h2>
                </div>
                <div className="w-[100%] mt-3">
                  <button
                    className="bg-zinc-100 rounded px-4 py-2 flex items-centerw-full font-semibold hover:bg-zinc-300"
                    onClick={PlaceOrder}
                  >
                    Place your order
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
