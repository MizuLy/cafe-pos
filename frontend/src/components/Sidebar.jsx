import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiDrinksLine } from "react-icons/ri";
import { MdOutlineReceiptLong } from "react-icons/md";

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
      </ul>
    </div>
  );
}
