import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export default function UnauthLayout() {
  return (
    <div className="antialiased bg-gray-100 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
