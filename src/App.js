import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';

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
import SelectLensType from './pages/User/HomeScreens/SelectLensType';
import SelectPrescriptionOption from './pages/User/HomeScreens/SelectPrescriptionOption';
import SelectPrescriptionType from './pages/User/HomeScreens/SelectPrescriptionType';
import EnterPrescription from './pages/User/HomeScreens/EnterPrescription';
import ProfileHome from "./pages/User/HomeScreens/ProfileHome";

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

function App() {
  return (
    <Router>
      <Routes>
        
        {/* User Profiling Routes */}

        <Route path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="emailsent" element={<EmailSent />} />
        <Route path="/profile" element={<PrivateRoute Component={ProfileHome} />} />
        <Route path="/wish" element={<PrivateRoute Component={Wishlist} />} />
        <Route path="/add_address" element={<PrivateRoute Component={AddAddress} />} />
        <Route path="/edit_address/:id" element={<PrivateRoute Component={EditAddress} />} />
        <Route path="/add_payment" element={<PrivateRoute Component={AddPayment} />} />
        <Route path="/edit_payment/:id" element={<PrivateRoute Component={EditPayment} />} />
        <Route path="/delete_account" element={<PrivateRoute Component={DeleteAccount} />} />
        <Route path="/edit_prescription" element={<PrivateRoute Component={EditPrescriptions} />} />
        <Route path="/prescription_details" element={<PrivateRoute Component={PrescriptionDetails} />} />
        <Route path="/add_prescription" element={<PrivateRoute Component={AddPrescription} />} />
        <Route path="/change_password" element={<PrivateRoute Component={ChangePassword} />} />
        <Route path="/upload_tryon_images" element={<PrivateRoute Component={UploadTryonImages} />} />
        <Route path="/upload_user_image" element={<PrivateRoute Component={UploadUserImage} />} />
        <Route path="/giftcards" element={<PrivateRoute Component={GiftCards} />} />
        <Route path="/my_details" element={<PrivateRoute Component={MyDetails} />} />
        

        {/* order management routes */}

        <Route path="/select_prescription_type" element={<PrivateRoute Component={SelectLensType} />} />
        <Route path="/select_prescription_Option" element={<PrivateRoute Component={SelectPrescriptionOption} />} />
        <Route path="/select_prescription_Type" element={<PrivateRoute Component={SelectPrescriptionType} />} />
        <Route path="/enter_prescription" element={<PrivateRoute Component={EnterPrescription} />} />


        {/* Admin Routes */}

        <Route path="/admin_signin" element={<PrivateRoute Component={AdminSignin} />} />
        <Route path="/add_frames" element={<PrivateRoute Component={AddFrames} />} />
        <Route path="/add_lens" element={<PrivateRoute Component={AddLens} />} />
        <Route path="/add_glasses" element={<PrivateRoute Component={AddGlasses} />} />


        {/* Vission Assessments */}

        <Route path="color_blind_test" element={<ColorBlindTest />} />
        <Route path="vision_acuity_test" element={<VisionAcuityTest />} />
        <Route path="contrast_sensitivity_test" element={<ContrastSensitivityTest />} />
        <Route path="astigmatism_test" element={<AstigmatismTest />} />
        <Route path="test_history" element={<TestHistory />} />


        {/* no page found */}

        <Route path="*" element={<NoPage />} />

      </Routes>
    </Router>
  );
}

export default App;
