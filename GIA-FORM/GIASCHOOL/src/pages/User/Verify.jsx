import { useState } from "react";
import Button from "../../components/Button";
import LabelledInput from "../../components/LabelInput";
import axios from "axios";

export default function Verify() {
  const apiUrl = import.meta.env.VITE_API_USER_VERIFY;
  console.log(apiUrl);
  const [postInputs, setPostInputs] = useState({
    phone: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);

  async function senRequest() {
    setLoading(true);
    try {
      const response = await axios.post(apiUrl, postInputs);
      const token = response.data?.token;

      if (token) {
        window.localStorage.setItem("jwtToken", token);
      } else {
        throw new Error("Token not found");
      }
      console.log("Response", response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full flex-col px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl">
        Verify OTP
      </h1>
      <LabelledInput
        label="Mobile Number"
        type="tel"
        placeholder="Enter your Mobile Number"
        className="border border-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
        onChange={(e) => {
          console.log("Typing:", e.target.value);
          setPostInputs({ ...postInputs, phone: e.target.value });
        }}
      />
      <div className="mt-2.5"></div>
      <LabelledInput
        label="Otp"
        type="password"
        placeholder="Enter your otp"
        className="border border-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
        onChange={(e) =>
          setPostInputs({ ...postInputs, otp: e.target.value })
        }
      />
      <div className="mt-2.5">
        <Button onClick={senRequest} buttonName={"Verify OTP"}/>
      </div>
    </div>
  );
}
