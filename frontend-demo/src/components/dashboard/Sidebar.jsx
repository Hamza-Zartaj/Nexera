import {
  House,
  LogOut,
  Map,
  NotebookPen,
  Rss,
  Settings,
  User,
} from "lucide-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuItems = [
    { name: "Home", path: "/user/home", icon: <House /> },
    { name: "Quiz", path: "/user/quiz", icon: <User /> },
    { name: "Roadmap", path: "/user/roadmap", icon: <Map /> },
    // { name: "Tasks", path: "/user/task", icon: <NotebookPen /> },
    { name: "Resources", path: "/user/resources", icon: <Rss /> },
    { name: "Settings", path: "/user/setting", icon: <Settings /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className="h-full bg-black max-w-80 w-full p-4">
      <h6 className="uppercase font-bold text-sm text-primaryPurple-400">
        WElcome
      </h6>

      <div className="flex flex-col gap-2 py-8 h-full">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              className={`flex items-center py-2 px-4 rounded-md text-gray-400 hover:bg-primaryPurple-700/25 hover:text-primaryPurple-400 transition-all duration-150 ${
                isActive ? "bg-primaryPurple-700/25 text-primaryPurple-400" : ""
              }`}
              key={index}
            >
              <Link className="w-full flex items-center gap-4" to={item.path}>
                <span className="text-lg">{item.icon}</span>
                <span className=" font-semibold">{item.name}</span>
              </Link>
            </div>
          );
        })}

        <div
          onClick={handleLogout}
          className="cursor-pointer flex mt-auto items-center py-2 px-4 rounded-md text-gray-400 hover:bg-primaryPurple-700/25 hover:text-primaryPurple-400 transition-all duration-150 "
        >
          <div className="w-full flex items-center gap-4">
            <span className="text-lg">
              <LogOut />
            </span>
            <span className="font-semibold uppercase">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
