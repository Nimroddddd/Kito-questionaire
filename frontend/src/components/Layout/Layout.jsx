import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import ProtectedRoute from "../ProtectedRoute";

export default function Layout() {
  return (
    <ProtectedRoute>
      <div className="antialiased bg-gray-100 dark:text-white text-black dark:bg-[#050505] min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </ProtectedRoute>
  );
}
