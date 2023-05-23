import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import './App.css';
// user profiling imports 
import Signin from './pages/UserProfiling/Signin';
import Signup from './pages/UserProfiling/Signup';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import AdminSignin from './pages/Administrator/AdminSignin';
import ForgotPassword from './pages/UserProfiling/ForgotPassword';
import EmailSent from './pages/UserProfiling/EmailSent';
import SetNewPass from './pages/UserProfiling/SetNewPass';
import PasswordReset from './pages/UserProfiling/PasswordReset';
import Wishlist from './pages/UserProfiling/Wishlist';
import AddAddress from './pages/UserProfiling/AddAddress';
import AddPayment from './pages/UserProfiling/AddPayment';
import DeleteAccount from './pages/UserProfiling/DeleteAccount';
import EditPrescriptions from './pages/UserProfiling/EditPrescriptions';
import MyDetails from './pages/UserProfiling/MyDetails';
import PrescriptionDetails from './pages/UserProfiling/PrescriptionDetails';
import AddPrescription from './pages/UserProfiling/AddPrescription';
import GiftCards from './pages/UserProfiling/GiftCards';
import ChangePassword from './pages/UserProfiling/ChangePassword';
import UploadTryonImages from './pages/UserProfiling/UploadTryonImages';
import UploadUserImage from './pages/UserProfiling/UploadUserImage';
import SelectLensType from './pages/HomeScreens/SelectLensType';
import SelectPrescriptionOption from './pages/HomeScreens/SelectPrescriptionOption';
import SelectPrescriptionType from './pages/HomeScreens/SelectPrescriptionType';
import EnterPrescription from './pages/HomeScreens/EnterPrescription';
import ProfileHome from "./pages/ProfileHome";

// admin imports
import AddFrames from './pages/Administrator/AddFrames';
import AddLens from './pages/Administrator/AddLens';
import AddGlasses from './pages/Administrator/AddGlasses';

// Vision Assessments imports
import ColorBlindTest from './pages/VisionAssessments/ColorBlindTest'
import VisionAcuityTest from './pages/VisionAssessments/VisionAcuityTest'
import ContrastSensitivityTest from "./pages/VisionAssessments/ContrastSensitivityTest";
import AstigmatismTest from "./pages/VisionAssessments/AstigmatismTest";


function App() {
  return (
    <Router>
      <Routes>
        {/* User Profiling Routes */}
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="emailsent" element={<EmailSent />} />
        <Route path="profile" element={<ProfileHome />} />
        <Route path="wish" element={<Wishlist />} />
        <Route path="add_address" element={<AddAddress />} />
        <Route path="add_payment" element={<AddPayment />} />
        <Route path="delete_account" element={<DeleteAccount />} />
        <Route path="edit_prescription" element={<EditPrescriptions />} />
        <Route path="my_details" element={<MyDetails />} />
        <Route path="prescription_details" element={<PrescriptionDetails />} />
        <Route path="add_prescription" element={<AddPrescription />} />
        <Route path="giftcards" element={<GiftCards />} />
        <Route path="change_password" element={<ChangePassword />} />
        <Route path="upload_tryon_images" element={<UploadTryonImages />} />
        <Route path="upload_user_image" element={<UploadUserImage />} />
        
        {/* order management routes */}
        <Route path="select_prescription_type" element={<SelectLensType />} />
        <Route path="select_prescription_Option" element={<SelectPrescriptionOption />} />
        <Route path="select_prescription_Type" element={<SelectPrescriptionType />} />
        <Route path="select_prescription_Type" element={<SelectPrescriptionType />} />
        <Route path="enter_prescription" element={<EnterPrescription />} />

        {/* Admin Routes */}
        <Route path="add_frames" element={<AddFrames />} />
        <Route path="add_lens" element={<AddLens />} />
        <Route path="add_glasses" element={<AddGlasses />} />
        <Route path="*" element={<NoPage />} />

        {/* Vission Assessments */}
        <Route path="color_blind_test" element={<ColorBlindTest />} />
        <Route path="vision_acuity_test" element={<VisionAcuityTest />} />
        <Route path="contrast_sensitivity_test" element={<ContrastSensitivityTest />} />
        <Route path="astigmatism_test" element={<AstigmatismTest />} />
      </Routes>
    </Router>
  );
}

export default App;
