import Navbar from "../components/Navbar";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div
        className="container mx-auto p-6 max-w-3xl rounded-lg shadow-lg"
        style={{ fontFamily: 'Amazon Ember, Arial, sans-serif' }}
      >
        <h1 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          Privacy Policy – Experience Pavilion
        </h1>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Data Protection & Privacy</h2>
          <p className="text-xs text-gray-600">
            Experience Pavilion prioritizes the security and privacy of its users by implementing robust cybersecurity measures. 
            We are committed to protecting personal data, course materials, and payment information from unauthorized access, 
            breaches, and cyber threats.
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>All user data, including personal details and payment information, is encrypted using industry-standard security protocols (SSL/TLS).</li>
            <li>We do not share personal data with third parties without user consent, except as required by law.</li>
            <li>Users are responsible for ensuring their login credentials remain confidential.</li>
            <li>Strong password policies and two-factor authentication (2FA) are enforced to prevent unauthorized access.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Cookies Policy</h2>
          <p className="text-xs text-gray-600">
            Experience Pavilion uses cookies and similar tracking technologies to enhance user experience, improve platform 
            functionality, and analyze site traffic. Users can manage or disable cookies through browser settings or in-app preferences.
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>Essential cookies enable core functionality such as security, network management, and accessibility.</li>
            <li>Performance cookies help analyze site usage to improve overall user experience.</li>
            <li>Advertising cookies may be used to provide personalized recommendations and marketing.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Location Access Policy</h2>
          <p className="text-xs text-gray-600">
            Experience Pavilion may request access to a user&apos;s device location to optimize learning experiences based on 
            geographical relevance. Users have full control over location permissions and can adjust them anytime.
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>Location data is collected through IP tracking, Wi-Fi, and mobile networks where applicable.</li>
            <li>Users can disable location tracking anytime via mobile or website settings.</li>
            <li>Location data is used only for providing personalized content and securing user access.</li>
            <li>We do not share location data with third parties without explicit consent.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Incident Response & Reporting</h2>
          <p className="text-xs text-gray-600">
            In the event of a data breach, Experience Pavilion will take immediate action to mitigate risks and notify affected users.
            Users will be informed via email or platform notifications.
          </p>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>Users should report any suspicious activity to security@experiencepavilion.com.</li>
            <li>Regular security audits are conducted to detect and prevent vulnerabilities.</li>
            <li>We comply with GDPR, ISO/IEC 27001, and applicable cybersecurity regulations.</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-1xl font-bold text-gray-700">Contact Information</h2>
          <p className="text-xs text-gray-600">For any privacy-related queries, please contact us at:</p>
          <p>
            <a href="mailto:privacy@experiencepavilion.com" className="text-xs text-blue-600">privacy@experiencepavilion.com</a>
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
