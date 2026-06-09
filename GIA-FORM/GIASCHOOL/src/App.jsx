import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/Admin/Login";
// import UserLogin from "./pages/User/Login";
import Landing from "./components/Landing";
// import Navbar from "./components/Navbar";
import NotFoundPage from "./components/NotFoundPage";
// admin
import AdminLoginNew from "./pages/Admin/AdminLogin";
import AdminDashboad from "./pages/Admin/AdminDashboad";
import DashboardForUpdate from "./pages/Admin/DashboardForUpdate";
import Setup from "./pages/Admin/Setup";
import UploadVideo from "./pages/Admin/UploadVideo";
import SubAdminCreation from "./pages/Admin/SubAdminCreation";
import Board from "./pages/Admin/Board";
import Class from "./pages/Admin/Class";
import Subject from "./pages/Admin/Subject";
import SubSubject from "./pages/Admin/SubSubject";
import SubjectDetails from "./pages/Admin/SubjectDetails";
// import Signup from "./pages/User/SignUp";
// import Verify from "./pages/User/Verify";
// import SearchBar from "./components/SearchBar";
// import Header from "./components/Header";
import AuthForm from "./components/SignupForm";
import GetBoard from "./pages/User/GetBoard";
import GetClasses from "./pages/User/GetClasses";
import GetSubject from "./pages/User/GetSubject";
import GetSubSubject from "./pages/User/GetSubSubject";
import UserPurchase from "./pages/User/UserPurchase";
import UserPlayerVideo from "./pages/User/UserPlayerVideo";
import Chapters from "./pages/Admin/Chapters";
import Topics from "./pages/Admin/Topics";
import GetChapters from "./pages/User/GetChapters";
import GetTopic from "./pages/User/GetTopic";
import UserVideoPlayer from "./pages/User/UserVideoPlayer";
import ChatApt from "./pages/User/ChatApt";
import CartScreen from "./pages/User/CartScreen";
import Payment from "./pages/User/Payment";
import Favourites from "./pages/User/Favourites";
import Profile from "./pages/User/Profile";
import MyCourse from "./pages/User/MyCourse";
import { Classes } from "./components/Classes";
import { AllCourse } from "./components/AllCourse";
import Testimonial from "./pages/Admin/Testimonial";
import ClassesDetailPage from "./components/ClassesDetailPage";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/AdminLoginNew" element={<AdminLoginNew />} />
          <Route path="/AdminDashboad" element={<AdminDashboad />} />
          <Route path="/DashboardForUpdate" element={<DashboardForUpdate />} />
          <Route path="/Setup" element={<Setup />} />
          <Route path="/UploadVideo" element={<UploadVideo />} />
          <Route path="/SubAdminCreation" element={<SubAdminCreation />} />
          <Route path="/Board" element={<Board />} />
          <Route path="/Class" element={<Class />} />
          <Route path="/Subject" element={<Subject />} />
          <Route path="/SubSubject" element={<SubSubject />} />
          <Route path="/SubjectDetails" element={<SubjectDetails />} />
          {/* User Login Route */}
          <Route path="/signup" element={<AuthForm type="signup" />} />
          <Route path="/signin" element={<AuthForm type="signin" />} />
          <Route path="/GetBoard" element={<GetBoard />} />
          <Route path="/GetClasses" element={<GetClasses />} />
          <Route path="/GetSubject" element={<GetSubject />} />
          <Route path="/GetSubSubject" element={<GetSubSubject />} />
          <Route path="/UserPurchase" element={<UserPurchase />} />
          <Route path="/UserPlayerVideo" element={<UserPlayerVideo />} />
          <Route path="/Chapters" element={<Chapters />} />
          <Route path="/Topics" element={<Topics />} />
          <Route path="/GetChapters" element={<GetChapters />} />
          <Route path="/GetTopic" element={<GetTopic />} />
          <Route path="/UserVideoPlayer" element={<UserVideoPlayer />} />
          <Route path="/ChatApt" element={<ChatApt />} />
          <Route path="/CartScreen" element={<CartScreen />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Favourite" element={<Favourites />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/MyCourse" element={<MyCourse />} />
          <Route path="/Board-Class" element={<Classes />} />
          <Route path="/AllCourse" element={<AllCourse />}></Route>
          <Route path="/Testimonial" element={<Testimonial />}></Route>
          <Route path="/classes/:classId" element={<ClassesDetailPage />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
