import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Sign_In from "./Components/Sign_In";
import NotFoundPage from "./Components/NotFoundPage";
import AdminLogin from "./Components/AdminLogin";
import ServiceProviderLogin from "./Components/ServiceProviderLogin";
import Dashboard from "./Pages/users/Dashboard";
import GstRegistrationCompany from "./Pages/users/GstRegistrationCompany";
import AdminDashboad from "./Pages/Admin/AdminDashboad";
import VendorDashboard from "./Pages/Vendor/VendorDashboard";
import Services from "./Pages/users/Services";
import PartnerRegistrationPage from "./Pages/users/PartnerRegistrationPage";
import BusinessRegistrationForm from "./Pages/users/BusinessRegistrationForm";
import AffidavitsRequest from "./Pages/users/AffidavitsRequest";
import NewEnquiry from "./Pages/Admin/NewEnquiry";
import DashboardForUpdate from "./Pages/Admin/DashboardForUpdate";
import ListOfPropertyRegistration from "./Pages/Admin/ListOfPropertyRegistration";
import PropertyRegistration from "./Pages/users/PropertyRegistration";
import ListOfGstRegistration from "./Pages/Admin/ListOfGstRegistration";
import ListAffidavitsRequest from "./Pages/Admin/ListAffidavitsRequest";
import InsertGstRegistrations from "./Pages/Admin/InsertGstRegistrations";
import InsertPanRegistrations from "./Pages/Admin/InsertPanRegistrations";
import InsertTanRegistrations from "./Pages/Admin/InsertTanRegistrations";
import InsertTdsReturns from "./Pages/Admin/InsertTdsReturns";
import InsertLegalNotices from "./Pages/Admin/InsertLegalNotices";
import InsertAffidavid from "./Pages/Admin/InsertAffidavid";
import InsertSaleAggrement from "./Pages/Admin/InsertSaleAggrement.jsx";
import RentalAgreement from "./Pages/users/RentalAgreement";
import PanRegistrationsRequest from "./Pages/users/PanRegistrationsRequest";
import TanRegistrationsRequest from "./Pages/users/TanRegistrationsRequest";
import UserForUpdate from "./Pages/users/UserForUpdate";
import UserListAffidavitsRequest from "./Pages/users/UserListAffidavitsRequest";
import GSTListRequest from "./Pages/users/GSTListRequest";
import TdsReturnsRequest from "./Pages/users/TdsReturnsRequest";
import LegalNoticesRequest from "./Pages/users/LegalNoticesRequest";
import SaleAggrementRequest from "./Pages/users/SaleAggrementRequest";
import SaledeedRequest from "./Pages/users/SaledeedRequest";
import AffidavidRequest from "./Pages/users/AffidavidRequest";
import UserListOfGstRegistration from "./Pages/users/UserListOfGstRegistration";
import UserListOfPropertyRegistration from "./Pages/users/UserListOfPropertyRegistration";
// vendor
import VendorForUpdate from "./Pages/Vendor/VendorForUpdate";
import VendorListOfPropertyRegistration from "./Pages/Vendor/VendorListOfPropertyRegistration";
import VendorListOfGstRegistration from "./Pages/Vendor/VendorListOfGstRegistration";
import VendorListAffidavitsRequest from "./Pages/Vendor/VendorListAffidavitsRequest";
import ListofPanRegistration from "./Pages/Admin/ListofPanRegistration.jsx";
import ListofTanRegistration from "./Pages/Admin/ListofTanRegistration.jsx";
import ListSaleAggrement from "./Pages/Admin/ListSaleAggrement";
import ListofTdsReturns from "./Pages/Admin/ListofTdsReturns.jsx";
import ListLegalNotices from "./Pages/Admin/ListLegalNotices.jsx";
import ListSaledeed from "./Pages/Admin/ListSaledeed";
import ListAffidavid from "./Pages/Admin/ListAffidavid";
import Login from "./Pages/users/Login";
import Signup from "./Pages/users/Signup";
//dynamic form
import AdminFormBuilder from "./dynamicForm/AdminFormBuilder";
import FormRenderer from "./dynamicForm/FormRenderer";
import FormResponses from "./dynamicForm/FormResponses";
import ListOfForms from "./dynamicForm/ListOfForms";
import InsertSaledeed from "./Pages/Admin/InsertSaledeed";
function App() {
  return (
    <>
      {" "}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/DashboardForUpdate"
              element={<DashboardForUpdate />}
            />
            <Route path="/Sign_In" element={<Sign_In />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route
              path="/ServiceProviderLogin"
              element={<ServiceProviderLogin />}
            />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route
              path="/GstRegistrationCompany"
              element={<GstRegistrationCompany />}
            />
            <Route path="/AdminDashboad" element={<AdminDashboad />} />
            <Route path="/VendorDashboard" element={<VendorDashboard />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/NewEnquiry" element={<NewEnquiry />} />
            <Route
              path="/PartnerRegistrationPage"
              element={<PartnerRegistrationPage />}
            />
            <Route
              path="/BusinessRegistrationForm"
              element={<BusinessRegistrationForm />}
            />
            <Route
              path="/ListOfPropertyRegistration"
              element={<ListOfPropertyRegistration />}
            />
            <Route
              path="/PropertyRegistration"
              element={<PropertyRegistration />}
            />
            <Route
              path="/ListOfGstRegistration"
              element={<ListOfGstRegistration />}
            />
            <Route
              path="/ListAffidavitsRequest"
              element={<ListAffidavitsRequest />}
            />
            <Route path="/AffidavitsRequest" element={<AffidavitsRequest />} />
            {/* vendor */}
            <Route path="/VendorForUpdate" element={<VendorForUpdate />} />
            <Route
              path="/VendorListOfPropertyRegistration"
              element={<VendorListOfPropertyRegistration />}
            />
            <Route
              path="/VendorListOfGstRegistration"
              element={<VendorListOfGstRegistration />}
            />
            <Route
              path="/VendorListAffidavitsRequest"
              element={<VendorListAffidavitsRequest />}
            />
            {/* user */}
            <Route path="/RentalAgreement" element={<RentalAgreement />} />
            <Route path="/UserForUpdate" element={<UserForUpdate />} />
            <Route
              path="/InsertGstRegistrations"
              element={<InsertGstRegistrations />}
            />
            <Route
              path="/InsertPanRegistrations"
              element={<InsertPanRegistrations />}
            />
            <Route
              path="/InsertTanRegistrations"
              element={<InsertTanRegistrations />}
            />
            <Route path="/InsertTdsReturns" element={<InsertTdsReturns />} />
            <Route
              path="/InsertLegalNotices"
              element={<InsertLegalNotices />}
            />
            <Route path="/InsertAffidavid" element={<InsertAffidavid />} />
            <Route
              path="/InsertSaleAggrement"
              element={<InsertSaleAggrement />}
            />
            <Route
              path="/UserListAffidavitsRequest"
              element={<UserListAffidavitsRequest />}
            />
            <Route path="/GSTListRequest" element={<GSTListRequest />} />
            <Route
              path="/UserListOfGstRegistration"
              element={<UserListOfGstRegistration />}
            />
            <Route
              path="/UserListOfPropertyRegistration"
              element={<UserListOfPropertyRegistration />}
            />
            <Route
              path="/PanRegistrationsRequest"
              element={<PanRegistrationsRequest />}
            />
            <Route
              path="/TanRegistrationsRequest"
              element={<TanRegistrationsRequest />}
            />
            <Route path="/TdsReturnsRequest" element={<TdsReturnsRequest />} />
            <Route
              path="/LegalNoticesRequest"
              element={<LegalNoticesRequest />}
            />
            <Route
              path="/SaleAggrementRequest"
              element={<SaleAggrementRequest />}
            />
            <Route path="/SaledeedRequest" element={<SaledeedRequest />} />
            <Route path="/AffidavidRequest" element={<AffidavidRequest />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* forms dymaic */}
            <Route
              path="/AdminFormBuilder"
              element={<AdminFormBuilder />}
            />{" "}
            <Route path="/FormRenderer" element={<FormRenderer />} />{" "}
            <Route path="/FormResponses" element={<FormResponses />} />
            <Route path="/ListOfForms" element={<ListOfForms />} />
            <Route path="/InsertSaledeed" element={<InsertSaledeed />} />
            <Route
              path="/ListofPanRegistration"
              element={<ListofPanRegistration />}
            />
            <Route
              path="/ListofTanRegistration"
              element={<ListofTanRegistration />}
            />
            <Route
              path="/ListSaleAggrement"
              element={<ListSaleAggrement />}
            />
            <Route path="/ListofTdsReturns" element={<ListofTdsReturns />} />
            <Route path="/ListLegalNotices" element={<ListLegalNotices />} />
            <Route path="/ListSaledeed" element={<ListSaledeed />} />
            <Route path="/ListAffidavid" element={<ListAffidavid />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
