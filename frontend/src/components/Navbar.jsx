import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const getUserEmail = () => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return "";
      const parsed = JSON.parse(raw);
      return parsed?.email || "";
    } catch {
      return "";
    }
  };

  const email = getUserEmail();

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                React Jobs
              </span>
            </NavLink>

            <div className="md:ml-auto">
              <div className="flex space-x-2 items-center">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                {isAuthenticated && (
                  <> 
                  <NavLink to="/jobs" className={linkClass}>
                    Jobs
                  </NavLink>
                  <NavLink to="/add-job" className={linkClass}>
                    Add Job
                  </NavLink>
                    <span className="text-indigo-100 px-2">
                      Welcome{email ? `, ${email}` : ""}
                    </span>
                  </>
                )}

                {!isAuthenticated ? (
                  <>
                    <NavLink to="/login" className={linkClass}>
                      Login
                    </NavLink>
                    <NavLink to="/signup" className={linkClass}>
                      Sign Up
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={onLogout}
                    className="text-white hover:bg-gray-900 rounded-md px-3 py-2"
                    type="button"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
