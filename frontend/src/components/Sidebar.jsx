import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiDrinksLine } from "react-icons/ri";
import { MdOutlineReceiptLong } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";

export default function Sidebar() {
  return (
    <div className="h-screen w-[230px] bg-white shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Cafe</h2>

      <ul className="flex flex-col gap-2">
        <li>
          <Link
            to={"/dashboard"}
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition"
          >
            <LuLayoutDashboard size={20} />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to={"/drink"}
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition"
          >
            <RiDrinksLine size={20} />
            Drink
          </Link>
        </li>

        <li>
          <Link
            to={"/order"}
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition"
          >
            <MdOutlineReceiptLong size={20} />
            Order
          </Link>
        </li>

        <li>
          <Link
            to={"/kiosk"}
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition"
          >
            <CgMenuGridO size={20} />
            Menu
          </Link>
        </li>
      </ul>
      <ul className="bottom-5 absolute">
        <Link to={"/logout"}>
          <li className="border border-red-600 p-2 gap-3 rounded-lg hover:bg-red-500 hover:text-white flex items-center transition">
            <IoLogOutOutline size={20} />
            Log Out
          </li>
        </Link>
      </ul>
    </div>
  );
}
