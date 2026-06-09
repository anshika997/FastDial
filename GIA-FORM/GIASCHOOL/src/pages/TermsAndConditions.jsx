import Navbar from "../components/Navbar";

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div
        className="container mx-auto p-6 max-w-3xl rounded-lg shadow-lg"
        style={{ fontFamily: 'Amazon Ember, Arial, sans-serif' }}
      >
        <h1 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          Terms and Conditions – Experience Pavilion
        </h1>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Introduction</h2>
          <p className="text-xs text-gray-600">
            Welcome to Experience Pavilion, an educational platform designed to provide learning
            resources, courses, and interactive study materials. By accessing or using our application,
            you agree to comply with these Terms and Conditions. If you do not agree, please refrain
            from using the platform.
          </p>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">User Eligibility & Account Registration</h2>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>Users must provide accurate information during registration.</li>
            <li>Minors must obtain parental consent before registering.</li>
            <li>We reserve the right to suspend accounts for violations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Use of Services</h2>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>Content is for personal and educational use only.</li>
            <li>Users must not copy, distribute, or modify content.</li>
            <li>Any misuse may lead to account suspension.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Subscription & Payment Policy</h2>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>Some courses require a paid subscription.</li>
            <li>Payments are non-refundable unless stated otherwise.</li>
            <li>Failure to pay may restrict access to premium features.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Content & Intellectual Property Rights</h2>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>All study materials and courses are owned by Experience Pavilion.</li>
            <li>Unauthorized reproduction or distribution is prohibited.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Privacy & Data Protection</h2>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>Personal information is governed by our <a href="/privacypolicy" className="text-blue-600">Privacy Policy</a>.</li>
            <li>We do not share personal data without consent.</li>
            <li>Users must keep login credentials confidential.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Limitation of Liability</h2>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>We are not responsible for technical issues beyond our control.</li>
            <li>We do not guarantee success in exams or certifications.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Modifications & Updates</h2>
          <p className="text-xs text-gray-600">
            We reserve the right to modify these Terms and Conditions at any time.
            Continued use of the platform after updates implies acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Termination of Services</h2>
          <ul className="list-disc pl-5 text-xs text-gray-600">
            <li>We reserve the right to suspend accounts for violations.</li>
            <li>Users can deactivate their accounts anytime.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-1xl font-bold mt-4 text-gray-700">Governing Law</h2>
          <p className="text-xs text-gray-600">
            These Terms and Conditions are governed by the applicable laws of the jurisdiction where
            Experience Pavilion operates.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-1xl font-bold text-gray-700">Contact Information</h2>
          <p className="text-xs text-gray-600">For any queries, please contact us at:</p>
          <p>
            <a href="mailto:support@experiencepavilion.com" className="text-xs text-blue-600">support@experiencepavilion.com</a>
          </p>
        </section>
      </div>
    </>

  );
};

export default TermsAndConditions;
