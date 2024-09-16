import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  About,
  ContactUs,
  CreateNewPassword,
  AppLayout,
  Home,
  Login,
  PageNotFound,
  ResetPassword,
  Signup,
  VerifyEmail,
} from "./pages";
import {
  AddCitiesForm,
  CitiesList,
  CityCard,
  CountryList,
  Layout,
} from "./components";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { useCheckAuth } from "./features/auth/authHookes";

function App() {
  useCheckAuth(); // Check authentication on app load
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="create-new-password/:token"
            element={<CreateNewPassword />}
          />

          {/* Public Route for Login and Signup, redirects if logged in */}
          <Route element={<PublicRoute />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace:true to="cities" />} />
              <Route path="cities" element={<CitiesList />} />
              <Route path="cities/:id" element={<CityCard />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<AddCitiesForm />} />
              <Route
                path="cities/delete/:id"
                element={<Navigate to="/app" />}
              />
            </Route>
          </Route>
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
