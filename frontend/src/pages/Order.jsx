import { MdOutlineReceiptLong } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Order() {
  const APIOrder = `http://localhost:8880/api/order`;
  const APIDrink = `http://localhost:8880/api/drink`;
  const [order, setOrder] = useState([]);
  const [drink, setDrink] = useState([]);
  const [formData, setFormData] = useState({
    drink_id: "",
    quantity: "",
  });

  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch API from Order
  const getOrder = async () => {
    try {
      const res = await axios.get(APIOrder);

      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch API from Drink
  const getDrink = async () => {
    try {
      const res = await axios.get(APIDrink);

      setDrink(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =====Input=====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (edit) {
        await axios.put(`${APIOrder}/${edit}`, formData);
        toast.success("Order updated successfully!");
      } else {
        await axios.post(APIOrder, formData);
        toast.success("Order added successfully!");
      }

      getOrder();
      setFormData({
        drink_id: "",
        quantity: "",
      });

      setEdit(null);

      document.getElementById("orderModal").checked = false;
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====Search=====
  const filterSearch = order.filter((o) => {
    return Object.values(o)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  // Pagination
  const totalPages = Math.ceil(filterSearch.length / itemsPerPage); // all orders / 10
  const currentOrders = filterSearch.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ====Edit====
  const handleUpdate = async (o) => {
    // Find the drink that matches this order's item_name
    const matchingDrink = drink.find((d) => d.item_name === o.item_name);

    setFormData({
      drink_id: matchingDrink ? matchingDrink.id : "",
      quantity: o.quantity,
    });

    setEdit(o.id);

    document.getElementById("orderModal").checked = true;
  };

  // ====Delete====
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`${APIOrder}/${id}`);
        getOrder();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    getOrder();
    getDrink();
  }, []);
  return (
    <div>
      <Toaster position="top-right" />
      <h1 className="text-3xl font-medium flex gap-2">
        <MdOutlineReceiptLong /> Order
      </h1>
      <p className="text-xl mt-2">This is where admin can view orders</p>

      <div className="space-x-2 mt-2">
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search..."
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition animate-pulse"
        />
        <label
          htmlFor="orderModal"
          className="btn bg-orange-400 px-4 py-2 rounded-lg hover:bg-orange-600 text-white"
        >
          Add Order
        </label>
      </div>

      {/* Modal */}
      <input type="checkbox" id="orderModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="flex items-center text-2xl font-semibold mb-2 gap-2">
            {edit ? "Update Order" : "Add Order"}
            <MdOutlineReceiptLong color="orange" />
          </h3>
          <hr />
          <form className="mt-2 flex flex-col" onSubmit={handleSubmit}>
            <label>Please enter the following</label>
            {/* <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              placeholder="Item name"
              className="outline-none border border-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-400 focus:border-orange-400 transition px-4 py-2 mt-2 rounded focus:animate-pulse"
            /> */}

            <select
              name="drink_id"
              value={formData.drink_id}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select a drink</option>
              {drink.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.item_name} - ${d.price}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Item amount"
              className="outline-none border border-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-400 focus:border-orange-400 transition px-4 py-2 mt-2 rounded focus:animate-pulse"
            />
            <div className="mt-2">
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2"
              >
                {edit ? "Update Order" : "Add Order"}
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="orderModal">
          Close
        </label>
      </div>

      <div className="overflow-x-auto mt-6">
        <h1 className="text-2xl font-semibold mb-4">Order Report</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Drink name</th>
              <th className="px-6 py-3 text-left font-semibold">Price</th>
              <th className="px-6 py-3 text-left font-semibold">Quantity</th>
              <th className="px-6 py-3 text-left font-semibold">Total price</th>
              <th className="px-6 py-3 text-left font-semibold">Ordered at</th>
              <th className="px-6 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          {currentOrders.length > 0 ? (
            <tbody>
              {currentOrders.map((o) => (
                <tr key={o.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{o.item_name}</td>
                  <td className="px-6 py-4">{o.price}</td>
                  <td className="px-6 py-4">{o.quantity}</td>
                  <td className="px-6 py-4 font-semibold">{o.total_price}</td>
                  <td className="px-6 py-4">
                    {new Date(o.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-x-2 flex items-center">
                      <button
                        className="hover:text-yellow-400"
                        onClick={() => handleUpdate(o)}
                      >
                        <FaRegEdit size={30} />
                      </button>
                      <button
                        className="hover:text-red-600"
                        onClick={() => handleDelete(o.id)}
                      >
                        <MdOutlineDelete size={30} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center py-8">
                  <div className="flex flex-col justify-center items-center mt-2 text-gray-400">
                    <MdOutlineReceiptLong
                      size={64}
                      className="mb-4 opacity-50"
                    />
                    <p className="text-lg">
                      The data is either doesn't exist or server isn't
                      connected...
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <div className="join mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`join-item btn btn-square shadow-md ${currentPage === page ? "btn-active bg-orange-400 text-white" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
