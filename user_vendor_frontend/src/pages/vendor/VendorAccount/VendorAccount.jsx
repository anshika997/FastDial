import Sidebar from "../../../components/VendorSidebar";
import Navbar from "../../../components/VendorNavbar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SidebarMenu from "./SidebarMenu";
import ProfileSection from "./ProfileSection";
import EditServiceSection from "./EditServiceSection";
import RaiseIssueSection from "./RaiseIssueSection";
import BoostServiceSection from "./BoostServiceSection";
import HelpCenterSection from "./HelpCenterSection";

const VendorAccount = () => {
  const [activeSection, setActiveSection] = useState("Your Profile");
  const [mobileContentOpen, setMobileContentOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setMobileContentOpen(true);
    }
  }, []);

  const handleSectionSelect = (section) => {
    setActiveSection(section);
    setMobileContentOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeSection === "Raise Issue") {
      console.log("Issue raised");
      alert("Issue submitted successfully!");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "Your Profile":
        return <ProfileSection />;
      case "Edit Service Details":
        return <EditServiceSection />;
      case "Raise Issue":
        return <RaiseIssueSection handleSubmit={handleSubmit} />;
      case "Subscription":
        return <BoostServiceSection />;
      case "Help Center":
        return <HelpCenterSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-100 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:gap-4 h-[94%]">
            <div className={`w-full md:w-[35%] ${mobileContentOpen ? 'hidden md:block' : 'block md:block'}`}>
              <SidebarMenu
                activeSection={activeSection}
                setActiveSection={handleSectionSelect}
              />
            </div>
            <div className={`w-full md:w-[65%] ${mobileContentOpen ? 'block' : 'hidden md:block'} bg-white rounded-lg shadow h-full p-4 md:p-8 mx-0 md:mx-3 overflow-y-auto`}>
              <button 
                className="md:hidden mb-4 text-[#4285F4] font-bold text-lg"
                onClick={() => setMobileContentOpen(false)}
              >
                ← Back to Menu
              </button>
              {renderSection()}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default VendorAccount;