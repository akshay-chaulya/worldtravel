import { useMemo } from "react";
import { NavItem, SubMenu } from "../";
import { navArray } from "../../config/ArraOfNavItems";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";

const NavLinks = ({ closeTheMenu, status = "hidden" }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const filteredNavItems = useMemo(() => {
    return navArray.filter((item) => {
      if (item.authRequired && !isAuthenticated) return false;
      if (item.hideWhenAuth && isAuthenticated) return false;
      return true;
    });
  }, [isAuthenticated]);

  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${status}`}
      id="navbar-sticky"
    >
      <ul className="main-nav flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {filteredNavItems.map((item) => {
          return (
            <NavItem
              onClick={closeTheMenu}
              key={item.text}
              to={item.to}
              text={item.text}
              subMenu={item.subMenu ? <SubMenu subMenu={item.subMenu} /> : ""}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default NavLinks;
