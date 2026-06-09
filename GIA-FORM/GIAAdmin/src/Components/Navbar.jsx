import { useNavigate } from "react-router-dom";
import image from "../images/logoImage.jpeg";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="flex items-center justify-between bg-white h-[10vh] border-b-2 shadow-md px-4 md:px-8">
        <div className="flex items-center">
          <img src={image} alt="Logo" className="h-[25vh] w-auto" />
        </div>
        <div className="lg:space-x-4">
          <button
            className="text-blue-500 hover:text-blue-700 underline"
            onClick={() => navigate("/ServiceProviderLogin")}
          >
            Become a Service Provider
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
             focus:outline-none dark:focus:ring-blue-800"
            onClick={() => navigate("/AdminLogin")}
          >
            Admin Login
          </button>
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => navigate("/signin")}
          >
            User Login
          </button>
        </div>
      </nav>
    </div>
  );
}
