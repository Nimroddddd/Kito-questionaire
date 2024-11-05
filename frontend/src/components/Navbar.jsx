export default function Navbar() {
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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href={getHomeLink()} className="sm:text-2xl text-lg font-bold">
                Questionnaire System
              </a>
            </div>
          </div>
          <div className="flex items-center">
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
