import { RiDrinksLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Profile from "../components/Profile";

export default function Drink() {
  const API = `${import.meta.env.VITE_API_URL}/api/drink`;
  const [drink, setDrink] = useState([]);
  const [formData, setFormData] = useState({
    item_name: "",
    price: "",
    image_url: "",
  });

  const [search, setSearch] = useState(""); // For search
  const [edit, setEdit] = useState(null); // For edit

  // Fetch Drinks from API
  const getDrink = async () => {
    try {
      const res = await axios.get(API);

      setDrink(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // =====Add Drink=====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (edit) {
        await axios.put(`${API}/${edit}`, formData);
        toast.success("Drink updated successfully!");
      } else {
        await axios.post(API, formData);
        toast.success("Drink added successfully");
      }

      getDrink();
      setFormData({
        item_name: "",
        price: "",
        image_url: "",
      });

      setEdit(null); // Reset edit mode

      // Close modal
      document.getElementById("drinkModal").checked = false;
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
  const filterSearch = drink.filter((d) => {
    return Object.values(d)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  // =====Delete=====
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`${API}/${id}`);
        getDrink();
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    }
  };

  // =====Edit=====
  const handleUpdate = async (d) => {
    setFormData({
      item_name: d.item_name, // use drink data
      price: d.price,
      image_url: d.image_url,
    });

    setEdit(d.id);

    document.getElementById("drinkModal").checked = true;
  };

  useEffect(() => {
    getDrink();
  }, []);
  return (
    <div className="">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium flex gap-2">
          <RiDrinksLine /> Overview
        </h1>
        <div className="hover:-translate-y-1 transition-transform duration-200">
          <Profile />
        </div>
      </div>

      <p className="text-xl mt-2">This is where admin can add or edit drinks</p>

      <div className="space-x-2 mt-2">
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition animate-pulse"
        />
        <label
          htmlFor="drinkModal"
          className="btn bg-orange-400 px-4 py-2 rounded-lg hover:bg-orange-600 text-white"
        >
          Add Drink
        </label>
      </div>

      {/* Modal */}
      <input type="checkbox" id="drinkModal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="flex items-center text-2xl font-semibold mb-2 gap-2">
            {edit ? "Update Drink" : "Add Drink"}
            <RiDrinksLine color="orange" />
          </h3>
          <hr />
          <form className="mt-2 flex flex-col" onSubmit={handleSubmit}>
            <label>Please enter the following</label>
            <input
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              placeholder="Drink name"
              className="outline-none border border-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-400 focus:border-orange-400 transition px-4 py-2 mt-2 rounded focus:animate-pulse"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              min={0.01}
              step={0.01}
              onChange={handleChange}
              placeholder="Drink price"
              className="outline-none border border-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-400 focus:border-orange-400 transition px-4 py-2 mt-2 rounded focus:animate-pulse"
            />
            {/* <label className="inline-block cursor-pointer outline-none ring-2 ring-transparent hover:ring-orange-400 focus-within:ring-orange-400 transition px-4 py-2 mt-2 rounded bg-white border border-gray-300">
              Choose drink image
              <input
                type="file"
                name="image_url"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
              />
            </label> */}
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Paste image URL (e.g., https://...)"
              className="outline-none border border-gray-300 focus:ring-2 focus:ring-orange-400 transition px-4 py-2 mt-2 rounded"
            />
            <div className="mt-2">
              <button
                type="submit"
                className="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2"
              >
                {edit ? "Update Drink" : "Add Drink"}
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="drinkModal">
          Close
        </label>
      </div>

      {/* Menu */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>

        {filterSearch.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filterSearch.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  <img
                    src={d.image_url}
                    alt={d.item_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-2 line-clamp-2">
                    {d.item_name}
                  </h3>
                  <p className="text-xl font-bold text-orange-500 mb-3">
                    ${parseFloat(d.price).toFixed(2)}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 hover:text-yellow-700 transition-colors"
                      onClick={() => handleUpdate(d)}
                      title="Edit"
                    >
                      <FaRegEdit size={20} />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors"
                      onClick={() => handleDelete(d.id)}
                      title="Delete"
                    >
                      <MdOutlineDelete size={20} />
                    </button>
                  </div>
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
    </div>
  );
}
