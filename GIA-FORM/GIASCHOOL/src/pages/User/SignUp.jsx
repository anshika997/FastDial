import AuthForm from "../../components/SignupForm";

export default function Signup() {
  
  return (
    <div className="flex justify-center items-center h-screen w-full flex-col px-4 sm:px-6 md:px-8">
        <AuthForm type="signup" />
    </div>
  );
}
