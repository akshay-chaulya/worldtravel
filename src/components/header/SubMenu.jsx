import { Link, NavLink } from "react-router-dom";

const SubMenu = ({ subMenu }) => {
  return (
    <ul className="bg-inherit absolute left-3">
      {subMenu.map((item) => (
        <li key={item.text} className="py-1 px-4">
          <NavLink to={item.to}>{item.text}</NavLink>
          {item.subMenu ? <SubMenu subMenu={item.subMenu} /> : ""}
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
