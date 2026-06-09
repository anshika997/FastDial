import logo from "../Images/white-logo.png";
import { FaInstagram, FaLinkedin, FaMap , FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-10 px-6 sm:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="mb-4 max-w-[250px]" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-3">Contact Us</h3>
            <div className="flex items-center gap-3 mb-3">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=experiencepaillion@gmail.com" className="flex items-center gap-2">
              <FaEnvelope className="text-xs" />
              <p className="text-xs">experiencepaillion@gmail.com</p>
            </a>
            </div>
            <div className="flex items-start gap-3">
            <a
              href="https://www.google.com/maps/search/?q=No.9/192+4th+Cross,+Kirloskar+Colony,+WOC+Road,+Basaveshwarnagar,+Bangalore+560079"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3"
            >
              <FaMap className="text-3xl mt-1" />
              <p className="text-xs">
                No.9/192 4th Cross, Kirloskar Colony, WOC Road, Basaveshwarnagar, Bangalore 560079.
              </p>
            </a>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
              <li><Link to="/#" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>About Us</Link></li>
              <li><Link to="/AllCourse" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Courses</Link></li>
              <li><Link to="/#" className="hover:underline" onClick={() => window.scrollTo(0, 0)}>Mentors</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-3">Boards</h3>
            <ul className="space-y-2 text-xs">
              <li>CBSE</li>
              <li>ICSE</li>
              <li>SSLC</li>
              <li>PUC</li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-xs mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/experiencepavillion" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://www.linkedin.com/company/experience-pavillion/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h3 className="font-bold text-lg mb-3">Learn More</h3>
          <ul className="flex justify-center gap-8">
            <li>
              <Link to="/termsandconditions" className="text-blue-400 hover:underline" onClick={() => window.scrollTo(0, 0)}>
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacypolicy" className="text-blue-400 hover:underline" onClick={() => window.scrollTo(0, 0)}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-center mt-6 text-sm">
          <p>
            Designed & Developed by: <Link to="https://flutterflirt.com/" className="underline">FlutterFlirt</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};