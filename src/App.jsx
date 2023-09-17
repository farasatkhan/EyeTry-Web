import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes
} from "react-router-dom";
import { Fragment } from "react";

// user profiling imports 
import Signin from './pages/User/UserProfiling/Signin';
import Signup from './pages/User/UserProfiling/Signup';
import Home from './pages/User/HomeScreens/Home';
import NoPage from './pages/User/HomeScreens/NoPage';
import AdminSignin from './pages/Admin/AdminSignin';
import ForgotPassword from './pages/User/UserProfiling/ForgotPassword';
import EmailSent from './pages/User/UserProfiling/EmailSent';
import SetNewPass from './pages/User/UserProfiling/SetNewPass';
import PasswordReset from './pages/User/UserProfiling/PasswordReset';
import ProfileHome from "./pages/User/HomeScreens/ProfileHome";
import Wishlist from './pages/User/UserProfiling/Wishlist';
import AddAddress from './pages/User/UserProfiling/AddAddress';
import EditAddress from './pages/User/UserProfiling/EditAddress';
import AddPayment from './pages/User/UserProfiling/AddPayment';
import EditPayment from './pages/User/UserProfiling/EditPayment';
import DeleteAccount from './pages/User/UserProfiling/DeleteAccount';
import EditPrescriptions from './pages/User/UserProfiling/EditPrescriptions';
import MyDetails from './pages/User/UserProfiling/MyDetails';
import PrescriptionDetails from './pages/User/UserProfiling/PrescriptionDetails';
import AddPrescription from './pages/User/UserProfiling/AddPrescription';
import GiftCards from './pages/User/UserProfiling/GiftCards';
import ChangePassword from './pages/User/UserProfiling/ChangePassword';
import UploadTryonImages from './pages/User/UserProfiling/UploadTryonImages';
import UploadUserImage from './pages/User/UserProfiling/UploadUserImage';
// import SelectPrescriptionOption from './components/ui/User/OrderComponets/SelectPrescriptionOption';
// import SelectPrescriptionType from './pages/User/HomeScreens/SelectPrescriptionType';
// import EnterPrescription from './pages/User/HomeScreens/EnterPrescription';
// import SaveOrderPrescription from './pages/User/HomeScreens/SaveOrderPrescription';
// import ChooseLensPackage from './pages/User/HomeScreens/ChooseLensPackage';
// import SelectLensType from './pages/User/HomeScreens/SelectLensType';
// import SelectGlassesType from './components/ui/User/OrderComponets/SelectGlassesType';
// import AvailableCoatings from './pages/User/HomeScreens/AvailableCoatings';
// import ReviewSelections from './pages/User/HomeScreens/ReviewSelections';
// import SunglassesLensSelection from './pages/User/HomeScreens/SunglassesLensSelection';

// admin imports
import AddFrames from './pages/Admin/AddFrames';
import AddLens from './pages/Admin/AddLens';
import AddGlasses from './pages/Admin/AddGlasses';

// Vision Assessments imports
import ColorBlindTest from './pages/User/VisionAssessments/ColorBlindTest'
import VisionAcuityTest from './pages/User/VisionAssessments/VisionAcuityTest'
import ContrastSensitivityTest from "./pages/User/VisionAssessments/ContrastSensitivityTest";
import AstigmatismTest from "./pages/User/VisionAssessments/AstigmatismTest";
import TestHistory from "./pages/User/VisionAssessments/TestHistory";

import PrivateRoute from "./utils/privateRoutes/PrivateRoute"

import UserProfilingNavbar from "./layouts/User/UserProfilingNavbar"
import HomeNavbar from "./layouts/User/HomeNavbar"
import VissionAssessmentsNavbar from "./layouts/User/VissionAssessmentsNavbar"

import SelectLensTypeComponent from "./components/ui/User/SelectLensTypeComponent/SelectLensTypeComponent"

import Testsvg from "./components/ui/User/OrderComponets/Testsvg"

// import Test from "./components/ui/User/Test"

const publicRoutes = (
  <Route>
    <Route index element={<PrivateRoute Component={Home} />} />
    <Route path="signin" element={<Signin />} />
    <Route path="signup" element={<Signup />} />
    <Route path="forgotpassword" element={<ForgotPassword />} />
    <Route path="emailsent" element={<EmailSent />} />
    <Route path="test" element={<Testsvg />} />
    {/* <Route path="test" element={<Test />} /> */}
  </Route>
);

const privateRoutes = (
  <>
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
      <Route path="giftcards" element={<PrivateRoute Component={GiftCards} />} />
      <Route path="my_details" element={<PrivateRoute Component={MyDetails} />} />
    </Route>

    {/* Order Management Routes */}
    {/* <Route path="/home/*" element={<UserProfilingNavbar />}> */}
    <Route path="/order/*" element={<PrivateRoute Component={UserProfilingNavbar} />} >
      <Route path="select_lens" element={<PrivateRoute Component={SelectLensTypeComponent} />} />
      {/* <Route path="select_prescription_option" element={<PrivateRoute Component={SelectPrescriptionOption} />} />
      <Route path="select_prescription_type" element={<PrivateRoute Component={SelectPrescriptionType} />} />
      <Route path="enter_prescription" element={<PrivateRoute Component={EnterPrescription} />} />
      <Route path="save_order_prescription" element={<PrivateRoute Component={SaveOrderPrescription} />} />
      <Route path="choose_lens_package" element={<PrivateRoute Component={ChooseLensPackage} />} />
      <Route path="select_lens_type" element={<PrivateRoute Component={SelectLensType} />} />
      <Route path="available_coatings" element={<PrivateRoute Component={AvailableCoatings} />} />
      <Route path="review_selections" element={<PrivateRoute Component={ReviewSelections} />} />
      <Route path="sunglasses_lens_selection" element={<PrivateRoute Component={SunglassesLensSelection} />} /> */}
      {/* ... Other order management routes ... */}
    </Route>

    {/* Vision Assessments */}
    <Route path="/assessments/*" element={<VissionAssessmentsNavbar />}>
      <Route path="color_blind_test" element={<PrivateRoute Component={ColorBlindTest} />} />
      <Route path="vision_acuity_test" element={<PrivateRoute Component={VisionAcuityTest} />} />
      <Route path="contrast_sensitivity_test" element={<PrivateRoute Component={ContrastSensitivityTest} />} />
      <Route path="astigmatism_test" element={<PrivateRoute Component={AstigmatismTest} />} />
      <Route path="test_history" element={<PrivateRoute Component={TestHistory} />} />
    </Route>

    {/* admin routes */}
      <Route path="/admin_signin" element={<PrivateRoute Component={AdminSignin} />} />
      <Route path="/add_frames" element={<PrivateRoute Component={AddFrames} />} />
      <Route path="/add_lens" element={<PrivateRoute Component={AddLens} />} />
      <Route path="/add_glasses" element={<PrivateRoute Component={AddGlasses} />} />
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


function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
