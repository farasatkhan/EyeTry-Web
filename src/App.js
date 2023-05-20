import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import './App.css';
import Signin from './pages/UserProfiling/Signin';
import Signup from './pages/UserProfiling/Signup';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import AdminSignin from './pages/Administrator/AdminSignin';
import ForgotPassword from './pages/UserProfiling/ForgotPassword';
import EmailSent from './pages/UserProfiling/EmailSent';
import SetNewPass from './pages/UserProfiling/SetNewPass';
import Profile1 from './pages/UserProfiling/Profile1';
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
import SelectPrescriptionType from './pages/HomeScreens/SelectPrescriptionType';
import SelectPrescriptionOption from './pages/HomeScreens/SelectPrescriptionOption';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="emailsent" element={<EmailSent />} />
        <Route path="profile" element={<Profile1 />} />
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
        <Route path="select_prescription_type" element={<SelectPrescriptionType />} />
        <Route path="select_prescription_Option" element={<SelectPrescriptionOption />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
