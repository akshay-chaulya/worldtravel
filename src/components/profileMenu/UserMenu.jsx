import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openConfirmation } from "../../features/auth/authSlice";

const UserMenu = ({ isUserMenuOpen, setIsUserMenuOpen, user }) => {
  const dispatch = useDispatch();
  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);

  function handleMenuCloseing(e) {
    const target = e.target;
    const targetedText = target.innerText.toLowerCase();
    if (targetedText === "settings") return;
    if (target.closest("li")) setIsUserMenuOpen(false);
  }

  function handleLogout() {
    dispatch(
      openConfirmation({
        message: "Are you sure you want to logout?",
        actionType: "LOGOUT",
      })
    );
  }

  return (
    <div
      className={`user-menu z-50 absolute top-6 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
        isUserMenuOpen ? "block" : "hidden"
      }`}
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
          {user?.firstName + " " + user?.lastName}
        </span>
        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
          {user?.email}
        </span>
      </div>
      <ul
        onClick={handleMenuCloseing}
        className="py-2"
        aria-labelledby="user-menu-button"
      >
        <li>
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Dashboard
          </Link>
        </li>
        <li onClick={() => setIsSettingMenuOpen((v) => !v)}>
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Settings
          </Link>
          {isSettingMenuOpen && (
            <ul className="px-4" aria-labelledby="user-menu-button">
              <hr />
              <li>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  to="/reset-password"
                >
                  Reset password
                </Link>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  href="#"
                >
                  Delete account
                </a>
              </li>
              <hr />
            </ul>
          )}
        </li>
        <li onClick={handleLogout}>
          <Link
            to="/login"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
