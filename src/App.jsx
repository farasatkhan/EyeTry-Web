import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Fragment, useState, useEffect } from "react";

// user profiling imports
import Signin from "./pages/User/UserProfiling/Signin";
import Signup from "./pages/User/UserProfiling/Signup";
import Home from "./pages/User/HomeScreens/Home";
import NoPage from "./pages/User/HomeScreens/NoPage";
import AdminSignin from "./pages/Admin/AdminSignin";
import ForgotPassword from "./pages/User/UserProfiling/ForgotPassword";
import EmailSent from "./pages/User/UserProfiling/EmailSent";
import SetNewPass from "./pages/User/UserProfiling/SetNewPass";
import PasswordReset from "./pages/User/UserProfiling/PasswordReset";
import ProfileHome from "./pages/User/HomeScreens/ProfileHome";
import Wishlist from "./pages/User/UserProfiling/Wishlist";
import AddAddress from "./pages/User/UserProfiling/AddAddress";
import EditAddress from "./pages/User/UserProfiling/EditAddress";
import AddPayment from "./pages/User/UserProfiling/AddPayment";
import EditPayment from "./pages/User/UserProfiling/EditPayment";
import DeleteAccount from "./pages/User/UserProfiling/DeleteAccount";
import EditPrescriptions from "./pages/User/UserProfiling/EditPrescriptions";
import MyDetails from "./pages/User/UserProfiling/MyDetails";
import PrescriptionDetails from "./pages/User/UserProfiling/PrescriptionDetails";
import AddPrescription from "./pages/User/UserProfiling/AddPrescription";
import GiftCards from "./pages/User/UserProfiling/GiftCards";
import ChangePassword from "./pages/User/UserProfiling/ChangePassword";
import UploadTryonImages from "./pages/User/UserProfiling/UploadTryonImages";
import UploadUserImage from "./pages/User/UserProfiling/UploadUserImage";
import FaceDetection from "./pages/User/FaceDetection/FaceDetection";
import MeasureIpd from "./pages/User/UserProfiling/MeasureIpd";
import SuccessAlert from "./components/ui/User/Alerts/SuccessAlert"
// Chat
import Chat from "./pages/User/Chat";

// admin imports
import AddFrames from "./pages/Admin/AddFrames";
import AddLens from "./pages/Admin/AddLens";
import AddGlasses from "./pages/Admin/AddGlasses";

// Vision Assessments imports
import ColorBlindTest from "./pages/User/VisionAssessments/ColorBlindTest";
import VisionAcuityTest from "./pages/User/VisionAssessments/VisionAcuityTest";
import ContrastSensitivityTest from "./pages/User/VisionAssessments/ContrastSensitivityTest";
import AstigmatismTest from "./pages/User/VisionAssessments/AstigmatismTest";
import TestHistory from "./pages/User/VisionAssessments/TestHistory";

import PrivateRoute from "./utils/privateRoutes/PrivateRoute";

import UserProfilingNavbar from "./layouts/User/UserProfilingNavbar";
import HomeNavbar from "./layouts/User/HomeNavbar";
import VissionAssessmentsNavbar from "./layouts/User/VissionAssessmentsNavbar";

import SelectLensTypeComponent from "./components/ui/User/SelectLensTypeComponent/SelectLensTypeComponent";

//cart
import Cart from "./pages/User/OrderManagement/Cart";

// Support Screens
import CustomerSupportDashboard from "./pages/CustomerSupport/dashboard";
import CustomerSupportNavbar from "./layouts/User/CustomerSupportNavbar";
import SupportTicketDetails from "./pages/CustomerSupport/SupportTicketDetails";
import PersonalInformation from "./pages/CustomerSupport/PersonalInformation";
import CSUploadUserImage from "./pages/CustomerSupport/UploadUserImage";
import ViewPersonalInfo from "./pages/CustomerSupport/ViewPersonalInfo";
// import CreateSupportTicket from "./pages/CustomerSupport/CreateSupportTicket";

// product pages
import ProductDetails from './pages/User/OrderManagement/ProductDetails'
import Products from './pages/User/HomeScreens/products'
import Filter from './pages/User/HomeScreens/filter'
import Tryon from './pages/User/OrderManagement/Tryon'


import { getStripeApiKey } from "./api/productsApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";



