import { RiDrinksLine } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Menu() {
  const APIDrink = `http://localhost:8880/api/drink`;
  const APIOrder = `http://localhost:8880/api/order`;

  const [drink, setDrink] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (drink) => {
    const exist = cart.find((item) => item.id === drink.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === drink.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...drink, qty: 1 }]);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.qty,
    0,
  );

  // Fetch API from Drink
  const getDrink = async () => {
    try {
      const res = await axios.get(APIDrink);
      setDrink(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Input or Order
  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      for (const item of cart) {
        await axios.post(APIOrder, {
          drink_id: item.id,
          quantity: item.qty,
        });
      }

      toast.success("Checkout successfully!");
      setCart([]); // Clear cart after order
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getDrink();
  }, []);

  return (
    <div className="flex gap-6">
      <Toaster position="top-right" />

      {/* MENU */}
      <div className="flex-1 mt-6">
        {drink.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {drink.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    src={d.image_url}
                    alt={d.item_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                    {d.item_name}
                  </h3>

                  <p className="text-xl font-bold text-orange-500 mb-3">
                    ${parseFloat(d.price).toFixed(2)}
                  </p>

                  <button
                    onClick={() => addToCart(d)}
                    className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600"
                  >
                    <FaCartPlus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-12 text-gray-400">
            <RiDrinksLine size={64} className="mb-4 opacity-50" />
            <p className="text-lg">No drinks available</p>
          </div>
        )}
      </div>

      {/* CART */}
      <div className="w-80 bg-white shadow-xl p-6 flex flex-col">
        <h2 className="text-xl mb-4">Your Order</h2>

        <div className="flex-1 overflow-y-auto space-y-2">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between text-sm border-b pb-1">
              <span>
                {item.item_name} x{item.qty}
              </span>
              <span>${parseFloat(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="flex justify-between text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </p>

          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-black text-white py-3 rounded-lg text-lg"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
