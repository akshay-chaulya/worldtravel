// Simplified Layout
import { Outlet } from "react-router-dom";
import {
  Footer,
  GlobalMessage,
  Loader,
  MainContainer,
  Navbar,
  OverlayContainer,
} from "../";
import { useSelector } from "react-redux";
import {
  selectApiStatus,
  selectIsLoading,
} from "../../features/ui/feedbackSelectors";
import ConfimationModal from "../ConfimationModal";

const Layout = () => {
  const isLoading = useSelector(selectIsLoading);
  const apiStatus = useSelector(selectApiStatus);

  if (!apiStatus) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-3xl text-center font-bold">
        Server down. Try after some time.
      </div>
    );
  }

  if (isLoading) {
    return (
      <OverlayContainer status={isLoading}>
        <Loader />
      </OverlayContainer>
    );
  }

  return (
    <>
      <ConfimationModal />
      <GlobalMessage />
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </>
  );
};

export default Layout;