function App() {

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    getStripeApiKeyData()
  }, [])

  const getStripeApiKeyData = async () => {
    const { data } = await getStripeApiKey()
    setStripeApiKey(data.stripeApiKey)
    console.log(data.stripeApiKey)
  }


  const publicRoutes = (
    <Route>
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="emailsent" element={<EmailSent />} />
      <Route path="face_detection" element={<FaceDetection />} />
    </Route>
  );

  const privateRoutes = (
    <>

      {/* Home Screens routes */}
      <Route path="/" element={<PrivateRoute Component={HomeNavbar} />} >
        <Route index element={<PrivateRoute Component={Home} />} />
        <Route path="products/:page" element={<PrivateRoute Component={Products} />} />
        <Route path="filter" element={<PrivateRoute Component={Filter} />} />
        {/* product details */}
        <Route path="product_details/:id" element={<PrivateRoute Component={ProductDetails} />} />
        <Route path="select_lens/:id" element={<PrivateRoute Component={SelectLensTypeComponent} />} />

        <Route
          path="cart"
          element={
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PrivateRoute Component={Cart} />
              </Elements>
            )
          }
        />

        <Route path="tryon" element={<PrivateRoute Component={Tryon} />} />
      </Route>

      {/* Profile Management Routes */}
      <Route path="/user/*" element={<UserProfilingNavbar />}>
        <Route path="profile" element={<PrivateRoute Component={ProfileHome} />} />
        <Route path="wish" element={<PrivateRoute Component={Wishlist} />} />
        <Route path="add_address" element={<PrivateRoute Component={AddAddress} />} />
        <Route path="edit_address/:id" element={<PrivateRoute Component={EditAddress} />} />
        <Route path="add_payment" element={<PrivateRoute Component={AddPayment} />} />
        <Route path="edit_payment/:id" element={<PrivateRoute Component={EditPayment} />} />
        <Route path="delete_account" element={<PrivateRoute Component={DeleteAccount} />} />
        <Route path="edit_prescription" element={<PrivateRoute Component={EditPrescriptions} />} />
        <Route path="prescription_details" element={<PrivateRoute Component={PrescriptionDetails} />} />
        <Route path="add_prescription" element={<PrivateRoute Component={AddPrescription} />} />
        <Route path="change_password" element={<PrivateRoute Component={ChangePassword} />} />
        <Route path="upload_tryon_images" element={<PrivateRoute Component={UploadTryonImages} />} />
        <Route path="upload_user_image" element={<PrivateRoute Component={UploadUserImage} />} />
        <Route path="measure_ipd" element={<PrivateRoute Component={MeasureIpd} />} />
        <Route path="giftcards" element={<PrivateRoute Component={GiftCards} />} />
        <Route path="my_details" element={<PrivateRoute Component={MyDetails} />} />
        <Route path="success_alert" element={<PrivateRoute Component={SuccessAlert} />} />
      </Route>

      <Route path="/products/*" element={<PrivateRoute Component={UserProfilingNavbar} />} ></Route>

      {/* Vision Assessments */}
      <Route path="/assessments/*" element={<VissionAssessmentsNavbar />}>
        <Route path="color_blind_test" element={<PrivateRoute Component={ColorBlindTest} />} />
        <Route path="vision_acuity_test" element={<PrivateRoute Component={VisionAcuityTest} />} />
        <Route path="contrast_sensitivity_test" element={<PrivateRoute Component={ContrastSensitivityTest} />} />
        <Route path="astigmatism_test" element={<PrivateRoute Component={AstigmatismTest} />} />
        <Route path="test_history" element={<PrivateRoute Component={TestHistory} />} />
      </Route>

    {/* Chat Route  */}
    <Route path="/chat" element={<PrivateRoute Component={Chat} />} />

    {/* Password Reset Routes */}

      {/* admin routes */}
      <Route path="/admin_signin" element={<PrivateRoute Component={AdminSignin} />} />
      <Route path="/add_frames" element={<PrivateRoute Component={AddFrames} />} />
      <Route path="/add_lens" element={<PrivateRoute Component={AddLens} />} />
      <Route path="/add_glasses" element={<PrivateRoute Component={AddGlasses} />} />

      {/* Customer Support Routes */}
      <Route path="/support/*" element={<CustomerSupportNavbar />}>
        <Route index path="dashboard" element={<PrivateRoute Component={CustomerSupportDashboard} />} />
        <Route path="ticket_details" element={<PrivateRoute Component={SupportTicketDetails} />} />
        <Route path="personal_information" element={<PrivateRoute Component={PersonalInformation} />} />
        <Route path="upload_user_image" element={<PrivateRoute Component={CSUploadUserImage} />} />
        <Route path="view_personal_info" element={<PrivateRoute Component={ViewPersonalInfo} />} />
        {/* <Route path="create_support_ticket" element={<PrivateRoute Component={CreateSupportTicket} />} /> */}
      </Route>
    </>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        {publicRoutes}
        {privateRoutes}
      </Fragment>
    )
  );

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
