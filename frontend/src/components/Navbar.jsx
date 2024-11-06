import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const getHomeLink = () => {
    const path = window.location.pathname;
    if (path === "/login" || path === "/register") {
      return "/";
    }
    return "./dashboard";
  };

  const showLogout = () => {
    const path = window.location.pathname;
    return path !== "/login" && path !== "/register";
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md dark:bg-[#050505] dark:shadow-white/10">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <a href={getHomeLink()} className="text-lg font-bold sm:text-2xl">
                Questionnaire System
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                size="icon"
                onClick={toggleTheme}
                className="dark:text-white text-black "
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
            </div>
            {showLogout() && (
              <button
                onClick={handleLogout}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
