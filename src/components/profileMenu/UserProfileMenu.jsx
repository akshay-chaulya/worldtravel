import ProfileLogo from "../ProfileLogo";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";
import { selectUser } from "../../features/auth/authSelectors";
import { useLocation } from "react-router-dom";
import BtnPrimary from "../BtnPrimary";
import { useEffect, useState } from "react";
import { UserMenu } from "../";

const UserProfileMenu = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const pathname = useLocation().pathname.replace("/", "");
  let btnText = "Login";
  if (pathname === "login") btnText = "Sign up";

  useEffect(() => {
    function handleOutSideClick(e) {
      if (e.target.closest(".profile-logo")) return;
      if (!e.target.closest(".user-menu")) setIsUserMenuOpen(false);
    }

    document.addEventListener("click", handleOutSideClick);
    return () => document.removeEventListener("click", handleOutSideClick);
  }, [setIsUserMenuOpen]);

  return (
    <>
      {isAuthenticated ? (
        <ProfileLogo
          onClick={() => setIsUserMenuOpen((v) => !v)}
          url={user?.avatarUrl}
          className="profile-logo"
        />
      ) : (
        <BtnPrimary
          to={`/${btnText.toLowerCase().replace(" ", "")}`}
          text={btnText}
          className="md:text-[1em] md:px-[15px] md:py-[8px] md:text-center"
        />
      )}

      <UserMenu
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        user={user}
      />
    </>
  );
};

export default UserProfileMenu;
